const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-26',
    headers: {
        authorization: '098af73a-5bbf-46ce-80f7-8121d11bdd31',
        'Content-Type': 'application/json'
    }
}

const checkResponse = (response) => {
    if (response.ok) {
        return response;
    }
    return Promise.reject(new Error(`Ошибка: ${response.status}`));
};

export default async function request(endpoint, method = 'GET', data = undefined) {
    const options = {
        method,
        headers: config.headers,
        body: (data) ? JSON.stringify(data) : undefined
    }
    const res = await fetch(config.baseUrl + endpoint, options);
    const res_1 = await checkResponse(res);
    return res_1.json();
}

function handleCloseModalByEsc(event) {
    if (event.key !== 'Escape') return;
    closeModal(document.querySelector('.popup_is-opened'));
}

export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleCloseModalByEsc);
};

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseModalByEsc);
}

export function closePopupByOverlay(event) {
    if (!event.target.classList.contains('popup')) return;
    const popup = event.target
    closeModal(popup);
}
