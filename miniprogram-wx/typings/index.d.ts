/// <reference path="./types/index.d.ts" />

interface IAppOption {
    globalData: {
        userInfo?: WechatMiniprogram.UserInfo,
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

interface IAppData {
    token_jwxt: string
    student_id: string
    xs_jbxx: {
        xh: string
        xm: string
        id: string
        bjmc: string
        dqxnxq: string
    }
    student_encrpted_pwd: string
    xhid: string
    encodeId: string
    schedule: any[]
}