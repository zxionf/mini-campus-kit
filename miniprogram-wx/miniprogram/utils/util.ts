export const formatTime = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return (
        [year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':')
    )
}

const formatNumber = (n: number) => {
    const s = n.toString()
    return s[1] ? s : '0' + s
}

// 获取time所在周的所有日期
export const dates_one_week_at = (time: Date): string[] => {
    const day = time.getDay();
    const monday = new Date(time);
    monday.setDate(time.getDate() - (day === 0 ? 6 : day - 1));

    const dates: string[] = [];
    for (let i = 0; i < 7; i++) {
        const current = new Date(monday);
        current.setDate(monday.getDate() + i);
        dates.push(date_MMDD(current));
    }
    return dates;
}

// 格式化为月.日
const date_MMDD = (time: Date): string => { 
    const month = time.getMonth() + 1; // 月份从0开始
    const date = time.getDate();
    return `${month}.${date}`;
}

// 去除html中的标签，保留标签之间的数据
// 用于对课表返回数据的处理
// 例
// "croommc": "<a href=\"javascript:void(0);\">2-208</a>",
// to
// "croommc": "2-208",
export const strip_lable = (raw: string): string => {
    return raw.replace(/<[^>]*>/g, '').trim();
}
