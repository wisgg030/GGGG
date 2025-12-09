// 简单测试发布历史功能
console.log('=== 简单测试发布历史功能 ===');

// 1. 添加测试数据
const testPosts = [
    {
        id: 'post-1',
        userId: '000001',
        content: '这是第一条测试发布的内容',
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
console.log('✅ 已添加测试数据到userPosts localStorage');

// 2. 直接调用initHistoryTab函数
setTimeout(() => {
    console.log('✅ 准备调用initHistoryTab函数');
    initHistoryTab();
    console.log('✅ initHistoryTab函数调用完成');
}, 1000);

// 3. 检查是否有JavaScript错误
window.addEventListener('error', function(e) {
    console.error('❌ JavaScript错误:', e.error);
    console.error('错误堆栈:', e.error.stack);
});

console.log('=== 简单测试完成 ===');