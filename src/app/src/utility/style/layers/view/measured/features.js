const featuresStyle = {
    '.answer-box': {
        position: 'absolute',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        '.left-eyes, .right-eyes': {
            position: 'absolute',
            width: '77px',
            height: '50px',
            top: '22%',
            '&.left-eyes': {
                left: '40%',
            },
            '&.right-eyes': {
                right: '40%',
            }
        },
        '.abdomen': {
            position: 'absolute',
            width: '200px',
            height: '120px',
            top: '50%',
            left: '50%',
            marginLeft: '-100px',
        },
        '.left-foot, .right-foot': {
            position: 'absolute',
            width: '100px',
            height: '220px',
            top: '68%',
            '&.left-foot': {
                left: '39%',
            },
            '&.right-foot': {
                right: '39%',
            }
        },
        '.head': {
            position: 'absolute',
            width: '305px',
            height: '290px',
            top: '0',
            left: '30%',
        },
    },
    '.button-next': {
        position: 'absolute',
        bottom: '0px',
        right: '0px',
        bg: '#FF3E6C',
        width: '120px',
        height: '45px',
        fontSize: '24px',
    }
};

export default featuresStyle;
