// 测试信息流功能的脚本
// 这个脚本用于测试首页是否只显示公开内容

// 测试数据：模拟不同用户发布的各种类型内容
const testPosts = [
    // 用户1：纯文本内容，公开
    {
        id: Date.now() + 1,
        userId: "用户001",
        content: "这是一段纯文本内容，来自用户001",
        visibility: "forever",
        createdAt: new Date().toISOString(),
        isPublic: true,
        images: []
    },
    // 用户2：图片内容，公开
    {
        id: Date.now() + 2,
        userId: "用户002",
        content: "",
        visibility: "forever",
        createdAt: new Date().toISOString(),
        isPublic: true,
        images: [
            {
                src: "data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='200' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='24' fill='%23333'%3E测试图片%3C/text%3E%3C/svg%3E",
                name: "test-image-1.svg",
                type: "image/svg+xml"
            }
        ]
    },
    // 用户3：图文内容，公开
    {
        id: Date.now() + 3,
        userId: "用户003",
        content: "这是图文结合的内容，来自用户003",
        visibility: "forever",
        createdAt: new Date().toISOString(),
        isPublic: true,
        images: [
            {
                src: "data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='200' height='200' fill='%23e0e0e0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='24' fill='%23555'%3E图文测试%3C/text%3E%3C/svg%3E",
                name: "test-image-2.svg",
                type: "image/svg+xml"
            }
        ]
    },
    // 用户4：纯文本内容，非公开（私密）
    {
        id: Date.now() + 4,
        userId: "用户004",
        content: "这是一段私密的纯文本内容，不应该在首页显示",
        visibility: "forever",
        createdAt: new Date().toISOString(),
        isPublic: false,
        images: []
    },
    // 用户5：过期内容（模拟已过期的内容）
    {
        id: Date.now() + 5,
        userId: "用户005",
        content: "这是一段已过期的内容，不应该在首页显示",
        visibility: "1day",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2天前发布
        isPublic: false, // 已过期，设为非公开
        images: []
    }
];

// 将测试数据保存到localStorage
function setupTestData() {
    localStorage.setItem('posts', JSON.stringify(testPosts));
    console.log("测试数据已加载完成！");
    console.log("\n测试数据详情：");
    console.log("1. 用户001：纯文本内容，公开");
    console.log("2. 用户002：图片内容，公开");
    console.log("3. 用户003：图文内容，公开");
    console.log("4. 用户004：纯文本内容，私密（不应该显示）");
    console.log("5. 用户005：过期内容（不应该显示）");
    console.log("\n请刷新首页查看效果！");
}

// 清除测试数据
function clearTestData() {
    localStorage.removeItem('posts');
    localStorage.removeItem('homeFeeds');
    console.log("测试数据已清除！");
}

// 手动触发过期检查
function checkExpiredPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const now = new Date();
    
    const updatedPosts = posts.map(post => {
        const createdAt = new Date(post.createdAt);
        let expiryTime = null;
        
        switch (post.visibility) {
            case '1day':
                expiryTime = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);
                break;
            case '3days':
                expiryTime = new Date(createdAt.getTime() + 3 * 24 * 60 * 60 * 1000);
                break;
            default:
                return post;
        }
        
        if (now > expiryTime) {
            console.log(`帖子 ${post.id} 已过期，转为私密`);
            return { ...post, isPublic: false };
        }
        return post;
    });
    
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    console.log("过期帖子检查完成！");
}

// 测试首页加载逻辑
function testHomeFeed() {
    // 首先设置测试数据
    setupTestData();
    
    // 检查过期帖子
    checkExpiredPosts();
    
    // 模拟首页加载逻辑
    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const publicPosts = allPosts.filter(post => post.isPublic === true);
    
    console.log(`\n首页应该显示 ${publicPosts.length} 个公开内容：`);
    publicPosts.forEach((post, index) => {
        const type = post.images && post.images.length > 0 ? 
            (post.content ? "图文" : "图片") : "纯文本";
        console.log(`${index + 1}. 用户 ${post.userId}：${type} 内容`);
    });
    
    // 更新首页数据
    localStorage.setItem('homeFeeds', JSON.stringify(publicPosts));
    console.log("\n测试完成！请刷新首页查看效果。");
}

// 在控制台中运行这些函数来测试：
// testHomeFeed() - 设置测试数据并运行测试
// clearTestData() - 清除所有测试数据

// 将函数暴露到全局，以便在控制台中调用
window.testHomeFeed = testHomeFeed;
window.clearTestData = clearTestData;
window.setupTestData = setupTestData;
window.checkExpiredPosts = checkExpiredPosts;

// 只在localStorage中没有帖子数据时才自动设置测试数据
if (!localStorage.getItem('posts')) {
    setupTestData();
}

console.log("\n=== 信息流测试脚本已加载 ===");
console.log("可用命令：");
console.log("- testHomeFeed() : 设置测试数据并运行完整测试");
console.log("- clearTestData() : 清除所有测试数据");
console.log("- setupTestData() : 仅设置测试数据");
console.log("- checkExpiredPosts() : 手动检查过期帖子");
console.log("===============================");
