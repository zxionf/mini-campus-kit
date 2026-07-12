import { API_JWXT, BASE_URL_JWXT, PUB_KEY_JWXT } from '../../constants/api'
import { jsencrypt } from '../../utils/encrypt'
import store from '../../utils/storage'
import request_jwxt from '../request'


export const login_jwxt = async (username: string, password: string) => {
    const encryptedpwd = jsencrypt(password, PUB_KEY_JWXT)
    try {
        const res = await request_jwxt({
            url: API_JWXT.LOGIN,
            method: 'POST',
            header:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' 
            },
            data: {
                username: username,
                password: encryptedpwd,
                referer: BASE_URL_JWXT
            }
        })
        console.log('logged in jwxt', res)
        store.set('student_id',username)
        store.set('student_encrpted_pwd', encryptedpwd)
        store.set('token_jwxt', res.token)
    }catch(error){
        console.error('教务系统登录请求失败', error);
    }
}