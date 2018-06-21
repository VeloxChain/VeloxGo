const models = require("./models");
const _ = require("lodash");

var owner = process.argv.slice(2)[0];
if (_.isUndefined(owner)) {
    console.log(">    Usage: npm run clean <owner>"); // eslint-disable-line
    console.log(">    Example: npm run clean 0x00000000000000000000000000000000000000"); // eslint-disable-line
    process.exit();
}
if (owner.length !== 42) {
    console.log("ETH Address invalid!"); // eslint-disable-line
    process.exit();
}
models.account.find({ where: { owner:owner } }).then((account)=>{
    if (_.isNull(account)) {
        process.exit();
    }
    models.keys_registry.destroy({ where: { email:account.email } }).then(()=>{
        models.facet.findAll({ where: { owner:owner } }).then((facets)=>{
            account.destroy();
            if (_.isNull(facets)) {
                process.exit();
            }
            let countRows = facets.length;
            if (countRows == 0) {
                process.exit();
            }
            _.forEach(facets,(facet, index)=> {
                let facetAddress = facet.facetAddress;
                models.facet_activity.destroy({ where: { account:owner } }).then(()=>{
                    models.facet_field.destroy({ where: { facetAddress:facetAddress } }).then(()=>{
                        facet.destroy();
                        if (index === countRows -1) {
                            process.exit();
                        }
                    });
                });
            });
        });
    });

});
