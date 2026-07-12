import { parseSetCookie } from './parseSetCookie'
import { getCookieScopeDomain } from './util'

interface CookieProps {
    name?: string
    value?: string
    domain?: string
    path?: string
    expires?: string | number | Date
    maxAge?: string | number
    httpOnly?: boolean
    dateTime?: string | number | Date
}

class Cookie {
    name: string
    value: string
    domain: string
    path: string
    expires: Date | null
    maxAge: number | null
    httpOnly: boolean
    dateTime: Date

    constructor(props: CookieProps = {}) {
        this.name = props.name || ''
        this.value = props.value || ''
        this.domain = props.domain || ''
        this.path = props.path || '/'
        this.expires = props.expires ? new Date(props.expires) : null
        this.maxAge = props.maxAge ? parseInt(String(props.maxAge)) : null
        this.httpOnly = !!props.httpOnly
        this.dateTime = props.dateTime ? new Date(props.dateTime) : new Date()
    }

    set(setCookieStr: string = ''): this {
        const cookie = parseSetCookie(setCookieStr)
        if (cookie) {
            Object.assign(this, cookie)
            this.dateTime = new Date()
        }
        return this
    }

    merge(cookie: Cookie): this {
        return Object.assign(this, cookie)
    }

    isExpired(): boolean {
        if (this.maxAge === 0) {
            return true
        }
        if (this.maxAge && this.maxAge > 0) {
            const seconds = (Date.now() - this.dateTime.getTime()) / 1000
            return seconds > this.maxAge
        }
        if (this.expires && this.expires < new Date()) {
            return true
        }
        return false
    }

    isPersistence(): boolean {
        return this.maxAge ? this.maxAge > 0 : true
    }

    isInDomain(domain: string): boolean {
        const scopeDomains = getCookieScopeDomain(domain)
        return scopeDomains.indexOf(this.domain) >= 0
    }

    isInPath(path: string): boolean {
        return path.indexOf(this.path) === 0 || this.path.replace(/\/$/, '') === path
    }

    toString(): string {
        return [this.name, this.value].join('=')
    }
}

export default Cookie