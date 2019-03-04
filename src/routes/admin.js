import Router from 'koa-router'
import users from '../controllers/admin'
import csrf from '../middlewares/csrf'
const router = Router({
    prefix: '/user'
})

// csrf 中单件 是处理允许跨域的操作
router.get('/', csrf, users.index)
router.post('/login', csrf, users.login)
    // router.get('/logout', users.LogOut)
    // router.get('/:id/edit', articles.checkLogin, articles.checkArticleOwner, articles.edit);

// for require auto in index.js
module.exports = router