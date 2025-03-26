import { showPage } from '../main.js';
import { getPosts, getPostById, createPost, updatePost, deletePost } from '../api/postApi.js';
import { API_BASE_URL } from '../api/config.js';

let currentPost = null;

// 게시글 목록 로드
export async function loadPosts() {
    try {
        const posts = await getPosts();
        displayPosts(posts);
    } catch (error) {
        console.error('게시글 목록 로드 에러:', error);
        alert(error.message);
    }
}

// 게시글 목록 표시
function displayPosts(posts) {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.onclick = () => viewPost(post.id);

        // 이미지 URL 처리
        let imageUrl = post.image;
        if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `${API_BASE_URL}/${imageUrl}`;
        }

        // 작성자 정보 처리 (author 객체 사용)
        const authorName = post.author?.nickname || '알 수 없음';
        let authorProfileImage = post.author?.profileImage;

        if (!authorProfileImage.startsWith('http')) {
            authorProfileImage = `${API_BASE_URL}/${authorProfileImage}`;
        }

        // 작성 시간 한국 시간 변환
        const formattedDate = new Date(post.createdAt).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        postElement.innerHTML = `
            <div class="post-brief-view">
                <h1>${post.title}</h1>
                <div class="post-brief-view-middle">
                    <div class="post-stats-left">
                        <span>좋아요 ${post.heartCount}</span>
                        <span>댓글 ${post.commentCount}</span>
                        <span>조회수 ${post.viewCount}</span>
                    </div>
                    <p>${formattedDate}</p>
                </div>
                <div class="post-author">
                    <img src="${authorProfileImage}" alt="프로필 이미지" class="author-profile-image">
                    <span>${authorName}</span>
                </div>
            </div>
        `;

        postsContainer.appendChild(postElement);
    });
}

// 게시글 상세 조회
export async function viewPost(postId) {
    try {
        const post = await getPostById(postId);
        currentPost = post;
        displayPostDetails(post);
        showPage('post-detail-page');
    } catch (error) {
        console.error('게시글 상세 조회 에러:', error);
        alert(error.message);
    }
}

// 게시글 상세 정보 표시
function displayPostDetails(post) {
    document.getElementById('post-title').innerText = post.title;
    
    
    document.getElementById('post-author').innerText = (post.user ? post.user.nickname : '알 수 없음');
    document.getElementById('post-date').innerText = new Date(post.createdAt).toLocaleString();
    
    const postImage = document.getElementById('post-image');
    if (post.image) {
        const imageUrl = post.image.startsWith('http') ? post.image : `${API_BASE_URL}/${post.image}`;
        postImage.innerHTML = `<img src="${imageUrl}" alt="게시글 이미지">`;
        postImage.style.display = 'block';
    } else {
        postImage.style.display = 'none';
    }
    
    document.getElementById('post-content').innerText = post.content;
    document.getElementById('like-count').innerText = post.heartCount;
    document.getElementById('comment-count').innerText = post.commentCount;
    document.getElementById('view-count').innerText = post.viewCount;

    // 작성자인 경우에만 수정/삭제 버튼 표시
    const userId = localStorage.getItem('userId');
    const postActions = document.querySelector('.post-actions');
    if (post.user.id.toString() === userId) {
        postActions.style.display = 'flex';
    } else {
        postActions.style.display = 'none';
    }
}

// 게시글 작성
export async function addPost(event) {
    event.preventDefault();
    
    const title = document.getElementById('post-add-title').value;
    const content = document.getElementById('post-add-content').value;
    const imageFile = document.getElementById('post-add-image').files[0];

    if (!title || !content) {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
    }

    try {
        await createPost(title, content, imageFile);
        alert('게시글이 작성되었습니다.');
        showPage('post-list-page');
    } catch (error) {
        console.error('게시글 작성 에러:', error);
        alert(error.message);
    }
}

// 게시글 수정 페이지로 이동
export function showEditPage() {
    if (!currentPost) return;

    document.getElementById('post-edit-title').value = currentPost.title;
    document.getElementById('post-edit-content').value = currentPost.content;
    showPage('post-edit-page');
}

// 게시글 수정
export async function updateCurrentPost(event) {
    event.preventDefault();
    
    if (!currentPost) return;

    const title = document.getElementById('post-edit-title').value;
    const content = document.getElementById('post-edit-content').value;
    const imageFile = document.getElementById('post-edit-image').files[0];

    if (!title || !content) {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
    }

    try {
        const updatedPost = await updatePost(currentPost.id, title, content, imageFile);
        currentPost = updatedPost;
        alert('게시글이 수정되었습니다.');
        viewPost(currentPost.id);
    } catch (error) {
        console.error('게시글 수정 에러:', error);
        alert(error.message);
    }
}

// 게시글 삭제
export async function deleteCurrentPost() {
    if (!currentPost) return;

    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
        return;
    }

    try {
        await deletePost(currentPost.id);
        alert('게시글이 삭제되었습니다.');
        showPage('post-list-page');
    } catch (error) {
        console.error('게시글 삭제 에러:', error);
        alert(error.message);
    }
} 