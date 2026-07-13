/* ============ 事件3：鹤与一期手合 ============ */

// 在 event3.js 顶部添加一个自定义提示函数
function showEvent3MailHint(text) {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        bottom: 120px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(90, 74, 58, 0.95);
        color: #d4b896;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 15px;
        z-index: 1000;
        pointer-events: none;
        animation: fadeInSanity40 0.3s ease;
    `;
    hint.textContent = text;
    document.body.appendChild(hint);

    setTimeout(() => {
        hint.style.opacity = '0';
        hint.style.transition = 'opacity 0.5s ease';
        setTimeout(() => hint.remove(), 500);
    }, 2000);
}

// 事件3入口：触发邮件
function showEvent3Chat() {
    activeEventId = 'event3';
    event3ChatShown = true;
    event3DiscoveryShown = false;

    // 只点亮红点，不自动打开邮箱
    document.getElementById('mailBadge').classList.remove('hidden');
    showEvent3MailHint("📬 你收到一封新邮件");

}
function showEvent3FloatHint(text) {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        bottom: 120px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(90, 74, 58, 0.95);
        color: #d4b896;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 15px;
        z-index: 1000;
        pointer-events: none;
        animation: fadeInSanity40 0.3s ease;
    `;
    hint.textContent = text;
    document.body.appendChild(hint);

    setTimeout(() => {
        hint.style.opacity = '0';
        hint.style.transition = 'opacity 0.5s ease';
        setTimeout(() => hint.remove(), 500);
    }, 2000);
}

// 发现鹤丸弹窗
function showEvent3DiscoveryModal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>发现</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2;">
                你看完附件后发现鹤丸躺手入室了。<br><br>
                你去探望了一下，鹤丸趴池子边上可怜巴巴的看着你，
                询问之后得知是跟一期一振切磋的时候被误伤了。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModal = () => {
        modal.remove();
        event3DiscoveryShown = true;
                checkDiceUnlock();         // ✅ 确保骰子有机会
    };

    modal.querySelector('.ending-modal-close').onclick = closeModal;
    modal.querySelector('.ending-modal-bg').onclick = closeModal;
}

// 质疑弹窗
function showEvent3DoubtModal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>……</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2;">
                等一下。你没记错的话，鹤丸国永已经极化满级了吧？
                <div style="margin-top:20px;display:flex;gap:15px;justify-content:center;">
                    <button id="choiceDoubt" style="padding:8px 20px;background:#5a8aa3;color:white;border:none;border-radius:6px;cursor:pointer;">这真是被一期误伤了？？</button>
                    <button id="choiceScout" style="padding:8px 20px;background:#555;color:white;border:none;border-radius:6px;cursor:pointer;">哎呀太刀侦查嘛。</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#choiceDoubt').onclick = () => {
        modal.remove();
        event3ChoseDoubt = true;
        showEvent3InvestigateButton();
    };
    modal.querySelector('#choiceScout').onclick = () => {
        modal.remove();
        activeEventId = null;
        event3Completed = true;
        event3ChoseDoubt = false;
        sanity = 50;
        sanityValueEl.textContent = sanity;
        showFloatHint("你决定不多管闲事。");
    };
    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        activeEventId = null;
        event3Completed = true;
        event3ChoseDoubt = false;
        sanity = 50;
        sanityValueEl.textContent = sanity;
    };
}

// 一探究竟按钮
function showEvent3InvestigateButton() {
    if (activeEventId !== 'event3') return;
    const oldBtn = document.querySelector('.event3-investigate-btn');
    if (oldBtn) oldBtn.remove();
    const btn = document.createElement('div');
    btn.className = 'event3-investigate-btn';
    btn.textContent = '好奇的审神者准备一探究竟';
    btn.style.cssText = 'position:fixed;bottom:180px;right:30px;background:#5a8aa3;color:white;padding:10px 15px;border-radius:20px;cursor:pointer;z-index:100;font-size:14px;';
    document.body.appendChild(btn);
    btn.onclick = () => { btn.remove(); showEvent3TruthModal(); };
}

// 真相弹窗
function showEvent3TruthModal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>真相</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2;">
                好奇的审神者打探到了真相！<br><br>
                居然是鹤丸约的一期半夜去手合，
                结果俩刃打急眼飚起了垃圾话（由于无法过审这里屏蔽），<br><br>
                飚的时候一期“不小心”提到了主的过去，
                可怜被吓到的鹤丸就这么挨打了，<br><br>
                真是可悲可泣，可口可乐。（可口可乐广告位招租）
                <br><br><small>（语言组织来自万能的iny老师）</small>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').addEventListener('click', () => {
        modal.remove();
        activeEventId = null;
        event3Completed = true;
        sanity = 55;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();         // ✅ 确保骰子有机会
    });
}
// ===== event3.js 最末尾 =====
window.showEvent3Chat       = showEvent3Chat;
window.showEvent3DoubtModal = showEvent3DoubtModal;
window.showEvent3DiscoveryModal = showEvent3DiscoveryModal;
window.showEvent3InvestigateButton = showEvent3InvestigateButton;
window.showEvent3TruthModal  = showEvent3TruthModal;
window.showEvent3FloatHint = showEvent3FloatHint;