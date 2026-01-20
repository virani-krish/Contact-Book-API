const app = require("./app");
const conn = require("./config/db");
const { env } = require("./config/env");

const startServer = async () => {

    app.listen(env.PORT, () => {
        console.log(`server start : http://localhost:${env.PORT}`);
    });

}

startServer();