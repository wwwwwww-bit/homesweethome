/* ============ 故事事件系统 ============ */
const storyEvents = {
    event1: {
        id: 'event1',
        condition: () => sanity === 60 && !event1ChatShown && !pureGameEndingPossible,
        run: () => showEvent1Chat(),
    },
    event2: {
        id: 'event2',
        condition: () => sanity === 60 && !event2ChatShown && !pureGameEndingPossible,
        run: () => showEvent2Chat(),
    },
    event3: {
        id: 'event3',
        condition: () => sanity === 60 && !event3ChatShown && !pureGameEndingPossible,
        run: () => showEvent3Chat(),
    },
    event4: {
        id: 'event4',
        condition: () => sanity === 60 && !event4ChatShown && !pureGameEndingPossible,
        run: () => showEvent4Chat(),
    },
    event5: {
        id: 'event5',
        condition: () => sanity === 60 && !event5ChatShown && !pureGameEndingPossible,
        run: () => showEvent5Chat(),
    },
};

let triggeredEvents = [];

function checkAndTriggerStoryEvent() {
    if (activeEventId !== null) return;
    if (sanity !== 60) return;
    if (triggeredEvents.length >= 5) return;

    const availableIndices = [0, 1, 2, 3, 4].filter(i => !triggeredEvents.includes(i));
    if (availableIndices.length === 0) return;

    // 如果事件5（索引4）可选，但事件4（索引3）还没触发，则排除事件5
    const canTriggerEvent5 = event4ChatShown;  // 事件4已触发
    const filteredIndices = availableIndices.filter(i => {
        if (i === 4 && !canTriggerEvent5) return false;  // 事件5：要求事件4已触发
        return true;
    });

    if (filteredIndices.length === 0) return;

    const randomIndex = filteredIndices[Math.floor(Math.random() * filteredIndices.length)];
    triggeredEvents.push(randomIndex);

    const eventFunctions = [
        showEvent1Chat,
        showEvent2Chat,
        showEvent3Chat,
        showEvent4Chat,
        showEvent5Chat
    ];
    eventFunctions[randomIndex]();
}
/* ============ 初始化函数 ============ */
function initEvents() {

    /* 开始菜单 */
    startButton.addEventListener('click', (e) => {
        e.stopPropagation();
        startMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!startMenu.contains(e.target) && e.target !== startButton) {
            startMenu.classList.remove('show');
        }
    });

    menuShutdown.addEventListener('click', () => {
        ending3Unlocked = true;
        showEnding3Modal();
        startMenu.classList.remove('show');
    });

    document.getElementById('menuGame').addEventListener('click', () => {
        startMenu.classList.remove('show');
        showLotteryModal();
    });

    /* 图标点击 */
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        const windowName = icon.dataset.window;
        if (windowName === 'gameWindow') {
            icon.addEventListener('click', () => {
                if (sanity >= 100) return;
                sanity = Math.min(100, sanity + 5);
                pureWorkEndingPossible = false;
                totalPlay++;
                checkDiceUnlock();
                updateUI();
                showFloatHint("理智增加了5点。");
            });
            return;
        }
        icon.addEventListener('click', () => {
            const target = document.getElementById(windowName);
            if (target) {
                target.classList.remove('hidden');
            }
        });
    });

    /* 关闭窗口 */
    document.querySelectorAll('.window-close').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.window);
        if (target) {
            target.classList.add('hidden');
        }
    });
});

    /* 工作 */
    fileWord.addEventListener('click', () => {
        if (sanity <= 0) return;
        sanity = Math.max(0, sanity - 5);
        totalWork++;
        pureGameEndingPossible = false;
        checkDiceUnlock();
        tryTriggerOfficialEvent();
        updateUI();
        showFloatHint("理智减少了5点。");
    });

    /* ============ 骰子监听（最终安全版）=========== */
btnRollDice.addEventListener('click', () => {
    const diceWin = document.getElementById('diceWindow');

    // 理智 ≥ 40，关窗口
    if (sanity >= 40) {
        diceWin.classList.add('hidden');
        return;
    }

    // 保存掷骰前的理智值
    const oldSanity = sanity;

    // 正常掷骰子逻辑
    pureGameEndingPossible = false;
    btnRollDice.classList.add('rolling');
    setTimeout(() => btnRollDice.classList.remove('rolling'), 600);

    sanity = Math.min(100, sanity + 5);
    showFloatHint("理智增加了5点。");

    // ===== 所有事件判定都用 oldSanity（掷骰前的理智值）=====

    // 事件1
    if (oldSanity >= 25 && oldSanity <= 35 && activeEventId === 'event1') {
        setTimeout(() => showFloatHint("你想起了好友的聊天记录。"), 600);
    }
    if (oldSanity >= 15 && oldSanity < 20 && activeEventId === 'event1') {
        setTimeout(() => showNightRaidQuestion(), 600);
    }

    // 事件2
    if (oldSanity >= 15 && oldSanity <= 30 && activeEventId === 'event2') {
        setTimeout(() => showFloatHint("你想起了三日月宗近，你莫名觉得背后一凉。"), 600);
    }
    if (oldSanity >= 10 && oldSanity < 15 && activeEventId === 'event2') {
        setTimeout(() => showMoonFeelingQuestion(), 600);
    }

    // 事件3：日课提示 20-30
    if (oldSanity >= 20 && oldSanity <= 30 && activeEventId === 'event3') {
        sanityValueEl.textContent = sanity;
        showEvent3FloatHint("你不自觉的想起了日课汇报。今天的手合场预约是鹤丸和一期，没有问题。……昨天好像也是鹤？");
    }
    // 事件3：质疑弹窗 10-20
    if (oldSanity >= 10 && oldSanity < 20 && activeEventId === 'event3') {
        sanityValueEl.textContent = sanity;
        showEvent3DoubtModal();
    }

    if (oldSanity >= 20 && oldSanity <= 30 && activeEventId === 'event4') {
    sanityValueEl.textContent = sanity;
    showEvent4FloatHint("……你想起了那封定时邮件。");
}
if (oldSanity >= 10 && oldSanity < 20 && activeEventId === 'event4') {
    sanityValueEl.textContent = sanity;
    setTimeout(() => showEvent4DoubtModal(), 800);
}
// 事件5低理智提示
// 理智 30-35 → 想起邮件
if (oldSanity >= 30 && oldSanity <= 35 && activeEventId === 'event5') {
    sanityValueEl.textContent = sanity;
    showEvent5FloatHint("你想起了那封邮件。");
}
// 理智 30-20 → 想起梦境
if (oldSanity >= 20 && oldSanity < 30 && activeEventId === 'event5') {
    sanityValueEl.textContent = sanity;
    if (!event5DreamShown) {
        // 第一次触发：弹出是否回忆梦境的弹窗
        showEvent5DreamChoiceModal();
    } else {
        // 之后只出提示
        showEvent5FloatHint("……你想起了你做的梦。");
    }
}
// 理智 20-15 → 质疑弹窗
if (oldSanity >= 15 && oldSanity < 20 && activeEventId === 'event5') {
    sanityValueEl.textContent = sanity;
    setTimeout(() => showEvent5DoubtModal(), 800);
}

    updateUI();
});
}
// ===== 梦境选择弹窗（第一次触发时） =====
function showEvent5DreamChoiceModal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header"><span>……</span><button class="ending-modal-close">×</button></div>
            <div class="ending-modal-body" style="padding:30px;text-align:center;line-height:2.2;">
                <p style="margin-bottom:20px;">……你想起了你做的那个关于三日月的梦。是否回忆梦境？</p>
                <div style="display:flex;gap:15px;justify-content:center;">
                    <button id="event5DreamYes" style="padding:8px 20px;background:#5a8aa3;color:white;border:none;border-radius:6px;cursor:pointer;">是</button>
                    <button id="event5DreamNo" style="padding:8px 20px;background:#555;color:white;border:none;border-radius:6px;cursor:pointer;">否</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#event5DreamYes').onclick = () => {
        modal.remove();
        event5DreamShown = true;
        showEvent5DreamModal();
    };

    modal.querySelector('#event5DreamNo').onclick = () => {
        modal.remove();
        event5DreamShown = true;
        showEvent5FloatHint("……你想起了你做的梦。");
    };

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        event5DreamShown = true;
    };
}

/* ============ 启动初始化 ============ */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEvents);
} else {
    initEvents();
}