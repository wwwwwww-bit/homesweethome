/* ============ 开机密码弹窗 ============ */
function showBootPasswordModal() {
    const modal = document.createElement('div');
    modal.className = 'boot-password-modal';
    modal.id = 'bootPasswordModal';
    modal.innerHTML = `
        <div class="boot-password-bg"></div>
        <div class="boot-password-box">
            <div class="boot-password-header">系统登录</div>
            <div class="boot-password-body">
                <div style="position: relative; margin-bottom: 15px;">
                    <input type="password" id="bootPasswordInput" placeholder="请输入开机密码" style="
                        width: 100%;
                        padding: 12px 38px 12px 12px;
                        background: #2a2a4a;
                        border: 1px solid #3a3a5a;
                        border-radius: 6px;
                        color: #d4b896;
                        font-size: 14px;
                        outline: none;
                        font-family: inherit;
                        box-sizing: border-box;
                    ">
                    <button type="button" id="togglePasswordVisibility" style="
                        position: absolute;
                        right: 6px;
                        top: 50%;
                        transform: translateY(-50%);
                        background: none;
                        border: none;
                        cursor: pointer;
                        padding: 2px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #888;
                    " aria-label="显示/隐藏密码" title="显示/隐藏密码">
                        <!-- 睁眼 -->
                        <svg id="eyeOpenSvg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                        <!-- 闭眼 -->
                        <svg id="eyeSlashSvg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.08 18.08 0 014.24-5.56"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.08 18.08 0 01-4.24 5.56"/><line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                    </button>
                </div>
                <div id="passwordError" style="color: #c97b7b; font-size: 13px; margin-bottom: 15px; display: none;">
                    密码错误，请重试。
                </div>
                <button id="bootPasswordSubmit" style="
                    width: 100%;
                    padding: 10px;
                    background: #5a8aa3;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 13px;
                    margin-bottom: 15px;
                ">确认</button>
                <a href="#" id="forgotPasswordLink" style="color: #7ec8e3; font-size: 13px; text-decoration: none; display: block; text-align: center;">忘记密码？</a>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const input = modal.querySelector('#bootPasswordInput');
    const error = modal.querySelector('#passwordError');
    const submitBtn = modal.querySelector('#bootPasswordSubmit');
    const forgotLink = modal.querySelector('#forgotPasswordLink');

    // 眼睛切换
    const toggleBtn = modal.querySelector('#togglePasswordVisibility');
    const eyeOpen = modal.querySelector('#eyeOpenSvg');
    const eyeSlash = modal.querySelector('#eyeSlashSvg');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (input.type === 'password') {
                input.type = 'text';
                eyeOpen.style.display = 'none';
                eyeSlash.style.display = 'block';
            } else {
                input.type = 'password';
                eyeOpen.style.display = 'block';
                eyeSlash.style.display = 'none';
            }
            input.focus();
        });
    }

    // 自动聚焦
    setTimeout(() => input.focus(), 100);

    // 彩蛋密码列表
    const easterEggPasswords = ['djlw', 'tklb', 'daolove'];

    // 提交密码
    const submitPassword = () => {
        const password = input.value.trim().toLowerCase();

        if (easterEggPasswords.includes(password)) {
            error.style.color = '#7ec8e3';
            error.textContent = '试试看点击忘记密码呢？';
            error.style.display = 'block';
            input.value = '';
            input.focus();
        } else {
            error.style.color = '#c97b7b';
            error.textContent = '密码错误，请重试。';
            error.style.display = 'block';
            input.value = '';
            input.focus();
        }
    };

    submitBtn.addEventListener('click', submitPassword);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitPassword();
        }
    });

    // 忘记密码 → 选择题
    forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.remove();
        showInitialSwordSelection();
    });
}

/* ============ 初始刀选择 ============ */
function showInitialSwordSelection() {
    const modal = document.createElement('div');
    modal.className = 'boot-password-modal';
    modal.id = 'swordSelectModal';
    modal.innerHTML = `
        <div class="boot-password-bg"></div>
        <div class="boot-password-box">
            <div class="boot-password-header">找回密码</div>
            <div class="boot-password-body">
                <p style="color: #d4b896; margin-bottom: 20px; line-height: 1.8;">密保问题：你的初始刀是……？</p>
                <div id="swordOptions" style="display: flex; flex-direction: column; gap: 10px;">
                    <button class="sword-option" data-sword="加州清光">加州清光</button>
                    <button class="sword-option" data-sword="歌仙兼定">歌仙兼定</button>
                    <button class="sword-option" data-sword="陆奥守吉行">陆奥守吉行</button>
                    <button class="sword-option" data-sword="山姥切国广">山姥切国广</button>
                    <button class="sword-option" data-sword="蜂须贺虎彻">蜂须贺虎彻</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelectorAll('.sword-option').forEach(btn => {
        btn.style.cssText = `
            padding: 12px;
            background: #2a2a4a;
            border: 1px solid #3a3a5a;
            border-radius: 6px;
            color: #d4b896;
            font-size: 14px;
            cursor: pointer;
            text-align: left;
            font-family: inherit;
        `;

        btn.addEventListener('mouseenter', () => {
            btn.style.background = '#3a3a5a';
            btn.style.borderColor = '#5a8aa3';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.background = '#2a2a4a';
            btn.style.borderColor = '#3a3a5a';
        });

        btn.addEventListener('click', () => {
            playerInitialSword = btn.dataset.sword;
            modal.remove();
            hasBooted = true;

            // 显示桌面
            document.querySelector('.desktop-icons').style.display = 'flex';
            document.querySelector('.status-bar').style.display = 'block';
        });
    });
}

// ============ 开机流程控制 ============
if (!hasBooted) {
    document.querySelector('.desktop-icons').style.display = 'none';
    document.querySelector('.status-bar').style.display = 'none';

    setTimeout(() => {
        showBootPasswordModal();
    }, 500);
}