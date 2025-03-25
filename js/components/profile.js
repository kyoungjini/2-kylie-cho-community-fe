import { getUserInfo, updateUserInfo, updatePassword, deleteAccount as deleteAccountApi, uploadProfileImage } from '../api/userApi.js';
import { showPage } from '../main.js';

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

export async function loadUserInfo() {
    try {
        const userInfo = await getUserInfo();
        
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
    } catch (error) {
        alert('회원정보를 불러오는데 실패했습니다.');
        showPage('login-page');
    }
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

export async function previewProfileEditImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profileImage = document.querySelector('.profile-edit-image');
            profileImage.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
}

export async function updateProfile() {
    const profilePage = document.getElementById('profile-page');
    const nicknameInput = profilePage.querySelector('.edit-input');
    const profileImageInput = document.getElementById('profile-image-upload');
    
    try {
        // 프로필 이미지 업로드
        if (profileImageInput.files.length > 0) {
            const formData = new FormData();
            formData.append('profileImage', profileImageInput.files[0]);
            await uploadProfileImage(formData);
        }

        // 닉네임 업데이트
        if (nicknameInput) {
            const newNickname = nicknameInput.value;
            await updateUserInfo({ nickname: newNickname });
            document.getElementById('profile-nickname-value').textContent = newNickname;
        }
        
        // 수정 모드 해제
        profilePage.classList.remove('edit-mode');
        alert('프로필이 수정되었습니다.');
    } catch (error) {
        alert(error.message);
    }
}

export async function updateUserPassword() {
    const currentPassword = document.querySelector('#password-page input[type="password"]').value;
    const newPassword = document.querySelectorAll('#password-page input[type="password"]')[1].value;
    
    if (!currentPassword || !newPassword) {
        alert('현재 비밀번호와 새 비밀번호를 모두 입력해주세요.');
        return;
    }

    try {
        await updatePassword({
            currentPassword,
            newPassword
        });
        alert('비밀번호가 변경되었습니다.');
        showPage('post-list-page');
    } catch (error) {
        alert(error.message);
    }
}

export function showDeleteAccountModal() {
    const modal = document.getElementById('delete-account-modal');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
}

export async function deleteAccount() {
    try {
        await deleteAccountApi();
        alert('회원 탈퇴가 완료되었습니다.');
        showPage('login-page');
    } catch (error) {
        alert(error.message);
    }
} 