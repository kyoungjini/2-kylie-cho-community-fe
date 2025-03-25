let userProfileImage = '';

export function previewProfileImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const profileUploadDiv = document.querySelector('.profile-upload');

    reader.onload = function () {
        const uploadedImageUrl = reader.result;
        profileUploadDiv.style.backgroundImage = `url(${uploadedImageUrl})`;
        profileUploadDiv.classList.add('with-uploaded-image');
        profileUploadDiv.classList.remove('with-default-image');
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

export function loadUserInfo() {
    // 임시로 하드코딩된 사용자 정보
    const userInfo = {
        email: 'startupcoding@gmail.com',
        nickname: '스타트업코딩',
        profileImage: './assets/images/merong_minion.jpeg'
    };

    // 프로필 정보 표시
    document.getElementById('profile-email-value').textContent = userInfo.email;
    document.getElementById('profile-nickname-value').textContent = userInfo.nickname;
    
    const profileImage = document.querySelector('.profile-edit-image');
    if (profileImage && userInfo.profileImage) {
        profileImage.style.backgroundImage = `url(${userInfo.profileImage})`;
    }

    // 수정 모드 초기화
    const profilePage = document.getElementById('profile-page');
    profilePage.classList.remove('edit-mode');
}

export function toggleEditMode() {
    const profilePage = document.getElementById('profile-page');
    const nicknameValue = document.getElementById('profile-nickname-value');
    
    if (!profilePage.classList.contains('edit-mode')) {
        // 수정 모드로 전환
        profilePage.classList.add('edit-mode');
        
        // 닉네임을 입력 필드로 변경
        const currentNickname = nicknameValue.textContent;
        nicknameValue.innerHTML = `<input type="text" value="${currentNickname}" class="edit-input">`;
    }
}

export function updateProfile() {
    const profilePage = document.getElementById('profile-page');
    const nicknameInput = profilePage.querySelector('.edit-input');
    
    if (nicknameInput) {
        // 닉네임 업데이트
        const newNickname = nicknameInput.value;
        document.getElementById('profile-nickname-value').textContent = newNickname;
    }
    
    // 수정 모드 해제
    profilePage.classList.remove('edit-mode');
    alert('프로필이 수정되었습니다.');
}

export function previewProfileEditImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            document.querySelector('.profile-edit-image').style.backgroundImage = `url(${imageUrl})`;
            userInfo.profileImage = imageUrl;
        };
        reader.readAsDataURL(file);
    }
}

export function showDeleteAccountModal() {
    const modal = document.getElementById('delete-account-modal');
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
}

export function deleteAccount() {
    alert('회원 탈퇴가 완료되었습니다.');
    closeModal();
    logout();
    showPage('login-page');
} 