// services/request.ts
import { BASE_URL_JWXT } from '../constants/api';

interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: any;
}

const request_jwxt = <T = any>(options: RequestOptions): Promise<T> => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL_JWXT + options.url,
      method: options.method || 'GET',
      data: options.data,
      header: {
        // 'content-type': 'application/json',
        ...options.header,
      },
      success(res: any) {
        if (res.statusCode === 200) {
          resolve(res.data as T);
        } else {
          reject(res);
        }
      },
      fail(err) {
        wx.showToast({ title: '网络异常', icon: 'none' });
        reject(err);
      },
    });
  });
};

export default request_jwxt;