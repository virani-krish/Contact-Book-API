const app = require("./app");
const { env } = require("./config/env");

const startServer = async () => {

    app.listen(env.PORT, () => {
        console.log(`server start : http://localhost:${env.PORT}`);
    });

}

startServer();