import React, { useContext, useReducer,useEffect } from "react";
import reducer from "./Reducer";

const initialState = {
    isLoding: true,
    query: "CSS",
    nbPages: 0,
    page: 0,
    hits: [],
};
const Appcontext = React.createContext();
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer( reducer, initialState);
    const stories = "https://hn.algolia.com/api/v1/search";
   useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(stories);
            const data = await result.json();
                

                console.log(data);
                dispatch({
                    type: "GET_STORIES",
                    payload: {
                        hits: data.hits,
                         nbPages: data.nbPages,
                     },
                });
        }
        fetchData(`${stories}query=${state.query}&page=${state.page}`);
    }, []);


    return (
        <Appcontext.Provider value={{...state}}>
            {children}
        </Appcontext.Provider>
    );
};
const useOwnContext = () => {
    return useContext(Appcontext);
};
export { AppProvider, Appcontext, useOwnContext };
