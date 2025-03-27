export function showDeleteModal() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

export function closeModal() {
    // const modal = document.querySelector('.modal');
    // modal.classList.add('fade-out');
    // setTimeout(() => {
    //     modal.classList.add('hidden');
    //     modal.classList.remove('fade-out');
    //     document.body.classList.remove('modal-open');
    // }, 200);
    document.getElementById('delete-post-modal').style.display = 'none';
    document.getElementById('delete-account-modal').style.display = 'none';
} 