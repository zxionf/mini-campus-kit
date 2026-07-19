import { API_JWXT, BASE_URL_JWXT } from '../../constants/api'
import store from '../../utils/storage'
import request_jwxt from '../request'


export const get_xs_jbxx = async (): Promise<boolean> => {
    try {
        const res = await request_jwxt({
            url: API_JWXT.get_xs_jbxx,
            method: 'GET',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: {
                referer: BASE_URL_JWXT
            }
        })
        if (res.ret !== 0) throw new Error('get_xs_jbxx请求失败: ' + res.msg)
        store.set('xs_jbxx', { xh: res.data.xh, xm: res.data.xm, id: res.data.id, bjmc: res.data.bjmc, dqxnxq: res.data.dqxnxq })
        return true
    } catch (error) {
        throw error
    }
}