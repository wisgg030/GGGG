// 测试发布流程的完整脚本
console.log('开始测试发布流程...');

// 模拟发布一个新帖子
function testPublishFlow() {
    console.log('\n1. 开始模拟发布新帖子');
    
    // 创建模拟帖子数据
    const testPost = {
        id: 'test-post-' + Date.now(),
        content: '这是一条测试发布的内容',
        createdAt: new Date().toISOString(),
        isPublic: true,
        images: []
    };
    
    console.log('   - 创建的测试帖子:', testPost);
    
    // 模拟保存到localStorage
    console.log('\n2. 模拟保存到localStorage');
    
    // 保存到posts
    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    existingPosts.push(testPost);
    localStorage.setItem('posts', JSON.stringify(existingPosts));
    console.log('   - posts保存成功:', localStorage.getItem('posts') ? '是' : '否');
    console.log('   - 当前posts数量:', existingPosts.length);
    
    // 保存到userPosts
    const userPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
    userPosts.push(testPost);
    localStorage.setItem('userPosts', JSON.stringify(userPosts));
    console.log('   - userPosts保存成功:', localStorage.getItem('userPosts') ? '是' : '否');
    console.log('   - 当前userPosts数量:', userPosts.length);
    
    // 3. 验证数据
    console.log('\n3. 验证保存的数据');
    
    // 验证posts
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    console.log('   - 从localStorage读取的posts数量:', savedPosts.length);
    
    // 验证userPosts
    const savedUserPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
    console.log('   - 从localStorage读取的userPosts数量:', savedUserPosts.length);
    
    // 检查最后一个帖子是否是我们刚才保存的
    const lastPost = savedUserPosts[savedUserPosts.length - 1];
    console.log('   - 最后一个帖子:', lastPost);
    console.log('   - 是否是我们保存的测试帖子:', lastPost.id === testPost.id ? '是' : '否');
    
    // 4. 模拟个人页加载发布历史
    console.log('\n4. 模拟个人页加载发布历史');
    
    // 模拟initHistoryTab函数的核心逻辑
    const mockHistoryList = {
        innerHTML: '',
        appendChild: function(element) {
            console.log('   - 模拟添加历史项到列表:', element);
        }
    };
    
    console.log('   - 模拟清空现有内容');
    mockHistoryList.innerHTML = '';
    
    console.log('   - 检查userPosts数组长度:', savedUserPosts.length);
    
    if (savedUserPosts.length === 0) {
        console.log('   - userPosts数组为空，显示空状态');
    } else {
        console.log('   - 对userPosts数组进行时间倒序排序');
        savedUserPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        console.log('   - 开始动态生成发布历史内容');
        savedUserPosts.forEach((post, index) => {
            console.log(`   - 处理第${index + 1}个帖子:`, post.id);
            // 模拟创建历史项
            const mockHistoryItem = { id: post.id, content: post.content };
            console.log(`   - 创建的历史项:`, mockHistoryItem);
            mockHistoryList.appendChild(mockHistoryItem);
        });
        console.log('   - 发布历史内容生成完成');
    }
    
    console.log('\n5. 测试完成');
    console.log('✅ 发布流程测试完成！');
    console.log('\n建议：');
    console.log('   - 访问 publish.html 尝试真实发布一条内容');
    console.log('   - 然后访问 profile.html 查看发布历史是否显示');
    console.log('   - 在浏览器控制台中查看详细日志信息');
}

// 运行测试
testPublishFlow();
