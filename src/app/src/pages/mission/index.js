import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Stack } from '@chakra-ui/react';

/* import context function */
import { useMissionContext } from '../../context/MissionContext';

/* import components from view folder */
import Summary from '../../views/summary';

const MissionLayer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { missions } = useMissionContext();

    /* Check information and result then guide the page to the right page */
    useEffect(() => {
        // const information = missions.infor;
        console.log('missions', missions)
        const result = localStorage.getItem('result');

        if (!missions.group && !missions.infor && !missions.result) {
            navigate('/login');
            return
        }

        if (result) {
            navigate('/mission/list');
        } else {
            navigate('/mission/basic');
        }

        // if (pathname !== '/mission/list')
        //     information && navigate('/mission/basic');
    }, []);

    return (
        <Box layerStyle={ 'mission' }>
            <Summary />
            <Stack my='1rem'>
                <Outlet />
            </Stack>
        </Box>
    );
}

export default MissionLayer;