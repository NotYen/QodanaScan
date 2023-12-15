import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Button, Stack, Box, Text, Image } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from view folder */
import Identify from "../../views/identify";

/* import `Image` source */
import palm from '../../assecs/images/icon/palm.png';
import scope from '../../assecs/images/icon/scope_puzzles-dog.png';
import audio from '../../assecs/images/icon/audio.png';
import videoBG from '../../assecs/images/gif/puzzles-dog.gif';
import vector from '../../assecs/images/icon/vector.png';

/* import function from store folder */
import { setStatus } from '../../store/gamesSlice';

/* import context function */
import { useMissionContext } from '../../context/MissionContext';
import { transform } from 'framer-motion';
import { setPersist } from '../../services/persist';

/* import context function */
import { useModelContext } from '../../context/ModelContext';
import PermissionRequest from "../../components/modalPermission";

const BuildingMeasured = () => {
    const intervalRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { actions } = useModelContext();
    const [playing, setPlay] = useState(false);
    const [startTime, setStartTime] = useState();
    const [reciprocal, setReciprocal] = useState();
    const [currentTime, setCurrentTime] = useState('02：30');
    const [promptText, setPromptText] = useState();
    const [isUpload, setUploading] = useState(false);
    const { current: { key, question } } = useSelector(state => state.games);
    const instruction = question[key].instruction;
    const videoRef = useRef(null);
    const [chunks, setChunks] = useState([]);
    const [palmtext, setPalmText] = useState('示範將三片圖卡拼起來，然後恢復原狀後說｢換你」');
    const [mediaStream, setMediaStream] = useState(null);
    const [recorder, setRecorder] = useState(null);
    const [isRecording, setIsRecording] = useState('stoping');
    const { missions: { infor } } = useMissionContext();
    const [permission, setPermission] = useState(JSON.parse(localStorage.getItem('permission_video')) || false);

    const handleReciprocal = () => {
        const counting = reciprocal ? (reciprocal - 1) : 3;

        if (counting > 0)
            setReciprocal(counting);
        else {
            setReciprocal(null);
            startRecording();
        }
    };

    const handleClick = () => {
        const url = instruction.illustrate.audio;
        const control = new Audio(url);

        if (!playing) {
            control.play();
            setPlay(true);
            // setTimeout(() => setPlay(false), 2000);
            control.addEventListener('ended', () => setPlay(false));
        }
    };

    const startRecording = () => {
        try {
            recorder.ondataavailable = event => {
                const blob = new Blob([event.data], { type: 'video/mp4' });
                const url = URL.createObjectURL(blob);

                chunks.push(event.data);
                videoRef.current.src = url;

                setChunks(chunks);
            };

            recorder.start();
            setStartTime(Date.now());
            setPromptText('START');
            setIsRecording('starting');
        } catch (error) {
            alert(`Error starting camera：${ error }`);
        }
    };

    const stopRecording = () => {
        videoRef.current.srcObject = null;
        recorder.stop();
        mediaStream.getTracks().forEach(track => track.stop());
        setIsRecording('ending');
    };

    const handleRecordClick = () => {
        if (isUpload) return;
        setCurrentTime('02：30');
        setIsRecording('stoping');
    };

    const handleUpdate = async () => {
        // TODO 確認檔名
        const fileName = `${infor['姓名']}-${infor.birthday}`;
        const blob = new File(chunks, { type: 'video/mp4' });
        const file = new File([blob], `${fileName}.mp4`, { type: 'video/mp4' });
        const formData = new FormData();

        if (isUpload) return;

        setUploading(true);
        formData.append('file', file);
        formData.append('case_id', infor.case_id);
        formData.append('question_name', instruction.illustrate.text);

        formData.append('question', 'puzzle');

        await axios.post(`${process.env.REACT_APP_API_URL}/api/file/upload`, formData, {headers: { 'Content-Type': 'multipart/form-data' }})
        .then(resource => {
            actions.setModel('gold', () => {
                navigate('/games/puzzles')
            })

            dispatch(setStatus('completed'));
            setPersist((error) => {
                if (error.status === 401 ||
                    error.status === 403 ||
                    error.status === 404) {
                    navigate('/login')
                } else {
                    alert(error.data.message);
                }
            })
        })
        .catch(error => {
            dispatch(setStatus('initial'));
            setPersist((error) => {
                if (error.status === 401 ||
                    error.status === 403 ||
                    error.status === 404) {
                    navigate('/login')
                } else {
                    alert(error.data.message);
                }
            })
            alert(`上傳失敗\n錯誤訊息：${JSON.parse(error)}`);
        })
        .finally(() => {
            setUploading(false);
        })
    };

    useEffect(() => {
        if (reciprocal > 0)
            setTimeout(() => { handleReciprocal(); }, 1000);
        else
            setTimeout(() => { setPromptText(null); }, 1000);
    }, [ reciprocal, promptText ]);

    useEffect(() => {
        if (isRecording === 'stoping') {
            if (navigator.permissions && navigator.permissions.query) {
                navigator.permissions.query({ name: 'camera' })
                    .then(function (permissionStatus) {
                        if (permissionStatus.state === 'prompt') {
                            // getUserMedia 正在請求權限
                            console.log('getUserMedia 正在請求權限');
                            setPermission(false);
                            localStorage.setItem('permission_video', false);
                        } else {
                            // 其他状态（granted, denied, 或其他）
                            console.log('getUserMedia 權限狀態:', permissionStatus.state);
                        }
                    })
                    .catch(function (error) {
                        console.error('查詢權限狀態時出錯:', error);
                    });
            } else {
                console.error('您的瀏覽器不支持查詢權限狀態');
            }
            (async() => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: {
                        facingMode: 'environment'
                    }, audio: true });
                    setPermission(true);
                    localStorage.setItem('permission_video', true);
                    const _recorder = new MediaRecorder(stream);
                    const chunks = [];

                    videoRef.current.srcObject = stream;

                    setMediaStream(stream);
                    setRecorder(_recorder);
                } catch (error) {
                    setPermission(false);
                    localStorage.setItem('permission_video', false);
                    console.log(error)
                }
            })();
        }
    }, [ isRecording ]);

    useEffect(() => {
        if (isRecording === 'starting') {
          intervalRef.current = setInterval(() => {
            const currentSeconds = 150 - ((Date.now() - startTime) / 1000).toFixed(0);
            let timerSeconds = `${parseInt(currentSeconds % 60)}`;
            let timerMinute = `${parseInt(currentSeconds / 60)}`;
            let timerText = `${timerMinute}：${timerSeconds}`;

            if (0 >= currentSeconds) {
                stopRecording();
                setPromptText('TIME OUT');
            };

            if (timerSeconds.length < 2)
                timerSeconds = `0${timerSeconds}`;

            if (timerMinute.length < 2)
                timerMinute = `0${timerMinute}`;

            timerText = `${timerMinute}：${timerSeconds}`;

            setCurrentTime(timerText);
          }, 1000);
        }
        else
            clearInterval(intervalRef.current);
      }, [recorder, startTime, isRecording]);

    return (
        <Stack className="position-fixed" layerStyle={ 'building' }>
            <Box className="camera-container">
                <Text className="title">拼圖</Text>
                <div className="video-container">
                    <samp className="currentTime">{ currentTime }</samp>
                    <Stack className="stack-content">
                        <label className="image-container">
                            <LazyLoadImage src={ audio } onClick={ handleClick } />
                        </label>
                        <div className="text-container">
                            <samp className="label">口語指令</samp>
                            <div className="text-bubble">
                                <Image className="img-bubble" src={ vector }/>
                                <samp className="text">{ instruction.illustrate.text }</samp>
                            </div>
                        </div>
                    </Stack>
                    <video ref={ videoRef } autoPlay playsInline muted />
                    <samp className="scope-container">
                        <LazyLoadImage src={ scope } />
                    </samp>
                    { isRecording === 'stoping' && <LazyLoadImage src={ videoBG } className='bg-image' /> }
                    { promptText && <samp className="promptText">{ promptText }</samp> }
                    { reciprocal && <samp className="reciprocal">{ reciprocal }</samp> }
                    { isUpload && <Identify /> }
                </div>
            </Box>
            <Stack className="control-container">
                <p className="prompt-text flex-center">
                    <samp className="icon">
                        <LazyLoadImage src={ palm } />
                    </samp>
                    <samp className="text">{ palmtext }</samp>
                </p>
                <ButtonGroup className='flex-center'>
                    {
                        isRecording === 'stoping' &&
                        <Button bg='red' onClick={ handleReciprocal }>開始錄影</Button>
                    }
                    {
                        isRecording === 'starting' &&
                        <Button bg='red' onClick={ stopRecording }>結束錄影</Button>
                    }
                    {
                        isRecording === 'ending' &&
                        <Button onClick={ handleRecordClick }>重新錄影</Button>
                    }
                    {
                        isRecording === 'ending' &&
                        <Button bg='green' onClick={ handleUpdate }>確定上傳</Button>
                    }
                </ButtonGroup>
            </Stack>
            <PermissionRequest isOpen={!permission} />
        </Stack>
    );
};

export default BuildingMeasured;
