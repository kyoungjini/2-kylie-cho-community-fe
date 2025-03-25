export function addComment() {
    const commentInput = document.querySelector('.comment-input-area textarea');
    const commentContent = commentInput.value.trim();
    
    if (!commentContent) {
        alert('댓글 내용을 입력해주세요.');
        return;
    }
    
    const commentsList = document.getElementById('comments');
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    
    commentElement.innerHTML = `
        <div class="comment-header">
            <div class="comment-meta">
                <p class="comment-author">작성자 1</p>
                <p class="comment-date">${new Date().toLocaleString()}</p>
            </div>
            <div class="comment-actions">
                <button onclick="editComment(this)" class="post-detail-button">수정</button>
                <button onclick="deleteComment(this)" class="post-detail-button">삭제</button>
            </div>
        </div>
        <p class="comment-content">${commentContent}</p>
    `;
    
    commentsList.insertBefore(commentElement, commentsList.firstChild);
    commentInput.value = '';
}

export function editComment(button) {
    const commentDiv = button.closest('.comment');
    const commentContent = commentDiv.querySelector('.comment-content');
    const originalContent = commentContent.textContent;
    
    const textarea = document.createElement('textarea');
    textarea.classList.add('comment-edit-textarea');
    textarea.value = originalContent;
    
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('comment-edit-actions');
    actionsDiv.innerHTML = `
        <button onclick="saveComment(this)" class="post-detail-button">저장</button>
        <button onclick="cancelEdit(this)" class="post-detail-button">취소</button>
    `;
    
    commentContent.replaceWith(textarea);
    textarea.after(actionsDiv);
    button.closest('.comment-actions').style.display = 'none';
}

export function saveComment(button) {
    const commentDiv = button.closest('.comment');
    const textarea = commentDiv.querySelector('.comment-edit-textarea');
    const actionsDiv = commentDiv.querySelector('.comment-edit-actions');
    
    const newContent = textarea.value.trim();
    if (!newContent) {
        alert('댓글 내용을 입력해주세요.');
        return;
    }
    
    const p = document.createElement('p');
    p.classList.add('comment-content');
    p.textContent = newContent;
    
    textarea.replaceWith(p);
    actionsDiv.remove();
    commentDiv.querySelector('.comment-actions').style.display = 'flex';
}

export function cancelEdit(button) {
    const commentDiv = button.closest('.comment');
    const textarea = commentDiv.querySelector('.comment-edit-textarea');
    const actionsDiv = commentDiv.querySelector('.comment-edit-actions');
    
    const p = document.createElement('p');
    p.classList.add('comment-content');
    p.textContent = textarea.getAttribute('data-original-content');
    
    textarea.replaceWith(p);
    actionsDiv.remove();
    commentDiv.querySelector('.comment-actions').style.display = 'flex';
}

export function deleteComment(button) {
    if (confirm('댓글을 삭제하시겠습니까?')) {
        button.closest('.comment').remove();
    }
} 