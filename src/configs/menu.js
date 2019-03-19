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
                    'dataHref': '/goods/goodsModel/listPage',
                    'onclick': 'Hui_admin_tab(this)'
                }, {
                    'link': '#',
                    'text': '物品型号添加',
                    'dataHref': '/goods/goodsModel/addPage',
                    'onclick': 'Hui_admin_tab(this)'
                }]
            },
            {
                'text': '物品品质',
                'children': [{
                    'link': '#',
                    'text': '物品品质号询',
                    'dataHref': '/goods/goodsQualities/listPage',
                    'onclick': 'Hui_admin_tab(this)'
                }, {
                    'link': '#',
                    'text': '物品品质添加',
                    'dataHref': '/goods/goodsQualities/addPage',
                    'onclick': 'Hui_admin_tab(this)'
                }]
            },
            {
                'text': '物品',
                'children': [{
                    'link': '#',
                    'text': '物品查询',
                    'dataHref': '/goods/goods/listPage',
                    'onclick': 'Hui_admin_tab(this)'
                }, {
                    'link': '#',
                    'text': '物品添加',
                    'dataHref': '/goods/goods/addPage',
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
    },
    {
        'id': 'menu-article',
        'text': '宝箱管理',
        'icon': '&#xe616',
        'children': [{
                'text': '宝箱分类',
                'children': [{
                    'link': '#',
                    'text': '宝箱分类查询',
                    'dataHref': '/box/boxType/listPage',
                    'onclick': 'Hui_admin_tab(this)'
                }, {
                    'link': '#',
                    'text': '宝箱分类添加',
                    'dataHref': '/box/boxType/addPage',
                    'onclick': 'Hui_admin_tab(this)'
                }]
            }, {
                'text': '宝箱',
                'children': [{
                    'link': '#',
                    'text': '宝箱查询',
                    'dataHref': '/box/box/listPage',
                    'onclick': 'Hui_admin_tab(this)'
                }, {
                    'link': '#',
                    'text': '宝箱添加',
                    'dataHref': '/box/box/addPage',
                    'onclick': 'Hui_admin_tab(this)'
                }]
            },
            {
                'text': '宝箱物品',
                'children': [{
                    'link': '#',
                    'text': '宝箱物品查询',
                    'dataHref': '/box/boxGoods/listPage',
                    'onclick': 'Hui_admin_tab(this)'
                }, {
                    'link': '#',
                    'text': '宝箱物品添加',
                    'dataHref': '/box/boxGoods/addPage',
                    'onclick': 'Hui_admin_tab(this)'
                }]
            }
        ]
    }
]
module.exports = menu