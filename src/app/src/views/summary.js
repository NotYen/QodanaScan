import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ibento from '../assecs/images/source/ibento.png';

/* import context function */
import { useMissionContext } from '../context/MissionContext';

const Summary = () => {
    const navigate = useNavigate();
    const { missions } = useMissionContext();

    useEffect(() => { !missions.infor && navigate('/information'); }, []);

    return (
        <Box layerStyle={ 'summary' } className='flex-center'>
            <div className="position-container flex-center">
                <div className="image-content flex-center">
                    <LazyLoadImage src={ missions.infor?.photo || ibento} alt='個人頭像' />
                </div>
                <Text className="text-context">{ missions.infor?.['姓名'] }</Text>
            </div>
            <div className="infor-content">
                <Text className="text-label">組別</Text>
                <Text className="text-context">{ missions.group }</Text>
            </div>
            <div className="infor-content">
                <Text className="text-label">陪同家長</Text>
                <Text className="text-context">{ missions.infor?.parent_name }</Text>
            </div>
            <div className="infor-content">
                <Text className="text-label">受測日期</Text>
                <Text className="text-context">{ missions.infor?.current }</Text>
            </div>
        </Box>
    )
};

export default Summary;
