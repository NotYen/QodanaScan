import { createContext, useContext, useState } from "react";

const CustomContext = createContext();

export const MissionContext = {
    Provider: ({ children }) => {
        const { group, infor, result } = MissionContext.initial();
        const [missions, setMission] = useState({ group, infor, result });
        const contextValues = { missions };

        const setMissions = ({ type, source }) => {
            const _missions = { ...missions };
            const _source = JSON.stringify(source);

            if (source) {
                _missions[type] = source;
                localStorage.setItem(type, _source);
            }

            setMission(_missions);
        };

        contextValues.setMissions = setMissions;
        contextValues.missions = missions;

        return (
            <CustomContext.Provider value={ contextValues }>
                { children }
            </CustomContext.Provider>
        );
    },
    initial: () => {
        let group = localStorage.getItem('group');
        let result = localStorage.getItem('result');
        let infor = localStorage.getItem('information');

        group = group ? JSON.parse(group) : '';
        infor = infor ? JSON.parse(infor) : null;
        result = result ? JSON.parse(result): null;

        return { ...{ group, infor, result } }
    }
};

export const useMissionContext = () => {
    const context = useContext(CustomContext);

    return context;
};
