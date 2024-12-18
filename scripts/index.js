const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const createCard = card => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;

  return cardElement;
};

initialCards.forEach(card => cardsContainer.append(createCard(card)));


const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const openModal = popup => popup.classList.add('popup_is-opened');
const closeModal = popup => popup.classList.remove('popup_is-opened');
const handleModalClose = event => closeModal(event.target.closest('.popup'));


profilePopup.querySelector('.popup__close').addEventListener('click', handleModalClose);

const nameElement = document.querySelector('.profile__title');
const descriptionElement = document.querySelector('.profile__description');

const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const descriptionInput = profileFormElement.querySelector('.popup__input_type_description');

const handleProfileFormSubmit = event => {
  event.preventDefault();

  const name = nameInput.value;
  const description = descriptionInput.value;

  nameElement.textContent = name;
  descriptionElement.textContent = description;

  handleModalClose(event);
};

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

const openProfilePopup = () => {
  const name = nameElement.textContent;
  const description =descriptionElement.textContent;

  nameInput.value = name;
  descriptionInput.value = description;

  openModal(profilePopup);
};

document.querySelector('.profile__edit-button').addEventListener('click', openProfilePopup);


cardPopup.querySelector('.popup__close').addEventListener('click', handleModalClose);

const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const urlInput = cardFormElement.querySelector('.popup__input_type_url');

const handleCardFormSubmit = event => {
  event.preventDefault();

  const card = {
    name: cardNameInput.value,
    link: urlInput.value
  };

  cardsContainer.prepend(createCard(card));
  handleModalClose(event);
};

cardFormElement.addEventListener('submit', handleCardFormSubmit);

const openCardPopup = () => {
  cardNameInput.value = '';
  urlInput.value = '';

  openModal(cardPopup);
}

document.querySelector('.profile__add-button').addEventListener('click', openCardPopup);
