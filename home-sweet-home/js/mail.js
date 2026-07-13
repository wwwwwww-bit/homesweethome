/* ============ 邮箱图标点击 ============ */
iconMail.addEventListener('click', () => {
    mailWindow.classList.remove('hidden');
    mailBadge.classList.add('hidden');
    renderMailListDesktop();
});

/* ============ 渲染邮箱列表 ============ */
function renderMailListDesktop() {
    mailListDesktop.innerHTML = '';

    // ===== 事件3邮件（必须放在最前面）=====
    if (event3ChatShown) {
        const mailItem = document.createElement('div');
        mailItem.className = 'mail-item-desktop unread';
        mailItem.innerHTML = `
            <div class="mail-item-title-desktop">【日课】第▢▢日汇报</div>
            <div class="mail-item-sender-desktop">发件人：政府内务省</div>
        `;
        mailItem.onclick = () => {
            showEmailViewer(
                "【日课】第▢▢日汇报",
                `手入室：动了。<br>
                锻刀室：没出。<br>
                刀装室：金的、绿的、银的。<br>
                资源：花了。<br>
                内番：逃了。<br>
                安防：。<br><br>
                详情请查阅附件：<u>本丸今日日课汇报</u>`
            );
            mailItem.classList.remove('unread');
        };
        mailListDesktop.appendChild(mailItem);
    }

    // ===== 骰子解锁邮件（乱码）=====
    if (diceNotified && !diceUnlocked) {
        const diceMail = document.createElement('div');
        diceMail.className = 'mail-item-desktop';
        diceMail.innerHTML = `
            <div class="mail-item-title-desktop"> █▓▒░ ▒░▒░</div>
            <div class="mail-item-sender-desktop">发件人：▓██ ▒░▒░</div>
        `;
        diceMail.onclick = () => {
            showEmailViewer(
                " ▒░▒ ▓██ ",
                "▒░▓▒░▒ ▓█▓ ▒░▒ ▓██ ▒░▒░ ▓█▒░▒ ▓▒░▒ █▓▒░ ▒░▒░ ▓▒░▒░ ▒░▒░"
            );
            diceUnlocked = true;
            mailBadge.classList.add('hidden');
            updateUI();
        };
        mailListDesktop.appendChild(diceMail);
    }

    // ===== 官方邮件（永久保留）=====
    if (officialMailReceived) {
        const officialMail = document.createElement('div');
        officialMail.className = 'mail-item-desktop';
        officialMail.innerHTML = `
            <div class="mail-item-title-desktop">月度账单</div>
            <div class="mail-item-sender-desktop">发件人：时之政府财务部</div>
        `;
        officialMail.onclick = () => {
            mailBadge.classList.add('hidden');
            if (!officialMailSigned) {
                showOfficialSignMail();
            } else {
                showEmailViewer(
                    "月度账单",
                    "本月本丸运营收支明细：<br><br>" +
                    "收入：<br>" +
                    "· 手入产出：¥12,000<br>" +
                    "· 远征收益：¥8,500<br>" +
                    "· 委托报酬：¥6,200<br><br>" +
                    "支出：<br>" +
                    "· 刀剑男士餐食：¥5,800<br>" +
                    "· 修缮材料：¥4,200<br>" +
                    "· 近侍工资：¥3,500<br><br>" +
                    "结余：¥13,200<br><br>" +
                    "——时之政府财务部"
                );
            }
        };
        mailListDesktop.appendChild(officialMail);
    }
// ===== 事件4邮件 =====
if (event4ChatShown) {
    const mailItem = document.createElement('div');
    mailItem.className = 'mail-item-desktop unread';
    mailItem.id = 'event4Mail';
    mailItem.innerHTML = `
        <div class="mail-item-title-desktop">【定时邮件】纪念日快乐！</div>
        <div class="mail-item-sender-desktop">发件人：我</div>
        <div style="font-size:11px;color:#666;margin-top:4px;">五年前</div>
    `;
    mailItem.onclick = () => {
        showEvent4EmailViewer(mailItem);
    };
    mailListDesktop.appendChild(mailItem);
}
// ===== 事件5邮件 =====
if (event5ChatShown){
    const mailItem = renderEvent5Mail();
    if (mailItem) mailListDesktop.appendChild(mailItem);
}
    // ===== 常驻荣誉邮件 =====
    const honorMail = document.createElement('div');
    honorMail.className = 'mail-item-desktop';
    honorMail.innerHTML = `
        <div class="mail-item-title-desktop">🏆 本丸荣誉通报</div>
        <div class="mail-item-sender-desktop">发件人：时之政府纪律与监察委员会</div>
    `;
    honorMail.onclick = () => {
        showEmailViewer(
            "🏆 本丸荣誉通报",
            "恭喜！<br><br>贵本丸在本年度评选中荣获「十佳本丸」荣誉称号。<br><br>特此表彰，望再接再厉。<br><br>——时之政府纪律与监察委员会"
        );
    };
    mailListDesktop.appendChild(honorMail);

    // ===== 没有邮件时的占位 =====
    if (mailListDesktop.children.length === 0) {
        mailListDesktop.innerHTML = '<p style="color: #888; text-align: center; margin-top: 40px;">（空）</p>';
    }
}

/* ============ 邮件查看器 ============ */
function showEmailViewer(subject, content) {
    const viewer = document.createElement('div');
    viewer.className = 'email-viewer';
    viewer.innerHTML = `
        <div class="email-viewer-header">
            <div class="email-viewer-title">${subject}</div>
            <button class="email-viewer-close">×</button>
        </div>
        <div class="email-viewer-body">${content}</div>
    `;
    document.body.appendChild(viewer);

    viewer.querySelector('.email-viewer-close').addEventListener('click', () => {
        viewer.remove();
        document.querySelector('.mail-item-desktop')?.classList.add('read');

        // ✅ 关键钩子：事件3关邮件 → 弹鹤丸
        if (activeEventId === 'event3' && !event3DiscoveryShown) {
            event3DiscoveryShown = true;
            setTimeout(() => {
                showEvent3DiscoveryModal();
            }, 600);
        }
    });
}

/* ============ 骰子解锁检测 ============ */
function checkDiceUnlock() {
    if (!diceUnlocked && !diceNotified && sanity <= 35) {
        diceNotified = true;
        mailBadge.classList.remove('hidden');
        showMailHint("你收到一封新邮件。");
        updateUI();
    }
}

/* ============ 邮件提示 ============ */
function showMailHint(text) {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        top: 25%;
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