let tabUrl: string | undefined = "";

async function getCurrentTab(): Promise<chrome.tabs.Tab> {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function postData(url: string = "", data: Object = {}): Promise<any> {
  console.log("s");
  let response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  let fullResponse = "";
  const reader = response?.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const content = await reader?.read();
    if (content) {
      if (content.value) {
        fullResponse += decoder.decode(content.value);
      }
      if (content.done) break;
    } else {
      break;
    }
  }
  return JSON.parse(fullResponse);
}

async function createForm(): Promise<void> {
  chrome.identity.getProfileUserInfo(async (info) => {
    let element = document.getElementById("gooby");
    let email = info.email;
    const tab = await getCurrentTab();
    tabUrl = tab.url;

    if (!element) {
      return;
    }

    if (!email) {
      element.innerHTML = `<div>
          Log into Google Chrome to comment.
        </div>`;
      return;
    }

    let data = {
      email: email,
    };

    let response = await sendRequest("load", data);
    element.innerHTML = `<div>${response["username"]}</div>`;

    return;
  });
}

async function sendRequest(path: string, data: any) {
  const hostname = "https://127.0.0.1:8080/";
  const url = hostname + path;

  if (tabUrl) {
    data["tabUrl"] = tabUrl;
    let response = await postData(url, data);
    return response;
  }
}

async function comment(content: string) {
  const data = {
    comment: content,
  };
  await sendRequest("comment", data);
}

document
  .getElementById("comment-form")
  ?.addEventListener("keydown", async (event) => {
    const keypress = event.key;
    if (keypress == "Enter") {
      event.preventDefault();
      await comment("ass");
    }
  });

document.getElementById("submit")?.addEventListener("click", async (event) => {
  await comment("ass");
});

createForm();
