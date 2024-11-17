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
    closeModal(event.target);
}

export function setClosePopupByClickEventListeners(popups) {
    popups.forEach(el => {
        el.querySelector('.popup__close').addEventListener('click', (event) => {
            const popup = event.target.closest('.popup');
            closeModal(popup);
        });
        el.addEventListener('click', closePopupByOverlay);
    });
}