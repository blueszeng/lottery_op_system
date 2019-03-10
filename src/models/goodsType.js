// 物品分类
export default (sequelize, DataTypes) => {
    const GoodsType = sequelize.define('GoodsType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "名称",
        },
    }, {
        underscored: true,
        tableName: 'goods_types',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {},
        instanceMethods: {}
    })

    // 添加一个类级别的方法
    GoodsType.associate = function(models) {
        GoodsType.hasMany(models.GoodsModel, { foreignKey: 'goods_type_id', targetKey: 'id' });
    }
    return GoodsType
}