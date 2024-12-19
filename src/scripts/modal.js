export const openModal = popup => popup.classList.add('popup_is-opened');

export const closeModal = popup => popup.classList.remove('popup_is-opened');

export const handleModalClose = event => closeModal(event.target.closest('.popup'));

export const configureModal = popup => {
  popup.classList.add('popup_is-animated');
  popup.querySelector('.popup__close').addEventListener('click', handleModalClose);
};
