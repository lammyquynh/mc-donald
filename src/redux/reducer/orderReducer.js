import actions, {
    getActionFail,
    getActionSuccess,
    getActionUnmount,
} from '../actions';

const initialState = {
    data: [],
};

export const getOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case getActionSuccess(actions.GET_ORDER):
            return {
                ...state,
                data: action.data,
            };
        case getActionFail(actions.GET_ORDER):
            return { ...state, data: null };
        case getActionUnmount(actions.GET_ORDER):
            return { ...initialState };
        default:
            return state;
    }
};

const orderReducer = {
    getOrderReducer,
};
export default orderReducer;
