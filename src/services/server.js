import constants from "./constants";

export default class ServerService {
    request(path,params){
        return fetch(constants.REMOTE_API_HOST + path, {
            method: "post",
            body: JSON.stringify(params),
            headers: {
                "content-type": "application/json"
            },
        }).then(function(response) {
            return response.json();
        });
    }

    // downloadFacetFile(fileUrl, facetKey, owner) {
    //     return this.request("/api/facet/download",{fileUrl: fileUrl, facetKey: facetKey, owner: owner});
    // }
}
