import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Image } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from components folder */
import Subject from "../../components/subject";

/* import `Image` source */
import source from '../../assecs/images/source/source_15.png';
import finger from '../../assecs/images/source/finger.png';
import thumbsup from '../../assecs/images/source/card/thumbsup.png';

/* import function from store folder */
import { setStatus, setCorrect } from '../../store/gamesSlice';

import { setPersist } from '../../services/persist';
import { useMissionContext } from '../../context/MissionContext';
import axios from 'axios';
import Identify from "../../views/identify";
import PermissionRequest from "../../components/modalPermission";

const FaceMeasured = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(false);
    const { current: { key, question } } = useSelector(state => state.games);
    const instruction = question[key].instruction;

    const { missions: { infor } } = useMissionContext();
    const [isRecording, setIsRecording] = useState('stoping');
    const [recorder, setRecorder] = useState(null);
    const [chunks, setChunks] = useState([]);
    const [isUpload, setUploading] = useState(false);
    let timer = null;
    let isAnswer = ''
    let recording = false;
    const [permission, setPermission] = useState(JSON.parse(localStorage.getItem('permission_audio')) || false);

    const handleClick = ({ target }) => {
        isAnswer = target.getAttribute('is-answer');

        clearTimeout(timer);
        recorder.stop();

    };

    const handleRecord = () => {
        if (recording) {
            return
        }
        console.log('start recording');
        try {
            recorder.ondataavailable = event => {
                const blob = new Blob([event.data], { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                chunks.push(event.data);
                setChunks(chunks);
            };

            recorder.addEventListener('start', () => {
                recording = true;
            });

            recorder.addEventListener('stop', async () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                // document.querySelector('audio').src = url;

                setUploading(true);
                const fileName = `${infor['姓名']}-${infor.birthday}-${infor.case_id}`;
                const file = new File([blob], `${fileName}.webm`);
                const formData = new FormData();
                formData.append('file', file);
                formData.append('case_id', infor.case_id);
                formData.append('question_name', instruction.illustrate.text);

                await axios.post(`${process.env.REACT_APP_API_URL}/api/file/upload/audio`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                    .then(resource => {

                        if (isAnswer === 'true') {
                            setCompleted(true);
                            setTimeout(() => navigate('/games/nameface'), 1000);

                            dispatch(setCorrect(true));
                            setPersist((error) => {
                                if (error.status === 401 ||
                                    error.status === 403 ||
                                    error.status === 404) {
                                    navigate('/login')
                                } else {
                                    alert(error.data.message);
                                }
                            })
                        } else navigate('/games/nameface');

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
                        alert(`上傳紀錄失敗\n錯誤訊息：${JSON.parse(error)}`);
                    })
                    .finally(() => {
                        setUploading(false);
                    })
            });
            recorder.start();
            timer = setTimeout(() => {
                recorder.stop();
                setIsRecording('ending');
            }, (1000 * 60 * 2 + 30 * 1000));
        } catch (error) {
            alert(`Error starting record：${error}`);
        }
    }

    useEffect(() => {
        if (isRecording === 'stoping') {
            if (navigator.permissions && navigator.permissions.query) {
                navigator.permissions.query({ name: 'microphone' })
                    .then(function (permissionStatus) {
                        if (permissionStatus.state === 'prompt') {
                            // getUserMedia 正在請求權限
                            console.log('getUserMedia 正在請求權限');
                            setPermission(false);
                            localStorage.setItem('permission_audio', false);
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
            (async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    const _recorder = new MediaRecorder(stream);
                    setPermission(true);
                    localStorage.setItem('permission_audio', true);

                    setRecorder(_recorder);

                } catch (error) {
                    setPermission(false);
                    localStorage.setItem('permission_audio', false);
                    console.log(error)
                }
            })();
        }
    }, [isRecording]);

    return (
        <Box layerStyle={'face'}>
            <Subject title='玩偶五官' illustrate={instruction.illustrate} record={handleRecord} />
            <Box className="measured-container flex-center">
                <LazyLoadImage src={source} />
                <Image className={key} src={finger} />
                <Button className="button-next" onClick={handleClick}>下一題</Button>
                {completed && <LazyLoadImage src={thumbsup} className="thumbsup" />}
                {isUpload && <Identify />}
            </Box>
            <PermissionRequest isOpen={!permission} />
        </Box>
    );
};

export default FaceMeasured;
