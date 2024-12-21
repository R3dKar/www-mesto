import '../pages/index.css';

import { createCard } from './card.js';
import { getCards, getProfile } from './api.js';
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

configureModal(profilePopup);
configureModal(cardPopup);
configureModal(imagePopup);


const cardsContainer = document.querySelector('.places__list');
const nameElement = document.querySelector('.profile__title');
const descriptionElement = document.querySelector('.profile__description');
const avatarElement = document.querySelector('.profile__image');

const profileFormElement = profilePopup.querySelector('.popup__form');
const profileNameInput = profileFormElement.querySelector('.popup__input_type_name');
const profileDescriptionInput = profileFormElement.querySelector('.popup__input_type_description');

const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url');

const imageElement = imagePopup.querySelector('.popup__image');
const imageCaptionElement = imagePopup.querySelector('.popup__caption');


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

getCards()
.then(cards => {
  cards.forEach(card => cardsContainer.append(createCard(card, handleOpenImagePopup)));
})
.catch(err => console.log(err));

getProfile()
.then(data => {
  nameElement.textContent = data.name;
  descriptionElement.textContent = data.about;
  avatarElement.style.backgroundImage = `url(${data.avatar})`;
})
.catch(err => console.log(err));

const handleProfileFormSubmit = event => {
  const name = profileNameInput.value;
  const description = profileDescriptionInput.value;

  nameElement.textContent = name;
  descriptionElement.textContent = description;

  handleModalClose(event);
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
  const card = {
    name: cardNameInput.value,
    link: cardUrlInput.value
  };

  cardsContainer.prepend(createCard(card, handleOpenImagePopup));
  handleModalClose(event);
};

const openCardPopup = () => {
  cardNameInput.value = '';
  cardUrlInput.value = '';

  clearFormErrorMessages(cardFormElement, validationSettings);
  openModal(cardPopup);
};

cardFormElement.addEventListener('submit', handleCardFormSubmit);
document.querySelector('.profile__add-button').addEventListener('click', openCardPopup);
