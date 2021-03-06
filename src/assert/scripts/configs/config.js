const SERVER_BASE_URL = 'http://127.0.0.1:3000' // 服务器基地址
const URL = {
    GAME: {
        ADD: { url: `/game/add`, method: 'post' },
        UPLOAD: { url: `/picture/upload`, method: 'post' },
        EDIT: { url: `/game/edit`, method: 'post' },
        DEL: { url: `/game/del`, method: 'get' },
        OPEN: { url: `/game/open`, method: 'get' }
    },
    GOODSTYPE: {
        ADD: { url: `/goods/goodsType/add`, method: 'post' },
        EDIT: { url: `/goods/goodsType/edit`, method: 'post' },
        DEL: { url: `/goods/goodsType/del`, method: 'get' }
    },
    GOODSMODEL: {
        ADD: { url: `/goods/goodsModel/add`, method: 'post' },
        EDIT: { url: `/goods/goodsModel/edit`, method: 'post' },
        DEL: { url: `/goods/goodsModel/del`, method: 'get' }
    },
    GOODSQUALITIES: {
        ADD: { url: `/goods/goodsQualities/add`, method: 'post' },
        EDIT: { url: `/goods/goodsQualities/edit`, method: 'post' },
        DEL: { url: `/goods/goodsQualities/del`, method: 'get' }
    },
    GOODS: {
        ADD: { url: `/goods/goods/add`, method: 'post' },
        EDIT: { url: `/goods/goods/edit`, method: 'post' },
        DEL: { url: `/goods/goods/del`, method: 'get' },
        SEARCH: { url: `/goods/goods/listPage`, method: 'get' }
    },
    BOXTYPE: {
        ADD: { url: `/box/boxType/add`, method: 'post' },
        EDIT: { url: `/box/boxType/edit`, method: 'post' },
        DEL: { url: `/box/boxType/del`, method: 'get' }
    },
    BOX: {
        ADD: { url: `/box/box/add`, method: 'post' },
        EDIT: { url: `/box/box/edit`, method: 'post' },
        DEL: { url: `/box/box/del`, method: 'get' },
        SEARCH: { url: `/box/box/listPage`, method: 'get' }
    },
    BOXGOODS: {
        ADD: { url: `/box/boxGoods/add`, method: 'post' },
        EDIT: { url: `/box/boxGoods/edit`, method: 'post' },
        DEL: { url: `/box/boxGoods/del`, method: 'get' },
        SEARCH: { url: `/box/boxGoods/listPage`, method: 'get' },
        SEARCH1: { url: `/box/boxGoods/boxAndGoodsTypes`, method: 'get' },
        SEARCH2: { url: `/box/boxGoods/boxs`, method: 'get' },
        SEARCH3: { url: `/box/boxGoods/goodsModel`, method: 'get' },
        SEARCH4: { url: `/box/boxGoods/goods`, method: 'get' }
    },
    EXCHANG: {
        REPULES: { url: `/exchangeGoods/repules`, method: 'get' },
        SURE: { url: `/exchangeGoods/sure`, method: 'get' }
    },
    CONFIG: {
        EDIT: { url: `/config/edit`, method: 'post' }
    },
    USER: {
        SEARCH: { url: `/user/listPage`, method: 'get' },
        SEARCH1: { url: `/user/winPrizePushListPage`, method: 'get' },
        SEARCH2: { url: `/user/rechargeListPage`, method: 'get' },
        SEARCH3: { url: `/user/boxListPage`, method: 'get' },
        SEARCH4: { url: `/user/goodsListPage`, method: 'get' },
        SEARCH5: { url: `/user/giveGoodsListPage`, method: 'get' }

    }
}
export const getServer = (type, key) => {
    return {
        url: `${SERVER_BASE_URL}${URL[type][key]['url']}`,
        method: URL[type][key]['method']
    }
}