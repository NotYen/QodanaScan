const listsStyle = {
    position: 'relative',
    pt: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    '.schedule-container': {
        color: 'green',
        position: 'absolute',
        top: '-6%',
        right: '2rem',
        zIndex: '10',
        fontSize: '22px'
    },
    '.card-list': {
        mb: '2rem',
        flex: '0 0 33%',
        textAlign: 'center',
        '.card-item': {
            position: 'relative',
            pb: '80%',
            width: '80%',
            height: '0px',
            margin: 'auto',
            borderRadius: '20px',
            boxShadow: '0 0px 15px 0 #00000040',
            '&[disabled]': {
                bg: 'lavender.openness'
            },
            '&:active': {
                boxShadow: 'none',
            },
            '.icon-container': {
                position: 'absolute',
                right: '-5%',
                bottom: '-5%',
                width: '60px',
                height: '60px'
            },
            '.chakra-image, .chakra-text': {
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '20px',
            },
            '.chakra-image': {
                top: '5%',
                width: '100%'
            },
            '.chakra-text': {
                bottom: '5%',
                fontWeight: 'bolder',
                color: 'purple.deep'
            }
        }
    }
};

export default listsStyle;
