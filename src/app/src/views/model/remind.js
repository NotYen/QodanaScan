import { ModalHeader, ModalBody } from '@chakra-ui/react';

/* import `Image` source */
import ball from '../../assecs/images/source/source_67.png';
import car from '../../assecs/images/source/source_68.png';
import squareBar from '../../assecs/images/source/source_04.png';

const RemindModel = () => {
    return (
        <>
            <ModalHeader className='model-header'>
                <samp className='title-text'>家長事前準備提醒</samp>
            </ModalHeader>
            <ModalBody className='model-body remind-body'>
                <p className='content-text subtitle'>為確保系統辨別孩子發展能力的準確度, 請家長務必閱讀以下注意事項：</p>
                <p className='content-text'>1. 準備孩子常用的球及小汽車各一</p>
                <div className="image-source-container flex-center">
                    <div className="image-box">
                        <img src={ ball } alt="球" effect="blur" className="img" />
                    </div>
                    <div className="image-box">
                        <img src={ car } alt="車子" effect="blur" className="img" />
                    </div>
                </div>
                <p className='content-text'>2. 準備6-8個約2-3cm大小的正方形小積木</p>
                <div className="image-source-container flex-center">
                    <div className="image-box">
                        <img src={ squareBar } alt="積木" effect="blur" />
                    </div>
                </div>
                <p className='content-text'>3. 請家長讓孩子仔細聽系統中每項指定任務指導語</p>
            </ModalBody>
        </>
    )
};

export default RemindModel;
