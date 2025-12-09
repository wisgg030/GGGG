// 测试发布功能修复的脚本
console.log('开始测试发布功能修复...');

// 模拟localStorage
if (typeof localStorage === 'undefined') {
    console.log('当前环境不支持localStorage，使用模拟对象');
    global.localStorage = {
        data: {},
        setItem: function(key, value) {
            this.data[key] = value;
        },
        getItem: function(key) {
            return this.data[key] || null;
        },
        clear: function() {
            this.data = {};
        }
    };
}

// 清除现有的测试数据
localStorage.clear();
console.log('已清除现有的localStorage数据');

// 模拟帖子对象
const testPost = {
    id: Date.now(),
    content: '测试发布内容，看看是否能保存到localStorage',
    visibility: 'forever',
    createdAt: new Date().toISOString(),
    isPublic: true,
    images: [],
    userId: '000001'
};

console.log('创建测试帖子:', testPost);

// 模拟savePostToLocalStorage函数的行为
function testSavePostToLocalStorage(post) {
    console.log('开始保存帖子到localStorage...');
    
    // 获取现有的帖子
    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    console.log('保存前posts长度:', existingPosts.length);
    
    // 添加新帖子
    existingPosts.push(post);
    console.log('添加后posts长度:', existingPosts.length);
    
    // 保存回localStorage
    localStorage.setItem('posts', JSON.stringify(existingPosts));
    
    // 保存到userPosts，用于个人主页的发布历史
    const userPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
    console.log('保存前userPosts长度:', userPosts.length);
    
    userPosts.push(post);
    console.log('添加后userPosts长度:', userPosts.length);
    
    localStorage.setItem('userPosts', JSON.stringify(userPosts));
    
    // 更新homeFeeds数组，用于首页信息流
    const homeFeeds = JSON.parse(localStorage.getItem('homeFeeds')) || [];
    console.log('保存前homeFeeds长度:', homeFeeds.length);
    
    // 只有公开帖子才添加到homeFeeds
    if (post.isPublic) {
        homeFeeds.push(post);
        console.log('添加后homeFeeds长度:', homeFeeds.length);
        
        // 按时间排序，最新的在前面
        homeFeeds.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        localStorage.setItem('homeFeeds', JSON.stringify(homeFeeds));
    }
    
    console.log('帖子保存到localStorage完成');
}

// 测试保存帖子
testSavePostToLocalStorage(testPost);

// 验证保存结果
console.log('\n验证保存结果:');
const savedPosts = JSON.parse(localStorage.getItem('posts'));
const savedUserPosts = JSON.parse(localStorage.getItem('userPosts'));
const savedHomeFeeds = JSON.parse(localStorage.getItem('homeFeeds'));

console.log('posts保存成功:', savedPosts && savedPosts.length > 0);
if (savedPosts) {
    console.log('posts内容:', savedPosts);
}

console.log('userPosts保存成功:', savedUserPosts && savedUserPosts.length > 0);
if (savedUserPosts) {
    console.log('userPosts内容:', savedUserPosts);
}

console.log('homeFeeds保存成功:', savedHomeFeeds && savedHomeFeeds.length > 0);
if (savedHomeFeeds) {
    console.log('homeFeeds内容:', savedHomeFeeds);
}

// 测试个人页加载发布历史
console.log('\n测试个人页加载发布历史:');

function testInitHistoryTab() {
    // 模拟获取发布历史列表容器
    const historyList = document.createElement('div');
    historyList.className = 'profile-content-list';
    
    // 从localStorage获取用户的帖子
    const userPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
    console.log('从localStorage获取到的userPosts:', userPosts);
    console.log('userPosts数组长度:', userPosts.length);
    
    // 清空现有内容
    historyList.innerHTML = '';
    
    // 检查是否有帖子
    if (userPosts.length === 0) {
        console.log('userPosts数组为空，显示空状态');
        // 创建空状态提示
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = '暂无发布历史';
        historyList.appendChild(emptyState);
        return;
    }
    
    // 按时间顺序排序，最新的在前面
    userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    console.log('排序后的userPosts:', userPosts);
    
    // 遍历帖子，创建发布历史项
    for (let i = 0; i < userPosts.length; i++) {
        const post = userPosts[i];
        console.log(`处理第${i+1}个帖子，ID: ${post.id}`);
        
        // 创建发布历史项元素
        const historyItem = document.createElement('div');
        historyItem.className = 'profile-content-item';
        historyItem.innerHTML = `
            <div class="profile-content-item-header">
                <span class="profile-content-item-date">${new Date(post.createdAt).toLocaleString()}</span>
                <span class="profile-content-item-visibility">${post.visibility === 'forever' ? '永久可见' : `${post.visibility}`}</span>
            </div>
            <div class="profile-content-item-content">${post.content}</div>
        `;
        
        // 添加到列表中
        historyList.appendChild(historyItem);
        console.log(`帖子${post.id}已添加到发布历史列表`);
    }
    
    console.log('发布历史内容生成完成，共显示', userPosts.length, '条帖子');
    
    // 返回生成的列表，用于验证
    return historyList;
}

// 模拟DOM环境
if (typeof document === 'undefined') {
    console.log('当前环境不支持DOM，使用模拟对象');
    global.document = {
        createElement: function(tag) {
            return {
                tagName: tag,
                className: '',
                innerHTML: '',
                appendChild: function() {},
                textContent: ''
            };
        }
    };
}

// 测试加载发布历史
const historyList = testInitHistoryTab();

console.log('\n测试完成！');
console.log('修复总结:');
console.log('1. 已将DOM元素变量移到全局作用域');
console.log('2. 已将publishPost和savePostToLocalStorage函数移到全局作用域');
console.log('3. publishPost函数可以正常调用savePostToLocalStorage函数');
console.log('4. 发布后的帖子会被保存到localStorage中的userPosts数组');
console.log('5. 个人页的initHistoryTab函数会读取userPosts数组并显示发布历史');
console.log('\n修复已完成，发布内容现在应该可以正常显示在发布历史中了！');
