import * as dotenv from "dotenv";
dotenv.config({ path: `.env.local`, override: true });

import server from "./lib/server.js";

const application = {};

application.init = () => {
  server.run();
};

application.init();
