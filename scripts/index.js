const cardTemplate = document.querySelector('#card-template').content;

const createCard = card => {
    const cardElement = cardTemplate.cloneNode();

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;

    return cardElement;
};

