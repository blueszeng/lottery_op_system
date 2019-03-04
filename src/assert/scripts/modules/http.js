import fetch from 'isomorphic-fetch'
import qs from 'querystring'

let get = async(url, data) => {
    let param = qs.stringify(data)
    let options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' }
    }
    url = url + '?' + param
    let jsonValue = null
    try {
        let value = await fetch(url, options)
        jsonValue = value.json()
    } catch (err) {
        return Promise.reject(new Error(`problem with request: ${err.message}`))
    }
    return Promise.resolve(jsonValue)
}

let post = async(url, data) => {
    let options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        cache: 'no-cache',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }
    let jsonValue = null
    try {
        let value = await fetch(url, options)
        jsonValue = value.json()
    } catch (err) {
        return Promise.reject(new Error(`problem with request: ${err.message}`))
    }
    return Promise.resolve(jsonValue)
}

export default {
    get,
    post
}