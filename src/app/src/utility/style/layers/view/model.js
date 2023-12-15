const modelStyle = {
    '.model-header': {
        color: 'main',
        margin: '1rem',
        textAlign: 'center',
        'samp': {
            fontSize: '2rem',
            '&.title-text': {
                color: '#423D80',
            }
        },
        '.close-icon': {
            width: '3rem',
            height: '3rem',
            position: 'absolute',
            right: '-24px',
            top: '-24px',
        },
    },
    '.model-body': {
        fontSize: '1.2rem',
        '.content-text': {
            marginTop: '1rem',
            marginBottom: '1rem',
            '&.subtitle': {
                marginTop: '0px',
            },
            '&.qualified-content': {
                margin: '0',
            },
            '&.voice-content': {
                margin: '0',
                pl: '2rem',
            },
            '&.video-content': {
                margin: '0',
                px: '4rem',
                fontSize: '20px'
            }
        },
        '.video-img': {
            padding: '2rem'
        },
        '.image-source-container': {
            '.image-box': {
                padding: '.5rem'
            },
            '.img': {
                width: '155px',
                height: '90px',
            }
        },
        '.button-group': {
            py: '1rem',
            textAlign: 'center'
        }
    },
    '.remind-body': {
        padding: '0 4rem',
    },
    '.model-footer': {
        pt: '2rem',
        pb: '2.5rem',
        justifyContent: 'center'
    }
};

export default modelStyle;
