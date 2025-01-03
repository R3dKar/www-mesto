const handleEscapeKeyPress = event => {
  if (event.key !== 'Escape') return;

  closeModal(document.querySelector('.popup_is-opened'));
};

export const openModal = popup => {
  if (popup.classList.contains('popup_is-opened')) return;

  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeKeyPress);
};

export const closeModal = popup => {
  if (!popup.classList.contains('popup_is-opened')) return;

  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeKeyPress);
};

export const handleModalClose = event => closeModal(event.target.closest('.popup'));

export const configureModal = popup => {
  popup.classList.add('popup_is-animated');

  popup.querySelector('.popup__close').addEventListener('click', () => closeModal(popup));

  popup.addEventListener('mousedown', event => {
    if (!event.target.classList.contains('popup')) return;
    closeModal(popup);
  });
};
