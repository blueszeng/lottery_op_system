// 用户抽奖记录
export default (sequelize, DataTypes) => {
    const WinPrizePush = sequelize.define('WinPrizePush', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "获取类型 [1.开宝箱, 2.兑换, 3.幸运一搏",
        },
        uid: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "用户ID",
        },
        goods_id: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "物品ID",
        }
    }, {
        underscored: true,
        tableName: 'win_prize_push_msgs',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {},
        instanceMethods: {}
    })

    // 添加一个类级别的方法
    WinPrizePush.associate = function(models) {
        models.WinPrizePush.belongsTo(models.Goods, { foreignKey: 'goods_id' })
    }

    return WinPrizePush
}