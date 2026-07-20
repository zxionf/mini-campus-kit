export const XXT_AES_KEY: string = 'u2oh6Vu^HWe4_AES'
export const BASE_URL_JWXT: string = 'https://jwxt.hbut.edu.cn'
export const PUB_KEY_JWXT: string = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDcwU0RBrR31L3eHKVGogsJKdr36D3rrjUNaZ77yxxO9HSIojA4jyJylCVALkcu4cK+bbGLpedilJSlcyohso+IBI+A/eAfjS/GhIT/OWEsg8/+YLt+asM8+pdISE/T14tTqg/WDe8nqX48dazB0Izu1ytaPPFRWuYqtUTRpZ7IsQIDAQAB'

export const API_JWXT = {
    LOGIN: '/admin/login',
    get_xs_jbxx: '/admin/xsd/xyjc/getXsjbxx', // 获取学生基本信息 学生端/校园基础/获取学生基本信息
    get_sdpkkb: '/admin/pkgl/xskb/sdpkkbList', // 获取课表 排课管理/学生课表/手动排课课表列表
    get_xlzc: '/admin/api/getXlzc', // 获取当前周次 
    get_zclist: '/admin/api/getZclistByXnxq' // 使用学年学期获取周次列表
} as const;