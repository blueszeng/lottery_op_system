export default (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uid: {
            type: DataTypes.INTEGER,
            notEmpty: true,
        },
        pay_type: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            comment: "支付类型 [1-支付宝，2-微信]",
        },
        sdcustomno: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: [1, 50]
            },
            comment: "订单号",
        },
        money: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
                defaultValue: 0
            },
            comment: "充值人民币金额号",
        },
        dollar_money: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
                defaultValue: 0
            },
            comment: "转换美元金额",
        },
        state: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
                defaultValue: 0
            },
            comment: "充值状态",
        },
        // createTime: {
        //     type: DataTypes.DATE,
        //     validate: {
        //         defaultValue: DataTypes.NOW
        //     }
        // }
    }, {
        underscored: true,
        tableName: 'orders',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['sdcustomno'] }],
        classMethods: {},
        instanceMethods: {}
    })
    return Order
}