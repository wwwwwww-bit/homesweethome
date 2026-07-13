/* ============ UI更新（核心 · 最终稳定版） ============ */
function updateUI() {
    // 1. 基础理智显示（任何时候都要更新）
    sanityValueEl.textContent = sanity;

    // 2. 排他锁：有事件时，只刷新理智数值，不触发新事件
    if (activeEventId !== null) {
        // ✅ 骰子逃生口：即使有事件，也要检查骰子
        if (diceUnlocked && sanity <= 35) {
            iconDice.classList.remove('hidden');
        } else {
            iconDice.classList.add('hidden');
        }
        // ⚠️ 注意：这里没有 'return'，代码会继续往下走
    }

    // 3. 理智40提示
    if (lastSanity > 40 && sanity <= 40) {
        showSanity40Hint("近侍担忧地走进来，希望你休息一会。");
    }
    lastSanity = sanity;

    // 4. 骰子图标（全局检查，不受事件锁影响）
    if (diceUnlocked && sanity <= 35) {
        iconDice.classList.remove('hidden');
    } else {
        iconDice.classList.add('hidden');
    }
// ===== 最终结局（所有事件完成后判定） =====
if (!ending6Unlocked && !ending7Unlocked && !ending8Unlocked && !activeEventId && event5Completed) {
    
    const allConditions = [
        nightRaidAsked,           // 事件1：选了"要不问问？"
        askedMoon,                // 事件2：询问刀剑选了"三日月宗近"
        event3ChoseDoubt,         // 事件3：选了"质疑"
        event4Investigated,       // 事件4：质疑弹窗选了"是"
        (event4AskedWho === '一期一振' || event4AskedWho === '髭切'),  // 事件4：询问了谁
        event5Investigated        // 事件5：点击了"……去问问"且没有选"算了，还是不去了"
    ];
    const metCount = allConditions.filter(Boolean).length;
    
    if (metCount === 6) {
        ending6Unlocked = true;
        setTimeout(() => {
            triggerEnding6();
        }, 2000);
        return;
    } else if (metCount >= 1 && metCount <= 5) {
        ending8Unlocked = true;
        setTimeout(() => {
            triggerEnding8();
        }, 2000);
        return;
    } else if (metCount === 0) {
        ending7Unlocked = true;
        setTimeout(() => {
            triggerEnding7();
        }, 2000);
        return;
    }
}
// ===== 结局9：非纯游戏路线 + 理智≥100 =====
if (sanity >= 100 && !pureGameEndingPossible && !ending9Unlocked) {
    ending9Unlocked = true;
    setTimeout(() => {
        triggerEnding9();
    }, 2000);
    return;
}
    // ===== 结局1：纯游戏路线，理智≥100 =====
    if (sanity >= 100 && pureGameEndingPossible && !ending1Unlocked) {
        ending1Unlocked = true;
        showEnding1Modal();
        return;
    }

    // ===== 结局2：纯工作路线，理智≤20 =====
    if (sanity <= 20 && pureWorkEndingPossible && !ending2Unlocked && activeEventId !== 'event1') {
        triggerEnding2();
        return;
    }

    // ===== 结局2解锁后：理智保护 =====
    if (ending2Unlocked && sanity <= 30) {
        showRestHint("哎呀休息，休息一下啦。");
        sanity = 50;
        lastSanity = 50;
        sanityValueEl.textContent = sanity;
        if (diceUnlocked && sanity > 35) {
            iconDice.classList.add('hidden');
        }
        return;
    }

    // ===== 结局4：非纯路线 + 理智归零 =====
    if (sanity <= 0 && !pureGameEndingPossible && !pureWorkEndingPossible && !ending4Unlocked) {
        ending4Unlocked = true;
        triggerEnding4();
        return;
    }

    
    // 5. 尝试触发新的剧情事件（只有在没有事件进行时才触发）
    if (activeEventId === null) {
        checkAndTriggerStoryEvent();
    }
}

/* ============ 浮窗提示（通用） ============ */
function showFloatHint(text) {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(90, 74, 58, 0.95);
        color: #d4b896;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 15px;
        z-index: 1000;
        pointer-events: none;
        animation: fadeIn 0.3s ease;
    `;
    hint.textContent = text;
    document.body.appendChild(hint);

    setTimeout(() => {
        hint.style.opacity = '0';
        hint.style.transition = 'opacity 0.5s ease';
        setTimeout(() => hint.remove(), 500);
    }, 2000);
}

/* ============ 理智40提示 ============ */
function showSanity40Hint(text) {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        top: 15%;
        left: 50%;
        transform: translate(-50%, 0);
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

/* ============ 休息提示（结局2） ============ */
function showRestHint(text) {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        top: 70%;
        left: 50%;
        transform: translate(-50%, 0);
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

/* ============ 微小浮窗提示 ============ */
function showTinyFloatHint(text) {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: red;
        color: white;
        padding: 20px;
        border-radius: 8px;
        font-size: 16px;
        z-index: 999999;
        pointer-events: none;
        animation: fadeInTinyHint 0.3s ease;
    `;
    hint.textContent = text;
    document.body.appendChild(hint);

    setTimeout(() => {
        hint.style.opacity = '0';
        hint.style.transition = 'opacity 0.5s ease';
        setTimeout(() => hint.remove(), 1500);
    }, 1500);
}