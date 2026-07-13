/* ============ 事件4：回忆与定时邮件（聊天版） ============ */

function showEvent4Chat() {
    activeEventId = 'event4';
    event4ChatShown = true;
    event4Step = 0;
    event4ChoseGood = false;
    event4SwordChoice = 0;
    event4Investigated = false;
    event4AskedWho = '';
    event4AskedPast = false;

    showEvent4ChatMessage();
}

// ===== 好友聊天（点一下出下一条）=====
function showEvent4ChatMessage() {
    const oldChat = document.querySelector('.event4-chat');
    if (oldChat) oldChat.remove();

    const chat = document.createElement('div');
    chat.className = 'event4-chat';
    chat.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 30px;
        width: 340px;
        z-index: 10000;
        font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
    `;

    let content = '';
    let showOptions = false;
    let options = [];

    switch (event4Step) {
        case 0:
            content = '"亲爱的！和我签订契约成为马猴烧酒吧！"';
            showOptions = true;
            options = ['好！', '？'];
            break;
        case 1:
            content = '"嘿嘿"';
            showOptions = false;
            break;
        case 2:
            content = '"下一个问题！你更喜欢弟弟丸还是哥哥切！"';
            showOptions = true;
            options = ['弟弟丸！', '哥哥切！', '差不多吧？'];
            break;
        case 3:
            content = '"啧啧啧"';
            showOptions = false;
            break;
        case 4:
            content = '"那你更相信哪个呢？"';
            showOptions = true;
            options = ['膝丸吧？', '髭切吧？', '差不多？', '……'];
            break;
        case 5:
            content = '"这样吗？"';
            showOptions = false;
            break;
        case 6:
            chat.remove();
            showEvent4MailHint();
            return;
    }

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
            border-radius:14px 14px 14px 4px;
            line-height:1.8;
            font-size:14px;
            box-shadow:0 4px 12px rgba(0,0,0,.35);
            cursor:pointer;
            min-height:50px;
        ">
            <p>${content}</p>
            ${showOptions ? `
                <div style="margin-top:15px;display:flex;flex-direction:column;gap:8px;">
                    ${options.map((opt, idx) => `
                        <button class="event4-chat-option" data-index="${idx}" style="
                            padding:8px 16px;
                            background:#3a3a5a;
                            color:#d4b896;
                            border:1px solid #5a5a7a;
                            border-radius:6px;
                            cursor:pointer;
                            font-size:13px;
                            font-family:inherit;
                            text-align:left;
                            width:100%;
                        ">${opt}</button>
                    `).join('')}
                </div>
            ` : `
                <div style="text-align:right;margin-top:6px;">
                    <button class="chat-next-btn" style="
                        background:none;border:none;color:#666;
                        font-size:12px;cursor:pointer;
                    ">点击继续 →</button>
                </div>
            `}
        </div>
    `;

    document.body.appendChild(chat);

    chat.querySelectorAll('.event4-chat-option').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.background = '#4a4a6a';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = '#3a3a5a';
        });
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index);
            handleEvent4ChatChoice(idx, chat);
        });
    });

    const nextBtn = chat.querySelector('.chat-next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            chat.remove();
            event4Step++;
            showEvent4ChatMessage();
        });
    }

    const bubble = chat.querySelector('.chat-bubble');
    if (!showOptions) {
        bubble.addEventListener('click', (e) => {
            if (e.target.closest('.chat-next-btn')) return;
            chat.remove();
            event4Step++;
            showEvent4ChatMessage();
        });
    }
}

function handleEvent4ChatChoice(idx, chat) {
    const step = event4Step;

    if (step === 0) {
        if (idx === 0) event4ChoseGood = true;
        chat.remove();
        event4Step = 1;
        showEvent4ChatMessage();
        return;
    }

    if (step === 2) {
        chat.remove();
        event4Step = 3;
        showEvent4ChatMessage();
        return;
    }

    if (step === 4) {
        if (idx === 0) {
            event4SwordChoice = 2;  // 膝丸
        } else {
            event4SwordChoice = 1;  // 髭切或差不多或……
        }
        chat.remove();
        event4Step = 5;
        showEvent4ChatMessage();
        return;
    }
}

// ===== 定时邮件提示 =====
function showEvent4MailHint() {
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
    hint.textContent = "📬 你有一封定时邮件";
    document.body.appendChild(hint);

    setTimeout(() => {
        hint.style.opacity = '0';
        hint.style.transition = 'opacity 0.5s ease';
        setTimeout(() => hint.remove(), 500);
    }, 2000);

    document.getElementById('mailBadge').classList.remove('hidden');
}

// ===== 邮件查看器 =====
function showEvent4EmailViewer(mailItem) {
    const viewer = document.createElement('div');
    viewer.className = 'email-viewer';
    viewer.innerHTML = `
        <div class="email-viewer-header">
            <div class="email-viewer-title">【定时邮件】纪念日快乐！</div>
            <button class="email-viewer-close">×</button>
        </div>
        <div class="email-viewer-body" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;line-height:2.5;">
            <p>纪念日快乐！</p>
            <p style="color:#666;font-size:12px;">发件人：我 · 五年前</p>
        </div>
    `;
    document.body.appendChild(viewer);

    viewer.querySelector('.email-viewer-close').addEventListener('click', () => {
        viewer.remove();
        if (mailItem) mailItem.classList.remove('unread');
        showEvent4MemoryModal();
    });
}

// ===== 记忆弹窗1 =====
function showEvent4MemoryModal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>……</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                你恍恍惚惚想起你五年前好像拥有另一个本丸，<br>
                但在一年后某场意外里，这个本丸与时政失去了联络，了无音讯。<br><br>
                在时政的安排下，你重新建立了现在这个本丸。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        showEvent4MemoryModal2();
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        showEvent4MemoryModal2();
    };
}

// ===== 记忆弹窗2 =====
function showEvent4MemoryModal2() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>……</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                你依稀还记得过去那振温和的一期尼，以及笑眯眯的髭切。<br><br>
                也不知道那个本丸的刃最后怎么样了……<br><br>
                你叹了口气。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        checkDiceUnlock();
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        checkDiceUnlock();
    };
}

// ===== 低理智提示 =====
function showEvent4FloatHint(text) {
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

// ===== 质疑弹窗（合并提示词） =====
function showEvent4DoubtModal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>……</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                <p style="margin-bottom:20px;">等一下。你没记错的话，你现在本丸里的一期一振并不是锻刀炉显现的。髭切也是。</p>
                <div style="display:flex;gap:15px;justify-content:center;">
                    <button id="event4DoubtYes" style="padding:8px 20px;background:#5a8aa3;color:white;border:none;border-radius:6px;cursor:pointer;">该不会是同一振吧？？</button>
                    <button id="event4DoubtNo" style="padding:8px 20px;background:#555;color:white;border:none;border-radius:6px;cursor:pointer;">（仅仅只是想到）</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#event4DoubtYes').onclick = () => {
        modal.remove();
        event4Investigated = true;
        showEvent4InvestigateButton();
    };

    modal.querySelector('#event4DoubtNo').onclick = () => {
        modal.remove();
        activeEventId = null;
        event4Completed = true;
        event4Investigated = false;
        sanity = 50;
        sanityValueEl.textContent = sanity;
        showFloatHint("你摇了摇头，把这当成错觉。");
        checkDiceUnlock();
    };

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        activeEventId = null;
        event4Completed = true;
        event4Investigated = false;
        sanity = 50;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    };
}
// ===== 一探究竟按钮 =====
function showEvent4InvestigateButton() {
    if (activeEventId !== 'event4') return;
    const oldBtn = document.querySelector('.event4-investigate-btn');
    if (oldBtn) oldBtn.remove();

    const btn = document.createElement('div');
    btn.className = 'event4-investigate-btn';
    btn.textContent = '一探究竟';
    btn.style.cssText = 'position:fixed;bottom:180px;right:30px;background:#5a8aa3;color:white;padding:10px 15px;border-radius:20px;cursor:pointer;z-index:100;font-size:14px;';
    document.body.appendChild(btn);

    btn.onclick = () => {
        btn.remove();
        showEvent4AskModal();
    };
}

// ===== 询问当事人弹窗 =====
function showEvent4AskModal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>一探究竟</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                是否选择询问当事人？
                <div style="margin-top:20px;display:flex;gap:15px;justify-content:center;">
                    <button id="event4AskYes" style="padding:8px 20px;background:#5a8aa3;color:white;border:none;border-radius:6px;cursor:pointer;">是</button>
                    <button id="event4AskNo" style="padding:8px 20px;background:#555;color:white;border:none;border-radius:6px;cursor:pointer;">否</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#event4AskYes').onclick = () => {
        modal.remove();
        showEvent4WhoModal();
    };

    modal.querySelector('#event4AskNo').onclick = () => {
        modal.remove();
        activeEventId = null;
        event4Completed = true;
        event4Investigated = false;
        sanity = 50;
        sanityValueEl.textContent = sanity;
        showFloatHint("你决定不多管闲事。");
        checkDiceUnlock();
    };

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        activeEventId = null;
        event4Completed = true;
        event4Investigated = false;
        sanity = 50;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    };
}

// ===== 询问谁弹窗 =====
function showEvent4WhoModal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>询问谁呢？</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                <div style="margin-top:10px;display:flex;flex-direction:column;gap:10px;align-items:center;">
                    <button id="event4WhoIchi" style="padding:10px 30px;background:#2a2a4a;color:#d4b896;border:1px solid #3a3a5a;border-radius:6px;cursor:pointer;font-size:14px;min-width:150px;">一期一振</button>
                    <button id="event4WhoKiji" style="padding:10px 30px;background:#2a2a4a;color:#d4b896;border:1px solid #3a3a5a;border-radius:6px;cursor:pointer;font-size:14px;min-width:150px;">髭切</button>
                    <button id="event4WhoCancel" style="padding:10px 30px;background:#555;color:white;border:none;border-radius:6px;cursor:pointer;font-size:14px;min-width:150px;">还是算了</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#event4WhoIchi').onclick = () => {
        modal.remove();
        event4AskedWho = '一期一振';
        showEvent4AnswerModal('一期一振');
    };

    modal.querySelector('#event4WhoKiji').onclick = () => {
        modal.remove();
        event4AskedWho = '髭切';
        showEvent4AnswerModal('髭切');
    };

    modal.querySelector('#event4WhoCancel').onclick = () => {
        modal.remove();
        activeEventId = null;
        event4Completed = true;
        event4Investigated = false;
        sanity = 50;
        sanityValueEl.textContent = sanity;
        showFloatHint("你决定还是算了。");
        checkDiceUnlock();
    };

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        activeEventId = null;
        event4Completed = true;
        event4Investigated = false;
        sanity = 50;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    };
}

// ===== 答复弹窗 =====
function showEvent4AnswerModal(who) {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>${who}</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                ${who}给予肯定的答复。
                <div style="margin-top:20px;display:flex;gap:15px;justify-content:center;">
                    <button id="event4AskPast" style="padding:8px 20px;background:#5a8aa3;color:white;border:none;border-radius:6px;cursor:pointer;">要问问他介意你丢下他们的事情吗？</button>
                    <button id="event4AskPastNo" style="padding:8px 20px;background:#555;color:white;border:none;border-radius:6px;cursor:pointer;">还是算了</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#event4AskPast').onclick = () => {
        modal.remove();
        event4AskedPast = true;
        showEvent4PastModal(who);
    };

    modal.querySelector('#event4AskPastNo').onclick = () => {
        modal.remove();
        activeEventId = null;
        event4Completed = true;
        sanity = 50;
        sanityValueEl.textContent = sanity;
        showFloatHint("你决定还是算了。");
        checkDiceUnlock();
    };

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        activeEventId = null;
        event4Completed = true;
        sanity = 50;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    };
}

// ===== 介意过去弹窗 =====
function showEvent4PastModal(who) {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>……</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                ${who === '一期一振' 
                    ? '一期一振并没有回答你的问题。他只是微笑着沉默了一会，转移了话题。<br><br>……一如既往温和的哥哥模样。'
                    : '"完全不介意哦。"髭切笑眯眯的看着你，<br><br>"神谕指引我再次找到了你啊。"'}
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        activeEventId = null;
        event4Completed = true;
        sanity = 50;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        activeEventId = null;
        event4Completed = true;
        sanity = 50;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    };
}

// ===== 导出 =====
window.showEvent4Chat = showEvent4Chat;
window.showEvent4FloatHint = showEvent4FloatHint;
window.showEvent4EmailViewer = showEvent4EmailViewer;
window.showEvent4DoubtModal = showEvent4DoubtModal;