// 宝箱物品
export default (sequelize, DataTypes) => {
    const BoxGoods = sequelize.define('BoxGoods', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        box_id: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "宝箱ID",
        },
        goods_id: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "物品ID",
        },
        drop_probability: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "宝箱物品掉落概率",
        },
        show: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: true,
                defaultValue: true
            },
            comment: "是否显示",
        }
    }, {
        underscored: true,
        tableName: 'box_goods',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        },
        instanceMethods: {}
    })
    return BoxGoods
}