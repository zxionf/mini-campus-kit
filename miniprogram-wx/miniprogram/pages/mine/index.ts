import { API_JWXT, BASE_URL_JWXT, PUB_KEY_JWXT } from "../../constants/api";
import { get_sdpkkb } from "../../services/jwxt/getsdpkkb";
import { get_xlzc } from "../../services/jwxt/getxlzc";
import { get_xs_jbxx } from "../../services/jwxt/getxsjbxx";
import { get_zclist } from "../../services/jwxt/getzclist";
import { login_jwxt } from "../../services/jwxt/login";
import request_jwxt from "../../services/request";
import cookieStore from "../../utils/cookie/cookieProxy";
import { jsencrypt } from "../../utils/encrypt";
import store from "../../utils/storage";

// pages/mine/index.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_show_login_modal: false,
        is_logging_in: false,
        login_username_jwxt: '',
        login_password_jwxt: '',
        msg_login_jwxt: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        const systemInfo = wx.getSystemInfoSync();
        const statusBarHeight = systemInfo.statusBarHeight;
        const menuButtonInfo = wx.getMenuButtonBoundingClientRect();

        // 胶囊按钮与顶部的距离
        const gap = menuButtonInfo.top - statusBarHeight;
        // 整个导航栏高度 = 状态栏高 + 胶囊按钮高 + 上下边距
        const navBarHeight = statusBarHeight + menuButtonInfo.height + gap * 2;

        this.setData({
            statusBarHeight,
            navBarHeight,
            menuButtonWidth: menuButtonInfo.width,
            menuButtonRight: systemInfo.windowWidth - menuButtonInfo.right
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    onSwitchShowLoginModal() {
        this.setData({
            is_show_login_modal: !this.data.is_show_login_modal
        });
    },
    onAccountInput(e: WechatMiniprogram.Input) {
        this.setData({ login_username_jwxt: e.detail.value, msg_login_jwxt: '' })
    },
    onPasswordInput(e: WechatMiniprogram.Input) {
        this.setData({ login_password_jwxt: e.detail.value, msg_login_jwxt: '' })
    },
    async handleLoginJWXT() {
        if (this.data.is_logging_in) {
            return
        }
        this.setData({ is_logging_in: true })
        // 前端非空校验
        if (!this.data.login_username_jwxt.trim()) {
            this.setData({ xxt_is_error: true, msg_login_jwxt: '请输入账号', is_logging_in: false });
            return;
        }
        if (!this.data.login_password_jwxt.trim()) {
            this.setData({ xxt_is_error: true, msg_login_jwxt: '请输入密码', is_logging_in: false });
            return;
        }

        this.setData({ xxt_is_loading: true, msg_login_jwxt: '' });

        try {
            await login_jwxt(this.data.login_username_jwxt, this.data.login_password_jwxt);
            this.onSwitchShowLoginModal();
            this.setData({ is_logging_in: false })
        } catch (err) {
            let message = '登录失败';
            if (typeof err === 'string') {
                message = err;
            } else if (err instanceof Error) {
                message = err.message;
            } else if (err && (err as any).errMsg) {
                message = (err as any).errMsg;   // 网络错误
            }

            wx.showToast({ title: message, icon: 'none' });
            this.setData({ msg_login_jwxt: message, is_logging_in: false });
            // wx.showToast({ title: err.message, icon: 'none' });
            // this.setData({ msg_login_jwxt: err.message, is_logging_in: false });
        }

    },
    async onTestLogin() {
        // 登录
        const username = ''
        const password = ''
        const encryptedpwd = jsencrypt(password, PUB_KEY_JWXT)

        cookieStore.clearCookies()
        wx.clearStorageSync()

        await request_jwxt({ url: '' })

        const res = await request_jwxt({
            url: API_JWXT.LOGIN,
            method: 'POST',
            header: {
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*',
                // 'Accept-Encoding': 'gzip, deflate, br',
                // 'Accept-Language': 'zh-CN,zh;q=0.9',
                // 'Connection': 'keep-alive',
                // 'Content-Length': '216',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                // 'Host': 'jwxt.hbut.edu.cn',
                'Referer': 'jwxt.hbut.edu.cn'
                //uid=be01fa55-b931-4b13-95dd-f6013e576a1e; route=1a0b45d3f0e96a4fc8cba411a688b509
            },
            data: {
                username: username,
                password: encryptedpwd,
                vcode: '',
            }

        })

        const is_success = /<meta name="format-detection" content="telephone=no,email=no,adress=no">/i.test(res)
        console.log('is success', is_success)
    },
    async onGetSchedule(){
        // 获取学生基本信息
        await get_xs_jbxx()

        // 获取课表
        const jbxx = store.get('xs_jbxx')
        if (!jbxx?.dqxnxq || !jbxx?.id) {
            throw new Error('缺失必要信息，请重新登录')
        }
        get_sdpkkb(jbxx.dqxnxq, jbxx.id)


        // 获取当前周次
        const num = await get_xlzc()
        console.log(num)

        // 获取周次列表
        get_zclist(store.get('xs_jbxx')!.dqxnxq)
    },
    onCleanAll() {
        console.log('clean all')
        wx.clearStorage()
    },
    nop() { }

})