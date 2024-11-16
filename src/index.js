import './pages/index.css';
import initialCards from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, closePopupByOverlay } from './components/modal.js';

const placesListElement = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditFormElement = popupEdit.querySelector('.popup__form');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardFormElement = popupNewCard.querySelector('.popup__form');
const popupImage = document.querySelector('.popup_type_image');


for (const item of initialCards) {
    const card = createCard(item.name, item.link, deleteCard, likeCard, openImagePopup);
    placesListElement.append(card);
}

function openImagePopup(src, alt) {
    const element = popupImage.querySelector('img');
    element.src = src;
    element.alt = alt;
    popupImage.querySelector('.popup__caption').textContent = alt;
    openModal(popupImage);
}

function popupEditPreOpen() {
    const nameInput = popupEditFormElement.querySelector('.popup__input_type_name');
    const descInput = popupEditFormElement.querySelector('.popup__input_type_description');

    const currentName = document.querySelector('.profile__title').textContent;
    const currentDesc = document.querySelector('.profile__description').textContent;

    nameInput.value = currentName;
    descInput.value = currentDesc;
}

function popupEditFormHandler(evt) {
    evt.preventDefault();
    const nameInput = popupEditFormElement.querySelector('input[name="name"]');
    const descInput = popupEditFormElement.querySelector('input[name="description"]');

    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = descInput.value;
    closeModal(popupEdit);
}
popupEditFormElement.addEventListener('submit', popupEditFormHandler);
document.querySelector('.profile__edit-button').addEventListener('click', () => {
    popupEditPreOpen();
    openModal(popupEdit);
});

function popupNewCardHandler(evt) {
    evt.preventDefault();
    const nameInput = popupNewCardFormElement.querySelector('input[name="place-name"]');
    const linkInput = popupNewCardFormElement.querySelector('input[name="link"]');

    const card = createCard(nameInput.value, linkInput.value, deleteCard, likeCard, openImagePopup);
    placesListElement.prepend(card);
    closeModal(popupNewCard);
    popupNewCardFormElement.reset();
}
popupNewCardFormElement.addEventListener('submit', popupNewCardHandler);
document.querySelector('.profile__add-button').addEventListener('click', () => {
    openModal(popupNewCard);
});

const popups = document.querySelectorAll('.popup');
popups.forEach(el => {
    el.querySelector('.popup__close').addEventListener('click', (event) => {
        const popup = event.target.closest('.popup');
        closeModal(popup);
    });
    el.addEventListener('click', closePopupByOverlay)
});
