/* ============ 事件2：三日月宗近聊天（最终版） ============ */

// 聊天弹窗（只负责“开始”，不负责“完成”）
function showEvent2Chat() {
    activeEventId = 'event2';        // ✅ 标记：事件2正在进行
    event2ChatShown = true;          // ✅ 标记：聊天已触发过

    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>💬 三日月宗近</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding:30px;line-height:2;">
                ${replaceInitialSword("主君，最近本丸安静了不少啊。")}<br><br>
                ${replaceInitialSword("初始刀一直在外远征，许久未见了呢？")}<br><br>
                ${replaceInitialSword("老爷爷偶尔也会想念那孩子呢。")}
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // 关闭聊天 = 只关UI，不结束事件
    const closeChat = () => {
        modal.remove();
        // ✅ 什么都不做，保持 activeEventId = 'event2'
    };

    modal.querySelector('.ending-modal-close').onclick = closeChat;
    modal.querySelector('.ending-modal-bg').onclick = closeChat;
}

// 感应疑问弹窗
function showMoonFeelingQuestion() {
    // ✅ 归属检查：只有事件2激活时才允许弹窗
    if (activeEventId !== 'event2') return;

    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>……</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2;">
                ……会不会你在想起三日月的时候，他能感知到你在想他？
                <div style="margin-top:20px;display:flex;gap:15px;justify-content:center;">
                    <button id="moonFeelReal" style="padding:8px 20px;background:#5a8aa3;color:white;border:none;border-radius:6px;cursor:pointer;">万一是真的呢？</button>
                    <button id="moonFeelIllusion" style="padding:8px 20px;background:#555;color:white;border:none;border-radius:6px;cursor:pointer;">错觉吧？</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#moonFeelReal').onclick = () => {
        modal.remove();
        showAskSwordButtonEvent2();
        checkDiceUnlock();
    };

    modal.querySelector('#moonFeelIllusion').onclick = () => {
        sanity = 50;
        sanityValueEl.textContent = sanity;
        modal.remove();
        activeEventId = null;
        event2Completed = true;
        moonFeelingConfirmed = false;
        checkDiceUnlock();
        showFloatHint("你摇了摇头，把这当成错觉。");
    };

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        activeEventId = null;
        event2Completed = true;
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        activeEventId = null;
        event2Completed = true;
    };
}

// 事件2专用：询问刀剑按钮
function showAskSwordButtonEvent2() {
    if (activeEventId !== 'event2') return;

    askSwordRetry = 0;
    const btn = document.createElement('div');
    btn.className = 'ask-sword-btn';
    btn.textContent = '询问刀剑';
    btn.style.cssText = 'position:fixed;bottom:140px;right:30px;background:#5a8aa3;color:white;padding:10px 15px;border-radius:20px;cursor:pointer;z-index:100;';
    document.body.appendChild(btn);

    btn.onclick = () => {
        showAskSwordModalEvent2();
        btn.remove();
    };
}

// 事件2专用：询问刀剑弹窗（含随机池）
function showAskSwordModalEvent2() {
    const randomSwords = getTwoRandomSwords();

    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>询问刀剑</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2;">
                你决定问问看。
                <div style="margin-top:20px;display:flex;flex-direction:column;gap:10px;">
                    <button class="ask-sword-option" data-sword="${randomSwords[0]}">${randomSwords[0]}</button>
                    <button class="ask-sword-option" data-sword="${randomSwords[1]}">${randomSwords[1]}</button>
                    <button class="ask-sword-option" data-sword="三日月宗近">三日月宗近</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // ===== 随机刀的回复弹窗 =====
    const showVagueReplyModal = () => {
        modal.remove(); // 先关询问窗

        const reply = getRandomVagueReply();
        const replyModal = document.createElement('div');
        replyModal.className = 'ending-modal';
        replyModal.style.zIndex = '10001';
        replyModal.innerHTML = `
            <div class="ending-modal-bg"></div>
            <div class="ending-modal-box">
                <div class="ending-modal-header">
                    <span>……</span>
                    <button class="ending-modal-close">×</button>
                </div>
                <div class="ending-modal-body" style="
                    padding:30px;
                    text-align:center;
                    line-height:2;
                    color:#888;
                    font-size:14px;
                ">
                    ${reply}
                </div>
            </div>
        `;
        document.body.appendChild(replyModal);

        const closeReply = () => {
            replyModal.remove();
            activeEventId = null;
            event2Completed = true;
            moonFeelingConfirmed = false; // 否
            sanity = 50;
            sanityValueEl.textContent = sanity;
            showFloatHint("没有得到明确的答复。");
        };

        replyModal.querySelector('.ending-modal-close').onclick = closeReply;
        replyModal.querySelector('.ending-modal-bg').onclick = closeReply;
    };

    // ===== 按钮点击 =====
    modal.querySelectorAll('.ask-sword-option').forEach(btn => {
        btn.style.cssText = `
            padding:10px;
            background:#2a2a4a;
            color:#d4b896;
            border:1px solid #3a3a5a;
            border-radius:6px;
            cursor:pointer;
            font-size:14px;
        `;

        btn.onclick = () => {
            if (btn.disabled) return;

            const sword = btn.dataset.sword;

            // 三日月
            if (sword === '三日月宗近') {
                askedMoon = true;
                moonFeelingConfirmed = true; // 是
                modal.remove();
                showMoonAnswerModal();
                return;
            }

            // 前两个随机刀
            showVagueReplyModal();
        };
    });

    // ===== 询问窗被手动关闭（没选）=====
    const closeAskModal = () => {
        modal.remove();
        activeEventId = null;
        event2Completed = true;
        moonFeelingConfirmed = false;
        sanity = 50;
        sanityValueEl.textContent = sanity;
        showFloatHint("没有询问任何人。");
    };

    modal.querySelector('.ending-modal-close').onclick = closeAskModal;
    modal.querySelector('.ending-modal-bg').onclick = closeAskModal;
}

// 三日月最终答复弹窗
function showMoonAnswerModal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>三日月宗近</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="
                padding:30px;
                text-align:center;
                line-height:2;
                color:#d4b896;
                font-size:15px;
            ">
                哈哈哈哈……嘛，现在不是笑的时候啊。<br><br>
                您既然选择前来询问，想必已经有答案了。<br><br>
                是啊，事实正如您所想那样。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeMoon = () => {
        modal.remove();
        activeEventId = null;
        event2Completed = true;
        sanity = 45;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    };

    modal.querySelector('.ending-modal-close').onclick = closeMoon;
    modal.querySelector('.ending-modal-bg').onclick = closeMoon;
}
// ===== event2.js 最末尾 =====
window.showEvent2Chat        = showEvent2Chat;
window.showMoonFeelingQuestion = showMoonFeelingQuestion;
// 下面这两个是事件2内部调用，保险也挂上
window.showAskSwordButtonEvent2 = showAskSwordButtonEvent2;
window.showAskSwordModalEvent2  = showAskSwordModalEvent2;