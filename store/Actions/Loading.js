// THIS IS THE ACTION 

export const LOADING = "LOADING";

export const loading = (value) => {
    return {
        type: LOADING,
        status: value,
    }
};