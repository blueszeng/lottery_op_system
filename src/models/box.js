// 宝箱
export default (sequelize, DataTypes) => {
    const Box = sequelize.define('Box', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        box_type_id: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "宝箱类型ID",
        },
        icon: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "宝箱icon",
        },
        name: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "名称",
        },
        pirce: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "价格",
        },
        open: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: true,
                defaultValue: true
            },
            comment: "是否能打开",
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
        tableName: 'boxs',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Box.belongsToMany(models.Goods, {
                    through: {
                        model: models.BoxGoods
                    },
                    foreignKey: 'box_id'
                });
            }
        },
        instanceMethods: {}
    })
    return Box
}