const SERVER_BASE_URL = 'http://127.0.0.1:3000' // 服务器基地址
const URL = {
    GAME: {
        ADD: { url: `/game/add`, method: 'post' },
        UPLOAD: { url: `/picture/upload`, method: 'post' },
        EDIT: { url: `/game/edit`, method: 'post' },
        DEL: { url: `/game/del`, method: 'get' },
        OPEN: { url: `/game/open`, method: 'get' }
    }
}
export const getServer = (type, key) => {
    return {
        url: `${SERVER_BASE_URL}${URL[type][key]['url']}`,
        method: URL[type][key]['method']
    }
}