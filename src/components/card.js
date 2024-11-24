import { like, dislike, removeCard } from "./api";

const elementTemplate = document.querySelector('#card-template').content;

export function createCard(id, title, image, likes, deleteHandler, likeHandler, openImagePopup, currentUserId) {
    const elementPlace = elementTemplate.querySelector('.card').cloneNode(true);
    const cardImage = elementPlace.querySelector('.card__image');
    const cardDeleteButton = elementPlace.querySelector('.card__delete-button');
    const cardLikeButton = elementPlace.querySelector('.card__like-button');
    const isLiked = Boolean(likes.find((item) => item._id === currentUserId));

    elementPlace.id = id;
    cardImage.src = image;
    cardImage.alt = title;
    elementPlace.querySelector('.card__title').textContent = title;

    if (deleteHandler) {
        cardDeleteButton.classList.add('card__delete-button_visable');
        cardDeleteButton.addEventListener('click', () => deleteHandler(elementPlace));
    }

    if (isLiked) {
        cardLikeButton.classList.add('card__like-button_is-active');
    } else {
        cardLikeButton.classList.remove('card__like-button_is-active');
    }

    cardImage.addEventListener('click', () => openImagePopup(image, title));
    cardLikeButton.addEventListener('click', () => likeHandler(elementPlace));
    elementPlace.querySelector('.card__like-count').textContent = likes.length;

    return elementPlace;
}

export async function deleteCard(card) {
    try {
        await removeCard(card.id);
        return card.remove();
    } catch (err) {
        return console.error(err);
    }
}

function cardLikeHandler(card, cardData, currentUserId) {
    const cardLikeButton = card.querySelector('.card__like-button');
    const likeCount = cardData.likes.length;
    const isLiked = Boolean(cardData.likes.find((item) => item._id === currentUserId));

    // Обновляем количество лайков
    card.querySelector('.card__like-count').textContent = likeCount;

    // Обновляем состояние кнопки лайка
    if (isLiked) {
        cardLikeButton.classList.add('card__like-button_is-active');
    } else {
        cardLikeButton.classList.remove('card__like-button_is-active');
    }
}

export function likeCard(card) {
    const isLiked = card.querySelector('.card__like-button').classList.contains('card__like-button_is-active');

    if (isLiked) {
        dislike(card.id)
            .then(data => cardLikeHandler(card, data))
            .catch((err) => {
                console.log(err);
            });
    } else {
        like(card.id)
            .then(data => cardLikeHandler(card, data))
            .catch((err) => {
                console.log(err);
            });
    }
}