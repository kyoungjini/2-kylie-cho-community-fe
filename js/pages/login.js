import { showPage } from '../main.js';
import { register as registerApi, login as loginApi } from '../api/userApi.js';

export async function login(event) {
    if (event) {
        event.preventDefault();
    }

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('이메일과 비밀번호를 모두 입력해주세요.');
        return;
    }

    try {
        const response = await loginApi({ email, password });
        document.querySelector('.profile-icon').style.display = 'block';
        showPage('post-list-page');
    } catch (error) {
        alert(error.message);
    }
}

export async function register(event) {
    if (event) {
        event.preventDefault();
    }

    const email = document.querySelector('#register-page input[type="email"]').value;
    const password = document.querySelector('#register-page input[type="password"]').value;
    const passwordConfirm = document.querySelectorAll('#register-page input[type="password"]')[1].value;
    const nickname = document.querySelector('#register-page input[type="text"]').value;
    const profileImageInput = document.getElementById('profile-image-upload');

    if (!email || !password || !passwordConfirm || !nickname) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
    }

    if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('nickname', nickname);
    
    if (profileImageInput.files.length > 0) {
        formData.append('profileImage', profileImageInput.files[0]);
    }

    try {
        await registerApi(formData);
        alert('회원가입이 완료되었습니다.');
        showPage('login-page');
    } catch (error) {
        alert(error.message);
    }
}

export function logout() {
    localStorage.removeItem('token');
    document.querySelector('.profile-icon').style.display = 'none';
    showPage('login-page');
    alert('로그아웃 되었습니다.');
} 