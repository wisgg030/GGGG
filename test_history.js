// 测试发布历史功能
console.log('=== 测试发布历史功能 ===');

// 1. 清空localStorage
localStorage.removeItem('userPosts');
console.log('✅ 已清空userPosts localStorage');

// 2. 添加测试数据
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
    },
    {
        id: 'post-2',
        userId: '000001',
        content: '这是第二条测试发布的内容',
        images: [{ src: 'https://via.placeholder.com/150' }],
        visibility: 'forever',
        createdAt: new Date(Date.now() + 1000).toISOString(),
        isPublic: true,
        expireAt: null,
        likes: 0,
        pats: 0,
        favorites: 0
    }
];
localStorage.setItem('userPosts', JSON.stringify(testPosts));
console.log('✅ 已添加测试数据到userPosts localStorage');

// 3. 获取发布历史的列表容器
const historyList = document.querySelector('#historyContent .profile-content-list');
if (!historyList) {
    console.error('❌ 发布历史列表容器未找到');
} else {
    console.log('✅ 找到发布历史列表容器:', historyList);
    
    // 4. 从localStorage获取用户发布的内容
    let userPosts = localStorage.getItem('userPosts');
    console.log('✅ 从localStorage获取到的原始userPosts数据:', userPosts);
    
    userPosts = userPosts ? JSON.parse(userPosts) : [];
    console.log('✅ 解析后的userPosts数组:', userPosts);
    console.log('✅ userPosts数组长度:', userPosts.length);
    
    // 5. 清空现有内容
    historyList.innerHTML = '';
    console.log('✅ 清空现有发布历史内容');
    
    // 6. 如果没有发布内容，显示空状态
    if (userPosts.length === 0) {
        console.log('✅ userPosts数组为空，显示空状态');
        showEmptyState('historyContent', '什么都没有，莫非你就是传说中的宇宙幸运王？');
    } else {
        // 7. 按时间倒序排序，最新的在前面
        console.log('✅ 对userPosts数组进行时间倒序排序');
        userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log('✅ 排序后的userPosts数组:', userPosts);
        
        // 8. 动态生成发布历史内容
        console.log('✅ 开始动态生成发布历史内容');
        userPosts.forEach((post, index) => {
            console.log(`✅ 处理第${index + 1}个帖子:`, post);
            const historyItem = createHistoryItem(post);
            console.log('✅ 创建的历史项:', historyItem);
            historyList.appendChild(historyItem);
            console.log('✅ 已添加历史项到列表');
        });
        console.log('✅ 发布历史内容生成完成');
    }
}

console.log('=== 测试完成 ===');