// 物品分类
export default (sequelize, DataTypes) => {
    const GoodsModel = sequelize.define('GoodsModel', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        goods_type_id: {
            type: DataTypes.INTEGER,
            comment: "道具类型ID",
        },
        name: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "型号名称",
        },
    }, {
        underscored: true,
        tableName: 'goods_models',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {},
        instanceMethods: {}
    })
    return GoodsModel
}