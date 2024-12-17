const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const createCard = card => {
  const cardElement = cardTemplate.cloneNode();

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;

  return cardElement;
};

initialCards.forEach(card => cardsContainer.append(createCard(card)));
