// 用户
export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            head: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
                comment: "头像",
            },
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
                comment: "名称",
            },
            dollar_money: {
                type: DataTypes.FLOAT,
                validate: {
                    notEmpty: true,
                },
                comment: "美元",
            },
            exchange_money: {
                type: DataTypes.FLOAT,
                validate: {
                    notEmpty: true,
                },
                comment: "兑换币",
            }
        }, {
            underscored: true,
            tableName: 'users',
            charset: 'utf8mb4',
            indexes: [{ unique: true, fields: ['id'] }],
            classMethods: {},
            instanceMethods: {}
        })
        // 添加一个类级别的方法
    User.associate = function(models) {
        User.hasMany(models.UserGoods, { foreignKey: 'uid', targetKey: 'id' });
        User.hasMany(models.Order, { foreignKey: 'uid', targetKey: 'id' });
        // User.hasMany(models.GiveGoods, { foreignKey: 'send_uid', targetKey: 'id' });
        // User.hasMany(models.GiveGoods, { foreignKey: 'recv_uid', targetKey: 'id' });
        User.hasMany(models.DecomposeGoods, { foreignKey: 'uid', targetKey: 'id' });
        User.hasMany(models.ExchangeGoods, { foreignKey: 'uid', targetKey: 'id' });
    }
    return User
}