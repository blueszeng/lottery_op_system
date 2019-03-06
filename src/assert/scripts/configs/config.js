const SERVER_BASE_URL = 'http://127.0.0.1:3000' // 服务器基地址
const URL = {
    GAME: {
        ADD: `/game/add`
    }
}
export const getServerUrl = (type, key) => {
    return `${SERVER_BASE_URL}${URL[type][key]}`
}