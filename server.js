const express = require("express");
const cors = require("cors");

// fix for node-fetch in CommonJS
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();

app.use(cors());

const STM_BASE = "http://192.168.1.108/api/";

app.get("/api/:cmd", async (req, res) => {
    const cmd = req.params.cmd;
    const url = STM_BASE + cmd;

    console.log("Forwarding →", url);

    try {
        const response = await fetch(url);

        const data = await response.text();

        console.log("STM Response:", data);

        res.send(data);

    } catch (err) {
        console.error("ERR:", err.message);
        res.status(500).send("STM32 unreachable: " + err.message);
    }
});

app.listen(3000, () => {
    console.log("Gateway running on port 3000");
});
