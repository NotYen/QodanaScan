import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, VStack, Stack, Image, Text, Button } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { scoreData, score, resultData } from "../utility/score";

/* import components from view folder */
import Summary from '../views/summary';

/* import custom tools */
import timestamp from '../assecs/plugin/timestamp';

/* import `images` file */
import healthWelfare from '../assecs/images/logo/logo01.png';
import mackayMemorial from '../assecs/images/logo/logo02.png';

/* import context function */
import { useMissionContext } from '../context/MissionContext';
import { setPersist } from '../services/persist';

import { updateScore } from '../services/updateResult';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getRemoteConfig, getAll, getValue, fetchAndActivate } from "firebase/remote-config";
import {firebaseConfig } from '../utility/firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 600000;
remoteConfig.defaultConfig = {
    "1Y6M": {
        "LR": [11, 17],
        "C": [14, 20],
        "FM": [10, 12]
    },
    "2Y6M": {
        "LR": [31, 35],
        "C": [41, 46],
        "FM": [16, 18]
    }
}

const Result = () => {
    const navigate = useNavigate();
    const { missions: { result, group, infor } } = useMissionContext();
    const [consequent, setConsequent] = useState(true);
    const [remoteConfigData, setRemoteConfigData] = useState({});
    const [testResult, setTestResult] = useState({
        'LR': '',
        'C': '',
        'FM': ''
    });

    const resultColor = (str) => {
        if (str === '正常') {
            return '#3AB500';
        }
        if (str === '邊緣') {
            return '#F9B300';
        }
        if (str === '遲緩') {
            return '#ED4C4C';
        }
    }

    const getResultScore = () => {
        let scoreList = [];
        // console.log(result);
        for (let key in result) {
            // console.log(result[key]);
            let answer = result[key]['answer'];
            // console.log(answer);
            scoreList = scoreList.concat(resultScore(answer));
        }
        console.log(scoreList);
        // console.log(calcAllScore(scoreList));
        // console.log('LR', calcScoreLR(scoreList));
        // console.log('C', calcScoreC(scoreList));
        // console.log('FM', calcScoreFM(scoreList));
        // console.log(detailResult(remoteConfigData, 'LR', calcScoreLR(scoreList)))
        // console.log(detailResult(remoteConfigData, 'C', calcScoreC(scoreList)))
        // console.log(detailResult(remoteConfigData, 'FM', calcScoreFM(scoreList)))
        updateScore(infor, {
            'LR': calcScoreLR(scoreList),
            'C': calcScoreC(scoreList),
            'FM': calcScoreFM(scoreList)
        })
        const resultLR = detailResult(remoteConfigData, 'LR', calcScoreLR(scoreList))
        const resultC = detailResult(remoteConfigData, 'C', calcScoreC(scoreList))
        const resultFM = detailResult(remoteConfigData, 'FM', calcScoreFM(scoreList))
        setTestResult({
            'LR': resultLR,
            'C': resultC,
            'FM': resultFM
        })
        const res = [resultLR, resultC, resultFM]
        if (res.includes('邊緣') || res.includes('遲緩')) {
            setConsequent(false);
        }
    }

    const resultScore = (str) => {
        const regex = /\((.*?)\)/g;
        const matches = str.match(regex);
        let content = []

        if (matches) {
            // console.log(matches)
            let match = matches[0];
            if (matches.length > 1) {
                match = matches[matches.length - 1];
            }
            content = match.slice(1, -1); // Remove the parentheses
            content = content.replace(/ /g, '');
            content = content.split(',')
        }
        return content;
    }

    const calcAllScore = (list) => {
        let total = 0;
        for (let i = 0; i < list.length; i++) {
            const element = list[i]
            if (element.includes('-')) {
                const [start, end] = element.split('-');
                let tmpScore = score[start] + score[end];
                total += tmpScore;
            } else {
                total += score[element];
            }
        }
        return total;
    }

    const calcScoreLR = (list) => {
        const listLR = list.filter((item) => {
            return item.includes('LR');
        })
        return calcAllScore(listLR)
    }

    const calcScoreC = (list) => {
        const listC = list.filter((item) => {
            return item.includes('C');
        })
        return calcAllScore(listC)
    }

    const calcScoreFM = (list) => {
        const listFM = list.filter((item) => {
            return item.includes('FM');
        })
        return calcAllScore(listFM)
    }

    const detailResult = (obj, type, score) => {
        const scoreRange = obj[group][type];
        const [lowerBound, upperBound] = scoreRange;

        if (score >= upperBound) {
            return '正常';
        }
        if (score <= lowerBound) {
            return '遲緩';
        }
        return '邊緣';
    }

    useEffect(() => {
        if (!group && !infor && !result) {
            navigate('/login');
            return
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
        fetchAndActivate(remoteConfig)
            .then(() => {
                setRemoteConfigData(JSON.parse(getValue(remoteConfig, 'result_data')._value))
            })
            .catch((err) => {
            });
    }, []);

    useEffect(() => {
        if (Object.keys(remoteConfigData).length > 0) {
            getResultScore();
        }
    }, [remoteConfigData]);

    return (
        <Box layerStyle={'result'}>
            <VStack className='logo-container'>
                <Image className='logo' src={healthWelfare} alt='衛生福利部' width='25%' mb={8} />
                <Image className='logo-brand' src={mackayMemorial} alt='馬偕紀念醫院' width='80%' />
                <Text className='sub-title'>兒童發展智能篩檢</Text>
            </VStack>
            <Summary />
            <Stack className='result-container flex-center'>
                <Text className='title'>篩檢結果 : {consequent ? '通過' : '不通過'}</Text>
                <div className='content'>
                    {
                        consequent ?
                            <Text>
                                {resultData['pass']}
                            </Text>
                            :
                            <Text>
                                {resultData['fail']}
                            </Text>
                    }
                    <br /><br />
                    <div style={{ display: 'flex' }}>
                        <div>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="9" fill={resultColor(testResult['LR'])} /></svg>
                        </div>
                        <div>{scoreData['LR']} :{resultData[testResult['LR']]}</div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <svg style={{ display: 'inline' }} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="9" fill={resultColor(testResult['FM'])} /></svg>
                        </div>
                        <div>
                            {scoreData['FM']} :{resultData[testResult['FM']]}
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <svg style={{ display: 'inline' }} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="9" fill={resultColor(testResult['C'])} /></svg>
                        </div>
                        <div>
                            {scoreData['C']} :{resultData[testResult['C']]}
                        </div>
                    </div>
                </div>
                <Text className='result-tip'>此檢測結果為系統依據孩子施測時的答題狀況自動產出的結果，僅供照顧者參考，不作醫療用途。若您對此報告或孩子的發展仍有疑慮，請洽您的兒科醫師做進一步診察。</Text>
            </Stack>
            <Stack className='flex-center'>
                <Button><NavLink to='/login'>Ok</NavLink></Button>
            </Stack>
        </Box>
    );
}

export default Result;