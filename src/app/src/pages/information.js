import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Image, Input } from '@chakra-ui/react';

/* import `Config` file */
import formikItems from '../assecs/config/formik/information.json';

/* import custom tools */
import toBase64 from '../assecs/plugin/base64';

/* import `Form control` view */
import Formik from '../views/formik';

/* import `Image` source */
import ibento from '../assecs/images/source/ibento.png';
import cameraIcon from '../assecs/images/icon/camera.png';

/* import custom tools */
import timestamp from '../assecs/plugin/timestamp';
import calculate from '../assecs/plugin/calculate';

/* import context function */
import { useModelContext } from '../context/ModelContext';
import { useMissionContext } from '../context/MissionContext';

const Information = () => {
    const navigate = useNavigate();
    const { actions, setModel } = useModelContext();
    const { setMissions } = useMissionContext();
    const [photo, setPhoto] = useState(ibento);
    const [avatarUrl, setAvatarUrl] = useState('');

    /* Check for compliance with test standards */
    const checkAges = (age, month, day) => {
        if (age > 3 || age < 1)
            return false;
        else if (age === 1 && month < 5)
            return false;
        else if (age === 1 && month === 5 && day < 15)
            return false;
        else if (age === 3 && month > 0)
            return false;
        else if (age === 3 && month === 0 && day > 14)
            return false;

        return true;
    };

    /* Question group distinction */
    const distinctionGroup = (age, month, day) => {
        let group = '1Y6M';

        if (age === 3) group = '2Y6M';
        else if (age === 2 && month > 5) group = '2Y6M';
        else if (age === 2 && month === 5 && day >= 15) group = '2Y6M';

        return group;
    };

    /* When image change that will call this function */
    const handleChange = async ({ target }) => {
        const file = target.files[0];
        const base64 = await toBase64(file);

        console.log('file', file)
        let formData = new FormData();
        formData.append("file", file);

        setPhoto(base64);
        target.value = null;
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/file/upload/avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('res', res)
            setAvatarUrl(res.publicUrl);
        } catch (error) {
            console.log('ERROR', error)
            actions.setModel('error');
        }
    };

    /* Store data in SessionStorage */
    const handleStore = ({ source, age, month, day }) => {
        const group = distinctionGroup(age, month, day);
        const userCase = {
            ...source,
            group
        }
        console.log('userCase', userCase)

        axios.post(`${process.env.REACT_APP_API_URL}/api/user/case`, userCase)
            .then(resource => {
                if (resource.data.case_id) {
                    source['case_id'] = resource.data.case_id;
                }
                setMissions({ type: 'group', source: group });
                setMissions({ type: 'information', source: source });
                navigate('/mission');
            })
            .catch(error => {
                console.log('ERROR', error)
                actions.setModel('error');
            })
    };

    /* When form trigger submit buttom that will call this function */
    const submitHandler = (source, { setSubmitting }) => {
        const checkDate = source.dueDate || source.birthday;
        const birthday = checkDate.split('-');
        const { age, month, day } = calculate.age(birthday);
        const inRange = checkAges(age, month, day);

        source.photo = avatarUrl;
        source.current = timestamp.get();

        console.log('source', source);
        if (inRange) {
            handleStore({ source, ...{ age, month, day } });
        } else {
            // TODO 確認不符合資格要不要進 DB
            actions.setModel('qualified');
        }

        setSubmitting(false);
    };

    /* Display prompt window when entering */
    useEffect(() => { actions.setModel('remind') }, []);

    return (
        <Box layerStyle={'information'}>
            <Stack className='image-container flex-center'>
                <div className="position-container">
                    <div className="image-content flex-center">
                        <Image src={photo} alt='個人頭像' />
                    </div>
                    <label className='upload-content'>
                        <Image borderRadius='full' src={cameraIcon} alt='上傳圖片' />
                        <Input type='file' hidden onChange={handleChange} />
                        <Input type='hidden' value={avatarUrl}></Input>
                    </label>
                </div>
            </Stack>
            <Stack p={8}>
                <Formik field={formikItems} submitText="確認" submitHandle={submitHandler} />
            </Stack>
        </Box>
    );
}

export default Information;