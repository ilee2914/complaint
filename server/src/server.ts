import https from "https";
import http from "http";
import fs from "fs";
import GUN from "gun";
import PathRouter from "./handlers/PathRouter";

let count = 0;

const requestListener = function (
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  count++;
  console.log(count);
  let body = "";
  let result = null;
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    console.log(body);
    const pathname = req.url;
    console.log(pathname);

    if (pathname) {
      const jsonBody = JSON.parse(body);
      result = PathRouter.route(pathname, jsonBody);
    }
  });

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(result));
  res.end();
};

const options = {
  key: fs.readFileSync("./security/cert.key"),
  cert: fs.readFileSync("./security/cert.pem"),
};

console.log("Server starting");
PathRouter.init();
const server = https.createServer(options, requestListener);
server.listen(8080, "127.0.0.1");
console.log("Server running");
