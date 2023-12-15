import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Box, VStack, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

/* import `images` file */
import healthWelfare from '../assecs/images/logo/logo01.png';
import mackayMemorial from '../assecs/images/logo/logo02.png';
import openAIFabInc from '../assecs/images/logo/logo04.png';

/* import `Config` file */
import formikItemsForget from '../assecs/config/formik/forget.json';

/* import context function */
import { useAuthContext } from '../context/AuthContext';
import { useMissionContext } from '../context/MissionContext';

/* import `Form control` view */
import Formik from '../views/formik';

/* import function from store folder */
import { setStatus } from '../store/listsSlice';
import { resetGames } from '../store/gamesSlice';

/* import custom tools */
import timestamp from '../assecs/plugin/timestamp';
import { getPersist } from '../services/persist';

import { initializeApp } from "firebase/app"
import { firebaseConfig } from '../utility/firebase';

import {
  getAuth,
  sendPasswordResetEmail
} from "firebase/auth";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
auth.languageCode = 'zh-TW';

const Forget = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authorization, setAuthor, resetAuthor } = useAuthContext();
    const { missions, setMissions } = useMissionContext();
    const logo = process.env.REACT_APP_LOGO

    /* When form trigger submit buttom that will call this function */
    console.log('logo', logo)
    const submitHandle = async (source, actions) => {
        console.log('source', source)

        const { email } = source;

        try {
            const sendEmail = await sendPasswordResetEmail(auth, email)
            console.log('sendEmail', sendEmail)
            alert('已寄出重設密碼信件，請至信箱收取')
        } catch (error) {
            actions.setErrors({'email': error.message});
        }
        actions.setSubmitting(false)

    };

    // useEffect(() => {
    //     if (authorization && missions) {
    //         console.log('missions', missions)
    //         // if (missions.infor) {
    //         // } else {
    //         //     window.location.href = '/'
    //         // }
    //         getPersist((persist) => {
    //             window.location.href = '/'
    //             // dispatch(setStatus(JSON.parse(persist)['lists']));
    //         }, (error) => {
    //             console.log('ERROR', error);
    //             window.location.href = '/'
    //         })
    //         // navigate('/')
    //     }
    // }, [ authorization, missions ]);

    useEffect(() => {
        // resetAuthor();
        return () => {
            // dispatch(resetGames());
            // dispatch(setStatus({}));
            // localStorage.removeItem('result');
            // localStorage.removeItem('group');
            // localStorage.removeItem('information');
            // localStorage.removeItem('startTime');
            // localStorage.removeItem('authorization');
            // localStorage.removeItem('persist:root');
        }
    }, []);

    return (
        <Box className='direction-column' layerStyle={ 'login' }>
            <VStack>
                <Image src={ healthWelfare } alt='衛生福利部' width='193px' mb={ 2 } />
                <Image src={ logo } alt='馬偕紀念醫院' width='449px' />
                <h1 id="title">兒童發展智能篩檢</h1>
            </VStack>
            <VStack className="login-container">
                <Text id='sub_title'>{'忘記密碼'}</Text>
                <Formik field={ formikItemsForget } submitText={'送出'} submitHandle={ submitHandle } />
                <div id='lofin_info'>
                {
                    '已有帳號?'
                } <Link id="link" to="/login" >登入</Link>
                </div>
            </VStack>
            <div className="copyright-container">
                <Image src={ openAIFabInc } alt='開源智造' />
            </div>
        </Box>
    );
};

export default Forget;
