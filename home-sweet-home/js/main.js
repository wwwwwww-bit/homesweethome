/* ============ DOM 引用（必须在所有事件监听之前） ============ */
const sanityValueEl = document.getElementById('sanityValue');
const startButton = document.getElementById('startButton');
const startMenu = document.getElementById('startMenu');
const menuShutdown = document.getElementById('menuShutdown');
const fileWord = document.getElementById('fileWord');
const fileEndings = document.getElementById('fileEndings');
const iconMail = document.getElementById('iconMail');
const iconDice = document.getElementById('iconDice');
const mailBadge = document.getElementById('mailBadge');
const mailListDesktop = document.getElementById('mailListDesktop');
const diceWindow = document.getElementById('diceWindow');
const btnRollDice = document.getElementById('btnRollDice');
const diceResult = document.getElementById('diceResult');
const memoList = document.getElementById('memoList');
const memoEditor = document.getElementById('memoEditor');
const memoTextarea = document.getElementById('memoTextarea');
const memoSaveBtn = document.getElementById('memoSaveBtn');
const memoCancelBtn = document.getElementById('memoCancelBtn');
const memoNewBtn = document.getElementById('memoNewBtn');
const officialFloatHint = document.getElementById('officialFloatHint');
const aDialog = document.getElementById('aDialog');
const aDialogText = document.getElementById('aDialogText');
const aDialogOptions = document.getElementById('aDialogOptions');
const aDialogClose = document.getElementById('aDialogClose');
const officialDice = document.getElementById('officialDice');

/* ============ 初始化：首次 UI 刷新 ============ */
updateUI();

/* ============ 结局收集入口（必须独立绑定） ============ */
fileEndings.addEventListener('click', () => {
    const ending1 = ending1Unlocked ? "无奈的近侍" : "？？？";
    const ending2 = ending2Unlocked ? "同事你辛苦啦！" : "？？？";
    const ending3 = ending3Unlocked ? "剩下的事情明天再说吧" : "？？？";
    const ending4 = ending4Unlocked ? "dream sweet dream？" : "？？？";
    const ending5 = ending5Unlocked ? "是惊吓呢" : "？？？";
    showEndingModal(ending1, ending2, ending3, ending4, ending5);
});
// 事件收集入口
document.getElementById('fileEvents').addEventListener('click', () => {
    showEventCollectionModal();
});