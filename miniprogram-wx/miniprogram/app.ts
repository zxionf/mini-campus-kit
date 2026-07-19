// app.ts
import './utils/cookie/cookieProxy'
import { get_xs_jbxx } from './services/jwxt/getxsjbxx'
import { get_sdpkkb } from './services/jwxt/getsdpkkb'
import store from './utils/storage'
import { strip_lable } from './utils/util'
import { raw_list } from './any'

App<IAppOption>({
    globalData: {},
    onLaunch() {
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

        // 获取课表
        // const jbxx = store.get('xs_jbxx')
        // if (!jbxx?.dqxnxq || !jbxx?.id) {
        //     throw new Error('缺失必要信息，请重新登录')
        // }
        // get_schedule(jbxx.dqxnxq, jbxx.id)


    },
})