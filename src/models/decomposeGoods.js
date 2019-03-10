// 分解物品
export default (sequelize, DataTypes) => {
    const DecomposeGoods = sequelize.define('DecomposeGoods', {
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
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "物品ID",
        },
        money_type: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "货币类型",
        },
        money: {
            type: DataTypes.FLOAT,
            validate: {
                notEmpty: true,
            },
            comment: "货币数量",
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
            validate: {
                notEmpty: true,
            },
            comment: "状态",
        },

    }, {
        underscored: true,
        tableName: 'decompose_goods_records',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {},
        instanceMethods: {}
    })

    // 添加一个类级别的方法
    DecomposeGoods.associate = function(models) {
        models.DecomposeGoods.belongsTo(models.Goods, { foreignKey: 'goods_id' })
    }
    return DecomposeGoods
}