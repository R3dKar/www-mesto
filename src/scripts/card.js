const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (card, onClickHandler) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement.querySelector('.card__like-button').addEventListener(
    'click',
    event => event.target.classList.toggle('card__like-button_is-active')
  );

  cardElement.querySelector('.card__delete-button').addEventListener(
    'click',
    event => event.target.closest('.card').remove()
  );

  cardElement.querySelector('.card__image').addEventListener('click', onClickHandler);

  return cardElement;
};
