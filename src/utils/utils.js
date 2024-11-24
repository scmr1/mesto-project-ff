export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-26',
    headers: {
        authorization: '098af73a-5bbf-46ce-80f7-8121d11bdd31',
        'Content-Type': 'application/json'
    }
}

export const checkResponse = (response) => {
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