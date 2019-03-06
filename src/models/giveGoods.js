// 赠送物品
export default (sequelize, DataTypes) => {
    const GiveGoods = sequelize.define('GiveGoods', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        send_uid: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "发送UID",
        },
        recv_uid: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "接收UID",
        },
        goods_id: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "物品ID",
        },
        goods_num: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "物品数量",
        },
        state: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: true,
            },
            comment: "状态",
        }
    }, {
        underscored: true,
        tableName: 'give_goods_records',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {},
        instanceMethods: {}
    })
    return GiveGoods
}