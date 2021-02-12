import { LOADING } from '../Actions/Loading';

const initialState = {
    value: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                value: action.status,
            }
    }
    return state;
}