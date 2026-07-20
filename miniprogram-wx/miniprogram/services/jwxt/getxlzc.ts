import { API_JWXT } from '../../constants/api'
import store from '../../utils/storage'
import request_jwxt from '../request'


export const get_xlzc = async (): Promise<number> => {
    try {
        const res = await request_jwxt({
            url: API_JWXT.get_xlzc,
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: {}
        })
        console.log(res)
        if (res.ret !== 0) throw new Error('get_xs_xlzc请求失败: ' + res.msg)
        // store.set('xs_jbxx', { xh: res.data.xh, xm: res.data.xm, id: res.data.id, bjmc: res.data.bjmc, dqxnxq: res.data.dqxnxq })
        return Number(res.data.xlzc)
    } catch (error) {
        throw error
    }
}