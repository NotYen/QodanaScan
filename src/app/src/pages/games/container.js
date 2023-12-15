import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { ButtonGroup, Button, Stack, Image } from '@chakra-ui/react';

/* import components from components folder */
import Topic from '../../components/topic';
import Process from '../../components/process';

/* import components from view folder */
import Question from '../../views/question/index';

/* import resource from json folder */
import mission from '../../utility/mission';
import topics from '../../assecs/json/mission/topic';
import process from '../../assecs/json/mission/process';

/* import function from store folder */
import { setStatus as setListStatus } from '../../store/listsSlice';
import { setIndex, setStatus, setCurrent, setAnswers, setCorrect } from '../../store/gamesSlice';

/* import context function */
import { useMissionContext } from '../../context/MissionContext';
import { useModelContext } from '../../context/ModelContext';

/* import update results function */
import { updateResult } from '../../services/updateResult';
import { setPersist } from '../../services/persist';

const GamesContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { actions } = useModelContext();
    const { router } = useParams();
    const [autoAnswer, setAnswer] = useState();
    const { missions: { group, result, infor }, setMissions } = useMissionContext();
    const { index, status, answers, isCorrect } = useSelector(state => state.games);
    const listStatus = useSelector(state => state.lists.status);
    const resource = process[group] ? process[group][router] : [];
    const lists = mission[group]?.lists;
    const question = mission[group]?.basic;
    const selected = resource[index]?.key;

    /* Check the answer is complete */
    const handleVerify = () => {
        const answer = answers[selected];
        const currentGroup = question[selected];
        console.log('answer', answer)

        if (answer) {
            const answerTotal = Object.keys(answer).length;
            const needTotal = Object.keys(currentGroup).filter(key => currentGroup[key].reaction.length > 0).length;

            if (answerTotal === needTotal)
                return true;
        }

        return false;
    };

    /* When checkbox change that will call this function */
    const handleChange = async ({ target: { name, value, checked } }) => {
        const _answers = { ...answers };
        const answer = _answers[selected] || {};

        // if (!checked) {
        //     delete answer[name];
        // } else {
        _answers[selected] = {
            ...answer, ...{
                [name]: {
                    answer: value,
                    spend_time: (window.timeStart) ? (new Date().getTime() - window.timeStart) : 0,
                    more: "",
                    created_at: new Date().toString()
                }
            }
        };
        window.timeStart = 0
        // }
        // console.log(_answers)

        dispatch(setAnswers(_answers));
        // 上報 reault
        updateResult(infor, name, selected, _answers, (error) => {
            if (error.status === 401 ||
                error.status === 403 ||
                error.status === 404) {
                navigate('/login')
            } else {
                alert(error.data.message);
            }
        });
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

    /* Complete button handle */
    const completeHandle = async () => {
        const condition = Object.keys(answers);

        if (condition.length === resource.length) {
            const nextIndex = lists.findIndex(({ name }) => name === router) + 1;
            const _listStatus = { ...listStatus };
            let source = { ...result };

            condition.map(key => {
                source = { ...source, ...answers[key] };
            });

            console.log('router', router)

            _listStatus[router] = 'completed';

            dispatch(setAnswers({}));
            dispatch(setListStatus(_listStatus));
            setMissions({ type: 'result', source: source });
            await setPersist((error) => {
                if (error.status === 401 ||
                    error.status === 403 ||
                    error.status === 404) {
                    navigate('/login')
                } else {
                    alert(error.data.message);
                }
            })

            if (lists.length > nextIndex) {
                const nextRouter = lists[nextIndex].name;
                navigate(`/games/${nextRouter}`);
            }
            else {
                navigate(`/result`);
            }
        };
    };

    const nextStep = () => {
        const isVerify = handleVerify();

        if (isVerify) {
            let _index = index + 1;
            let _status = 'initial';
            console.log('resource', resource)

            if (_index === resource.length) {
                _index = 0;
                completeHandle();
            }

            dispatch(setIndex(_index));
            dispatch(setStatus(_status));
            setPersist((error) => {
                if (error.status === 401 ||
                    error.status === 403 ||
                    error.status === 404) {
                    navigate('/login')
                } else {
                    alert(error.data.message);
                }
            })
        }

        localStorage.removeItem('startTime');
    };

    const startHandler = () => {
        let demonstration = resource[index]?.demonstration;
        let routerPath = `/games/${router}/measured`;

        if (demonstration)
            routerPath = `/games/${router}/demonstration`;

        timerHandler();
        navigate(routerPath);
        dispatch(setCorrect(false));
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

    const timerHandler = () => {
        console.log(router);
        const currentTimer = new Date().getTime();
        const startTimer = localStorage.getItem('startTime');
        if (router === 'corresponding') return;
        if (!startTimer)
            localStorage.setItem('startTime', currentTimer);
        else {
            const timer = (currentTimer - Number(startTimer)) / 1000;

            if (timer < 8 && isCorrect) setAnswer(0);
            else if (timer > 8 && isCorrect) setAnswer(1);
            else setAnswer(2);
        }
    };

    useEffect(() => {
        const patchCurrent = setCurrent({
            key: selected,
            question: question
        });

        dispatch(patchCurrent);
        setPersist((error) => {
            if (error.status === 401 ||
                error.status === 403 ||
                error.status === 404) {
                navigate('/login')
            } else {
                alert(error.data.message);
            }
        })
    }, [index]);

    useEffect(() => {
        const startTimer = localStorage.getItem('startTime');
        if (startTimer) {
            timerHandler();
        }

        const _listStatus = { ...listStatus };
        _listStatus[router] = 'conduct';
        dispatch(setListStatus(_listStatus))
        setPersist((error) => {
            if (error.status === 401 ||
                error.status === 403 ||
                error.status === 404) {
                navigate('/login')
            } else {
                alert(error.data.message);
            }
        })
    }, []);

    useEffect(() => {
        switch (router) {
            case 'nameface':
            case 'voice':
                actions.setModel('voice');
                break;
            case 'build':
            case 'imitate':
                actions.setModel('video');
                break;
            default:
                break;
        }
    }, [])

    return (
        <>
            <Topic resource={topics[router]} />
            <Process resource={resource} selected={selected} />
            <Question resource={question?.[selected]} autoAnswer={autoAnswer} onChange={handleChange} />
            {
                status !== 'completed' &&
                question?.[selected]?.instruction?.illustrate?.image &&
                <Stack className="flex-center" py={'2rem'}>
                    <Image src={question[selected].instruction.illustrate.image} />
                </Stack>
            }
            <ButtonGroup className='flex-center'>
                {
                    status === 'initial' &&
                    <Button onClick={startHandler}>準備開始</Button>
                }
                {
                    status === 'completed' &&
                    ((index + 1) !== resource.length ||
                        router !== lists[lists.length - 1].name) &&
                    <Button onClick={nextStep}>下一題</Button>
                }
                {
                    status === 'completed' &&
                    (index + 1) === resource.length &&
                    router === lists[lists.length - 1].name &&
                    <Button onClick={nextStep}>完成</Button>
                }
            </ButtonGroup>
        </>
    );
};

export default GamesContainer;
