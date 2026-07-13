/* ============ 事件5：官方通报与神隐 ============ */

// ===== 状态变量（请添加到 state.js） =====
// let event5ChoseRecite = false;      // 是否选择了"（深情的朗读）"
// let event5Investigated = false;     // 是否点击了"……去问问"且没有选择"算了，还是不去了"
// let event5DreamShown = false;       // 梦境弹窗是否已展示过
// let event5EndingTriggered = false;  // 是否触发了结局5

function showEvent5Chat() {
    activeEventId = 'event5';
    event5ChatShown = true;
    event5ChoseRecite = false;
    event5Investigated = false;
    event5DreamShown = false;
    event5EndingTriggered = false;

    // 第一阶段：邮件通知
    document.getElementById('mailBadge').classList.remove('hidden');
    showEvent5MailHint("📬 你收到一封官方通报邮件");
}

// ===== 邮件提示 =====
function showEvent5MailHint(text) {
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

// ===== 事件5邮件列表（在 mail.js 中渲染） =====
function renderEvent5Mail() {
    if (!event5ChatShown) return null;

    const mailItem = document.createElement('div');
    mailItem.className = 'mail-item-desktop unread';
    mailItem.id = 'event5Mail';
    mailItem.innerHTML = `
        <div class="mail-item-title-desktop">📢 官方近期大事件通报</div>
        <div class="mail-item-sender-desktop">发件人：时之政府</div>
    `;
    mailItem.onclick = () => {
        showEvent5EmailViewer(mailItem);
    };
    return mailItem;
}

// ===== 事件5邮件查看器 =====
function showEvent5EmailViewer(mailItem) {
    const viewer = document.createElement('div');
    viewer.className = 'email-viewer';
    viewer.innerHTML = `
        <div class="email-viewer-header">
            <div class="email-viewer-title">📢 官方近期大事件通报</div>
            <button class="email-viewer-close">×</button>
        </div>
        <div class="email-viewer-body" style="line-height:2.2;font-size:13px;">
            <p>【本丸通信】全新刀剑男士期间限定锻刀开启通知</p>
            <p>【紧急通报】历史修正主义者大规模干涉波动监测报告</p>
            <p style="color:#c97b7b;">【事件通报】关于A3869号本丸相关异常事态的通告</p>
            <p>【战报汇总】特命调查相关战线损耗与缴获概览</p>
            <p>【指令下达】逢彼岸樱绽放期本丸战备等级上调通告</p>
            <p>【事务通知】审神者灵力检定与刀帐解锁阈值更新公告</p>
            <p>【异常记录】出阵合战场时空坐标漂移事件初步研判</p>
            <p>【万屋通告】甲州金俸给临时增发与物资配给调整说明</p>
        </div>
    `;
    document.body.appendChild(viewer);

    viewer.querySelector('.email-viewer-close').addEventListener('click', () => {
        viewer.remove();
        if (mailItem) mailItem.classList.remove('unread');
        // 关闭邮件后弹出好友对话框
        setTimeout(() => showEvent5Dialog(), 300);
    });
}

// ===== 好友对话框（与事件4相同样式） =====
function showEvent5Dialog() {
    const oldChat = document.querySelector('.event5-chat');
    if (oldChat) oldChat.remove();

    const chat = document.createElement('div');
    chat.className = 'event5-chat';
    chat.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 30px;
        width: 340px;
        z-index: 10000;
        font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
    `;

    // 使用 step 控制对话进度
    if (typeof event5Step === 'undefined') {
        window.event5Step = 0;
    }

    let content = '';
    let showOptions = false;
    let options = [];

    switch (event5Step) {
        case 0:
            content = '"汝身寄于吾下，吾命交予汝剑。应圣杯之召唤，若愿顺此意、从此理，则答之。<br><br>于此起誓：吾为成就世间一切之善者，吾为传递世间一切之恶者。汝为身缠三大言灵之七天，穿越抑止之轮，出现吧，天平的守护者！"';
            showOptions = true;
            options = ['？', '什么东西？', '（深情的朗读）'];
            break;
        case 1:
            content = '"哈哈哈哈"';
            showOptions = false;
            break;
        case 2:
            content = '"说起来，你有看关于A3869号本丸相关异常事态的通告吗？就神隐那个。"';
            showOptions = false;
            break;
        case 3:
            content = '"唉。真是造孽啊。"';
            showOptions = false;
            break;
        case 4:
            chat.remove();
            // 对话结束，继续事件5主流程
            showEvent5Continue();
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
                        <button class="event5-chat-option" data-index="${idx}" style="
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

    chat.querySelectorAll('.event5-chat-option').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.background = '#4a4a6a';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = '#3a3a5a';
        });
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index);
            // 选项0: '?'，选项1: '什么东西？'，选项2: '（深情的朗读）'
            if (idx === 2) event5ChoseRecite = true;
            chat.remove();
            event5Step = 1;
            showEvent5Dialog();
        });
    });

    const nextBtn = chat.querySelector('.chat-next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            chat.remove();
            event5Step++;
            showEvent5Dialog();
        });
    }

    const bubble = chat.querySelector('.chat-bubble');
    if (!showOptions) {
        bubble.addEventListener('click', (e) => {
            if (e.target.closest('.chat-next-btn')) return;
            chat.remove();
            event5Step++;
            showEvent5Dialog();
        });
    }
}

// ===== 对话结束后继续事件5 =====
function showEvent5Continue() {
    // 重置 step 以便下次使用
    event5Step = 0;
    // 事件5主流程继续，等待低理智触发
}

// ===== 梦境弹窗 =====
function showEvent5DreamModal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>……梦境……</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                那场梦境就像握在手心的雾，飘飘忽忽的，你已经记不清了。<br><br>
                梦里荒唐得近乎无稽，逻辑支离破碎，找不到半点征兆。<br><br>
                可你就是知道，你差点就被带走了。<br><br>
                是谁要带你走呢？你似乎看见了三日月宗近。<br><br>
                记忆的残片里，只有一抹靛蓝的狩衣衣角。<br><br>
                但是梦里的你清楚的知道，那就是属于你的三日月宗近。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        event5DreamShown = true;
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        event5DreamShown = true;
    };
}

// ===== 质疑弹窗（20-15理智触发） =====
function showEvent5DoubtModal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>……</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                <p style="margin-bottom:20px;">……你真的不想怀疑他。你真的不想。真的。</p>
                <div style="display:flex;gap:15px;justify-content:center;">
                    <button id="event5DoubtNo" style="padding:8px 20px;background:#555;color:white;border:none;border-radius:6px;cursor:pointer;">就是梦啦</button>
                    <button id="event5DoubtYes" style="padding:8px 20px;background:#5a8aa3;color:white;border:none;border-radius:6px;cursor:pointer;">……万一是真的呢？</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#event5DoubtNo').onclick = () => {
        modal.remove();
        // 事件5结束，理智恢复到50
        activeEventId = null;
        event5Completed = true;
        sanity = 50;
        sanityValueEl.textContent = sanity;
        showFloatHint("你选择了相信这只是梦。");
        checkDiceUnlock();
    };

    modal.querySelector('#event5DoubtYes').onclick = () => {
        modal.remove();
        event5Investigated = true;
        showEvent5InvestigateButton();
    };

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        activeEventId = null;
        event5Completed = true;
        sanity = 50;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    };
}

// ===== "……去问问"按钮 =====
function showEvent5InvestigateButton() {
    if (activeEventId !== 'event5') return;
    const oldBtn = document.querySelector('.event5-investigate-btn');
    if (oldBtn) oldBtn.remove();

    const btn = document.createElement('div');
    btn.className = 'event5-investigate-btn';
    btn.textContent = '……去问问';
    btn.style.cssText = 'position:fixed;bottom:180px;right:30px;background:#5a8aa3;color:white;padding:10px 15px;border-radius:20px;cursor:pointer;z-index:100;font-size:14px;';
    document.body.appendChild(btn);

    btn.onclick = () => {
        btn.remove();
        // 检查事件4中的选择
        if (event4SwordChoice === 2) {
            // 膝丸路线
            showEvent5SwordChoiceModal('膝丸');
        } else if (event4SwordChoice === 1) {
            // 髭切路线
            showEvent5SwordChoiceModal('髭切');
        } else {
            // 没有记录，直接进入下一环节
            showEvent5MeetSanity();
        }
    };
}

// ===== 刀剑选择弹窗（膝丸/髭切） =====
function showEvent5SwordChoiceModal(sword) {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    const content = sword === '膝丸'
        ? '膝丸拦住了你。他严肃的说"家主还请慎重考虑，贸然前往并不安全，如有必要，还请带上我吧。"'
        : '髭切笑眯眯的出现了。"哎呀，家主要去找月亮丸算账吗？要不带上我吧？"';

    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>……</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                <p style="margin-bottom:20px;">${content}</p>
                <div style="display:flex;flex-direction:column;gap:10px;align-items:center;">
                    <button id="event5SwordCancel" style="padding:10px 30px;background:#555;color:white;border:none;border-radius:6px;cursor:pointer;font-size:14px;min-width:150px;">算了，还是不去了</button>
                    <button id="event5SwordTake" style="padding:10px 30px;background:#5a8aa3;color:white;border:none;border-radius:6px;cursor:pointer;font-size:14px;min-width:150px;">带上${sword}</button>
                    <button id="event5SwordAlone" style="padding:10px 30px;background:#3a3a5a;color:white;border:none;border-radius:6px;cursor:pointer;font-size:14px;min-width:150px;">谁也不带，独自前往</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#event5SwordCancel').onclick = () => {
        modal.remove();
        // 选择"算了，还是不去了" → 事件5结束
        activeEventId = null;
        event5Completed = true;
        event5Investigated = false;
        sanity = 45;
        sanityValueEl.textContent = sanity;
        showFloatHint("你决定还是算了。");
        checkDiceUnlock();
    };

    modal.querySelector('#event5SwordTake').onclick = () => {
        modal.remove();
        event5Investigated = true;
        event5SwordChoice = 'take';
        showEvent5MeetSanity();
    };

    modal.querySelector('#event5SwordAlone').onclick = () => {
        modal.remove();
        event5Investigated = true;
        event5SwordChoice = 'alone';
        showEvent5MeetSanity();
    };

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        activeEventId = null;
        event5Completed = true;
        event5Investigated = false;
        sanity = 45;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    };
}

// ===== 见到三日月 =====
function showEvent5MeetSanity() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>……</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                你见到了三日月。他似乎很清楚你为什么而来。<br><br>
                是啊，似乎关于你的事情，他没有什么是不清楚的。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        // 根据之前的选择进入不同分支
        if (event5SwordChoice === 'alone') {
            showEvent5AloneBranch();
        } else {
            showEvent5Forgiveness();
        }
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        if (event5SwordChoice === 'alone') {
            showEvent5AloneBranch();
        } else {
            showEvent5Forgiveness();
        }
    };
}

// ===== 带了刀剑 → 宽恕结局 =====
function showEvent5Forgiveness() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>……</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                他承认了他的行为，安静的目送你离开。<br><br>
                他等待你的责罚，并不觉得自己能够得到宽恕。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        activeEventId = null;
        event5Completed = true;
        sanity = 45;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        activeEventId = null;
        event5Completed = true;
        sanity = 45;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    };
}

// ===== 独自前往分支 =====
function showEvent5AloneBranch() {
    // 先弹"他承认了他的行为，并选择试图再次将你神隐。"
    const modal1 = document.createElement('div');
    modal1.className = 'ending-modal';
    modal1.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>……</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                他承认了他的行为，并选择试图再次将你神隐。
            </div>
        </div>
    `;
    document.body.appendChild(modal1);

    modal1.querySelector('.ending-modal-close').onclick = () => {
        modal1.remove();
        // 判断条件
        if (event5ChoseRecite) {
            // 选择了"（深情的朗读）" → 结局5
            showEvent5Ending5();
        } else if (event4ChoseGood) {
            // 选择了"好！"（事件4第一个问题）→ 成功抵挡
            showEvent5ResistSuccess();
        } else {
            // 都没选 → 结局4
            showEvent5Ending4();
        }
    };
    modal1.querySelector('.ending-modal-bg').onclick = () => {
        modal1.remove();
        if (event5ChoseRecite) {
            showEvent5Ending5();
        } else if (event4ChoseGood) {
            showEvent5ResistSuccess();
        } else {
            showEvent5Ending4();
        }
    };
}
// ===== "微妙的事情发生了"弹窗 =====
function showEvent5SubtleThing() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>……</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                你试图抵挡，但是微妙的事情发生了。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        showEvent5Ending5();
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        showEvent5Ending5();
    };
}

// ===== 结局5：是惊吓呢 =====
function showEvent5Ending5() {
    ending5Unlocked = true;
    event5EndingTriggered = true;
    showEnding5Modal();  // ← 调用 endings.js 里的函数
}

// ===== 成功抵挡 =====
function showEvent5ResistSuccess() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>……</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                你试图抵挡，并且成功了。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        showEvent5Forgiveness();
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        showEvent5Forgiveness();
    };
}

// ===== 结局4（复用已有结局4最终弹窗） =====
function showEvent5Ending4() {
    // 先弹"你试图抵挡，但是失败了。"
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>……</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                你试图抵挡，但是失败了。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        // 直接调用结局4最终弹窗（不带黑屏）
        showEnding4FinalModalDirect();
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        showEnding4FinalModalDirect();
    };
}

// ===== 结局4最终弹窗（直接弹出，不带黑屏流程） =====
function showEnding4FinalModalDirect() {
    ending4Unlocked = true;
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>结局：dream sweet dream？</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding: 30px; text-align: center; line-height: 2;">
                你闭上眼睛，坠入甜美的梦乡。什么时候会醒来呢？没有人知道。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        activeEventId = null;
        event5Completed = true;
        sanity = 45;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        activeEventId = null;
        event5Completed = true;
        sanity = 45;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    };
}
// ===== 低理智提示（掷骰时触发） =====
function showEvent5FloatHint(text) {
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

// ===== 导出 =====
window.showEvent5Chat = showEvent5Chat;
window.showEvent5FloatHint = showEvent5FloatHint;
window.showEvent5DoubtModal = showEvent5DoubtModal;
window.showEvent5DreamModal = showEvent5DreamModal;
window.renderEvent5Mail = renderEvent5Mail;
window.showEvent5EmailViewer = showEvent5EmailViewer;
window.showEvent5SubtleThing = showEvent5SubtleThing;
window.showEnding4FinalModalDirect = showEnding4FinalModalDirect;