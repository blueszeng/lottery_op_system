// 物品品质

export default (sequelize, DataTypes) => {
    const GoodsQualities = sequelize.define('GoodsQualities', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        game_id: {
            type: DataTypes.INTEGER,
            comment: "游戏ID",
        },
        img: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "品质图",
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            },
            comment: "名称",
        }
    }, {
        underscored: true,
        tableName: 'goods_qualities',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {},
        instanceMethods: {}
    })

    // 添加一个类级别的方法
    GoodsQualities.associate = function(models) {
        GoodsQualities.hasMany(models.Goods, { foreignKey: 'goods_qualities_id', targetKey: 'id' });
    }
    return GoodsQualities
}