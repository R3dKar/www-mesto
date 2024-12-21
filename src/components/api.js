const baseUrl = `https://nomoreparties.co/v1/${process.env.COHORT_ID}`;

const authorizationHeaders = {
  'Authorization': process.env.TOKEN
};

const jsonHeaders = {
  'Content-Type': 'application/json'
}


const wrapApiRequest = (fetchPromise) => fetchPromise.then(response => {
  if (response.ok) return response.json();
  return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
});

export const getProfile = () => wrapApiRequest(
  fetch(`${baseUrl}/users/me`, {
    headers: { ...authorizationHeaders }
  })
);

let profileId;

export const getProfileId = () => {
  if (profileId !== undefined) return Promise.resolve(profileId);

  return getProfile().then(data => {
    profileId = data._id;
    return profileId;
  });
};

export const editProfile = (name, about) => wrapApiRequest(
  fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: { ...authorizationHeaders, ...jsonHeaders },
    body: JSON.stringify({ name, about })
  })
);

export const editProfileAvatar = (avatar) => wrapApiRequest(
  fetch(`${baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: { ...authorizationHeaders, ...jsonHeaders },
    body: JSON.stringify({ avatar })
  })
);

export const getCards = () => wrapApiRequest(
  fetch(`${baseUrl}/cards`, {
    headers: { ...authorizationHeaders }
  })
);

export const createCard = (name, link) => wrapApiRequest(
  fetch(`${baseUrl}/cards`, {
    method: 'POST',
    headers: { ...authorizationHeaders, ...jsonHeaders },
    body: JSON.stringify({ name, link })
  })
);

export const deleteCard = (cardId) => wrapApiRequest(
  fetch(`${baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: { ...authorizationHeaders }
  })
);

export const addLike = (cardId) => wrapApiRequest(
  fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: { ...authorizationHeaders }
  })
);

export const removeLike = (cardId) => wrapApiRequest(
  fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: { ...authorizationHeaders }
  })
);
