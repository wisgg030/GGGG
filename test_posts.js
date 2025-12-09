// 测试localStorage的保存和读取功能
console.log('开始测试localStorage功能...');

// 测试数据
const testPost = {
    id: 'test-' + Date.now(),
    content: '测试发布内容',
    userId: '000001',
    createdAt: new Date().toISOString(),
    isPublic: true
};

console.log('测试帖子数据:', testPost);

// 测试保存功能
console.log('\n1. 测试保存到localStorage...');

// 保存到posts
const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
existingPosts.push(testPost);
localStorage.setItem('posts', JSON.stringify(existingPosts));
console.log('   - posts保存成功:', localStorage.getItem('posts') ? '是' : '否');

// 保存到userPosts
const userPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
userPosts.push(testPost);
localStorage.setItem('userPosts', JSON.stringify(userPosts));
console.log('   - userPosts保存成功:', localStorage.getItem('userPosts') ? '是' : '否');

// 保存到homeFeeds
const homeFeeds = JSON.parse(localStorage.getItem('homeFeeds')) || [];
homeFeeds.push(testPost);
localStorage.setItem('homeFeeds', JSON.stringify(homeFeeds));
console.log('   - homeFeeds保存成功:', localStorage.getItem('homeFeeds') ? '是' : '否');

// 测试读取功能
console.log('\n2. 测试从localStorage读取...');

// 读取posts
const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
console.log('   - posts数量:', savedPosts.length);
console.log('   - 最新posts:', savedPosts[savedPosts.length - 1]);

// 读取userPosts
const savedUserPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
console.log('   - userPosts数量:', savedUserPosts.length);
console.log('   - 最新userPosts:', savedUserPosts[savedUserPosts.length - 1]);

// 读取homeFeeds
const savedHomeFeeds = JSON.parse(localStorage.getItem('homeFeeds')) || [];
console.log('   - homeFeeds数量:', savedHomeFeeds.length);
console.log('   - 最新homeFeeds:', savedHomeFeeds[savedHomeFeeds.length - 1]);

// 测试数据一致性
console.log('\n3. 测试数据一致性...');
const lastPostId = savedPosts[savedPosts.length - 1].id;
const lastUserPostId = savedUserPosts[savedUserPosts.length - 1].id;
const lastHomeFeedId = savedHomeFeeds[savedHomeFeeds.length - 1].id;

console.log('   - posts最后一项ID:', lastPostId);
console.log('   - userPosts最后一项ID:', lastUserPostId);
console.log('   - homeFeeds最后一项ID:', lastHomeFeedId);
console.log('   - 所有ID一致:', lastPostId === lastUserPostId && lastUserPostId === lastHomeFeedId ? '是' : '否');

console.log('\n测试完成！');
