import request from '../utils/utils';

export const getUser = () => {
    return request('/users/me')
}

export const editUser = (name, about) => {
    return request('/users/me', 'PATCH', {
        name,
        about
    });
}

export const changeAvatar = (link) => {
    return request('/users/me/avatar', 'PATCH', {
        avatar: link
    });
}

export const getInitialCards = () => {
    return request('/cards')
}

export const addCard = (name, link) => {
    return request('/cards', 'POST', {
        name,
        link
    });
}

export const removeCard = (cardId) => {
    return request('/cards/' + cardId, 'DELETE');
}

export const like = (cardId) => {
    return request('/cards/likes/' + cardId, 'PUT');
}

export const dislike = (cardId) => {
    return request('/cards/likes/' + cardId, 'DELETE');
}