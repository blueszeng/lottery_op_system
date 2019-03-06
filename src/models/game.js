// 游戏
export default (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
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
        icon: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "游戏icon",
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
        tableName: 'games',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Game.hasMany(models.BoxType, { foreignKey: 'game_id', targetKey: 'id' });
                Game.hasMany(models.Goods, { foreignKey: 'game_id', targetKey: 'id' });
                Game.hasMany(models.GoodsType, { foreignKey: 'game_id', targetKey: 'id' });
                Game.hasMany(models.GoodsQualities, { foreignKey: 'game_id', targetKey: 'id' });
                Game.hasMany(models.ExchangeGoods, { foreignKey: 'game_id', targetKey: 'id' });
            }
        },
        instanceMethods: {}
    })

    // 添加一个类级别的方法
    Game.associate = function(models) {
        Game.hasMany(models.BoxType, { foreignKey: 'game_id', targetKey: 'id' });
        Game.hasMany(models.Goods, { foreignKey: 'game_id', targetKey: 'id' });
        Game.hasMany(models.GoodsType, { foreignKey: 'game_id', targetKey: 'id' });
        Game.hasMany(models.GoodsQualities, { foreignKey: 'game_id', targetKey: 'id' });
        Game.hasMany(models.ExchangeGoods, { foreignKey: 'game_id', targetKey: 'id' });
    }
    return Game
}