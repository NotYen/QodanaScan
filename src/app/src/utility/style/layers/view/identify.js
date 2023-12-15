const identifyLoadStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    height: '0',
    pb: '95%',
    bg: 'purple.deep',
    borderRadius: '20px',
    zIndex: '10',
    '.content-container': {
        color: 'white',
        fontSize: '1.5rem',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        '.icon-container img': {
            m: 'auto'
        }
    }
};

export default identifyLoadStyle;
