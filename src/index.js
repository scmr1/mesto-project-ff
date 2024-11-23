import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, closePopupByOverlay } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUser, editUser, getInitialCards, addCard, changeAvatar } from './components/api.js';

const placesListElement = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditFormElement = document.forms['edit-profile'];
const inputNameEdit = popupEditFormElement.querySelector('input[name="name"]');
const inputDescriptionEdit = popupEditFormElement.querySelector('input[name="description"]');

const popupChangeAvatar = document.querySelector('.popup_type_change_avatar');
const popupChangeAvatarFormElement = document.forms['edit-avatar'];
const popupChangeAvatarLinkInput = popupChangeAvatarFormElement.querySelector('input[name="link"]');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardFormElement = document.forms['new-place'];
const inputPlaceName = popupNewCardFormElement.querySelector('input[name="place-name"]');
const inputLinkName = popupNewCardFormElement.querySelector('input[name="link"]');

const popupImage = document.querySelector('.popup_type_image');
const imagePopupElement = popupImage.querySelector('img')
const imagePopupCaption = popupImage.querySelector('.popup__caption')

const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileImageElement = document.querySelector('.profile__image');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorElemClass: 'popup__error',
    errorClass: 'popup__error_visible'
};

function setPageUserData(name, about, avatarUrl) {
    profileTitleElement.textContent = name;
    profileDescriptionElement.textContent = about;
    profileImageElement.style.backgroundImage = `url(${avatarUrl})`;
}

window.user = null;
Promise.all([getUser(), getInitialCards()])
    .then(([userData, initialCards]) => {
        window.user = userData;
        setPageUserData(userData.name, userData.about, userData.avatar);

        initialCards.forEach((item) => {
            const isUserCardOwner = item.owner._id === userData._id;
            const card = createCard(item._id, item.name, item.link, item.likes, isUserCardOwner ? deleteCard : null, likeCard, openImagePopup);
            placesListElement.append(card);
        });
    })
    .catch(err => {
        console.log(err);
    });

function openImagePopup(src, alt) {
    imagePopupElement.src = src;
    imagePopupElement.alt = alt;
    imagePopupCaption.textContent = alt;
    openModal(popupImage);
}

function popupEditPreOpen() {
    inputNameEdit.value = profileTitleElement.textContent;
    inputDescriptionEdit.value = profileDescriptionElement.textContent;
    clearValidation(popupEditFormElement, validationConfig);
}

function popupEditFormHandler(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение';

    editUser(inputNameEdit.value, inputDescriptionEdit.value)
        .then(data => {
            setPageUserData(data.name, data.about, data.avatar);
            closeModal(popupEdit);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        });
}
popupEditFormElement.addEventListener('submit', popupEditFormHandler);
document.querySelector('.profile__edit-button').addEventListener('click', () => {
    popupEditPreOpen();
    openModal(popupEdit);
});

function popupNewCardPreOpen() {
    popupNewCardFormElement.reset();
    clearValidation(popupNewCardFormElement, validationConfig);
}

function popupNewCardHandler(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение';

    addCard(inputPlaceName.value, inputLinkName.value)
        .then(data => {
            const card = createCard(data._id, data.name, data.link, data.likes, deleteCard, likeCard, openImagePopup);
            placesListElement.prepend(card);
            closeModal(popupNewCard);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        })
}
popupNewCardFormElement.addEventListener('submit', popupNewCardHandler);

document.querySelector('.profile__add-button').addEventListener('click', () => {
    popupNewCardPreOpen();
    openModal(popupNewCard);
});

function popupChangeAvatarPreOpen() {
    popupChangeAvatarFormElement.reset();
    clearValidation(popupChangeAvatarFormElement, validationConfig);
}

profileImageElement.addEventListener('click', () => {
    popupChangeAvatarPreOpen();
    openModal(popupChangeAvatar);
});

function popupChangeAvatarHandler(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение';
    changeAvatar(popupChangeAvatarLinkInput.value)
        .then(data => {
            setPageUserData(data.name, data.about, data.avatar);
            closeModal(popupChangeAvatar);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        });
}
popupChangeAvatarFormElement.addEventListener('submit', popupChangeAvatarHandler);

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
    popup.querySelector('.popup__close').addEventListener('click', (event) => {
        closeModal(popup);
    });
    popup.addEventListener('click', closePopupByOverlay)
});

enableValidation(validationConfig); 