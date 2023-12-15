import { useNavigate, useLocation } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

const CustomContext = createContext();
const authorization = localStorage.getItem('authorization');

export const AuthContext = {
    Provider: ({ children }) => {
        const navigate = useNavigate();
        const [author, setAuthor] = useState(authorization);
        const pathname = useLocation().pathname;

        const setAuthorization = author => {
            setAuthor(author);
            localStorage.setItem('authorization', author);
        };

        const resetAuthorization = () => {
            setAuthor(null);
            localStorage.removeItem('authorization');
        };

        const contextValues = {
            authorization: author,
            setAuthor: setAuthorization,
            resetAuthor: resetAuthorization
        };

        // /* Triggered when permissions change */
        useEffect(() => {
            if (pathname === '/' && !author) {
                navigate('/login');
            }
            // !author && navigate('/login');
        }, [ author ]);

        return (
            <CustomContext.Provider value={ contextValues }>
                { children }
            </CustomContext.Provider>
        );
    }
};

export const useAuthContext = () => {
    const context = useContext(CustomContext);

    return context;
};
