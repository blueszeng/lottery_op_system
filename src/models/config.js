// 宝箱物品
export default (sequelize, DataTypes) => {
    const Config = sequelize.define('Config', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        key: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "key",
        },
        value: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "value",
        },
        discrable: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "描述",
        },
    }, {
        underscored: true,
        tableName: 'configs',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        },
        instanceMethods: {}
    })
    return Config
}