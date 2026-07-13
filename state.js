// ============ 随机池（事件2及以后共用） ============
// 普通刀剑池（用于询问刀剑的前两个选项）
const normalSwords = [
    '鸣狐',
    '药研藤四郎',
    '乱藤四郎',
    '前田藤四郎',
    '平野藤四郎',
    '厚藤四郎'
];

// 模糊答复池（用于“不知道/不清楚”）
const vagueReplies = [
    "唔……不太清楚啊。",
    "这事儿我没听说呢。",
    "主君，您是不是太累了？",
    "抱歉，我不太清楚。",
    "嗯？我也不清楚呢？",
    "应该没有。",
];

// 随机抽取两个不同的随机刀
function getTwoRandomSwords() {
    const shuffled = [...normalSwords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
}

// 随机抽取一句模糊答复
function getRandomVagueReply() {
    const index = Math.floor(Math.random() * vagueReplies.length);
    return vagueReplies[index];
}

// ============ 状态 ============
let sanity = 50;
let totalWork = 0;
let totalPlay = 0;
let ending1Unlocked = false;
let ending2Unlocked = false;
let ending3Unlocked = false;
let ending4Unlocked = false;
let ending5Unlocked = false;
let ending6Unlocked = false;
let ending7Unlocked = false;
let ending8Unlocked = false;
let ending9Unlocked = false;
let diceUnlocked = false;      // 骰子是否已解锁（邮件看过）
let diceNotified = false;      // 是否已经收到邮件通知
let lastSanity = 50;  // 记录上次的理智值
let memos = [];
let editingMemoIndex = -1; // -1表示新建，-2表示不编辑
let officialMailReceived = false;      // 官方邮件是否已收到（永久）
let officialMailSigned = false;        // 官方邮件是否已签名
let hasTriggeredOfficialEvent = false; // 本次会话是否已触发过（防止连续触发）
let officialEventSanityAtTrigger = 50;  // 触发官方事件时的理智值
let aDialogPhase = 0; // 0: 未开始, 1: 第一句显示中, 2: 第二句显示中
let playerInitialSword = '';  // 玩家选择的初始刀名字

// 替换初始刀名字
function replaceInitialSword(text) {
    if (!playerInitialSword) return text;
    return text.replace(/初始刀/g, playerInitialSword);
}

let hasBooted = false;        // 是否已经开机过（刷新后重置，要持久化可以加localStorage）

// 事件激活标记（当前谁在前台）
let activeEventId = null;     // 'event1' | 'event2' | 'event3' | 'event4' | 'event5' | null

// 事件触发标记（聊天是否已出现过）
let chatEventShown = false;   // 事件1：聊天已触发
let event2ChatShown = false;  // 事件2：聊天已触发
let event3ChatShown = false;  // 事件3：聊天已触发
let event4ChatShown = false;  // 事件4：聊天已触发
let event5ChatShown = false;  // 事件5：聊天已触发

// 事件完成标记（用于最终结局判定）
let event1Completed = false;   // 事件1是否真正完成
let event2Completed = false;   // 事件2是否真正完成
let event3Completed = false;   // 事件3是否真正完成
let event4Completed = false;   // 事件4是否真正完成
let event5Completed = false;   // 事件5是否真正完成
let event3DiscoveryShown = false; // 事件3：是否已展示“发现鹤丸”弹窗
let event3ChoseDoubt = false;     // 事件3：是否选了“质疑”

// 事件1专用
let nightRaidAsked = false;    // 是否选了“是”

// 事件2专用
let askedMoon = false;          // 是否选过“三日月”
let askSwordRetry = 0;          // 询问刀剑重试次数
let moonFeelingConfirmed = false; // 是否确认“感应”

// ===== 纯游戏结局标志 =====
let pureGameEndingPossible = true;  // 只要有任何非游戏操作，就变成 false
let pureWorkEndingPossible = true;   // 纯工作结局是否还有效

// 事件4专用
let event4Step = 0;
let event4ChoseGood = false;     // 第一个问题选了"好"
let event4SwordChoice = 0;       // 第三个问题：1=髭切/差不多，2=膝丸
let event4Investigated = false;  // 是否选择了一探究竟
let event4AskedWho = '';         // 询问了谁：'一期一振' 或 '髭切' 或 ''
let event4AskedPast = false;     // 是否问了介意的事情

// 事件5专用
let event5Step = 0;
let event5ChoseRecite = false;      // 是否选择了"（深情的朗读）"
let event5Investigated = false;     // 是否点击了"……去问问"且没有选择"算了，还是不去了"
let event5DreamShown = false;       // 梦境弹窗是否已展示过
let event5EndingTriggered = false;  // 是否触发了结局5
let event5SwordChoice = '';         // 选择了哪个选项：'take' 或 'alone'