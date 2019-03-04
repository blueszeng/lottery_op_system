export default (sequelize, DataTypes) => {
    const QQstrategy = sequelize.define('QQstrategy', {
        uid: {
            type: DataTypes.INTEGER,
            notEmpty: true,
        },
        openid: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: [1, 50]
            }
        },
    }, {
        underscored: true,
        tableName: 'qqstrategys',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {},
        instanceMethods: {}
    })
    return QQstrategy
}