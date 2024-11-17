// Темплейт карточки

const elementTemplate = document.querySelector('#card-template').content;

// Функция создания карточки

export function createCard(cardData, deleteHandler, likeHandler, onImageClick) {
    const elementPlace = elementTemplate.querySelector('.card').cloneNode(true);
    const cardImage = elementPlace.querySelector('.card__image');
    const likeButton = elementPlace.querySelector('.card__like-button');
    cardImage.src = cardData.image;
    cardImage.alt = cardData.title;
    elementPlace.querySelector('.card__title').textContent = cardData.title;
    elementPlace.querySelector('.card__delete-button').addEventListener('click', () => deleteHandler(elementPlace));
    elementPlace.querySelector('.card__image').addEventListener('click', () => onImageClick(cardData.image, cardData.title));
    likeButton.addEventListener('click', () => likeHandler(likeButton));

    return elementPlace;
}

// Функция удаления карточки

export function deleteCard(card) {
    card.remove();
}

// Функция лайка карточки

export function likeCard(button) {
    button.classList.toggle('card__like-button_is-active');
}
