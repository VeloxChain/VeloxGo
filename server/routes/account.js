const fs = require("fs");
const path = require("path");
const config = require("../configs/app.json");
const API_HOST_URL = config.API_HOST_URL;
// const _ = require("lodash");
module.exports = function (app) {
    app.post("/api/accounts/upload", (req, res) => {
        let { fileData, fileName } = req.body;
        var buf = Buffer.from(fileData, "base64");
        fileName = fileName.split(" ").join("_");
        let newFileName = Date.now() +"_"+ fileName;
        fs.writeFile(path.join(__dirname, "/../upload/files/") + newFileName, buf, function () {
            res.json({ url: API_HOST_URL + "/files/" + newFileName });
        });
    });
};
