import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Box, VStack, Text, Image } from '@chakra-ui/react';

/* import `images` file */
import healthWelfare from '../assecs/images/logo/logo01.png';
import mackayMemorial from '../assecs/images/logo/logo02.png';
import openAIFabInc from '../assecs/images/logo/logo04.png';

/* import `Config` file */
import formikItemsLogin from '../assecs/config/formik/login.json';
import formikItemsRegister from '../assecs/config/formik/register.json';

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
  signInWithEmailAndPassword
} from "firebase/auth";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const signIn = (email, password) => {
    try {
        const userCredential = signInWithEmailAndPassword(auth, email, password)
        return userCredential
    } catch (error) {
        return error
    }
  }

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authorization, setAuthor, resetAuthor } = useAuthContext();
    const { missions, setMissions } = useMissionContext();
    const [loginState, setLoginState] = useState(true); // true: login, false: register
    const logo = process.env.REACT_APP_LOGO

    /* When form trigger submit buttom that will call this function */
    console.log('logo', logo)
    const submitHandle = async (source, actions) => {
        try {
            let res;
            if (loginState) {
                let user
                try {
                    user = await signIn(source.username, source.password)
                    console.log('user', user.user.accessToken)
                    localStorage.setItem('authorization', user.user.accessToken);
                } catch (error) {
                    console.log('ERROR', error.message)
                    alert(error.message)
                }

                res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, source)

                const startTime = timestamp.getTimer();
                localStorage.setItem('start_time', startTime);
                if (res.data.cases.length && res.data.cases[0].group) {
                    setMissions({ type: 'information', source: res.data.cases[0] });
                    setMissions({ type: 'group', source: res.data.cases[0].group });
                }

                setTimeout(() => {
                    setAuthor(res.data.token);
                }, 600);

            } else {
                source.verify = true;
                res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/create`, source)
                alert('註冊成功');
                setLoginState(true);
            }
        } catch (error) {
            console.log('ERROR', error);
            if (!error) {
                // actions.setErrors({ username: '伺服器錯誤' });
                alert('伺服器錯誤');
            } else {
                if (error.data.message.username) {
                    actions.setErrors({ username: error.data.message.username });
                }
                if (error.data.message.id) {
                    actions.setErrors({ id: error.data.message.id });
                }
                // alert(error.message);
            }
        }
        actions.setSubmitting(false)
    };

    const handleClick = () => {
        loginState ? setLoginState(false) : setLoginState(true);
    };

    useEffect(() => {
        if (authorization && missions) {
            console.log('missions', missions)
            // if (missions.infor) {
            // } else {
            //     window.location.href = '/'
            // }
            getPersist((persist) => {
                window.location.href = '/'
                // dispatch(setStatus(JSON.parse(persist)['lists']));
            }, (error) => {
                console.log('ERROR', error);
                window.location.href = '/'
            })
            // navigate('/')
        }
    }, [ authorization, missions ]);

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
                <Text id='sub_title'>{(loginState) ? '登入': '註冊'}</Text>
                <Formik field={ loginState ? formikItemsLogin : formikItemsRegister } submitText={(loginState) ? '登入': '註冊'} submitHandle={ submitHandle } loginState={loginState} />
                <div id='lofin_info'>
                {(loginState) ?
                    <Link id="link" to="/forget" >忘記密碼?</Link>
                    :
                    '已有帳號?'
                } <a href="#" id="link" onClick={handleClick} >{(loginState) ? '註冊': '登入'}</a>
                </div>
            </VStack>
            <div className="copyright-container">
                <Image src={ openAIFabInc } alt='開源智造' />
            </div>
        </Box>
    );
};

export default Login;
