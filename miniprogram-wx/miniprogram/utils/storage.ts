// 假设 IAppData 是全局数据的类型

class Store {
    private state: Partial<IAppData> = {}

    get<K extends keyof IAppData>(key: K): IAppData[K] | undefined {
        if (key in this.state) {
            return this.state[key] as IAppData[K]
        }
        try {
            const value = wx.getStorageSync(key as string)
            if (value !== undefined && value !== '') {
                this.state[key] = value
            }
            return value as IAppData[K]
        } catch (e) {
            console.error(`Store.get('${String(key)}') failed`, e)
            return undefined
        }
    }

    set<K extends keyof IAppData>(key: K, value: IAppData[K]) {
        this.state[key] = value
        try {
            wx.setStorageSync(key as string, value)
        } catch (e) {
            console.error(`Store.set('${String(key)}') failed`, e)
        }
    }

    remove(key: keyof IAppData) {
        delete this.state[key]
        try {
            wx.removeStorageSync(key as string)
        } catch (e) {
            console.error(`Store.remove('${String(key)}') failed`, e)
        }
    }

    clear() {
        this.state = {}
        try {
            wx.clearStorageSync()
        } catch (e) {
            console.error('Store.clear() failed', e)
        }
    }
}

const store = new Store()
export default store