import { addLike, deleteCard, removeLike } from "./api";


const cardTemplate = document.querySelector('#card-template').content;

const updateCard = (card, profileId) => {
  const cardElement = document.querySelector(`#card-${card._id}`);

  cardElement.querySelector('.card__like-count').textContent = card.likes.length.toString();

  const likeButtonElement = cardElement.querySelector('.card__like-button');

  if (card.likes.some(user => user._id === profileId))
    likeButtonElement.classList.add('card__like-button_is-active');
  else
    likeButtonElement.classList.remove('card__like-button_is-active');
};

export const createCard = (card, profileId, onClickHandler) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card').id = `card-${card._id}`;

  const imageElement = cardElement.querySelector('.card__image');
  imageElement.src = card.link;
  imageElement.alt = card.name;

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__like-count').textContent = card.likes.length.toString();

  const likeButtonElement = cardElement.querySelector('.card__like-button');

  if (card.likes.some(user => user._id === profileId))
    likeButtonElement.classList.add('card__like-button_is-active');

  likeButtonElement.addEventListener('click', () => {
    (likeButtonElement.classList.contains('card__like-button_is-active') ? removeLike(card._id) : addLike(card._id))
    .then(card => updateCard(card, profileId))
    .catch(err => console.log(err));
  });

  if (profileId === card.owner._id) {
    const deleteButtonElement = cardElement.querySelector('card__delete-button');

    deleteButtonElement.classList.add('card__delete-button_active');
    deleteButtonElement.addEventListener('click', event => {
      deleteCard(card._id)
      .then(() => event.target.closest('.card').remove())
      .catch(err => console.log(err));
    });
  }

  imageElement.addEventListener('click', onClickHandler);

  return cardElement;
};
