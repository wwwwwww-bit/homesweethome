/* ============ 备忘录打开 ============ */
function showMemoList() {
    memoEditor.classList.add('hidden');
    memoList.classList.remove('hidden');

    memoList.innerHTML = '';

    if (memos.length === 0) {
        memoList.innerHTML = '<p style="color: #666; text-align: center; margin-top: 40px;">（空）</p>';
        return;
    }

    memos.forEach((memo, index) => {
        const div = document.createElement('div');
        div.className = 'memo-item';
        div.dataset.index = index;
        div.innerHTML = `
            <div class="memo-item-preview">${memo.content.substring(0, 30)}${memo.content.length > 30 ? '...' : ''}</div>
            <div class="memo-item-date">${memo.date}</div>
        `;

        div.addEventListener('click', () => {
            showMemoActionMenu(index);
        });

        memoList.appendChild(div);
    });
}

/* ============ 新建备忘录 ============ */
memoNewBtn.addEventListener('click', () => {
    editingMemoIndex = -1;
    memoTextarea.value = "";
    memoList.classList.add('hidden');
    memoEditor.classList.remove('hidden');
});

/* ============ 保存备忘录 ============ */
memoSaveBtn.addEventListener('click', () => {
    const content = memoTextarea.value.trim();
    if (!content) return;

    const now = new Date();
    const dateStr = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (editingMemoIndex === -1) {
        memos.unshift({ content, date: dateStr });
    } else {
        memos[editingMemoIndex].content = content;
        memos[editingMemoIndex].date = dateStr;
    }

    pureGameEndingPossible = false;
    showMemoList();
});

/* ============ 取消编辑 ============ */
memoCancelBtn.addEventListener('click', () => {
    showMemoList();
});

/* ============ 备忘录操作菜单 ============ */
function showMemoActionMenu(index) {
    const memo = memos[index];

    const menu = document.createElement('div');
    menu.className = 'memo-action-menu';
    menu.innerHTML = `
        <div class="memo-action-menu-bg"></div>
        <div class="memo-action-menu-box">
            <div class="memo-action-title">备忘录</div>
            <div class="memo-action-content">${memo.content}</div>
            <div class="memo-action-buttons">
                <button class="memo-action-btn edit" data-action="edit">编辑</button>
                <button class="memo-action-btn delete" data-action="delete">删除</button>
                <button class="memo-action-btn cancel" data-action="cancel">取消</button>
            </div>
        </div>
    `;
    document.body.appendChild(menu);

    menu.addEventListener('click', (e) => {
        const action = e.target.dataset.action;

        if (action === 'edit') {
            editingMemoIndex = index;
            memoTextarea.value = memo.content;
            memoList.classList.add('hidden');
            memoEditor.classList.remove('hidden');
            menu.remove();
        } else if (action === 'delete') {
            memos.splice(index, 1);
            showMemoList();
            menu.remove();
        } else {
            menu.remove();
        }
    });
}