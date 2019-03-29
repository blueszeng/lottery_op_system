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
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "宝箱ID",
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
        tableName: 'user_boxs',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {},
        instanceMethods: {}
    })
      // 添加一个类级别的方法
      UserBox.associate = function(models) {
        models.UserBox.belongsTo(models.Box, { foreignKey: 'box_id' })
        models.UserBox.belongsTo(models.User, { foreignKey: 'uid' })
    }
    return UserBox
}