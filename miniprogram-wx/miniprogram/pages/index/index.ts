// index.ts

import { raw_list } from "../../any";
import { dates_one_week_at, strip_lable } from "../../utils/util";

// 获取应用实例
// const app = getApp<IAppOption>()

interface RawData {
    kcmc: string;
    tmc: string;
    croommc: string;
    xingqi: number;
    djc: number;
    zcstr: string;
}
interface Course {
    start: number
    end: number
    name: string
    location: string
    day: number
    weeks: number[]
}

Component({
    data: {
        wek: ['一', '二', '三', '四', '五', '六', '日'],
        wek_dates: [''],
        // 节次数，比如12节课
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
        courses: [] as Course[], // 课程数据
        week_num: 0,
        is_show_switch_week_modal: false,
        is_show_course_details_modal: false
    },
    methods: {
        onLoad() {
            // 初始化navbar
            this.init_navbar()
            // 初始化一个空课表
            this.tp_week_to(0)
            // 获取课表原始数据
            const raw_data = JSON.parse(strip_lable(raw_list))
            // 生成课表数据
            this.generate_course(raw_data.data)
            // 显示本周
            this.tp_week_to(10)
            // 设置本周的日期
            this.setData({ wek_dates: dates_one_week_at(new Date()) })
        },

        generate_course(raw_course_list: any) {
            // 清洗数据
            const cleaned = raw_course_list.map((item: RawData) => ({
                name: item.kcmc, location: item.croommc, djc: item.djc, day: item.xingqi - 1, weeks: item.zcstr.split(',').map(Number),
                key: `${item.kcmc}_${item.tmc}_${item.croommc}`
            }))
            // 分组 day + key
            const groups = new Map<string, { day: number; key: String; items: typeof cleaned[0][] }>()
            for (const c of cleaned) {
                const gkey = `${c.day}_${c.key}`
                if (!groups.has(gkey)) groups.set(gkey, { day: c.day, key: c.key, items: [] })
                groups.get(gkey)!.items.push(c)
            }
            // 排序与合并
            const merged: Course[] = [];
            for (const [, group] of groups) {
                // 按节次排序
                group.items.sort((a, b) => a.djc - b.djc);
                // 合并连续节次（同时处理可能出现的周次差异）
                const chunks: { start: number; end: number; items: typeof group.items }[] = [];
                let currentChunk: typeof group.items = [group.items[0]];
                let prev = group.items[0].djc;

                for (let i = 1; i < group.items.length; i++) {
                    const curr = group.items[i];
                    if (curr.djc === prev + 1) {
                        // 连续节次
                        currentChunk.push(curr);
                    } else {
                        // 不连续，保存当前块
                        chunks.push({
                            start: currentChunk[0].djc,
                            end: currentChunk[currentChunk.length - 1].djc,
                            items: currentChunk
                        });
                        currentChunk = [curr];
                    }
                    prev = curr.djc;
                }
                // 最后一个块
                if (currentChunk.length > 0) {
                    chunks.push({
                        start: currentChunk[0].djc,
                        end: currentChunk[currentChunk.length - 1].djc,
                        items: currentChunk
                    });
                }

                // 对每个连续块生成一条 MergedCourse
                // 注意：同一组内可能因为周次不同而有多条记录，我们需要合并周次
                // 比如第1-2节是理论课，第1节周次1-8，第2节周次1-8，合并后周次取交集或并集？一般课表连续节次的周次是一样的，可直接用第一项的周次
                for (const chunk of chunks) {
                    // 取第一个 item 的基本信息（其实都一样）
                    const first = chunk.items[0];
                    // 如果同一块内有多条（例如第一节有理论，第二节有实验？实际上不同key不会在一组），这里直接使用
                    merged.push({
                        name: first.name,
                        // teacher: first.teacher,
                        location: first.location,
                        day: group.day,
                        start: chunk.start,
                        end: chunk.end,
                        weeks: first.weeks,  // 假设连续节次周次相同
                    });
                }
            }
            this.setData({ courses: merged })
            console.log(merged)
        },

        tp_week_to(num: number) {
            const { sectionCount, courses, wek } = this.data;
            // 12 x 7 表格
            const schedule = Array.from({ length: sectionCount }, () => Array(wek.length).fill(null));

            // 先填充 这一步使用课程数据填入表格
            courses.forEach(c => {
                if (c.weeks.includes(num))
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
            this.setData({ schedule: cells });
        },

        init_navbar() {
            // 设置navbar高度
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
        },

        onSwitchToWeek(e: WechatMiniprogram.TouchEvent) {
            const week_number = e.currentTarget.dataset.week_number
            this.tp_week_to(week_number)
            this.setData({ week_num: week_number })
            this.onSwitchShowSwitchWeekModal()
        },
        onShowCourseDetails(e: WechatMiniprogram.TouchEvent) {
            const selected_cell = (e.currentTarget as any).dataset.cell;
            // console.log(selected_cell);
            if(selected_cell.course == null) return
            this.setData({
                is_show_course_details_modal: true,
                selected_course: selected_cell.course
            })
            // console.log(this.data.selected_course)
        },
        onSwitchShowSwitchWeekModal() {
            this.setData({ is_show_switch_week_modal: !this.data.is_show_switch_week_modal })
        },
        onSwitchShowClassDetailsModal() {
            this.setData({ is_show_course_details_modal: !this.data.is_show_course_details_modal })
        },
        nop() {
            console.log('nop tap')
         }
    }
})
