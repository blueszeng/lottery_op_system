import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import { env } from '../configs/config'
import database from '../configs/database'
import debug from '../utils/debug'
const log = debug(__filename)
const config = database[env]
const basename = path.basename(module.filename)
const db = {}
let sequelize = null
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs.readdirSync(__dirname).forEach((file) => {
    if (!/\.js$/.test(file) || file === basename) {
        return;
    }
    console.log(file)
    var model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
})
async function initCreateDb(sequelize) {
    try {
        console.log('cmdmdmddmmd')
        await sequelize.sync({ force: false })
        log('init createDb successed')
    } catch (err) {
        log(`init createDb failed to error: ${err}`)
    }
}

function associate(models) {
    for (let modelName in models) {
        console.log(models[modelName].associate)
        if (models[modelName].associate) {
            models[modelName].associate(models)
        }
    }

    // game 关联
    // models.Game.hasMany(models.BoxType, { foreignKey: 'game_id', targetKey: 'id' });
    // models.Game.hasMany(models.Goods, { foreignKey: 'game_id', targetKey: 'id' });
    // models.Game.hasMany(models.GoodsType, { foreignKey: 'game_id', targetKey: 'id' });
    // models.Game.hasMany(models.GoodsQualities, { foreignKey: 'game_id', targetKey: 'id' });
    // models.Game.hasMany(models.ExchangeGoods, { foreignKey: 'game_id', targetKey: 'id' });

    // // boxType 关联
    // models.BoxType.hasMany(models.Box, { foreignKey: 'box_type_id', targetKey: 'id' });
    // // models.Box.belongsTo(models.BoxType);

    // // box 关联
    // models.Box.hasMany(models.BoxGoods, { foreignKey: 'box_id', targetKey: 'id' });
    // // models.BoxType.belongsTo(models.Box);

    // // goods_types 关联
    // models.GoodsType.hasMany(models.Goods, { foreignKey: 'goods_type_id', targetKey: 'id' });


    // // goods 关联
    // models.Goods.hasOne(models.BoxGoods, { foreignKey: 'goods_id', targetKey: 'id' });
    // models.BoxGoods.belongsTo(models.Goods, { foreignKey: 'goods_id' });

    // models.Goods.hasMany(models.DecomposeGoods, { foreignKey: 'goods_id', targetKey: 'id' });
    // models.Goods.hasMany(models.ExchangeGoods, { foreignKey: 'goods_id', targetKey: 'id' });
    // models.Goods.hasMany(models.GiveGoods, { foreignKey: 'goods_id', targetKey: 'id' });
    // models.Goods.hasMany(models.UserGoods, { foreignKey: 'goods_id', targetKey: 'id' });
    // // user 关联
    // models.User.hasMany(models.UserGoods, { foreignKey: 'uid', targetKey: 'id' });
    // models.User.hasMany(models.Order, { foreignKey: 'uid', targetKey: 'id' });
    // models.User.hasMany(models.GiveGoods, { foreignKey: 'send_uid', targetKey: 'id' });
    // models.User.hasMany(models.GiveGoods, { foreignKey: 'recv_uid', targetKey: 'id' });
    // models.User.hasMany(models.DecomposeGoods, { foreignKey: 'uid', targetKey: 'id' });
    // models.User.hasMany(models.ExchangeGoods, { foreignKey: 'uid', targetKey: 'id' });




}
associate(db)
initCreateDb(sequelize)
db.sequelize = sequelize
export default db