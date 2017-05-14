
export const loadState = () => {
    try {

        const state = JSON.parse(localStorage.getItem("state"));
        if (state != null) return state;

        return undefined;

    }catch(err){

        return undefined;
    }
}

export const saveState = (state) => {
    try{

        // Modify state immutably
        const persistedState = loadState();

        if (persistedState) state = Object.assign({}, persistedState, state);
        
        localStorage.setItem("state", JSON.stringify(state));

    }catch(err){
        // log error
    }
};

