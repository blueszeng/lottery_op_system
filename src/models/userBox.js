// 用户物品
export default (sequelize, DataTypes) => {
    const UserBox = sequelize.define('UserBox', {
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
        box_id: {
            type: DataTypes.FLOAT,
            validate: {
                notEmpty: true,
            },
            comment: "物品ID",
        },
        box_num: {
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
    return UserBox
}