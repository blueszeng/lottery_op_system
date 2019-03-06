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


let post = async(url, data, isJson = true) => {
    let options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        cache: 'no-cache'
    }
    if (isJson === true) {
        options.body = JSON.stringify(data)
        options.headers = { 'Content-Type': 'application/json' }
    } else {
        options.body = data
    }
    let jsonValue = null
    try {
        console.log(options)
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