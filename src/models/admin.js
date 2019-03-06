import bcrypt from 'bcrypt'
import config from '../configs/config'
export default (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        account: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: [1, 50]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        underscored: true,
        tableName: 'admin_users',
        indexes: [{ unique: true, fields: ['account', 'id'] }],
        classMethods: {},
        instanceMethods: {
            authenticate: function(value) {
                if (bcrypt.compareSync(value + config.salt, this.password)) {
                    return true
                } else {
                    return false
                }
            }
        }
    })
    return Admin
}