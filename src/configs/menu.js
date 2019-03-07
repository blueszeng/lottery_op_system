const menu = [{
    "id": "menu-article",
    "text": "游戏管理",
    "icon": "&#xe616",
    "children": [{
            "link": "#",
            "text": "游戏查询",
            "dataHref": "/game/listPage",
            "onclick": "Hui_admin_tab(this)"
        },
        {
            "link": "#",
            "text": "添加游戏",
            "dataHref": "/game/addPage",
            "onclick": "Hui_admin_tab(this)"
        },
        {
            "text": "二级菜单",
            "children": [{
                "link": "#",
                "text": "三级菜单",
                "dataHref": "_blank.html"
            }]
        }

    ]
}]
module.exports = menu