import { fetchPosts, fetchComments } from '../utils/api.js';

let posts = []; // 전역 변수로 게시글 데이터 저장
let currentPost = {};

// loadPosts 함수 수정
export async function loadPosts() {
    const postContainer = document.getElementById("posts");
    postContainer.innerHTML = ''; // 기존 게시글 초기화
    
    const loadingMessage = document.createElement('p');
    loadingMessage.textContent = '게시글을 불러오는 중...';
    loadingMessage.style.textAlign = 'center';
    postContainer.appendChild(loadingMessage);

    try {
        if (posts.length === 0) { // 처음 로드할 때만 API에서 데이터 가져오기
            posts = await fetchPosts();
        }
        postContainer.innerHTML = ''; // 로딩 메시지 제거
        
        posts.forEach(post => {
            let postElement = document.createElement("div");
            postElement.classList.add("post");

            postElement.innerHTML = `
                <div class="post-brief-view">
                    <h1 onclick="viewPost(${post.postId})">${post.title}</h1>
                    <div class="post-brief-view-middle">
                        <div class="post-stats-left">
                            <p>좋아요 ${post.likeCount}</p>
                            <p>댓글 ${post.commentCount}</p>
                            <p>조회수 ${post.viewCount}</p>
                        </div>
                        <p>${post.createdAt}</p>
                    </div>
                    <p class="post-author">${post.author}</p>
                </div>
            `;
            postContainer.appendChild(postElement);
        });
    } catch (error) {
        postContainer.innerHTML = '<p style="text-align: center; color: red;">게시글을 불러오는데 실패했습니다.</p>';
    }
}

// addPost 함수 수정
export async function addPost() {
    let postTitle = document.querySelector('#post-add-page input').value;
    let postContent = document.querySelector('#post-add-page textarea').value;
    let postImage = document.querySelector('#post-add-page input[type="file"]').files[0];
    
    if (!postTitle || !postContent) {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
    }

    // 새 게시글 객체 생성
    const newPost = {
        postId: posts.length > 0 ? Math.max(...posts.map(p => p.postId)) + 1 : 1,
        title: postTitle,
        content: postContent,
        author: '작성자 1',
        createdAt: new Date().toLocaleString(),
        likeCount: 0,
        commentCount: 0,
        viewCount: 0,
        image: null
    };

    // 이미지가 있는 경우 처리
    if (postImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newPost.image = e.target.result;
        };
        reader.readAsDataURL(postImage);
    }

    // 게시글 배열에 추가
    posts.unshift(newPost);
    
    // 게시글 목록 페이지로 이동
    showPage('post-list-page');
    loadPosts(); // 게시글 목록 새로고침
}

// viewPost 함수 수정
export async function viewPost(postId) {
    try {
        const post = posts.find(p => p.postId === postId);
        if (post) {
            showPage('post-detail-page');
            displayPostDetails(post);
            
            // 댓글 불러오기
            const comments = await fetchComments(postId);
            const commentsList = document.getElementById('comments');
            commentsList.innerHTML = '';
            
            comments.forEach(comment => {
                let commentElement = document.createElement("div");
                commentElement.classList.add("comment");
                commentElement.innerHTML = `
                    <div class="comment-header">
                        <div class="comment-meta">
                            <p class="comment-author">${comment.author}</p>
                            <p class="comment-date">${comment.createdAt}</p>
                        </div>
                        <div class="comment-actions">
                            <button onclick="editComment(this)" class="post-detail-button">수정</button>
                            <button onclick="deleteComment(this)" class="post-detail-button">삭제</button>
                        </div>
                    </div>
                    <p class="comment-content">${comment.content}</p>
                `;
                commentsList.appendChild(commentElement);
            });
        } else {
            alert('게시글을 찾을 수 없습니다.');
        }
    } catch (error) {
        alert('게시글을 불러오는데 실패했습니다.');
    }
}

export function displayPostDetails(post) {
    document.getElementById('post-title').innerText = post.title;
    document.getElementById('post-author').innerText = post.author;
    document.getElementById('post-date').innerText = post.createdAt;
    
    const postImage = document.getElementById('post-image');
    if (post.image) {
        postImage.innerHTML = `<img src="${post.image}" alt="게시글 이미지">`;
        postImage.style.display = 'block';
    } else {
        postImage.style.display = 'none';
    }
    
    document.getElementById('post-content').innerText = post.content;
    document.getElementById('like-count').innerText = post.likeCount;
    document.getElementById('comment-count').innerText = post.commentCount;
    document.getElementById('view-count').innerText = post.viewCount;
    
    currentPost = post;
}

export function updatePost() {
    const titleInput = document.querySelector('#post-edit-page input[type="text"]');
    const contentTextarea = document.querySelector('#post-edit-page textarea');
    const imageInput = document.querySelector('#post-edit-page input[type="file"]');
    
    if (!titleInput.value || !contentTextarea.value) {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
    }
    
    const postIndex = posts.findIndex(p => p.postId === currentPost.postId);
    if (postIndex !== -1) {
        posts[postIndex] = {
            ...currentPost,
            title: titleInput.value,
            content: contentTextarea.value,
            updatedAt: new Date().toLocaleString()
        };
        
        if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                posts[postIndex].image = e.target.result;
                showPage('post-detail-page');
                viewPost(currentPost.postId);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            showPage('post-detail-page');
            viewPost(currentPost.postId);
        }
    }
}

export function deletePost() {
    const postIndex = posts.findIndex(p => p.postId === currentPost.postId);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        closeModal();
        showPage('post-list-page');
        loadPosts();
    }
}

export function showEditPage() {
    showPage('post-edit-page');
    document.querySelector('#post-edit-page input[type="text"]').value = currentPost.title;
    document.querySelector('#post-edit-page textarea').value = currentPost.content;
    
    const editImagePreview = document.getElementById('edit-image-preview');
    if (currentPost.image) {
        editImagePreview.innerHTML = `<img src="${currentPost.image}" alt="게시글 이미지">`;
        editImagePreview.style.display = 'block';
    } else {
        editImagePreview.style.display = 'none';
    }
} 