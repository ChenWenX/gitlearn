// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const app = new TcbRouter({
        event
    })
    app.use(async (ctx, next) => {
        console.log('进入全局中间件')
        ctx.data = {}
        ctx.data.openId = event.userInfo.openId
        await next()
        console.log('退出全局中间件')
    })
    app.router('music', async (ctx, next) => {
        console.log('进入音乐名称中间件')
        ctx.data.musicName = '数鸭子'
        await next()
        console.log('退出音乐名称中间件')
    }, async (ct,next) => {
        console.log('进入音乐类型中间件')
        ctx.data.musicType = '儿歌'
        ctx.body = {
            data: ctx.data
        }
        console.log('退出音乐类型中间件')
    })
    app.router('movic', async (ctx, next) => {
        ctx.data.movicName = '千与千寻'
        await next()
    }, async (ctx,next) => {
        ctx.data.movicType = '日本动画片'
        ctx.body = {
            data: ctx.data
        }
    })

    return app.serve()
}