const checkValidity = inputElements => inputElements.every(inputElement => inputElement.validity.valid);

const updateSubmitButton = (submitButtonElement, inputElements, settings) => {
  if (checkValidity(inputElements)) {
    submitButtonElement.classList.remove(settings.inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  } else {
    submitButtonElement.setAttribute('disabled', '');
    submitButtonElement.classList.add(settings.inactiveButtonClass);
  }
};

const updateInputErrorMessage = (inputElement, errorMessage, settings) => {
  const errorMessageElement = inputElement.closest(settings.formSelector).querySelector(`.${inputElement.id}-error`);

  if (inputElement.validity.valid) {
    errorMessageElement.textContent = '';
    errorMessageElement.classList.remove(settings.errorClass);

    inputElement.classList.remove(settings.inputErrorClass);
  } else {
    errorMessageElement.textContent = errorMessage;
    errorMessageElement.classList.add(settings.errorClass);

    inputElement.classList.remove(settings.inputErrorClass);
  }
};

const setEventListeners = (formElement, settings) => {
  formElement.addEventListener('submit', event => event.preventDefault() );

  const submitButtonElement = formElement.querySelector(settings.submitButtonSelector);
  const inputElements = Array.from(formElement.querySelectorAll(settings.inputSelector));

  formElement.addEventListener('input', event => {
    const inputElement = event.target;
    updateInputErrorMessage(inputElement, inputElement.validationMessage, settings);
    updateSubmitButton(submitButtonElement, inputElements, settings);
  });

  updateSubmitButton(submitButtonElement, inputElements, settings);
};

export const enableValidation = settings => {
  const formElements = Array.from(document.querySelectorAll(settings.formSelector));
  formElements.forEach(formElement => setEventListeners(formElement, settings));
};
