export const openModal = popup => popup.classList.add('popup_is-opened');

export const closeModal = popup => popup.classList.remove('popup_is-opened');

export const handleModalClose = event => closeModal(event.target.closest('.popup'));

export const configureModal = popup => {
  popup.classList.add('popup_is-animated');

  popup.querySelector('.popup__close').addEventListener('click', () => closeModal(popup));

  popup.addEventListener('click', event => {
    if (!event.target.classList.contains('popup')) return;
    closeModal(popup);
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    closeModal(popup);
  });
};
