import { useState } from 'react';
import { ButtonGroup, Button } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

/* import components from components folder */
import Topic from '../../components/topic';
import Process from '../../components/process';

/* import components from view folder */
import Question from '../../views/question/basic';

/* import resource from json folder */
import mission from '../../utility/mission';
import topics from '../../assecs/json/mission/topic';
import process from '../../assecs/json/mission/process';

/* import context function */
import { useMissionContext } from '../../context/MissionContext';

/* import update results function */
import { updateResult } from '../../services/updateResult';

const BasicTasks = () => {
    const { missions: { group, result, infor }, setMissions } = useMissionContext();
    const navigate = useNavigate();
    const resource = process[group]?.basic;
    const question = mission[group]?.basic;
    const [answers, setAnswer] = useState({});
    const [current, setCurrent] = useState({
        index: 0,
        selected: resource[0].key
    });
    // console.log(resource, question, answers, current)

    /* Check the answer is complete */
    const handleVerify = () => {
        const selected = current.selected;
        const answer = answers[selected];
        const currentGroup = question[selected];

        if (answer) {
            const answerTotal = Object.keys(answer).length;
            const needTotal = Object.keys(currentGroup).length;

            if (answerTotal === needTotal)
                return true;
        }

        return false;
    };

    /* When checkbox change that will call this function */
    const handleChange = async ({ target: { name, value, checked } }) => {
        const _answers = { ...answers };
        const selected = current.selected;
        const answer = _answers[selected] || {};

        // if (!checked) {
        //     delete answer[name];
        // } else {
            _answers[selected] = {...answer, ...{
                [name]: {
                    answer: value,
                    spend_time: (window.timeStart) ? (new Date().getTime() - window.timeStart): 0,
                    more: "",
                    created_at: new Date().toString()
                }
            }};
            window.timeStart = 0
        // }

        setAnswer(_answers);
        // TODO 要上報 reault
        updateResult(infor, name, selected, _answers, (error) => {
            if (error.status === 401 ||
                error.status === 403 ||
                error.status === 404) {
              navigate('/login')
            } else {
                alert(error.data.message);
            }
        });
    };

    /* Previous button handle */
    const previous = () => {
        const storage = { ...current };

        storage.index -= 1
        storage.selected = resource[storage.index].key;

        setCurrent(storage);
    };

    /* Next step button handle */
    const nextStep = () => {
        const isVerify = handleVerify();

        if (isVerify) {
            const storage = { ...current };

            storage.index += 1
            storage.selected = resource[storage.index].key;

            setCurrent(storage);
        }
    };

    /* Complete button handle */
    const complete = () => {
        const isVerify = handleVerify();
        const condition = Object.keys(answers);

        if (condition.length === resource.length && isVerify) {
            let source = { ...result };

            condition.map(key => {
                source = { ...source, ...answers[key] };
            });

            console.log('source', source)
            // TODO 之後確認存在 localStorage 的格式需不需要改變
            setMissions({ type: 'result', source: source });
            navigate('/mission/list');
        };
    };

    return (
        <>
            <Topic resource={ topics?.basic } />
            <Process resource={ resource } selected={ current.selected } />
            <Question resource={ question?.[current.selected] } answer={ answers?.[current.selected] } onChange={ handleChange } />
            <ButtonGroup className='flex-center'>
                {
                    current.index !== (resource.length - 1) &&
                    <Button onClick={ nextStep }>下一步</Button>
                }
                {
                    current.index === (resource.length - 1) &&
                    <Button onClick={ complete }>完成</Button>
                }
            </ButtonGroup>
        </>
    );
}

export default BasicTasks;