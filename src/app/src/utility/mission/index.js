/* import 1Y6M config */
import groupOne from './1Y6M/group';
import questionOne from './1Y6M/question';

/* import 2Y6M config */
import groupSecond from './2Y6M/group';
import questionSecond from './2Y6M/question';

const config = {
    '1Y6M': {
        basic: questionOne,
        lists: groupOne
    },
    '2Y6M': {
        basic: questionSecond,
        lists: groupSecond
    }
};

export default config;
