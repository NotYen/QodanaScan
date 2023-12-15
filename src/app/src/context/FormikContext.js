import { createContext, useContext } from "react";

const CustomContext = createContext();

export const FormikContext = {
    Provider: ({ children, value }) => (
        <CustomContext.Provider value={ value }>
            { children }
        </CustomContext.Provider>
    )
};

export const useFormikContext = () => {
    const context = useContext(CustomContext);

    return context;
};
