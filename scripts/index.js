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

profilePopup.querySelector('.popup__close').addEventListener('click', event => closeModal(event.target.closest('.popup')));

const openProfilePopup = () => {
  const name = document.querySelector('.profile__title').textContent;
  const description = document.querySelector('.profile__description').textContent;

  profilePopup.querySelector('.popup__input_type_name').value = name;
  profilePopup.querySelector('.popup__input_type_description').value = description;

  openModal(profilePopup);
};

document.querySelector('.profile__edit-button').addEventListener('click', openProfilePopup);
