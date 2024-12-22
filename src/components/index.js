import '../pages/index.css';

import { createCardElement, deleteCardElement, updateCardElement } from './card.js';
import { getProfile, getProfileId, editProfile, getCards, createCard, deleteCard, removeLike, addLike, editProfileAvatar } from './api.js';
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

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

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

const avatarFormElement = avatarPopup.querySelector('.popup__form');
const avatarUrlInput = avatarFormElement.querySelector('.popup__input_type_profile-avatar');
const avatarFormButton = avatarFormElement.querySelector('.popup__button');

let profileId;
let currentAvatarUrl;
let targetCardForDeletion;


const updateProfile = data => {
  nameElement.textContent = data.name;
  descriptionElement.textContent = data.about;

  avatarElement.style.backgroundImage = `url(${data.avatar})`;
  currentAvatarUrl = data.avatar;
};


const handleLikeCard = (event, card) => {
  (event.target.classList.contains('card__like-button_is-active') ? removeLike(card._id) : addLike(card._id))
  .then(card => updateCardElement(card, profileId))
  .catch(err => console.log(err));
};

const handleClickCard = (event, card) => {
  imageElement.src = '';
  imageElement.src = card.link;
  imageElement.alt = card.name;
  imageCaptionElement.textContent = card.name;

  openModal(imagePopup);
};

const handleDeleteCard = (event, card) => {
  targetCardForDeletion = card;

  openModal(confirmPopup);
};


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
editProfileButton.addEventListener('click', openProfilePopup);


const handleCardFormSubmit = event => {
  const name = cardNameInput.value;
  const link = cardUrlInput.value;

  cardFormButton.textContent = 'Сохранение...';

  createCard(name, link)
  .then(card => {
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
addCardButton.addEventListener('click', openCardPopup);


const handleConfirmFormSubmit = event => {
  confirmFormButton.textContent = 'Удаление...';

  deleteCard(targetCardForDeletion._id)
  .then(() => {
    deleteCardElement(targetCardForDeletion);
    targetCardForDeletion = undefined;
    handleModalClose(event);
  })
  .catch(err => console.log(err))
  .finally(() => {
    confirmFormButton.textContent = 'Да';
  });
};

confirmFormElement.addEventListener('submit', handleConfirmFormSubmit);


const openAvatarPopup = () => {
  avatarUrlInput.value = currentAvatarUrl;

  clearFormErrorMessages(avatarFormElement, validationSettings);
  openModal(avatarPopup);
};

const handleAvatarFormSubmit = event => {
  const avatarUrl = avatarUrlInput.value;

  avatarFormButton.textContent = 'Сохранение...';

  editProfileAvatar(avatarUrl)
  .then(data => {
    updateProfile(data);
    handleModalClose(event);
  })
  .catch(err => console.log(err))
  .finally(() => {
    avatarFormButton.textContent = 'Сохранить';
  });
};

avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);


editProfileButton.setAttribute('disabled', '');
addCardButton.setAttribute('disabled', '');

Promise.all([getProfile(), getCards()])
.then(([profileData, cards]) => {
  profileId = profileData._id;

  updateProfile(profileData);

  editProfileButton.removeAttribute('disabled');
  addCardButton.removeAttribute('disabled');
  avatarElement.addEventListener('click', openAvatarPopup);

  cards.forEach(card => cardsContainer.append(createCardElement(card, profileId, handleLikeCard, handleClickCard, handleDeleteCard)));
})
.catch(err => console.log(err));
