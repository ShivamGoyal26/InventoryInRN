export const baseUrl = "https://imvptest.herokuapp.com/api/v1/"
export const mediaBaseUrl = "https://imvptest.herokuapp.com/Server/Images/"

export const api = async (config) => {
    console.log("API Function Runing")
    if (config.method == "GET") {
        console.log("this Get is Ruing")
        console.log(baseUrl + config.endpoint)
        return new Promise(function (resolve, reject) {
            fetch(baseUrl + config.endpoint,
                {
                    method: config.method,
                    headers: config.headers,
                }).then((response) => response.json())
                .then(async (res) => {
                    console.log("Response => ", ` ${config.endpoint} `, res)
                    resolve(res);
                })
                .catch((error) => {
                    console.error("Error => ", ` ${config.endpoint} `, error);
                    reject(error)
                });
        });
    } else {
        console.log("The Post is Runing ")
        return new Promise(function (resolve, reject) {
            fetch(baseUrl + config.endpoint,
                {
                    method: config.method,
                    headers: config.headers,
                    body: JSON.stringify(config.data)
                }).then((response) => response.json())
                .then(async (res) => {

                    console.log("this is the response we are getting!!!!!!")
                    console.log("Response => ", ` ${config.endpoint} `, res)
                    resolve(res);
                })
                .catch((error) => {
                    console.error("Error => ", ` ${config.endpoint} `, error);
                    reject(error)
                });
        });
    }
}