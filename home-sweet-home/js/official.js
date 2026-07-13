/* ============ A对话框黑屏层 ============ */
function createADialogBlackScreen() {
    const blackScreen = document.createElement('div');
    blackScreen.id = 'aDialogBlackScreen';
    blackScreen.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 499;  /* 比a-dialog(500)低一级 */
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(blackScreen);

    // 渐显
    setTimeout(() => {
        blackScreen.style.opacity = '1';
    }, 10);

    return blackScreen;
}

function removeADialogBlackScreen() {
    const blackScreen = document.getElementById('aDialogBlackScreen');
    if (blackScreen) {
        blackScreen.style.opacity = '0';
        setTimeout(() => {
            blackScreen.remove();
        }, 300);
    }
}

/* ============ A对话框（简化版） ============ */
function showADialogSimple(textLines) {
    createADialogBlackScreen();

    aDialogText.innerHTML = textLines.map(line => `<p>${line}</p>`).join('');
    aDialogOptions.innerHTML = '';
    aDialog.classList.remove('hidden');
}

/* ============ 低理智分支 ============ */
function triggerLowSanityBranch() {
    aDialog.classList.add('shaking');
    officialDice.classList.remove('hidden');

    setTimeout(() => {
        officialDice.classList.add('hidden');
        aDialog.classList.remove('shaking');

        // 重新显示对话框
        aDialog.classList.remove('hidden');

        // 创建按钮并直接绑定事件
        const optionBtn = document.createElement('button');
        optionBtn.className = 'a-dialog-option';
        optionBtn.id = 'lowSanityOption';
        optionBtn.textContent = '是因为你早就知道了吗？';

        optionBtn.addEventListener('click', () => {
            aDialogText.innerHTML = '<p>“……哎呀，原来主君是这么看我的吗？老爷爷有点伤心呢。”</p>';
            aDialogOptions.innerHTML = '';
            removeADialogBlackScreen();
        });

        aDialogOptions.innerHTML = '';
        aDialogOptions.appendChild(optionBtn);

    }, 1500);
}

/* ============ 官方事件触发 ============ */
function tryTriggerOfficialEvent() {
    if (sanity >= 30 || officialMailReceived || hasTriggeredOfficialEvent) return;
    if (Math.random() > 0.3) return;

    hasTriggeredOfficialEvent = true;
    officialMailReceived = true;
    officialEventSanityAtTrigger = sanity;
    pureGameEndingPossible = false;

    mailBadge.classList.remove('hidden');
    showMailHint("你收到一封来自时政的邮件。");
}

/* ============ 官方邮件查看（签名版） ============ */
function showOfficialSignMail() {
    const viewer = document.createElement('div');
    viewer.className = 'email-viewer';
    viewer.id = 'officialSignViewer';
    viewer.innerHTML = `
        <div class="email-viewer-header">
            <div class="email-viewer-title">月度账单通知</div>
            <button class="email-viewer-close" id="officialSignClose">×</button>
        </div>
        <div class="email-viewer-body">
            <p style="margin-bottom: 15px; line-height: 1.8;">尊敬的审神者：</p>
            <p style="margin-bottom: 15px; line-height: 1.8;">本月本丸运营收支明细如下，请签名（真实姓名）以表示查阅：</p>
            <p style="margin-bottom: 10px; line-height: 1.8;">收入：</p>
            <p style="margin-left: 20px; margin-bottom: 8px; line-height: 1.8;">· 手入产出：¥12,000</p>
            <p style="margin-left: 20px; margin-bottom: 8px; line-height: 1.8;">· 远征收益：¥8,500</p>
            <p style="margin-left: 20px; margin-bottom: 8px; line-height: 1.8;">· 委托报酬：¥6,200</p>
            <p style="margin-bottom: 10px; line-height: 1.8;">支出：</p>
            <p style="margin-left: 20px; margin-bottom: 8px; line-height: 1.8;">· 刀剑男士餐食：¥5,800</p>
            <p style="margin-left: 20px; margin-bottom: 8px; line-height: 1.8;">· 修缮材料：¥4,200</p>
            <p style="margin-bottom: 15px; line-height: 1.8;">结余：¥13,200</p>
            <p style="margin-bottom: 25px; line-height: 1.8;">——时之政府财务部</p>
            <input type="text" id="officialInput" placeholder="在此输入您的名字" style="
                width: 100%;
                padding: 10px;
                background: #2a2a4a;
                border: 1px solid #3a3a5a;
                border-radius: 6px;
                color: #d4b896;
                font-size: 14px;
                margin-bottom: 15px;
                outline: none;
                font-family: inherit;
            ">
            <button id="officialConfirmBtn" style="
                padding: 8px 20px;
                background: #5a8aa3;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 13px;
            ">确认</button>
        </div>
    `;
    document.body.appendChild(viewer);

    viewer.querySelector('#officialSignClose').addEventListener('click', () => {
        viewer.remove();
    });

    viewer.querySelector('#officialConfirmBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        const input = viewer.querySelector('#officialInput');
        const name = input.value.trim();
        if (!name) return;

        officialMailSigned = true;
        viewer.remove();
        officialFloatHint.classList.remove('hidden');
    });
}

/* ============ 点击官方浮窗 ============ */
document.addEventListener('click', (e) => {
    if (!officialFloatHint.classList.contains('hidden') &&
        !e.target.closest('.official-float-hint') &&
        !e.target.closest('.a-dialog') &&
        !e.target.closest('.lottery-modal')) {
        officialFloatHint.classList.add('hidden');
        aDialogPhase = 1;
        showADialogSimple([
            "（笑眯眯的）“哎呀，本来想着跟主君聊几句的，看来来的不是时候啊。”"
        ]);
    }
});

/* ============ A对话框关闭 ============ */
aDialogClose.addEventListener('click', () => {
    aDialog.classList.add('hidden');
    aDialogOptions.innerHTML = '';
    removeADialogBlackScreen();

    if (aDialogPhase === 1) {
        aDialogPhase = 2;
        showADialogSimple([
            "“放心好了，老爷爷对真名不感兴趣呢。”",
            "基于你对他的一贯认识，你知道他没有说假话。你的心微微放下了。"
        ]);
    } else if (aDialogPhase === 2) {
        aDialogPhase = 0;
        removeADialogBlackScreen();
        if (officialEventSanityAtTrigger <= 15) {
            triggerLowSanityBranch();
        }
    }
});