// app.ts
import './utils/cookie/cookieProxy'
// import 'weapp-cookie'
import { get_xs_jbxx } from './services/jwxt/getxsjbxx'
import { get_sdpkkb } from './services/jwxt/getsdpkkb'
import store from './utils/storage'
import { strip_lable } from './utils/util'
import { raw_list } from './any'
import { get_xlzc } from './services/jwxt/getxlzc'
import { get_zclist } from './services/jwxt/getzclist'
import { jsencrypt } from './utils/encrypt'
import { API_JWXT, BASE_URL_JWXT, PUB_KEY_JWXT } from './constants/api'
import request_jwxt from './services/request'

App<IAppOption>({
    globalData: {},
    async onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                console.log('res.code', res.code)
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            },
        })

        // // 获取学生基本信息
        // await get_xs_jbxx()

        // // 获取课表
        // const jbxx = store.get('xs_jbxx')
        // if (!jbxx?.dqxnxq || !jbxx?.id) {
        //     throw new Error('缺失必要信息，请重新登录')
        // }
        // get_sdpkkb(jbxx.dqxnxq, jbxx.id)


        // // 获取当前周次
        // const num = await get_xlzc()
        // // console.log(num)

        // // 获取周次列表
        // get_zclist(store.get('xs_jbxx')!.dqxnxq)

        // wxff35176a425e75ac


    },
})