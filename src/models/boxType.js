// 宝箱分类
export default (sequelize, DataTypes) => {
    const BoxType = sequelize.define('BoxType', {
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
        level: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "宝箱等级可用于排序显示",
        },
        show: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
            validate: {
                notEmpty: true,
            },
            comment: "是否显示",
        },
    }, {
        underscored: true,
        tableName: 'box_types',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {
            associate: function(models) {
                // associations can be defined here

            }
        },
        instanceMethods: {}
    })

    // 添加一个类级别的方法
    BoxType.associate = function(models) {
        models.BoxType.hasMany(models.Box, { foreignKey: 'box_type_id', targetKey: 'id' });

    }
    return BoxType
}