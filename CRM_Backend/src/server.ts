import {Server} from "http";
import app from "./app";
import moment from "moment";
const port = 5000;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log("Server running on port: ", port);
    console.log("Access the server at:", `http://${"localhost"}:${port}`);

  })
}
main();
