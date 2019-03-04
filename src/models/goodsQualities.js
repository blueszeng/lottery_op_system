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
        qualities: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "品质",
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
    return GoodsQualities
}