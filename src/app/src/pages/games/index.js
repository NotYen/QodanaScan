import { useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Stack } from '@chakra-ui/react';

/* import resource from json folder */
import mission from '../../utility/mission';
import topics from '../../assecs/json/mission/topic';
import process from '../../assecs/json/mission/process';

import { useMissionContext } from '../../context/MissionContext';

const GamesIndex = () => {
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();
    const router = searchParams.get('router');
    const { missions: { group, result, infor }, setMissions } = useMissionContext();


    useEffect(() => {
        console.log('games', group, result, infor)
        if (!group && !result && !infor) {
            navigate('/login');
            return
        }
        router && navigate(`/games/${router}`)
    }, []);

    return (
        <Stack my='1rem'>
            <Outlet />
        </Stack>
    );
};

export default GamesIndex;
