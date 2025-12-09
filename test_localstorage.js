// 测试localStorage中的发布历史数据
console.log('=== 测试localStorage中的发布历史数据 ===');

// 检查localStorage中的userPosts
try {
    const userPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
    console.log('userPosts数据:', userPosts);
    console.log('userPosts长度:', userPosts.length);
    
    if (userPosts.length === 0) {
        console.log('userPosts为空');
        
        // 检查posts数据
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        console.log('posts数据:', posts);
        console.log('posts长度:', posts.length);
        
        // 检查homeFeeds数据
        const homeFeeds = JSON.parse(localStorage.getItem('homeFeeds')) || [];
        console.log('homeFeeds数据:', homeFeeds);
        console.log('homeFeeds长度:', homeFeeds.length);
    } else {
        // 检查第一个帖子的结构
        console.log('第一个帖子的结构:', userPosts[0]);
    }
} catch (error) {
    console.error('读取localStorage数据时出错:', error);
}

console.log('=== 测试完成 ===');