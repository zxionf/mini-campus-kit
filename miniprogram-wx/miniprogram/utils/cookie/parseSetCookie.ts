interface SetCookieOptions {
    name: string
    value: string
    domain?: string
    path?: string
    expires?: Date
    maxAge?: number
    httpOnly?: boolean
    secure?: boolean
    sameSite?: string
}

export function parseSetCookie(setCookieStr: string): SetCookieOptions[] {
    const cookies: SetCookieOptions[] = []
    const parts = setCookieStr.split(',').map(s => s.trim())

    for (const part of parts) {
        const segments = part.split(';').map(s => s.trim())
        const [nameValue, ...attributes] = segments
        const [name, ...valueRest] = nameValue.split('=')
        if (!name) continue

        const cookie: SetCookieOptions = {
            name: name.trim(),
            value: valueRest.join('=').trim(),
        }

        for (const attr of attributes) {
            const [attrName, attrValue] = attr.split('=').map(s => s.trim())
            const key = attrName.toLowerCase()
            switch (key) {
                case 'domain':
                    cookie.domain = attrValue
                    break
                case 'path':
                    cookie.path = attrValue
                    break
                case 'expires':
                    cookie.expires = new Date(attrValue)
                    break
                case 'max-age':
                    cookie.maxAge = parseInt(attrValue, 10)
                    break
                case 'httponly':
                    cookie.httpOnly = true
                    break
                case 'secure':
                    cookie.secure = true
                    break
                case 'samesite':
                    cookie.sameSite = attrValue
                    break
            }
        }

        cookies.push(cookie)
    }
    return cookies
}