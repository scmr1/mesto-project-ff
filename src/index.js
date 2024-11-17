import './pages/index.css';
import initialCards from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, setClosePopupByClickEventListeners } from './components/modal.js';

const placesListElement = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditFormElement = popupEdit.querySelector('.popup__form');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardFormElement = popupNewCard.querySelector('.popup__form');
const popupImage = document.querySelector('.popup_type_image');
const imagePopupElement = popupImage.querySelector('img');
const imagePopupCaption = popupImage.querySelector('.popup__caption');
const inputPopupName = popupEditFormElement.querySelector('.popup__input_type_name');
const inputPopupDescription = popupEditFormElement.querySelector('.popup__input_type_description');
const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const popups = document.querySelectorAll('.popup');
const inputPlaceName = popupNewCardFormElement.querySelector('input[name="place-name"]');
const inputLinkName = popupNewCardFormElement.querySelector('input[name="link"]');


// Исправлено на forEach
initialCards.forEach((item) => {
    const card = createCard({ title: item.name, image: item.link }, deleteCard, likeCard, openImagePopup);
    placesListElement.append(card);
});

// Исправленная функция для открытия попапа с изображением
function openImagePopup(src, alt) {
    imagePopupElement.src = src;
    imagePopupElement.alt = alt;
    imagePopupCaption.textContent = alt;
    openModal(popupImage);
}

// Исправленная форма заполнения редактирования профиля
function fillProfileEditForm() {
    inputPopupName.value = profileTitleElement.textContent;
    inputPopupDescription.value = profileDescriptionElement.textContent;
}

// Исправленный обработчик отправки формы редактирвоания
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitleElement.textContent = inputPopupName.value;
    profileDescriptionElement.textContent = inputPopupDescription.value;
    closeModal(popupEdit);
}

// Исправленный обработчик добавления новой карточки
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const card = createCard({ title: inputPlaceName.value, image: inputLinkName.value }, deleteCard, likeCard, openImagePopup);
    placesListElement.prepend(card);
    popupNewCardFormElement.reset();
    closeModal(popupNewCard);
}

// Исправленное закрытие попапов
setClosePopupByClickEventListeners(popups);

// Перемещенный слушатель событий
popupEditFormElement.addEventListener('submit', handleEditProfileFormSubmit);
document.querySelector('.profile__edit-button').addEventListener('click', () => {
    fillProfileEditForm();
    openModal(popupEdit);
});


popupNewCardFormElement.addEventListener('submit', handleAddCardFormSubmit);
document.querySelector('.profile__add-button').addEventListener('click', () => {
    openModal(popupNewCard);
});