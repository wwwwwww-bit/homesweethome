/* ============ 结局1：无奈的近侍 ============ */
function showEnding1Modal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>结局：无奈的近侍</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding: 30px; text-align: center; line-height: 2;">
                哪有什么岁月静好，只是有人在替你负重前行……咳咳。不过没关系，他们可以一直帮你兜底的。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').addEventListener('click', () => {
        modal.remove();
        pureWorkEndingPossible = true;
    });

    modal.querySelector('.ending-modal-bg').addEventListener('click', () => {
        modal.remove();
        pureWorkEndingPossible = true;
    });
}

/* ============ 结局2：同事你辛苦啦！ ============ */
function triggerEnding2() {
    ending2Unlocked = true;

    // 黑屏过渡
    const blackScreen = document.createElement('div');
    blackScreen.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: #000;
        z-index: 9999;
        opacity: 0;
        transition: opacity 1.5s ease;
    `;
    document.body.appendChild(blackScreen);

    // 渐显黑屏
    setTimeout(() => {
        blackScreen.style.opacity = '1';
    }, 50);

    // 黑屏后显示结局弹窗
    setTimeout(() => {
        showEnding2Modal();
    }, 1800);
}

function showEnding2Modal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>结局：同事你辛苦啦！</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding: 30px; text-align: center; line-height: 2;">
                ……醒来以后你发现药研正严肃的盯着你。<br><br>
                工作太努力以至于昏迷在办公室也太糟糕了吧！<br><br>
                这件事之后，本丸开始监督你的作息。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').addEventListener('click', () => {
        modal.remove();
        const blackScreen = document.querySelector('div[style*="z-index: 9999"]');
        if (blackScreen) blackScreen.remove();
        pureGameEndingPossible = true;
    });

    modal.querySelector('.ending-modal-bg').addEventListener('click', () => {
        modal.remove();
        const blackScreen = document.querySelector('div[style*="z-index: 9999"]');
        if (blackScreen) blackScreen.remove();
        pureGameEndingPossible = true;
    });
}

/* ============ 结局3：剩下的事情明天再说吧 ============ */
function showEnding3Modal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>结局：剩下的事情明天再说吧</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding: 30px; text-align: center; line-height: 2;">
                下班，关机。<br><br>
                明天的事情，就等明天再说吧。<br><br>
                你这么想着，关上了面前的终端。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        activeEventId = null;
        event3Completed = true;
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        activeEventId = null;
        event3Completed = true;
    };
}

/* ============ 结局4邮件发送 ============ */
function handleSendMail(btn) {
    const modal = btn.closest('.ending-modal');
    modal.remove();
    showTinyFloatHint("……你刚刚是不是发送了什么东西？");
    setTimeout(() => {
        showEnding4Modal(5);
    }, 2000);
}

/* ============ 结局4：dream sweet dream？ ============ */
function triggerEnding4() {
    // 黑屏
    const blackScreen = document.createElement('div');
    blackScreen.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: #000;
        z-index: 9999;
        opacity: 0;
        transition: opacity 1.5s ease;
    `;
    document.body.appendChild(blackScreen);

    setTimeout(() => {
        blackScreen.style.opacity = '1';
    }, 50);

    // 第一个弹窗
    setTimeout(() => {
        showEnding4Modal(1);
    }, 1800);
}

function showEnding4Modal(step) {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.style.zIndex = '10000';

    let body = '';

    if (step === 1) {
        body = '你盯着屏幕，视线渐渐模糊。头晕目眩，筋疲力尽。……下面要做什么来着？';
    } else if (step === 2) {
        body = replaceInitialSword('初始刀怎么一直在远征啊……什么时候回来啊……好想他能一直陪在自己身边……');
    } else if (step === 3) {
        body = '……不过好奇怪啊……你好像并没有安排他远征啊……是不是你记错了……？';
    } else if (step === 4) {
        body = '▒░▒ 骰░子 <br><br>' +
               '▒░▓▒▒ ▓█▓ ▒░▒ ▓██ ▒░▒░ ▓█▒░▒ ▓▒░▒ █▓▒░ ▒░▒░ ▓▒░▒░ ▒░▒░<br><br>' +
               '<button id="sendMailBtn" onclick="handleSendMail(this)" style="' +
               'padding: 8px 20px; background: #5a8aa3; ' +
               'color: white; border: none; border-radius: 6px; ' +
               'cursor: pointer; font-size: 13px;">确认发送</button>';
    } else if (step === 5) {
        body = '▒░▓▒░▒ ▓█▓ ▒░▒░<br><br>' +
               '▒░▒░▒ ▓█▓ ▒░▒░ 神▒域 ░▒░ ▓▒░▒ █▓▒░ ▒░▒░▒ ▓█▓ 自░愿 ▓▒░▒░<br><br>' +
               '<div style="margin: 20px 0; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 8px;">' +
               '<div style="display: flex; align-items: center; margin-bottom: 12px;">' +
               '<span style="color: #d4b896; font-size: 14px; min-width: 80px;">▒░▓▒░▒：</span>' +
               '<input type="text" id="ending4SignInput" placeholder="在此签名" style="' +
               'flex: 1; padding: 8px 12px; background: #2a2a4a; border: 1px solid #3a3a5a; ' +
               'border-radius: 6px; color: #d4b896; font-size: 14px; ' +
               'outline: none; font-family: inherit;">' +
               '</div>' +
               '<div style="display: flex; align-items: center;">' +
               '<span style="color: #d4b896; font-size: 14px; min-width: 80px;">▒░▒░▒：</span>' +
               '<span style="color: #888; font-size: 14px;">▒░▒░ ▓██ ▒░▒░ ▓▒░▒ █▓▒░</span>' +
               '</div>' +
               '</div>' +
               '<button id="ending4SignBtn" style="padding: 8px 20px; background: #5a8aa3; ' +
               'color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; display: block; margin: 20px auto 0;">确定</button>';
    }

    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box glitch-effect">
            <div class="ending-modal-header">
                <span>？？？？？？</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding: 30px; text-align: center; line-height: 2;">
                ${body}
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // 第5个弹窗：签名确认
    if (step === 5) {
        modal.querySelector('#ending4SignBtn').addEventListener('click', () => {
            const input = modal.querySelector('#ending4SignInput');
            const sign = input.value.trim();
            if (!sign) return;

            modal.remove();

            // 黑屏停留（闭眼）
            const blackScreen = document.querySelector('div[style*="z-index: 9999"]');
            if (blackScreen) {
                blackScreen.style.opacity = '0';
                setTimeout(() => {
                    showEnding4FinalModalWithBlackScreen(blackScreen);
                }, 1500);
            }
        });
    }

    // 关闭按钮：关闭当前弹窗，显示下一个
    const closeAndNext = () => {
        if (step === 4) return;

        modal.remove();
        if (step < 5) {
            setTimeout(() => {
                showEnding4Modal(step + 1);
            }, 300);
        }
    };

    modal.querySelector('.ending-modal-close').addEventListener('click', closeAndNext);
    modal.querySelector('.ending-modal-bg').addEventListener('click', closeAndNext);
}

/* ============ 结局4最终弹窗（带黑屏） ============ */
function showEnding4FinalModalWithBlackScreen(blackScreen) {
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

    modal.querySelector('.ending-modal-close').addEventListener('click', () => {
        modal.remove();
        if (blackScreen) {
            blackScreen.style.opacity = '0';
            setTimeout(() => {
                if (blackScreen) blackScreen.remove();
            }, 500);
        }
        sanity = 50;
        lastSanity = 50;
        sanityValueEl.textContent = sanity;
        updateUI();
    });

    modal.querySelector('.ending-modal-bg').addEventListener('click', () => {
        modal.remove();
        if (blackScreen) {
            blackScreen.style.opacity = '0';
            setTimeout(() => {
                if (blackScreen) blackScreen.remove();
            }, 500);
        }
        sanity = 50;
        lastSanity = 50;
        sanityValueEl.textContent = sanity;
        updateUI();
    });
}
/* ============ 结局5：是惊吓呢 ============ */
function showEnding5Modal() {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>结局：是惊吓呢</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding: 30px; text-align: center; line-height: 2;">
                     不知道怎么回事，他被困在你的神域里了。<br><br>
                ……这叫什么？神隐者终被神隐？<br><br>
                不过，无论如何，你可以随心所欲的处置他了。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').addEventListener('click', () => {
        modal.remove();
        activeEventId = null;
        event5Completed = true;
        sanity = 45;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    });
    modal.querySelector('.ending-modal-bg').addEventListener('click', () => {
        modal.remove();
        activeEventId = null;
        event5Completed = true;
        sanity = 45;
        sanityValueEl.textContent = sanity;
        checkDiceUnlock();
    });
}
/* ============ 结局6：home sweet home ============ */
function triggerEnding6() {
    // 黑屏
    const blackScreen = document.createElement('div');
    blackScreen.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: #000;
        z-index: 9999;
        opacity: 0;
        transition: opacity 2s ease;
    `;
    document.body.appendChild(blackScreen);

    setTimeout(() => {
        blackScreen.style.opacity = '1';
    }, 50);

    setTimeout(() => {
        showEnding6Modal(blackScreen);
    }, 2200);
}

function showEnding6Modal(blackScreen) {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>结局：home sweet home</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding: 30px; text-align: center; line-height: 2.2;">
           真相是一种美丽又可怕的东西，需要格外谨慎地对待。<br><br> 
           无论如何，我们依旧是和谐美好的一家人，不是吗？<br><br>
           home sweet home？
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        if (blackScreen) {
            blackScreen.style.opacity = '0';
            setTimeout(() => {
                if (blackScreen) blackScreen.remove();
            }, 500);
        }
        activeEventId = null;
        sanity = 50;
        lastSanity = 50;
        sanityValueEl.textContent = sanity;
        updateUI();
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        if (blackScreen) {
            blackScreen.style.opacity = '0';
            setTimeout(() => {
                if (blackScreen) blackScreen.remove();
            }, 500);
        }
        activeEventId = null;
        sanity = 50;
        lastSanity = 50;
        sanityValueEl.textContent = sanity;
        updateUI();
    };
}
/* ============ 结局7：sweet home? ============ */
function triggerEnding7() {
    const blackScreen = document.createElement('div');
    blackScreen.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: #000;
        z-index: 9999;
        opacity: 0;
        transition: opacity 2s ease;
    `;
    document.body.appendChild(blackScreen);

    setTimeout(() => {
        blackScreen.style.opacity = '1';
    }, 50);

    setTimeout(() => {
        showEnding7Modal(blackScreen);
    }, 2200);
}

function showEnding7Modal(blackScreen) {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>结局：sweet home?</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding: 30px; text-align: center; line-height: 2.2;">
                本丸的日常继续流转，平安无事，波澜不惊。<br><br>
                也许你其实什么都知道？只是难得糊涂的遮住了眼睛而已。<br><br>
                毕竟，我们确确实实是和谐美好的一家人啊，不是吗？
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        if (blackScreen) {
            blackScreen.style.opacity = '0';
            setTimeout(() => {
                if (blackScreen) blackScreen.remove();
            }, 500);
        }
        activeEventId = null;
        sanity = 50;
        lastSanity = 50;
        sanityValueEl.textContent = sanity;
        updateUI();
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        if (blackScreen) {
            blackScreen.style.opacity = '0';
            setTimeout(() => {
                if (blackScreen) blackScreen.remove();
            }, 500);
        }
        activeEventId = null;
        sanity = 50;
        lastSanity = 50;
        sanityValueEl.textContent = sanity;
        updateUI();
    };
}
/* ============ 结局8：半途 ============ */
function triggerEnding8() {
    const blackScreen = document.createElement('div');
    blackScreen.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: #000;
        z-index: 9999;
        opacity: 0;
        transition: opacity 2s ease;
    `;
    document.body.appendChild(blackScreen);

    setTimeout(() => {
        blackScreen.style.opacity = '1';
    }, 50);

    setTimeout(() => {
        showEnding8Modal(blackScreen);
    }, 2200);
}

function showEnding8Modal(blackScreen) {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>结局：半途</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding: 30px; text-align: center; line-height: 2.2;">
                你隐约觉得有些事情不太对劲。<br><br>
                是哪里呢？你是不是错过了什么？<br><br>
                没有无知到可以无视一切，也没能全知到足够看清真相。<br><br>
                就这样吧。就暂时、止步于此吧。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        if (blackScreen) {
            blackScreen.style.opacity = '0';
            setTimeout(() => {
                if (blackScreen) blackScreen.remove();
            }, 500);
        }
        activeEventId = null;
        sanity = 50;
        lastSanity = 50;
        sanityValueEl.textContent = sanity;
        updateUI();
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        if (blackScreen) {
            blackScreen.style.opacity = '0';
            setTimeout(() => {
                if (blackScreen) blackScreen.remove();
            }, 500);
        }
        activeEventId = null;
        sanity = 50;
        lastSanity = 50;
        sanityValueEl.textContent = sanity;
        updateUI();
    };
}
/* ============ 结局9：今天也是好天气 ============ */
function triggerEnding9() {
    const blackScreen = document.createElement('div');
    blackScreen.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: #000;
        z-index: 9999;
        opacity: 0;
        transition: opacity 2s ease;
    `;
    document.body.appendChild(blackScreen);

    setTimeout(() => {
        blackScreen.style.opacity = '1';
    }, 50);

    setTimeout(() => {
        showEnding9Modal(blackScreen);
    }, 2200);
}

function showEnding9Modal(blackScreen) {
    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>结局：今天也是好天气</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body" style="padding: 30px; text-align: center; line-height: 2.2;">
                你抬起头，才发现已经忙了这么久。<br><br>
                窗外阳光正好，庭院里传来刀剑们说笑的声音。<br><br>
                你揉了揉眼睛，觉得有些恍惚。<br><br>
                好像很久没有这样安静地发过呆了。<br><br>
                那些不安和疑虑，暂时搁在一边吧。<br><br>
                起码今天，是个好天气。
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').onclick = () => {
        modal.remove();
        if (blackScreen) {
            blackScreen.style.opacity = '0';
            setTimeout(() => {
                if (blackScreen) blackScreen.remove();
            }, 500);
        }
        activeEventId = null;
        sanity = 50;
        lastSanity = 50;
        sanityValueEl.textContent = sanity;
        updateUI();
    };
    modal.querySelector('.ending-modal-bg').onclick = () => {
        modal.remove();
        if (blackScreen) {
            blackScreen.style.opacity = '0';
            setTimeout(() => {
                if (blackScreen) blackScreen.remove();
            }, 500);
        }
        activeEventId = null;
        sanity = 50;
        lastSanity = 50;
        sanityValueEl.textContent = sanity;
        updateUI();
    };
}

/* ============ 结局收集弹窗 ============ */
function showEndingModal(ending1, ending2, ending3, ending4, ending5)  {
    const ending1Name = ending1Unlocked ? "无奈的近侍" : "？？？";
    const ending2Name = ending2Unlocked ? "同事你辛苦啦！" : "？？？";
    const ending3Name = ending3Unlocked ? "剩下的事情明天再说吧" : "？？？";
    const ending4Name = ending4Unlocked ? "dream sweet dream？" : "？？？";
    const ending5Name = ending5Unlocked ? "是惊吓呢" : "？？？";
    
    // 结局6/7/8 共用一行
    let ending678Name = "？？？";
    if (ending6Unlocked) {
        ending678Name = "home sweet home";
    } else if (ending7Unlocked) {
        ending678Name = "sweet home?";
    } else if (ending8Unlocked) {
        ending678Name = "半途";
    }

    const ending9Name = ending9Unlocked ? "今天也是好天气" : "？？？";

    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>结局收集</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body">
                <div class="ending-entry ${ending1Unlocked ? 'unlocked' : 'locked'}">
                    <span class="ending-num">结局1</span>
                    <span class="ending-name">${ending1Name}</span>
                </div>
                <div class="ending-entry ${ending2Unlocked ? 'unlocked' : 'locked'}">
                    <span class="ending-num">结局2</span>
                    <span class="ending-name">${ending2Name}</span>
                </div>
                <div class="ending-entry ${ending3Unlocked ? 'unlocked' : 'locked'}">
                    <span class="ending-num">结局3</span>
                    <span class="ending-name">${ending3Name}</span>
                </div>
                <div class="ending-entry ${ending4Unlocked ? 'unlocked' : 'locked'}">
                    <span class="ending-num">结局4</span>
                    <span class="ending-name">${ending4Name}</span>
                </div>
                <div class="ending-entry ${ending5Unlocked ? 'unlocked' : 'locked'}">
                    <span class="ending-num">结局5</span>
                    <span class="ending-name">${ending5Name}</span>
                </div>
                <div class="ending-entry ${ending6Unlocked || ending7Unlocked || ending8Unlocked ? 'unlocked' : 'locked'}">
                    <span class="ending-num">结局6/7/8</span>
                    <span class="ending-name">${ending678Name}</span>
                </div>
                <div class="ending-entry ${ending9Unlocked ? 'unlocked' : 'locked'}">
                    <span class="ending-num">结局9</span>
                    <span class="ending-name">${ending9Name}</span>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.ending-modal-close').addEventListener('click', () => {
        modal.remove();
    });
    modal.querySelector('.ending-modal-bg').addEventListener('click', () => {
        modal.remove();
    });
}