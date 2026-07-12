// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Component({
    data: {
        wek: ['一', '二', '三', '四', '五', '六', '日'],
        // 节次数，比如12节课（上午4节，下午4节，晚上3节？可以按实际调整）
        sectionCount: 12,
        course_time: [
            ['08:20', '09:05'],
            ['09:10', '09:55'],
            ['10:15', '11:00'],
            ['11:05', '11:50'],
            ['14:00', '14:45'],
            ['14:50', '15:35'],
            ['15:55', '16:40'],
            ['16:45', '17:30'],
            ['18:30', '19:15'],
            ['19:20', '20:05'],
            ['20:10', '20:55'],
            ['', '21:20']],

        // 课程数据：每条记录有 day(0-6), start(起始节), end(结束节), name, room, weeks
        courses: [
            { day: 0, start: 1, end: 2, name: '高等数学', room: '教1-101', weeks: '1-16周' },
            { day: 1, start: 3, end: 4, name: '大学英语', room: '外院301', weeks: '1-16周' },
            { day: 2, start: 5, end: 6, name: 'C++程序设计', room: '机房B2', weeks: '1-8周' },
            { day: 0, start: 7, end: 8, name: '马原', room: '教2-205', weeks: '1-16周双周' },
            // ... 其他课程
        ]
    },
    methods: {
        onLoad() {
            const { sectionCount, courses, wek } = this.data;
            const schedule = Array.from({ length: sectionCount }, () => Array(wek.length).fill(null));

            // 先填充
            courses.forEach(c => {
                for (let s = c.start; s <= c.end; s++) {
                    schedule[s - 1][c.day] = c;
                }
            });

            // 再计算每个格子的可见性与跨行高度
            const cells = schedule.map((row, secIndex) =>
                row.map((course, dayIndex) => {
                    if (!course) return { visible: true, rowspan: 1, course: null };
                    // 判断自己是不是这一门课的起始节
                    if (secIndex === 0 || schedule[secIndex - 1][dayIndex] !== course) {
                        // 是起始节，计算跨几节
                        let span = 1;
                        while (secIndex + span < sectionCount && schedule[secIndex + span][dayIndex] === course) {
                            span++;
                        }
                        return { visible: true, rowspan: span, course };
                    } else {
                        return { visible: false, course };
                    }
                })
            );
            this.setData({ schedule: cells, wek });

            // const systemInfo = wx.getSystemInfoSync();
            // const statusBarHeight = systemInfo.statusBarHeight;
            // const menuButtonInfo = wx.getMenuButtonBoundingClientRect();

            // // 胶囊按钮与顶部的距离
            // const gap = menuButtonInfo.top - statusBarHeight;
            // // 整个导航栏高度 = 状态栏高 + 胶囊按钮高 + 上下边距
            // const navBarHeight = statusBarHeight + menuButtonInfo.height + gap * 2;

            // const sysInfo = wx.getSystemInfoSync();
            // // const navBarHeight = sysInfo.statusBarHeight + 44; // 状态栏+导航栏
            // console.log(sysInfo.windowHeight - navBarHeight)
            // this.setData({
            //     scrollHeight: (sysInfo.windowHeight - navBarHeight) + 'px'
            // });
            const systemInfo = wx.getSystemInfoSync();
            const statusBarHeight = systemInfo.statusBarHeight;
            const menuButtonInfo = wx.getMenuButtonBoundingClientRect();

            // 胶囊按钮与顶部的距离
            const gap = menuButtonInfo.top - statusBarHeight;
            // 整个导航栏高度 = 状态栏高 + 胶囊按钮高 + 上下边距
            const navBarHeight = statusBarHeight + menuButtonInfo.height + gap * 2;

            this.setData({
                statusBarHeight,
                navBarHeight,
                menuButtonWidth: menuButtonInfo.width,
                menuButtonRight: systemInfo.windowWidth - menuButtonInfo.right
            });
        }

    },
})
