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
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0',
                // 'Referer': BASE_URL_JWXT+'/',
                // 'Origin': BASE_URL_JWXT,
                // 'Host':'jwxt.hbut.edu.cn'

            },
            data: {
                username: username,
                password: encryptedpwd,
                
            }
        })
        console.log(res)
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