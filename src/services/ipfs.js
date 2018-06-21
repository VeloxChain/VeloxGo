import IPFS from "ipfs";
import series from "async/series";

let IPSFTest = {};

IPSFTest.test = () => {
        const node = new IPFS({repo: 'QmNLiRSpcxTvaQKh53paJixMEs7FKMxTbGLNq7vzt8noos' });
        let fileMultihash;

        series([
            (cb) => node.on("ready", cb),
            (cb) => node.version((err, version) => {
                if (err) {
                    return cb(err);
                }
                console.log("Version:", version.version);
                cb();
            }),
            (cb) => node.files.add({
                path: "hello.txt",
                content: Buffer.from("Hello World2222101")
            }, (err, filesAdded) => {
                if (err) {
                    return cb(err);
                }

                console.log("\nAdded file:", filesAdded[0].path, filesAdded[0].hash);
                fileMultihash = filesAdded[0].hash;
                cb();
            }),
            (cb) => node.files.cat(fileMultihash, (err, data) => {
                if (err) {
                    return cb(err);
                }

                console.log("\nFile content:");
            })
        ]);
}

export default IPSFTest
