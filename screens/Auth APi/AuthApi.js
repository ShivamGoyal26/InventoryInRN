import React from 'react'
const BASE_URL = 'https://imvptest.herokuapp.com/api/v1/'

export const getApi = (config) => {
    console.log(config)
    return new Promise((resolve, reject) => {
        return fetch(BASE_URL + config.endPoint, {
            body: JSON.stringify(config.bodydata),
            headers: config.headers,
            method: config.type
        }).then(async (response) => {

            let status = response.status
            let json = await response.json()
            json.status = status
            console.log(json)
            resolve(json);
        }).catch((error) => {
            console.log('error', error.message)
        });
    })
}
