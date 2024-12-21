import '../pages/index.css';

import { createCardElement, deleteCardElement, updateCardElement } from './card.js';
import { getProfile, getProfileId, editProfile, getCards, createCard, deleteCard, removeLike, addLike } from './api.js';
import { openModal, handleModalClose, configureModal } from './modal.js';
import { enableValidation, clearFormErrorMessages } from './validation.js';


const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message_active'
};

enableValidation(validationSettings);


const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const confirmPopup = document.querySelector('.popup_type_confirm');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');

configureModal(profilePopup);
configureModal(cardPopup);
configureModal(imagePopup);
configureModal(confirmPopup);
configureModal(avatarPopup);


const cardsContainer = document.querySelector('.places__list');
const nameElement = document.querySelector('.profile__title');
const descriptionElement = document.querySelector('.profile__description');
const avatarElement = document.querySelector('.profile__image');

const profileFormElement = profilePopup.querySelector('.popup__form');
const profileNameInput = profileFormElement.querySelector('.popup__input_type_name');
const profileDescriptionInput = profileFormElement.querySelector('.popup__input_type_description');
const profileFormButton = profileFormElement.querySelector('.popup__button');

const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url');
const cardFormButton = cardFormElement.querySelector('.popup__button');

const imageElement = imagePopup.querySelector('.popup__image');
const imageCaptionElement = imagePopup.querySelector('.popup__caption');

const confirmFormElement = confirmPopup.querySelector('.popup__form');
const confirmFormButton = confirmFormElement.querySelector('.popup__button');


const updateProfile = data => {
  nameElement.textContent = data.name;
  descriptionElement.textContent = data.about;
  avatarElement.style.backgroundImage = `url(${data.avatar})`;
};

getProfile()
.then(data => updateProfile(data))
.catch(err => console.log(err));


const handleLikeCard = (event, card) => {
  Promise.all([
    (event.target.classList.contains('card__like-button_is-active') ? removeLike(card._id) : addLike(card._id)),
    getProfileId()
  ])
  .then(([card, profileId]) => updateCardElement(card, profileId))
  .catch(err => console.log(err));
};

const handleClickCard = (event, card) => {
  imageElement.src = '';
  imageElement.src = card.link;
  imageElement.alt = card.name;
  imageCaptionElement.textContent = card.name;

  openModal(imagePopup);
};

let targetCard;
const handleDeleteCard = (event, card) => {
  targetCard = card;

  openModal(confirmPopup);
};

Promise.all([getCards(), getProfileId()])
.then(([cards, profileId]) => {
  cards.forEach(card => cardsContainer.append(createCardElement(card, profileId, handleLikeCard, handleClickCard, handleDeleteCard)));
})
.catch(err => console.log(err));


const handleProfileFormSubmit = event => {
  const name = profileNameInput.value;
  const description = profileDescriptionInput.value;

  profileFormButton.textContent = 'Сохранение...';

  editProfile(name, description)
  .then(data => {
    updateProfile(data);
    handleModalClose(event);
  })
  .catch(err => console.log(err))
  .finally(() => {
    profileFormButton.textContent = 'Сохранить';
  });
};

const openProfilePopup = () => {
  const name = nameElement.textContent;
  const description = descriptionElement.textContent;

  profileNameInput.value = name;
  profileDescriptionInput.value = description;

  clearFormErrorMessages(profileFormElement, validationSettings);
  openModal(profilePopup);
};

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
document.querySelector('.profile__edit-button').addEventListener('click', openProfilePopup);


const handleCardFormSubmit = event => {
  const name = cardNameInput.value;
  const link = cardUrlInput.value;

  cardFormButton.textContent = 'Сохранение...';

  Promise.all([createCard(name, link), getProfileId()])
  .then(([card, profileId]) => {
    cardsContainer.prepend(createCardElement(card, profileId, handleLikeCard, handleClickCard, handleDeleteCard));
    handleModalClose(event);
  })
  .catch(err => console.log(err))
  .finally(() => {
    cardFormButton.textContent = 'Сохранить';
  });
};

const openCardPopup = () => {
  cardNameInput.value = '';
  cardUrlInput.value = '';

  clearFormErrorMessages(cardFormElement, validationSettings);
  openModal(cardPopup);
};

cardFormElement.addEventListener('submit', handleCardFormSubmit);
document.querySelector('.profile__add-button').addEventListener('click', openCardPopup);


const handleConfirmFormSubmit = event => {
  confirmFormButton.textContent = 'Удаление...';

  deleteCard(targetCard._id)
  .then(() => {
    deleteCardElement(targetCard);
    targetCard = undefined;
    handleModalClose(event);
  })
  .catch(err => console.log(err))
  .finally(() => {
    confirmFormButton.textContent = 'Да';
  });
};
confirmFormElement.addEventListener('submit', handleConfirmFormSubmit);
