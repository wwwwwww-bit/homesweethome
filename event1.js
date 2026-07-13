/* ============ 事件1：好友聊天（最终版） ============ */

// 聊天弹窗（只负责“开始”，不负责“完成”）
function showEvent1Chat() {
    activeEventId = 'event1';
    chatEventShown = true;

    const chat = document.createElement('div');
    chat.className = 'event1-chat';
    chat.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 30px;
        width: 340px;
        z-index: 10000;
        font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
    `;

    chat.innerHTML = `
        <div style="display:flex;align-items:flex-end;gap:8px;margin-bottom:6px;">
            <div style="
                width:42px;height:42px;border-radius:50%;
                background:linear-gradient(135deg,#5a8aa3,#3a5a7a);
                display:flex;align-items:center;justify-content:center;
                font-size:22px;color:#fff;flex-shrink:0;
            ">👤</div>
            <div style="font-size:12px;color:#aaa;">好友</div>
        </div>

        <div class="chat-bubble" style="
            background:#2a2a4a;
            color:#d4b896;
            padding:14px 16px;
            border-radius:14px 14px 4px 14px;
            line-height:1.8;
            font-size:14px;
            box-shadow:0 4px 12px rgba(0,0,0,.35);
        ">
            <p>诶，你看到那篇同人了吗？</p>
            <p>就是讲夜袭的那篇，笑死我了哈哈哈哈</p>
            <p>分享给你看看 → [链接]</p>
        </div>

        <div style="text-align:right;margin-top:6px;">
            <button class="chat-close" style="
                background:none;border:none;color:#666;
                font-size:12px;cursor:pointer;
            ">关闭</button>
        </div>
    `;

    document.body.appendChild(chat);

    // ✅ 关键修复：只关 UI，不结束事件
    const closeChat = () => {
        chat.remove();
        // activeEventId 保持 'event1'
    };

    chat.querySelector('.chat-close').onclick = closeChat;
}

// 夜袭疑问弹窗
function showNightRaidQuestion() {
    // ✅ 只有事件1激活时才弹
    if (activeEventId !== 'event1') return;

    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>灵光一现</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2;">
                ……该不会自家也有夜袭的事情吧？
                <div style="margin-top:20px;display:flex;gap:15px;justify-content:center;">
                    <button id="nightRaidYes" style="padding:8px 20px;background:#5a8aa3;color:white;border:none;border-radius:6px;cursor:pointer;">要不问问？</button>
                    <button id="nightRaidNo" style="padding:8px 20px;background:#555;color:white;border:none;border-radius:6px;cursor:pointer;">别胡思乱想了……</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#nightRaidYes').onclick = () => {
        nightRaidAsked = true;
        modal.remove();
        showAskSwordButton(); // 只出按钮，不改理智
    };

    modal.querySelector('#nightRaidNo').onclick = () => {
        sanity = 50;
        sanityValueEl.textContent = sanity;
        modal.remove();
        activeEventId = null;
        event1Completed = true;
        showFloatHint("算了，不想了。");
    };

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        activeEventId = null;
        event1Completed = true;
    };
}

// 询问刀剑按钮
function showAskSwordButton() {
    // ✅ 只属于事件1
    if (activeEventId !== 'event1') return;

    // ✅ 防止重复创建
    const oldBtn = document.querySelector('.ask-sword-btn');
    if (oldBtn) oldBtn.remove();

    const btn = document.createElement('div');
    btn.className = 'ask-sword-btn';
    btn.textContent = '询问刀剑';
    btn.style.cssText = `
        position: fixed;
        bottom: 140px;
        right: 30px;
        background: #5a8aa3;
        color: white;
        padding: 10px 15px;
        border-radius: 20px;
        cursor: pointer;
        z-index: 100;
        font-size: 14px;
    `;
    document.body.appendChild(btn);

    btn.onclick = () => {
        showAskSwordResult();
        btn.remove();
    };
}

// 询问结果弹窗
function showAskSwordResult() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>询问结果</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2;">
                得到了肯定的答复。不过比起"夜袭“，你更愿意称为”夜访“或者”守夜“。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeResult = () => {
        // ✅ 归属保护：只有事件1能结算这个理智
        if (activeEventId !== 'event1') {
            modal.remove();
            return;
        }

        modal.remove();
        activeEventId = null;
        event1Completed = true;
        sanity = 45; // ✅ 事件1结束，理智结算
        checkDiceUnlock();
        sanityValueEl.textContent = sanity;
    };

    modal.querySelector('.ending-modal-close').onclick = closeResult;
    modal.querySelector('.ending-modal-bg').onclick = closeResult;
}
// event1.js 末尾追加 ↓
window.showEvent1Chat      = showEvent1Chat;
window.showNightRaidQuestion = showNightRaidQuestion;  // 你已有这行也可保留
window.showAskSwordButton  = showAskSwordButton;
window.showAskSwordResult  = showAskSwordResult;