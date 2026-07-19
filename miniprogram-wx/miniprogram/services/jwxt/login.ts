import { API_JWXT, BASE_URL_JWXT, PUB_KEY_JWXT } from '../../constants/api'
import { jsencrypt } from '../../utils/encrypt'
import store from '../../utils/storage'
import request_jwxt from '../request'


export const login_jwxt = async (username: string, password: string): Promise<boolean> => {
    const encryptedpwd = jsencrypt(password, PUB_KEY_JWXT)
    try {
        const res = await request_jwxt({
            url: API_JWXT.LOGIN,
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: {
                username: username,
                password: encryptedpwd,
                referer: BASE_URL_JWXT
            }
        })
        const is_success = /<meta name="format-detection" content="telephone=no,email=no,adress=no">/i.test(res)
        console.log('is success', is_success)
        if (!is_success) throw new Error('账号或密码错误');
        // console.log('logged in jwxt', res)
        const xhid_match = res.match(/<input[^>]*id="xhid"[^>]*value="([^"]*)"/)
        const encodeId_match = res.match(/<input[^>]*id="encodeId"[^>]*value="([^"]*)"/)
        const xhid = xhid_match?.[1] || ''
        const encodeId = encodeId_match?.[1] || ''
        store.set('xhid', xhid)
        store.set('encodeId', encodeId)
        store.set('student_id', username)
        store.set('student_encrpted_pwd', encryptedpwd)
        return true
    } catch (error) {
        throw error
    }
}