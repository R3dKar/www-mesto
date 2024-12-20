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

const updateInputErrorMessage = (inputElement, isValid, errorMessage, settings) => {
  const errorMessageElement = inputElement.closest(settings.formSelector).querySelector(`.${inputElement.id}-error`);

  if (isValid) {
    errorMessageElement.textContent = '';
    errorMessageElement.classList.remove(settings.errorClass);

    inputElement.classList.remove(settings.inputErrorClass);
  } else {
    errorMessageElement.textContent = errorMessage;
    errorMessageElement.classList.add(settings.errorClass);

    inputElement.classList.add(settings.inputErrorClass);
  }
};

export const clearFormErrorMessages = (formElement, settings) => {
  const submitButtonElement = formElement.querySelector(settings.submitButtonSelector);
  const inputElements = Array.from(formElement.querySelectorAll(settings.inputSelector));

  inputElements.forEach(inputElement => updateInputErrorMessage(inputElement, true, '', settings));
  updateSubmitButton(submitButtonElement, inputElements, settings);
}

const setEventListeners = (formElement, settings) => {
  formElement.addEventListener('submit', event => {
    event.preventDefault();
  });

  const submitButtonElement = formElement.querySelector(settings.submitButtonSelector);
  const inputElements = Array.from(formElement.querySelectorAll(settings.inputSelector));

  formElement.addEventListener('input', event => {
    const inputElement = event.target;
    updateInputErrorMessage(inputElement, inputElement.validity.valid, inputElement.validationMessage, settings);
    updateSubmitButton(submitButtonElement, inputElements, settings);
  });

  updateSubmitButton(submitButtonElement, inputElements, settings);
};

export const enableValidation = settings => {
  const formElements = Array.from(document.querySelectorAll(settings.formSelector));
  formElements.forEach(formElement => setEventListeners(formElement, settings));
};
