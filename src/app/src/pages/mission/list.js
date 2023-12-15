import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Image, Stack, Text } from '@chakra-ui/react';
import { setPersist } from '../../services/persist';

/* import `Image` source */
import conductIcon from '../../assecs/images/icon/conduct.png';
import completedIcon from '../../assecs/images/icon/completed.png';

/* import components from components folder */
import Topic from '../../components/topic';

/* import resource from json folder */
import mission from '../../utility/mission';
import topics from '../../assecs/json/mission/topic';

/* import function from store folder */
import { setStatus } from '../../store/listsSlice';

/* import context function */
import { useModelContext } from '../../context/ModelContext';
import { useMissionContext } from '../../context/MissionContext';

import { useNavigate } from 'react-router-dom';

import { initializeApp } from "firebase/app"
import {
    getAuth
} from "firebase/auth"
import { firebaseConfig } from '../../utility/firebase';
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const TaskList = () => {
    const dispatch = useDispatch();
    const { missions: { group } } = useMissionContext();
    const { status } = useSelector(state => state.lists);
    const [schedule, setSchedule] = useState(0);
    const { actions } = useModelContext();
    const lists = mission[group]?.lists;
    const navigate = useNavigate();
    const questionGroup = {};
    const [completed, setCompleted] = useState(0);

    lists.forEach((item) => {
        if (!questionGroup[item.text]) {
            questionGroup[item.text] = [];
        }
        questionGroup[item.text].push(status[item.name])
    })

    const handleClick = event => {
        const { target: { title } } = event;
        const listStatus = event.target.getAttribute('data-status');
        const condition = ['completed', 'disabled'];
        console.log('listStatus', status)

        console.log(listStatus)
        if (condition.includes(listStatus))
            event.preventDefault();
        else {
            for (let x in status) {
                if (status[x] === 'conduct') {
                    event.preventDefault();
                    navigate('/games/' + x)
                }
            }
            const _status = { ...status };

            // _status[title] = 'conduct';

            dispatch(setStatus(_status));
        }
        setPersist((error) => {
            if (error.status === 401 ||
                error.status === 403 ||
                error.status === 404) {
                navigate('/login')
            } else {
                alert(error.data.message);
            }
        })
    };

    const signOut = async () => {
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

    useEffect(() => {
        const _status = { ...status };
        const finisher = { index: -1 };
        console.log('_status', _status)
        console.log('lists', lists)

        console.log('questionGroup', questionGroup)

        if (!Object.keys(_status).length) {
            actions.setModel('illustrate');
        }

        setCompleted(document.querySelectorAll('.complete').length)

        lists?.map(({ name }, index) => {
            if (!_status[name] || _status[name] === 'disabled') {
                (index - 1) === finisher.index ?
                    _status[name] = 'usable' :
                    _status[name] = 'disabled';
            }
            else if (_status[name] === 'completed') {
                finisher.index = index;
                setSchedule(state => state += 1);
            }
        });

        dispatch(setStatus(_status));
    }, [])

    return (
        <>
            <Topic resource={topics.list} />
            <Box layerStyle={'lists'} className='flex-center'>
                <div className="schedule-container">{`已完成：${completed} / ${Object.keys(questionGroup).length}`}</div>
                {
                    lists?.filter(item => item.display === true).map(({ name, text, image }) => (
                        <Stack key={name} className='card-list'>
                            <NavLink className='card-item' to={`/games/${name}`} disabled={status[name] === 'disabled'}>
                                <samp className="mask" title={name} onClick={handleClick} data-status={
                                    (questionGroup[text].includes('conduct')) ? 'conduct' : (questionGroup[text].includes('completed') ? 'completed' : ((status[name] === 'usable') ? '' : 'disabled'))
                                }></samp>
                                <Image src={image} />
                                <Text>{text}</Text>
                                <div className="icon-container">

                                    {/* {
                                            (status[name] === 'conduct' || status[questionGroup[text]] === 'conduct') && <Image className='conduct' src={ conductIcon } />
                                        }
                                        {
                                            status[questionGroup[text]] === 'completed' && <Image className='complete' src={ completedIcon } />
                                        } */}
                                    {
                                        questionGroup[text].includes('conduct') ? <Image className='conduct' src={conductIcon} /> : questionGroup[text].includes('completed') && <Image className='complete' src={completedIcon} />
                                    }
                                    {/* { status[name] === 'conduct' && <Image src={ conductIcon } /> }
                                        { status[name] === 'completed' && <Image src={ completedIcon } /> } */}
                                </div>
                            </NavLink>
                        </Stack>
                    ))
                }

            </Box>
        </>
    );
};

export default TaskList;