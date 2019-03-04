// 用户物品
export default (sequelize, DataTypes) => {
    const UserGoods = sequelize.define('UserGoods', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uid: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "用户ID",
        },
        goods_id: {
            type: DataTypes.FLOAT,
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
        }
    }, {
        underscored: true,
        tableName: 'user_goods',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {},
        instanceMethods: {}
    })
    return UserGoods
}