// 测试脚本：在首页添加一个纯文本信息流和一个图片信息流
function testFeedStyles() {
    // 首先确保localStorage中没有现有数据
    localStorage.removeItem('posts');
    localStorage.removeItem('homeFeeds');
    
    // 创建测试数据：一个图片信息流和一个纯文本信息流
    const testPosts = [
        {
            "id": "test-image-001",
            "userId": "测试用户001",
            "content": "这是一个图片信息流测试内容，看看样式是否正确。",
            "images": [
                {
                    "id": "img-001",
                    "src": "https://picsum.photos/400/600",
                    "createdAt": "2023-09-15T10:00:00Z"
                }
            ],
            "isPublic": true,
            "createdAt": "2023-09-15T10:00:00Z"
        },
        {
            "id": "test-text-001",
            "userId": "测试用户002",
            "content": "这是一个纯文本信息流测试内容，看看样式是否与图片信息流一致。我们需要确保容器尺寸、内边距、边框圆角、阴影效果等都保持一致。",
            "images": [],
            "isPublic": true,
            "createdAt": "2023-09-15T11:00:00Z"
        }
    ];
    
    // 保存测试数据到localStorage
    localStorage.setItem('posts', JSON.stringify(testPosts));
    
    // 重新加载首页信息流
    if (typeof loadHomeFeeds === 'function') {
        loadHomeFeeds();
        console.log('测试数据已加载，现在可以查看纯文本信息流和图片信息流的样式是否一致');
    } else {
        console.log('loadHomeFeeds函数未找到，请确保在首页执行此脚本');
    }
}

// 添加一个按钮来触发测试
function addTestButton() {
    const button = document.createElement('button');
    button.textContent = '测试信息流样式';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#ff6b6b';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '8px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '9999';
    button.onclick = testFeedStyles;
    
    document.body.appendChild(button);
}

// 页面加载完成后添加测试按钮
document.addEventListener('DOMContentLoaded', addTestButton);
