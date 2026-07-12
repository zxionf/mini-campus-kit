import Cookie from './Cookie'
import { parseSetCookie } from './parseSetCookie'
import { getCookieScopeDomain, normalizeDomain } from './util'

interface CookieSetOptions {
    domain: string
    path?: string
    expires?: Date
    maxAge?: number
    httpOnly?: boolean
}

class CookieStore {
    private __storageKey: string = '__cookie_store__'
    private __cookiesMap: Map<string, Map<string, Cookie>>

    constructor() {
        this.__cookiesMap = this.__readFromStorage() || new Map()
    }

    has(name: string, domain?: string, path?: string): boolean {
        return this.getCookie(name, domain, path) !== undefined
    }

    get(name: string = '', domain: string = '', path: string = '/'): string | undefined {
        const cookie = this.getCookie(name, domain, path)
        return cookie ? cookie.value : undefined
    }

    set(name: string = '', value: string = '', options: CookieSetOptions): Cookie {
        const domain = options.domain
        if (!domain || !name) throw new Error('name 和 options.domain 值不正确！')

        const cookie = new Cookie(Object.assign(options, { name, value }))

        let cookies = this.__cookiesMap.get(domain) || new Map<string, Cookie>()
        cookies.set(name, cookie)
        this.__cookiesMap.set(domain, cookies)

        this.__saveToStorage()
        return cookie
    }

    dir(): Record<string, Record<string, string>> {
        const dirObj: Record<string, Record<string, string>> = {}
        for (const domain of this.__cookiesMap.keys()) {
            dirObj[domain] = this.getCookies(domain)
        }
        return dirObj
    }

    remove(name: string = '', domain: string = ''): boolean {
        if (domain) {
            let cookies = this.__cookiesMap.get(domain)
            cookies?.delete(name)
            cookies = this.__cookiesMap.get(normalizeDomain(domain))
            cookies?.delete(name)
        } else {
            for (const cookies of this.__cookiesMap.values()) {
                cookies.delete(name)
            }
        }
        this.__saveToStorage()
        return true
    }

    getCookie(name: string = '', domain: string = '', path: string = '/'): Cookie | undefined {
        const scopeDomains = getCookieScopeDomain(domain)
        for (const [key, cookies] of this.__cookiesMap.entries()) {
            if (domain && scopeDomains.indexOf(key) < 0) continue
            const cookie = cookies.get(name)
            if (cookie && cookie.isInPath(path) && !cookie.isExpired()) return cookie
        }
        return undefined
    }

    getCookies(domain?: string, path?: string): Record<string, string> {
        const cookieValues: Record<string, string> = {}
        this.getCookiesArray(domain, path).forEach(cookie => {
            cookieValues[cookie.name] = cookie.value
        })
        return cookieValues
    }

    getCookiesArray(domain: string = '', path: string = '/'): Cookie[] {
        const cookiesArr: Cookie[] = []
        const scopeDomains = getCookieScopeDomain(domain)
        for (const [key, cookies] of this.__cookiesMap.entries()) {
            if (domain && scopeDomains.indexOf(key) < 0) continue
            for (const cookie of cookies.values()) {
                if (cookie.isInPath(path) && !cookie.isExpired()) {
                    cookiesArr.push(cookie)
                }
            }
        }
        return cookiesArr
    }

    setCookiesArray(cookies: Cookie[] = []): Map<string, Map<string, Cookie>> {
        this.__cookiesMap = this.__cookiesMap || new Map()
        cookies.forEach(cookie => {
            let cookieMap = this.__cookiesMap.get(cookie.domain)
            if (!cookieMap) {
                cookieMap = new Map<string, Cookie>()
                this.__cookiesMap.set(cookie.domain, cookieMap)
            }
            cookieMap.set(cookie.name, cookie)
        })
        this.__saveToStorage()
        return this.__cookiesMap
    }

    clearCookies(domain?: string): boolean {
        if (domain) {
            const cookies = this.__cookiesMap.get(domain)
            cookies?.clear()
        } else {
            this.__cookiesMap.clear()
        }
        this.__saveToStorage()
        return true
    }

    getRequestCookies(domain: string, path?: string): string {
        const cookiesArr = this.getCookiesArray(domain, path)
        return this.stringify(cookiesArr)
    }

    setResponseCookies(setCookieStr: string, domain: string): Map<string, Map<string, Cookie>> {
        const parsedCookies = this.parse(setCookieStr, domain)
        return this.setCookiesArray(parsedCookies)
    }

    parse(setCookieStr: string = '', domain?: string): Cookie[] {
        const cookies = parseSetCookie(setCookieStr)
        return cookies.map(item => {
            item.domain = normalizeDomain(item.domain) || domain
            return new Cookie(item)
        })
    }

    stringify(cookies: Cookie[]): string {
        return cookies.map(item => item.toString()).join('; ')
    }

    private __saveToStorage(): void {
        try {
            const saveCookies: Cookie[] = []
            for (const cookies of this.__cookiesMap.values()) {
                for (const cookie of cookies.values()) {
                    if (cookie.isExpired()) {
                        cookies.delete(cookie.name)
                    } else if (cookie.isPersistence()) {
                        saveCookies.push(cookie)
                    }
                }
            }
            wx.setStorageSync(this.__storageKey, saveCookies)
        } catch (err) {
            console.warn('Cookie 存储异常：', err)
        }
    }

    private __readFromStorage(): Map<string, Map<string, Cookie>> | undefined {
        try {
            const cookies: any[] = wx.getStorageSync(this.__storageKey) || []
            const cookieObjs = cookies.map((item: any) => new Cookie(item))
            return this.setCookiesArray(cookieObjs)
        } catch (err) {
            console.warn('Cookie 读取异常：', err)
            return undefined
        }
    }
}

export default CookieStore