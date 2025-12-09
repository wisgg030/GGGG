// 直接测试initHistoryTab函数
console.log('=== 直接测试initHistoryTab函数 ===');

// 1. 确保DOM已加载
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runTest);
} else {
    runTest();
}

function runTest() {
    // 2. 添加测试数据
    const testPosts = [
        {
            id: 'post-1',
            userId: '000001',
            content: '这是测试内容1',
            images: [],
            visibility: 'forever',
            createdAt: new Date().toISOString(),
            isPublic: true,
            expireAt: null,
            likes: 0,
            pats: 0,
            favorites: 0
        }
    ];
    localStorage.setItem('userPosts', JSON.stringify(testPosts));
    console.log('✅ 已添加测试数据');
    
    // 3. 获取发布历史列表容器
    const historyList = document.querySelector('#historyContent .profile-content-list');
    if (historyList) {
        console.log('✅ 找到发布历史列表容器');
        
        // 4. 清空现有内容
        historyList.innerHTML = '';
        console.log('✅ 已清空现有内容');
        
        // 5. 直接调用initHistoryTab函数
        try {
            console.log('✅ 调用initHistoryTab函数');
            initHistoryTab();
            console.log('✅ initHistoryTab函数调用成功');
        } catch (error) {
            console.error('❌ initHistoryTab函数调用失败:', error);
        }
    } else {
        console.error('❌ 未找到发布历史列表容器');
    }
}

// 监听JavaScript错误
window.addEventListener('error', function(e) {
    console.error('❌ JavaScript错误:', e.error);
    console.error('错误堆栈:', e.error.stack);
});

console.log('=== 测试脚本加载完成 ===');