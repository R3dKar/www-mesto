import '../pages/index.css';

import { createCardElement } from './card.js';
import { editProfile, getCards, getProfile, getProfileId, createCard } from './api.js';
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


const updateProfile = data => {
  nameElement.textContent = data.name;
  descriptionElement.textContent = data.about;
  avatarElement.style.backgroundImage = `url(${data.avatar})`;
};

getProfile()
.then(data => updateProfile(data))
.catch(err => console.log(err));


const handleOpenImagePopup = event => {
  const cardElement = event.target.closest('.card');

  const name = cardElement.querySelector('.card__title').textContent;
  const link = cardElement.querySelector('.card__image').src;

  imageElement.src = '';
  imageElement.src = link;
  imageElement.alt = name;
  imageCaptionElement.textContent = name;

  openModal(imagePopup);
};

Promise.all([getCards(), getProfileId()])
.then(([cards, profileId]) => {
  cards.forEach(card => cardsContainer.append(createCardElement(card, profileId, handleOpenImagePopup)));
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
    cardsContainer.prepend(createCardElement(card, profileId, handleOpenImagePopup));
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
