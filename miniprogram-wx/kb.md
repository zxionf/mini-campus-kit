1. 核心课程信息
jxbmc: 教学班名称（Jiào Xué Bān Míng Chēng）。值为 "计算机网络【理论】2478"，表示这是计算机网络课程的理论课教学班。
jxbbh: 教学班编号（Jiào Xué Bān Biān Hào）。值为 "202522478"。
jxbid: 教学班 ID（Jiào Xué Bān ID）。系统内部的唯一标识符。
kcmc: 课程名称（Kè Chéng Míng Chēng）。值为 "计算机网络"，这里包含了前端展示的 HTML 超链接标签。
kcbh: 课程编号（Kè Chéng Biān Hào）。值为 "20302109A"。
kcxz: 课程性质（Kè Chéng Xìng Zhì）。值为 "专业必修课"。
xf: 学分（Xué Fēn）。值为 "2"。
zongxs: 总学时（Zǒng Xué Shí）。值为 "32"。
2. 时间与地点安排
xnxq: 学年学期（Xué Niàn Xué Qī）。值为 "2025-2026-2"，代表 2025-2026 学年第 2 学期。
zc: 周次（Zhōu Cì）。值为 "1-2,5-8"，表示在第 1、2 周以及第 5 到 8 周上课。
zcstr: 周次字符串（Zhōu Cì String）。值为 "1,2,5,6,7,8"，是对 zc 字段的展开，方便前端直接遍历。
xingqi: 星期（Xīng Qī）。值为 3，代表星期三。
djc: 第几节（Dì Jǐ Jié）。值为 1，代表从第 1 节课开始。
djs: 第几节（或 单节数/第几段）。值为 1，通常与 djc 配合表示上课的节次。
croommc: 教室名称（Class Room Míng Chēng)。值为 "2-208"，包含前端跳转链接。
croombh: 教室编号（Class Room Biān Hào)。值为 "2-208"。
croomid: 教室 ID（Class Room ID）。值为 "271"。
jxlmc: 教学楼名称（Jiào Xué Lóu Míng Chēng）。值为 "2教"。
jsxq: 教学校区（Jiào Xué Xiào Qū）。值为 "本部"。
xqid: 校区 ID（Xiào Qū ID）。值为 "1"。
xqmc: 校区名称（Xiào Qū Míng Chēng）。值为 "本部"。
3. 教师与班级信息
tmc: 教师名（Teacher Míng Chēng)。值为 "张群"，包含前端跳转链接。
tid: 教师 ID（Teacher ID）。值为 "19970053"。
jxbzc: 教学班组成（Jiào Xué Bān Zǔ Chéng）。值为 "24软件3,24软件4"，表示该教学班由 24 级软件工程的 3 班和 4 班组成。
bjdm: 班级代码（Bān Jí Dài Mǎ）。值为 "1"。
bjrs: 班级人数（Bān Jí Rén Shù）。值为 "67"。
xkrs: 选课人数（Xuǎn Kè Rén Shù）。值为 67。
4. 系统控制与状态标识
id: 记录唯一标识符（UUID）。
pkid: 排课 ID（Pái Kè ID）。排课模块生成的唯一标识。
type: 类型。通常用于区分课程类型（如理论课、实验课等），这里为 1。
xs: 学时。值为 0，可能表示单次课程的学时，或在此处未直接体现。
rqxl: 日期序列 / 日期下拉（Rì Qī Xù Liè）。值为 "301"，可能是一个内部字典码或时间戳标识。
sfwc: 是否完成（Shì Fǒu Wán Chéng）。值为 0，通常 0 代表未完成或正常状态，1 代表已完成。
zctype: 周次类型（Zhōu Cì Lèi Xíng）。值为 "0"，可能用于区分单双周或自定义周次。
source: 数据来源。值为 "1"，标识该排课数据是手动排课还是自动排课。
flag: 标志位。值为 0，常用于前端标记特殊状态（如是否被选中、是否有冲突等）。
xdxz: 限定性质 / 限定选修（Xiàn Dìng Xìng Zhì）。值为 "1"。
xslx: 学生类型（Xué Shēng Lèi Xíng）。值为 "1"。
fxbz: 辅修标志（Fǔ Xiū Biāo Zhì）。值为 "0"，表示这不是辅修课程。
xdfs: 学分点数 / 选课方式（Xué Fēn Diǎn Shù / Xuǎn Kè Fāng Shì）。值为 "1"。
dszhoupx: 单双周排课（Dān Shuāng Zhōu Pái Kè）。值为 0，表示非单双周限制。
zcdxpx: 周次大小排课（Zhōu Cì Dà Xiǎo Pái Kè）。值为 0，可能用于控制周次排序或显示逻辑。
xsbq: 学生标签（Xué Shēng Biāo Qiān）。值为空字符串，可能用于给特定学生打标签（如重修、免听等）。