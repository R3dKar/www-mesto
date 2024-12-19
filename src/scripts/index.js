import '../pages/index.css';

import { initialCards } from './cards.js';
import { createCard } from './card.js';
import { openModal, handleModalClose, configureModal } from './modal.js';

const cardsContainer = document.querySelector('.places__list');
const nameElement = document.querySelector('.profile__title');
const descriptionElement = document.querySelector('.profile__description');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const profileFormElement = profilePopup.querySelector('.popup__form');
const profileNameInput = profileFormElement.querySelector('.popup__input_type_name');
const profileDescriptionInput = profileFormElement.querySelector('.popup__input_type_description');

const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url');

const imageElement = imagePopup.querySelector('.popup__image');
const imageCaptionElement = imagePopup.querySelector('.popup__caption');

configureModal(profilePopup);
configureModal(cardPopup);
configureModal(imagePopup);

const handleOpenImagePopup = event => {
  const cardElement = event.target.closest('.card');

  const name = cardElement.querySelector('.card__title').textContent;
  const link = cardElement.querySelector('.card__image').src;

  imageElement.src = link;
  imageElement.alt = name;
  imageCaptionElement.textContent = name;

  openModal(imagePopup);
};

initialCards.forEach(card => cardsContainer.append(createCard(card, handleOpenImagePopup)));


const handleProfileFormSubmit = event => {
  event.preventDefault();

  const name = profileNameInput.value;
  const description = profileDescriptionInput.value;

  nameElement.textContent = name;
  descriptionElement.textContent = description;

  handleModalClose(event);
};

const openProfilePopup = () => {
  const name = nameElement.textContent;
  const description =descriptionElement.textContent;

  profileNameInput.value = name;
  profileDescriptionInput.value = description;

  openModal(profilePopup);
};

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
document.querySelector('.profile__edit-button').addEventListener('click', openProfilePopup);


const handleCardFormSubmit = event => {
  event.preventDefault();

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

  openModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);
document.querySelector('.profile__add-button').addEventListener('click', openCardPopup);
