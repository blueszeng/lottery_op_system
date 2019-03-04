// 宝箱分类
export default (sequelize, DataTypes) => {
    const BoxType = sequelize.define('BoxType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        game_id: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "游戏ID",
        },
        name: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "名称",
        },
        big_py_buy_times: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "大概率购买次数",
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
        tableName: 'box_types',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.BoxType.hasMany(models.Box, { foreignKey: 'box_type_id', targetKey: 'id' });
                models.Box.belongsTo(models.BoxType);
            }
        },
        instanceMethods: {}
    })
    return BoxType
}