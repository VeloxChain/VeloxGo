module.exports = function(app){
    require("./replayTx")(app);
    require("./vehicle")(app);
    require("./ipfs")(app);
};
