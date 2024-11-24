function handleCloseModalByEsc(event) {
    if (event.key !== 'Escape') return;
    closeModal(document.querySelector('.popup_is-opened'));
}

export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleCloseModalByEsc);
};

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseModalByEsc);
}

export function closePopupByOverlay(event) {
    if (!event.target.classList.contains('popup')) 
    return;
    const popup = event.target
    closeModal(popup);
}
