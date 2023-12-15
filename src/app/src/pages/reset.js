import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { Box, VStack, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

/* import `images` file */
import healthWelfare from '../assecs/images/logo/logo01.png';
import mackayMemorial from '../assecs/images/logo/logo02.png';
import openAIFabInc from '../assecs/images/logo/logo04.png';

/* import `Config` file */
import formikItemsReset from '../assecs/config/formik/reset.json';

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

import { initializeApp } from "firebase/app"
import { firebaseConfig } from '../utility/firebase';

import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset
} from "firebase/auth";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
auth.languageCode = 'zh-TW';

const Reset = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authorization, setAuthor, resetAuthor } = useAuthContext();
    const { missions, setMissions } = useMissionContext();
    const logo = process.env.REACT_APP_LOGO

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    // Get the action to complete.
    const mode = queryParams.get('mode');
    // Get the one-time code from the query parameter.
    const actionCode = queryParams.get('oobCode');
    // (Optional) Get the continue URL from the query parameter if available.
    const continueUrl = queryParams.get('continueUrl');
    // (Optional) Get the language code if available.
    const lang = queryParams.get('lang') || 'en';

    /* When form trigger submit buttom that will call this function */
    console.log('logo', logo)
    const submitHandle = async (source, actions) => {

      const { password_confirm, password_new } = source;

      console.log('source', source)
      console.log('password_confirm', password_confirm)
      console.log('password_new', password_new)

      try {
        const verifyEmail = await verifyPasswordResetCode(auth, actionCode)
        console.log('verifyEmail', verifyEmail)
        try {
          const confirm = await confirmPasswordReset(auth, actionCode, password_new)

          console.log('confirm', confirm)
          navigate('/login')
        } catch (error) {
          alert(error.message)
        }
      } catch (error) {
        alert(error.message)
      }

        // verifyPasswordResetCode(auth, actionCode).then((email) => {
        //   const accountEmail = email;

        //   // TODO: Show the reset screen with the user's email and ask the user for
        //   // the new password.
        //   const newPassword = "...";

        //   // Save the new password.
        //   confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {
        //     // Password reset has been confirmed and new password updated.

        //     // TODO: Display a link back to the app, or sign-in the user directly
        //     // if the page belongs to the same domain as the app:
        //     // auth.signInWithEmailAndPassword(accountEmail, newPassword);

        //     // TODO: If a continue URL is available, display a button which on
        //     // click redirects the user back to the app via continueUrl with
        //     // additional state determined from that URL's parameters.
        //   }).catch((error) => {
        //     // Error occurred during confirmation. The code might have expired or the
        //     // password is too weak.
        //   });
        // }).catch((error) => {
        //   // Invalid or expired action code. Ask user to try to reset the password
        //   // again.
        // });

        actions.setSubmitting(false)

    };

    useEffect(() => {

      console.log('mode', mode)
      console.log('actionCode', actionCode)
      console.log('continueUrl', continueUrl)
      console.log('lang', lang)

      switch (mode) {
        case 'resetPassword':
          // Display reset password handler and UI.
          // handleResetPassword(auth, actionCode, continueUrl, lang);
          break;
        case 'recoverEmail':
          // Display email recovery handler and UI.
          // handleRecoverEmail(auth, actionCode, lang);
          break;
        case 'verifyEmail':
          // Display email verification handler and UI.
          // handleVerifyEmail(auth, actionCode, continueUrl, lang);
          break;
        default:
          // Error: invalid mode.
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
                <Text id='sub_title'>{'設定新密碼'}</Text>
                <Formik field={ formikItemsReset } submitText={'OK'} submitHandle={ submitHandle } />
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

export default Reset;
