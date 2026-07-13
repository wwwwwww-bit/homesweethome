/* ============ 事件收集弹窗 ============ */
function showEventCollectionModal() {
    const eventNames = [
        { id: 'event1', name: '事件1：要来光明正大的来嘛，偷偷摸摸的像什么样' },
        { id: 'event2', name: '事件2：某刃 is watching you' },
        { id: 'event3', name: '事件3：可喜可贺、可口可乐' },
        { id: 'event4', name: '事件4：时之政府退休刃员返聘计划' },
        { id: 'event5', name: '事件5：叮~您的神域邀请函请查收~' }
    ];

    const eventStates = [
        chatEventShown || false,
        event2ChatShown || false,
        event3ChatShown || false,
        event4ChatShown || false,
        event5ChatShown || false
    ];

    const modal = document.createElement('div');
    modal.className = 'ending-modal';
    modal.innerHTML = `
        <div class="ending-modal-bg"></div>
        <div class="ending-modal-box">
            <div class="ending-modal-header">
                <span>📜 事件收集</span>
                <button class="ending-modal-close">×</button>
            </div>
            <div class="ending-modal-body">
                ${eventNames.map((evt, index) => `
                    <div class="event-entry ${eventStates[index] ? 'unlocked' : 'locked'}">
                        <span class="event-num">事件${index + 1}</span>
                        <span class="event-name">${eventStates[index] ? evt.name : '？？？'}</span>
                    </div>
                `).join('')}
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