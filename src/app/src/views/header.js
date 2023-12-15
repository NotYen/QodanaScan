import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Image, Flex } from '@chakra-ui/react';
import { useLocation } from "react-router-dom";

/* import `Image` source */
import returnIcon from '../assecs/images/icon/return.png';

import { initializeApp } from "firebase/app"
import {
    getAuth
} from "firebase/auth"
import { firebaseConfig } from '../utility/firebase';
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const Header = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [title, setTitle] = useState(null);

    console.log('pathname', pathname)

    /* Write different title according to the path */
    useEffect(() => {
        let _title = '填寫資料';

        if (pathname === '/mission/basic')
            _title = '基本任務';
        else if (pathname === '/result')
            _title = '任務完成';
        else if (pathname !== '/information')
            _title = '進階任務';

        setTitle(_title);
    }, [ pathname ]);

    const handleClick = () => {
        navigate('/mission/list');
    };

    const logout = async (e) => {
        e.preventDefault();
        localStorage.removeItem('persist:root');
        localStorage.removeItem('result');
        localStorage.removeItem('group');
        localStorage.removeItem('information');
        localStorage.removeItem('authorization');
        localStorage.removeItem('start_time');
        try {
            await auth.signOut();
            console.log('firebase Sign-out successful.');
            setTimeout(() => {
                navigate('/login')
            }, 300);
        } catch (error) {
            console.log('firebase Sign-out error:', error);
            alert('登出失敗');
        }
    }

    return (
        <Box id='header' bg='main' w='100%' p={ 5 } color='white' fontSize='1.8rem'>
            <Flex alignItems="center" style={{justifyContent: 'space-between'}}>
                {
                    (pathname !== '/information' && pathname !== '/mission/list') ?
                        <Image src={ returnIcon } w='2rem' h='2rem' mr={ 5 } onClick={ handleClick } />
                    : null
                }
                { title }
                <a href='' onClick={logout}>登出</a>
            </Flex>
        </Box>
    );
};

export default Header;
