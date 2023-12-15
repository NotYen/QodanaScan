import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

/* import `Pages transitions` components */
import { m, motion } from 'framer-motion';

/* import context function */
import { ModelContext } from '../context/ModelContext';
import { MissionContext } from '../context/MissionContext';

/* import `Page transitions` config */
import motionConfig from '../assecs/config/motion.json';

/* import components from view folder */
import Header from '../views/header';
import ModelContainer from '../components/model';

/* import context function */
import { useAuthContext } from '../context/AuthContext';
import { useMissionContext } from "../context/MissionContext";

import { getResult } from "../services/getResult";

const Index = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [status, steStatus] = useState(true);
    const { authorization } = useAuthContext();
    const { initial, animate, transition } = motionConfig;
    const { missions } = useMissionContext();

    const getResultData = () => {
        getResult(
            missions.infor.case_id,
            () => {
                navigate('/mission')
            },
            (error) => {
                console.log(error)
                if (error.status === 401 ||
                    error.status === 403 ||
                    error.status === 404) {
                    localStorage.removeItem('persist:root');
                    localStorage.removeItem('result');
                    localStorage.removeItem('group');
                    localStorage.removeItem('information');
                    localStorage.removeItem('authorization');
                    localStorage.removeItem('start_time');
                    setTimeout(() => {
                        navigate('/login')
                    }, 300);
                } else {
                    console.log(error.data.message);
                    navigate('/mission')
                }
            }
        )
    }

    useEffect(() => {
        if (pathname === '/games/building/measured')
            steStatus(false);
        else
            steStatus(true);
    }, [pathname]);

    useEffect(() => {
        const headerContainer = document.getElementById('header');
        const bodyContainer = document.getElementById('section');

        // setTimeout(() => {
        //     const maxHeight = window.innerHeight - headerContainer.offsetHeight;

        //     bodyContainer.style.maxHeight = `${maxHeight}px`;
        // }, 500);

        console.log('pathname', pathname)

        if (pathname === '/') {
            if (authorization) {
                if (missions.group && missions.infor) {
                    getResultData()
                } else {
                    navigate('/information')
                }
            }
        }
        // authorization && navigate('/information');
    }, []);

    return (
        <ModelContext.Provider>
            {status && <Header />}
            <motion.div id='section' className="box-container" {...{ initial, animate, transition }}>
                <Outlet />
            </motion.div>
            <ModelContainer />
        </ModelContext.Provider>
    );
}

export default Index;