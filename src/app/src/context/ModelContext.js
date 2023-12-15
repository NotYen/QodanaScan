import { createContext, useContext, useEffect, useState } from "react";
import { useDisclosure } from '@chakra-ui/react';

/* import context function */
import { useAuthContext } from './AuthContext';

/* import `Model content` components */
import modelContent from '../views/model';

import dinosaurAudio from '../assecs/source/dinosaur.m4a';
import rabbitAudio from '../assecs/source/rabbit.m4a';
import catAudio from '../assecs/source/cat.m4a';
import goldAudio from '../assecs/source/gold.m4a';

const CustomContext = createContext();

export const ModelContext = {
    Provider: ({ children }) => {
        const { resetAuthor } = useAuthContext();
        const [type, setType] = useState();
        const [content, setContent] = useState();
        const [callback, setCallback] = useState();
        const [config, setConfig] = useState({ buttonText: 'OK' });
        const { isOpen, onOpen, onClose } = useDisclosure();
        const contextValues = {
            status: isOpen,
            content: content,
            config: config,
            actions: {}
        };
        const [playing, setPlay] = useState(false);

        contextValues.actions = {
            resetModel: () => {
                // if (type === 'qualified')
                //     resetAuthor();

                if (callback) {
                    callback();
                    setContent(null);
                }

                onClose();
            },
            setModel: (type, func) => {
                const element = modelContent[type];
                setType(type);
                setContent(element);

                const audioMap = {
                    dinosaur: dinosaurAudio,
                    rabbit: rabbitAudio,
                    cat: catAudio,
                    gold: goldAudio,
                }

                const url = audioMap[type];
                if (url) {
                    const control = new Audio(url);
                    if (!playing) {
                        control.play();
                        setPlay(true);
                        // setTimeout(() => setPlay(false), 1);
                        control.addEventListener('ended', () => {
                            console.log('播放结束');
                            setPlay(false);
                        })
                    }
                }

                const buttonTextMap = {
                    remind: 'OK,了解',
                    qualified: '確認',
                    voice: '確認',
                    video: '下一步',
                    default: 'OK'
                };

                setConfig(oldConfig => ({
                    ...oldConfig,
                    buttonText: buttonTextMap[type] || buttonTextMap.default,
                }));

                if (typeof func === 'function')
                    setCallback(() => func);
            },
            setActions: ({ buttonText, actionFunction }) => {
                const _config = { ...config };

                _config.buttonText = buttonText;
                _config.clickFunction = actionFunction;

                setConfig(_config);
            }
        };

        useEffect(() => { content && onOpen() }, [ content ]);

        return (
            <CustomContext.Provider value={ contextValues }>
                { children }
            </CustomContext.Provider>
        );
    }
};

export const useModelContext = () => {
    const context = useContext(CustomContext);

    return context;
};