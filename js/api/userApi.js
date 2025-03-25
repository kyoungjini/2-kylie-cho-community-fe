import { API_BASE_URL, getHeaders } from './config.js';

// 회원가입
export async function register(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('회원가입에 실패했습니다.');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// 로그인
export async function login(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error('로그인에 실패했습니다.');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        throw error;
    }
}

// 회원정보 조회
export async function getUserInfo() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/me`, {
            method: 'GET',
            headers: getHeaders()
        });

        if (!response.ok) {
            throw new Error('회원정보 조회에 실패했습니다.');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// 회원정보 수정
export async function updateUserInfo(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/update`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('회원정보 수정에 실패했습니다.');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// 비밀번호 변경
export async function updatePassword(passwordData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/password`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(passwordData)
        });

        if (!response.ok) {
            throw new Error('비밀번호 변경에 실패했습니다.');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// 회원 탈퇴
export async function deleteAccount() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/delete`, {
            method: 'DELETE',
            headers: getHeaders()
        });

        if (!response.ok) {
            throw new Error('회원 탈퇴에 실패했습니다.');
        }

        localStorage.removeItem('token');
    } catch (error) {
        throw error;
    }
}

// 프로필 이미지 업로드
export async function uploadProfileImage(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/profile-image`, {
            method: 'POST',
            headers: {
                'Authorization': getHeaders().Authorization
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('프로필 이미지 업로드에 실패했습니다.');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
} 