// Темплейт карточки

const elementTemplate = document.querySelector('#card-template').content;

// Функция создания карточки

export function createCard(title, image, deleteHandler, likeHandler, openImagePopup) {
    const elementPlace = elementTemplate.querySelector('.card').cloneNode(true);
    elementPlace.querySelector('.card__image').src = image;
    elementPlace.querySelector('.card__title').textContent = title;
    elementPlace.querySelector('.card__image').alt = title;
    elementPlace.querySelector('.card__delete-button').addEventListener('click', () => deleteHandler(elementPlace));
    elementPlace.querySelector('.card__image').addEventListener('click', () => openImagePopup(image, title));
    elementPlace.querySelector('.card__like-button').addEventListener('click', () => likeHandler(elementPlace));

    return elementPlace;
}

// Функция удаления карточки

export function deleteCard(card) {
    card.remove();
}

// Функция лайка карточки

export function likeCard(card) {
    card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
}
