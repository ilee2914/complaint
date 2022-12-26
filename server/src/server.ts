import https from "https";
import http from "http";
import fs from "fs";
import PathRouter from "./handlers/PathRouter.js";

let count = 0;

const requestListener = async function (
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", async () => {
    const pathname = req.url;

    if (pathname && body) {
      const jsonBody = JSON.parse(body);
      if (jsonBody) {
        let result = await PathRouter.route(pathname, jsonBody);
        res.write(JSON.stringify(result));
      }
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end();
  });
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
