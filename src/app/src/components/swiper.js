import { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button } from '@chakra-ui/react';

// import Swiper core and required modules
import { Pagination } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

/* import context function */
import { useModelContext } from '../context/ModelContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const config = {
    modules: [ Pagination ],
    pagination: { clickable: true }
};

const SwiperElement = ({ resource, isSourceEnd, setControl }) => {
    const [swiper, setSwiper] = useState();
    const [isEnd, setEnd] = useState(false);
    const { actions } = useModelContext();
    
    useEffect(() => {
        const config = { buttonText: '下一步' };

        if (!isEnd)
            config.actionFunction = () => swiper.slideNext();
        else {
            config.buttonText = '了解';
            config.actionFunction = null;
        }

        actions.setActions(config);
    }, [ swiper, isEnd ]);

    return (
        <Swiper modules={ config.modules } pagination={ config.pagination } onSwiper={ event => setSwiper(event) } onSlideChange={ event => setEnd(event.isEnd) }>
            {
                resource.map(({ title, image }) => (
                    <SwiperSlide key={ image }>
                        <p className='swiper-title'>{ title }</p>
                        <div className="image-box">
                            <LazyLoadImage src={ image } effect="blur" />
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default SwiperElement;