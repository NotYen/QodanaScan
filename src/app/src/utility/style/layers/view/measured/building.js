const buildingStyle = {
    overflowY: 'auto',
    bg: 'purple.deep',
    '.camera-container': {
        py: '2rem',
        bg: '#44404075',
        '.title': {
            textAlign: 'center',
            fontWeight: 'bolder',
            color: 'white',
            fontSize: '40px',
            marginBottom: '.5rem',
        },
        '.video-container': {
            position: 'relative',
            width: '85%',
            height: '0px',
            mx: 'auto',
            my: '1rem',
            mt: '2rem',
            borderRadius: '20px',
            paddingBottom: '85%',
            overflow: 'hidden',
            '.scope-container': {
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                transform: 'translate(-50%, -50%)',
                'img': {
                    m: 'auto'
                }
            },
            '.currentTime': {
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: 'red',
                zIndex: '1',
                fontSize: "1.5rem"
            },
            '.reciprocal': {
                fontSize: "15rem",
                color: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            },
            '.promptText': {
                width: '100%',
                textAlign: 'center',
                fontSize: "5rem",
                color: 'white',
                letterSpacing: '20px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            },
            'video': {
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'rotateY(0deg)'
            },
            '.bg-image': {
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                width: '100%',
                height: '100%'
            },
            '.stack-content': {
                position: 'absolute',
                top: '10px',
                left: '10px',
                display: 'flex',
                padding: '1.5rem 1rem',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: '20px',
                justifyContent: 'flex-start',
                zIndex: '10',
                '.text-container': {
                    display: 'flex',
                    padding: '0px 1rem',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    '.label': {
                        mb: '.5rem',
                        textAlign: 'left',
                        color: 'purple.deep',
                        fontWeight: 'bolder',
                    },
                    '.text-bubble': {
                        display: 'flex',
                        flexDirection: 'row',
                    },
                    '.img-bubble': {
                        width: '1rem',
                        height: '0.8rem',
                        mt: '10px',
                    },
                    '.text': {
                        color: 'white',
                        bg: 'purple.base',
                        padding: '.3rem 1.2rem',
                        textAlign: 'center',
                        borderRadius: '10px'
                    }
                }
            }
        }
    },
    '.control-container': {
        py: '.5rem',
        '.prompt-text': {
            pb: '2rem',
            color: 'white',
            fontSize: '20px',
            textAlign: 'center',
            '.icon': {
                mx: '1rem'
            },
        },
        '.prompt-puzzle': {
            display: 'flex',
            flexDirection: 'column',
            '.palm-text-1': {
                display: 'flex',
                flexDirection: 'row',
            },
            '.palm-text-2': {
                ml: '3rem'
            },
        },
    }
};

export default buildingStyle;
