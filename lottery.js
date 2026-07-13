/* ============ 抽奖小游戏 ============ */
const lotterySentences = [
    "和我签订契约成为马猴烧酒吧！……哎呀开个玩笑。",
    "这个小游戏是彩蛋和提示的合集哦。",
    "你问骰子？哎呀理智太低就很容易被动过灵感啦。",
    "其实我没设置电脑密码（嘻嘻）",
    "理智值究竟是高一点好，还是低一点好呢？",
    "真相是一种美丽又可怕的东西，需要格外谨慎地对待。",
    "有些事情，一直是秘密反而更好吧。实休总是这么说",
    "据说梦见付丧神相关的事情，一定程度上是真实的？",
    "不好好休息，被逮到了就有可能会被强制休息哦（直白一点就是自动回复理智）",
    "文件写了一半，剩下的明天再说吧……",
    "悄咪咪告诉你，这个本丸的鹤丸国永是极化99……当然如果你喜欢极开花199也行",
    "有人悄悄在你桌上放了点心。光忠特制——牡丹饼——",
    " 恭喜该本丸获得时政“十佳本丸”荣誉称号——",
    "肯定有人直奔关机键。好了好了恭喜你收集的结局加一。",
    "手合场预约十二卷，卷卷有鹤名……不是这是什么很值得骄傲的事情吗？？",
    "咪咪为什么他们叫你丧彪？",
    "“汝身寄于吾下，吾命交予汝剑。”等下等下你在读什么……",
    "三日月宗近对你说的都是实话，请相信他。……你说你不相信？",
    "初始刀为什么一直一直都在远征呢？",
    "这个本丸审神者非常喜欢安宅切（假的）",
    "这个本丸审神者非常喜欢极化髭切毛绒绒的大领子（这也是假的）",
    "只工作，不玩耍，聪明杰克也变傻。"
];

/* ============ 抽奖小游戏弹窗 ============ */
function showLotteryModal() {
    const modal = document.createElement('div');
    modal.className = 'lottery-modal';
    modal.innerHTML = `
        <div class="lottery-modal-bg"></div>
        <div class="lottery-modal-box">
            <div class="lottery-modal-header">
                <span>每日一抽</span>
                <button class="lottery-modal-close">×</button>
            </div>
            <div class="lottery-modal-body">
                <div class="lottery-result" id="lotteryResult">
                    点击按钮抽取今日运势
                </div>
                <button class="lottery-draw-btn" id="lotteryDrawBtn">
                    抽取
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // 关闭按钮
    modal.querySelector('.lottery-modal-close').addEventListener('click', () => {
        modal.remove();
    });
    modal.querySelector('.lottery-modal-bg').addEventListener('click', () => {
        modal.remove();
    });

    // 抽取按钮
    modal.querySelector('#lotteryDrawBtn').addEventListener('click', () => {
        const resultEl = modal.querySelector('#lotteryResult');
        const randomIndex = Math.floor(Math.random() * lotterySentences.length);
        const sentence = lotterySentences[randomIndex];

        resultEl.style.opacity = '0';
        setTimeout(() => {
            resultEl.textContent = sentence;
            resultEl.style.opacity = '1';
        }, 200);
    });
}