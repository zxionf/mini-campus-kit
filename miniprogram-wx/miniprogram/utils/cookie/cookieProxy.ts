import CookieStore from './CookieStore'

const cookieStore = (function () {
    const cookieStore = new CookieStore()

    function cookieRequestProxy(this: any, options: any): any {
        options.cookie = options.cookie === undefined || !!options.cookie
        options.dataType = options.dataType || 'json'
        options.header = options.headers = options.header || options.headers || {}
        options.header['X-Requested-With'] = 'XMLHttpRequest'
        if (options.dataType === 'json') {
            options.header['Accept'] = 'application/json, text/plain, */*'
        }

        if (options.cookie) {
            const domain: string = (options.url || '').split('/')[2]
            const path: string = options.url.split(domain).pop()

            const requestCookies = cookieStore.getRequestCookies(domain, path)
            options.header['Cookie'] = requestCookies

            const successCallback = options.success
            options.success = function (response: any) {
                response.header = response.header || response.headers || {}
                let responseCookies = response.header ? response.header['Set-Cookie'] || response.header['set-cookie'] : ''
                if (responseCookies) {
                    responseCookies = responseCookies.toString().replace(/\;([^\s\;]*?(?=\=))/ig, ',$1')
                    cookieStore.setResponseCookies(responseCookies, domain)
                }
                successCallback && successCallback(response)
            }
        }

        
        return this(options)
    }

    const requestProxy = cookieRequestProxy.bind(wx.request)
    const uploadFileProxy = cookieRequestProxy.bind(wx.uploadFile)
    const downloadFileProxy = cookieRequestProxy.bind(wx.downloadFile)

    try {
        Object.defineProperties(wx, {
            requestWithCookie: { value: requestProxy },
            uploadFileWithCookie: { value: uploadFileProxy },
            downloadFileWithCookie: { value: downloadFileProxy }
        })
        Object.defineProperties(wx, {
            request: { value: requestProxy },
            uploadFile: { value: uploadFileProxy },
            downloadFile: { value: downloadFileProxy }
        })
    } catch (err) {
        console.error('weapp-cookie: ', err)
    }


    (cookieStore as any).config = function (options: any) {
        options = Object.assign({
            requestAlias: 'requestWithCookie',
            uploadFileAlias: 'uploadFileWithCookie',
            downloadFileAlias: 'downloadFileWithCookie'
        }, options)
        if (options.requestAlias) {
            Object.defineProperty(wx, options.requestAlias, { value: requestProxy })
        }
        if (options.uploadFileAlias) {
            Object.defineProperty(wx, options.uploadFileAlias, { value: uploadFileProxy })
        }
        if (options.downloadFileAlias) {
            Object.defineProperty(wx, options.downloadFileAlias, { value: downloadFileProxy })
        }
    }

    return cookieStore
})()

export default cookieStore