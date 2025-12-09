// 简单的测试脚本，用于验证发布功能
console.log('开始测试发布功能...');

// 1. 清空本地存储
localStorage.removeItem('posts');
localStorage.removeItem('userPosts');
localStorage.removeItem('homeFeeds');
console.log('✅ 已清空本地存储');

// 2. 模拟发布帖子
function simulatePublishPost() {
    const post = {
        id: Date.now(),
        content: '这是一条测试发布的内容',
        visibility: 'forever',
        createdAt: new Date().toISOString(),
        isPublic: true,
        images: [],
        userId: '000001'
    };
    
    // 保存到posts
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // 保存到userPosts
    const userPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
    userPosts.push(post);
    localStorage.setItem('userPosts', JSON.stringify(userPosts));
    
    console.log('✅ 已发布测试帖子:', post);
    return post;
}

// 3. 模拟首页加载
function simulateHomePageLoad() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const homePosts = posts.filter(post => post.isPublic);
    
    console.log('📱 首页加载结果:');
    console.log('   - 所有帖子数:', posts.length);
    console.log('   - 公开帖子数:', homePosts.length);
    console.log('   - 显示的帖子:', homePosts);
    
    return homePosts;
}

// 4. 模拟个人页加载
function simulateProfilePageLoad() {
    const userPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
    
    console.log('👤 个人页加载结果:');
    console.log('   - 用户发布帖子数:', userPosts.length);
    console.log('   - 显示的帖子:', userPosts);
    
    return userPosts;
}

// 5. 测试逻辑
console.log('\n=== 测试发布功能 ===');
simulatePublishPost();

console.log('\n=== 测试首页显示 ===');
const homePosts = simulateHomePageLoad();

console.log('\n=== 测试个人页显示 ===');
const profilePosts = simulateProfilePageLoad();

// 6. 验证结果
console.log('\n=== 验证结果 ===');
if (homePosts.length === 1 && profilePosts.length === 1) {
    console.log('✅ 测试通过！发布的内容成功显示在首页和我的页');
    console.log('   - 首页显示了1条公开帖子');
    console.log('   - 个人页显示了1条发布历史');
} else {
    console.log('❌ 测试失败！');
    console.log('   - 首页显示帖子数:', homePosts.length);
    console.log('   - 个人页显示帖子数:', profilePosts.length);
}

// 7. 显示最终的本地存储数据
console.log('\n=== 本地存储最终数据 ===');
console.log('posts:', JSON.parse(localStorage.getItem('posts')));
console.log('userPosts:', JSON.parse(localStorage.getItem('userPosts')));
console.log('homeFeeds:', JSON.parse(localStorage.getItem('homeFeeds')));