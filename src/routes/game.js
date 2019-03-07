import Router from 'koa-router'
import game from '../controllers/game'
import { wrapRoute } from '../utils/wrapRoute'
const router = Router({
    prefix: '/game'
})

/* 页面 */
router.get('/listPage', game.listPage) //主页面
router.get('/addPage', game.addPage) //添加页面
router.get('/editPage', game.editPage) //编辑页面

/* 记录 */
router.post('/add', wrapRoute(game.add)) //添加记录
router.post('/edit', wrapRoute(game.edit)) //编辑记录
router.get('/del', wrapRoute(game.del)) //删除记录

router.post('/search', game.search) //查询

module.exports = router