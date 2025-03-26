import { API_BASE_URL } from './config.js';

// 게시글 목록 조회
export async function getPosts(offset = 0, limit = 10) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/posts?offset=${offset}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('게시글 목록을 불러오는데 실패했습니다.');
        }

        return await response.json();
    } catch (error) {
        console.error('게시글 목록 조회 에러:', error);
        throw error;
    }
}

// 게시글 상세 조회
export async function getPostById(postId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('게시글을 불러오는데 실패했습니다.');
        }

        return await response.json();
    } catch (error) {
        console.error('게시글 상세 조회 에러:', error);
        throw error;
    }
}

// 게시글 작성
export async function createPost(title, content, imageFile) {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('userId', localStorage.getItem('userId'));
        if (imageFile) {
            formData.append('imageFile', imageFile);
        }

        const response = await fetch(`${API_BASE_URL}/api/posts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('게시글 작성에 실패했습니다.');
        }

        return await response.json();
    } catch (error) {
        console.error('게시글 생성 에러:', error);
        throw error;
    }
}

// 게시글 수정
export async function updatePost(postId, title, content, imageFile) {
    try {
        const formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        if (title) formData.append('title', title);
        if (content) formData.append('content', content);
        if (imageFile) formData.append('imageFile', imageFile);

        const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('게시글 수정에 실패했습니다.');
        }

        return await response.json();
    } catch (error) {
        console.error('게시글 수정 에러:', error);
        throw error;
    }
}

// 게시글 삭제
export async function deletePost(postId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${postId}?userId=${localStorage.getItem('userId')}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('게시글 삭제에 실패했습니다.');
        }
    } catch (error) {
        console.error('게시글 삭제 에러:', error);
        throw error;
    }
} 