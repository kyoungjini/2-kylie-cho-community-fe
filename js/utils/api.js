// 게시글 데이터를 불러오는 함수
export async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        return posts.slice(0, 10).map(post => ({
            postId: post.id,
            title: post.title,
            author: `작성자 ${post.userId}`,
            createdAt: new Date().toLocaleString(),
            likeCount: Math.floor(Math.random() * 100),
            commentCount: Math.floor(Math.random() * 20),
            viewCount: Math.floor(Math.random() * 200),
            content: post.body,
            image: post.id % 2 === 0 ? "./assets/images/merong_minion.jpeg" : null
        }));
    } catch (error) {
        console.error('게시글을 불러오는데 실패했습니다:', error);
        return [];
    }
}

// 댓글 데이터를 불러오는 함수
export async function fetchComments(postId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const comments = await response.json();
        return comments.map(comment => ({
            author: comment.email.split('@')[0],
            createdAt: new Date().toLocaleString(),
            content: comment.body
        }));
    } catch (error) {
        console.error('댓글을 불러오는데 실패했습니다:', error);
        return [];
    }
} 