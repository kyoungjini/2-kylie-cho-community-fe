import { showPage } from '../main.js';
import { register as registerApi, login as loginApi } from '../api/userApi.js';
import { API_BASE_URL } from '../api/config.js';

// 사용자 로그인 처리
export async function login(event) {
    if (event) {
        event.preventDefault();
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('이메일과 비밀번호를 모두 입력해주세요.');
        return;
    }

    try {
        const response = await loginApi({ email, password });
        document.querySelector('.profile-icon').style.display = 'block';
        
        // ✅ 프로필 이미지 URL이 상대 경로면 API_BASE_URL 추가
        let profileImageUrl = response.profileImage;
        if (profileImageUrl && !profileImageUrl.startsWith('http')) {
            profileImageUrl = `${API_BASE_URL}${profileImageUrl}`;
        }

        // 프로필 이미지가 있으면 프로필 아이콘에 설정
        if (profileImageUrl) {
            document.querySelector('.profile-icon').style.backgroundImage = `url(${profileImageUrl})`;
        }
        
        showPage('post-list-page');
    } catch (error) {
        alert(error.message);
    }
}

// 회원가입 처리
export async function handleRegister(event) {
    if (event) {
        event.preventDefault();
    }

    const email = document.querySelector('#register-page input[type="email"]').value;
    const password = document.querySelector('#register-page input[type="password"]').value;
    const passwordConfirm = document.querySelectorAll('#register-page input[type="password"]')[1].value;
    const nickname = document.querySelector('#register-page input[type="text"]').value;
    const profileImageInput = document.getElementById('profileImage');

    if (!email || !password || !passwordConfirm || !nickname) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
    }

    if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    try {
        const userData = {
            email,
            password,
            nickname,
            profileImage: profileImageInput.files.length > 0 ? profileImageInput.files[0] : null
        };
        
        // 먼저 기본 사용자 정보로 회원가입
        const response = await registerApi(userData);
        
        alert('회원가입이 완료되었습니다.');
        showPage('login-page');
    } catch (error) {
        alert(error.message);
    }
}

// 로그아웃 처리
export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    document.querySelector('.profile-icon').style.display = 'none';
    showPage('login-page');
    alert('로그아웃 되었습니다.');
} 