import express, { Express } from "express"; // Explicit type

import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";

const app: Express = express();

app.use("/api", apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`server started running on ${serverConfig.PORT}`);
});
