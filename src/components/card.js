import { like, dislike, removeCard } from "./api";

const elementTemplate = document.querySelector('#card-template').content;

export function createCard(data, userId, likeHandler, deleteHandler, openImagePopup) {
    const elementPlace = elementTemplate.querySelector('.card').cloneNode(true);
    const cardImage = elementPlace.querySelector('.card__image');
    const cardDeleteButton = elementPlace.querySelector('.card__delete-button');
    const cardLikeButton = elementPlace.querySelector('.card__like-button');
    const likeCounter = elementPlace.querySelector('.card__like-count');

    elementPlace.id = data._id;
    cardImage.src = data.link;
    cardImage.alt = data.name;
    elementPlace.querySelector('.card__title').textContent = data.name;

    if (likeCounter) {
        likeCounter.textContent = data.likes.length || 0;
    }

    if (isLiked(data, userId)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    } else {
        cardLikeButton.classList.remove('card__like-button_is-active');
    }

    if (deleteHandler) {
        cardDeleteButton.classList.add('card__delete-button_visable');
        cardDeleteButton.addEventListener('click', () => deleteHandler(elementPlace));
    }

    cardImage.addEventListener('click', () => openImagePopup(data.link, data.name));
    cardLikeButton.addEventListener('click', () => likeHandler(data, userId, elementPlace));

    return elementPlace;
}

function isLiked(data, userId) {
    return data.likes.some((item) => item._id === userId);
}

export async function deleteCard(card) {
    try {
        await removeCard(card.id);
        return card.remove();
    } catch (err) {
        return console.error(err);
    }
}

let isRequestInProgress = false; // Флаг, показывающий, что запрос сейчас выполняется

export function likeCard(data, userId, elementPlace) {
    const likeButton = elementPlace.querySelector(".card__like-button");
    const likeCounter = elementPlace.querySelector(".card__like-count");

    if (isRequestInProgress) {
        return;
    }

    isRequestInProgress = true;

    if (isLiked(data, userId)) {
        dislike(data._id)
            .then((res) => {
                likeCounter.textContent = res.likes.length;
                likeButton.classList.remove("card__like-button_is-active");
                data.likes = res.likes;
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                isRequestInProgress = false;
            });
    } else {
        like(data._id)
            .then((res) => {
                likeCounter.textContent = res.likes.length;
                likeButton.classList.add("card__like-button_is-active");
                data.likes = res.likes;
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                isRequestInProgress = false;
            });
    }
}