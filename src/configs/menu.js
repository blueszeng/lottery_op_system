const menu = [{
        'id': 'menu-article',
        'text': '游戏管理',
        'icon': '&#xe616',
        'children': [{
                'link': '#',
                'text': '查询游戏',
                'dataHref': '/game/listPage',
                'onclick': 'Hui_admin_tab(this)'
            },
            {
                'link': '#',
                'text': '添加游戏',
                'dataHref': '/game/addPage',
                'onclick': 'Hui_admin_tab(this)'
            }
        ]
    },
    {
        'id': 'menu-article',
        'text': '物品管理',
        'icon': '&#xe616',
        'children': [{
                'text': '物品分类',
                'children': [{
                    'link': '#',
                    'text': '物品分类查询',
                    'dataHref': '/goods/goodsType/listPage',
                    'onclick': 'Hui_admin_tab(this)'
                }, {
                    'link': '#',
                    'text': '物品分类添加',
                    'dataHref': '/goods/goodsType/addPage',
                    'onclick': 'Hui_admin_tab(this)'
                }]
            },
            {
                'text': '物品型号',
                'children': [{
                    'link': '#',
                    'text': '物品型号询',
                    'dataHref': '/goods/goodsModel/goodModellistPage',
                    'onclick': 'Hui_admin_tab(this)'
                }, {
                    'link': '#',
                    'text': '物品型号添加',
                    'dataHref': 'game/addPage',
                    'onclick': 'Hui_admin_tab(this)'
                }]
            },
            {
                'text': '物品品质',
                'children': [{
                    'link': '#',
                    'text': '物品品质号询',
                    'dataHref': 'game/addPage',
                    'onclick': 'Hui_admin_tab(this)'
                }, {
                    'link': '#',
                    'text': '物品品质添加',
                    'dataHref': 'game/addPage',
                    'onclick': 'Hui_admin_tab(this)'
                }]
            },
            {
                'text': '物品',
                'children': [{
                    'link': '#',
                    'text': '物品查询',
                    'dataHref': 'game/addPage',
                    'onclick': 'Hui_admin_tab(this)'
                }, {
                    'link': '#',
                    'text': '物品添加',
                    'dataHref': 'game/addPage',
                    'onclick': 'Hui_admin_tab(this)'
                }]
            }
            // {
            //     'link': '#',
            //     'text': '物品型号',
            //     'dataHref': 'game/addPage',
            //     'onclick': 'Hui_admin_tab(this)'
            // },
            // {
            //     'link': '#',
            //     'text': '物品品质',
            //     'dataHref': 'game/addPage',
            //     'onclick': 'Hui_admin_tab(this)'
            // },
            // {
            //     'link': '#',
            //     'text': '物品名称',
            //     'dataHref': 'game/addPage',
            //     'onclick': 'Hui_admin_tab(this)'
            // },

        ]
    }
]
module.exports = menu