// 测试发布功能的脚本
console.log('========================================');
console.log('开始测试发布功能');

// 模拟发布内容
function testPublish() {
    console.log('\n1. 模拟发布纯文本内容');
    
    // 创建模拟的发布数据
    const testPost = {
        id: Date.now(),
        userId: '000001',
        content: '测试发布内容：这是一条纯文本动态',
        visibility: 'forever',
        createdAt: new Date().toISOString(),
        isPublic: true,
        images: []
    };
    
    // 保存到localStorage
    saveTestPost(testPost);
    
    console.log('2. 模拟发布带图片的内容');
    
    // 创建带图片的模拟发布数据
    const testPostWithImage = {
        id: Date.now() + 1,
        userId: '000001',
        content: '测试发布内容：这是一条带图片的动态',
        visibility: 'forever',
        createdAt: new Date().toISOString(),
        isPublic: true,
        images: [{
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
            name: 'test-image.png',
            type: 'image/png'
        }]
    };
    
    // 保存到localStorage
    saveTestPost(testPostWithImage);
    
    console.log('\n✅ 测试发布完成！');
    console.log('\n3. 验证保存结果：');
    
    // 检查localStorage中的数据
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const userPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
    const homeFeeds = JSON.parse(localStorage.getItem('homeFeeds')) || [];
    
    console.log(`   - posts总数: ${posts.length}`);
    console.log(`   - userPosts总数: ${userPosts.length}`);
    console.log(`   - homeFeeds总数: ${homeFeeds.length}`);
    
    // 显示最近发布的内容
    console.log('\n4. 最近发布的内容：');
    if (posts.length > 0) {
        const recentPosts = posts.slice(-2).reverse();
        recentPosts.forEach((post, index) => {
            console.log(`   ${index + 1}. ${post.content}`);
            console.log(`      - ID: ${post.id}`);
            console.log(`      - 时间: ${new Date(post.createdAt).toLocaleString()}`);
            console.log(`      - 公开: ${post.isPublic ? '是' : '否'}`);
            console.log(`      - 图片: ${post.images.length > 0 ? '有' : '无'}`);
        });
    }
    
    console.log('\n========================================');
    console.log('测试结束！请刷新首页和个人主页查看效果。');
}

// 保存测试帖子到localStorage
function saveTestPost(post) {
    // 保存到posts
    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    existingPosts.push(post);
    localStorage.setItem('posts', JSON.stringify(existingPosts));
    
    // 保存到userPosts
    const userPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
    userPosts.push(post);
    localStorage.setItem('userPosts', JSON.stringify(userPosts));
    
    // 只有公开帖子才保存到homeFeeds
    if (post.isPublic) {
        const homeFeeds = JSON.parse(localStorage.getItem('homeFeeds')) || [];
        homeFeeds.push(post);
        // 按时间排序
        homeFeeds.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        localStorage.setItem('homeFeeds', JSON.stringify(homeFeeds));
    }
}

// 运行测试
testPublish();
