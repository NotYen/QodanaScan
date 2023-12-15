const doingStyle = {
    '.answer-box': {
        flexWrap: 'wrap',
        'samp': {
            flex: '0 0 50%',
            '.chakra-image': {
                mx: 'auto'
            }
        },
        '.samp-first': {
            flex: '0 0 50%',
            marginLeft: '1rem',
            '.chakra-image': {
                mx: 'auto'
            }
        },
        '.finger-handwashing': {
            position: 'absolute',
            transform: 'scale(0.5)',
            top: '15%',
            right: '20%',
        },
        '.finger-playfootball': {
            position: 'absolute',
            transform: 'scale(0.5)',
            bottom: '-12%',
            left: '30%',
        },
        '.finger-readbook': {
            position: 'absolute',
            transform: 'scale(0.5)',
            bottom: '-12%',
            right: '-5%',
        },
    },
    '.button-next': {
        position: 'absolute',
        bottom: '-16rem',
        right: '0px',
        bg: '#FF3E6C',
        width: '120px',
        height: '45px',
        fontSize: '24px',
    }
};

export default doingStyle;
