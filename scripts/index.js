const cardTemplate = document.querySelector('#card-template').content;
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

const openModal = popup => popup.classList.add('popup_is-opened');
const closeModal = popup => popup.classList.remove('popup_is-opened');
const handleModalClose = event => closeModal(event.target.closest('.popup'));

profilePopup.querySelector('.popup__close').addEventListener('click', handleModalClose);
cardPopup.querySelector('.popup__close').addEventListener('click', handleModalClose);
imagePopup.querySelector('.popup__close').addEventListener('click', handleModalClose);


const createCard = card => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement.querySelector('.card__like-button').addEventListener('click', event => event.target.classList.toggle('card__like-button_is-active'));
  cardElement.querySelector('.card__delete-button').addEventListener('click', event => event.target.closest('.card').remove());
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    imageElement.src = card.link;
    imageElement.alt = card.name;
    imageCaptionElement.textContent = card.name;

    openModal(imagePopup);
  });

  return cardElement;
};

initialCards.forEach(card => cardsContainer.append(createCard(card)));


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

  cardsContainer.prepend(createCard(card));
  handleModalClose(event);
};

const openCardPopup = () => {
  cardNameInput.value = '';
  cardUrlInput.value = '';

  openModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);
document.querySelector('.profile__add-button').addEventListener('click', openCardPopup);
