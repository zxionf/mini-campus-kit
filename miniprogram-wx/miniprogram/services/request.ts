// services/request.ts
import { BASE_URL_JWXT } from '../constants/api';

interface RequestOptions {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    header?: any;
}

const request_jwxt = <T = any>(options: RequestOptions): Promise<T> => {
    // const cookie_store = cook
    return new Promise((resolve, reject) => {
        wx.request({
            url: BASE_URL_JWXT + options.url,
            method: options.method || 'GET',
            data: options.data,
            header: {
                ...options.header,
            },
            success(res: any) {
                console.log(res.header)
                if (res.statusCode === 200) {
                    resolve(res.data as T);
                } else {
                    reject(res);
                }
            },
            fail(err) {
                reject(err);
            },
        });
    });
};

export default request_jwxt;