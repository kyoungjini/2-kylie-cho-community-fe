export function login() {
    alert('로그인 성공!');
    document.querySelector('.profile-icon').style.display = 'block';
    showPage('post-list-page');
}

export function logout() {
    alert('로그아웃 되었습니다.');
    document.querySelector('.profile-icon').style.display = 'none';
    showPage('login-page');
}

export function register() {
    // 사용자가 선택한 프로필 이미지 처리
    const profileImageInput = document.getElementById('profile-image-upload');
    
    // 프로필 이미지가 선택되지 않았다면 기본 이미지 사용
    if (!userProfileImage && !profileImageInput.files.length) {
        userProfileImage = './assets/images/merong_minion.jpeg';
        document.querySelector('.profile-icon').style.backgroundImage = `url(${userProfileImage})`;
    }

    // 회원가입 완료 후 로그인 페이지로 이동
    alert('회원가입 완료!');
    showPage('login-page');
} 