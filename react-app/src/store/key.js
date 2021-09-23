const LOAD_API_KEY = 'stock/LOAD_API_KEY';

const loadApiKey = (key) => ({
    type: LOAD_API_KEY,
    payload: key,
});

export const getKey = () => async (dispatch) => {
    const res = await fetch('/api/key', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();
    dispatch(loadApiKey(data["stockAPIKey"]));
};

const initialState = { key: null };

const apiReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_API_KEY:
            return { key: action.payload };
        default:
            return state;
    }
};

export default apiReducer;
