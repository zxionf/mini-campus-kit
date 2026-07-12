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
    student_encrpted_pwd: string
    schedule: any[]
}