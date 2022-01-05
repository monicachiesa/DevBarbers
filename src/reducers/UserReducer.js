export const initialState = {
    avatar: '',
    favorites: [],
    appointments: []
};

export const UserReducer = (state, action) => { //grade de informações do usuário

    switch (action.type) {
        case 'setAvatar':
            return { ...state, avatar: action.payload.avatar };
            break;
        default:
            return state;
    }
}