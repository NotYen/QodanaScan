/* import `Pages style` config */
import loginStyle from './pages/login';
import resultStyle from './pages/result';
import informationStyle from './pages/information';

/* import `View style` config */
import modelStyle from './view/model';
import listsStyle from './view/lists';
import summaryStyle from './view/summary';
import subjectStyle from './view/subject';
import identifyLoadStyle from './view/identify';
import questionStyle from './view/question/index';
import questionBasicStyle from './view/question/basic';
import featuresStyle from './view/measured/features';
import identifyStyle from './view/measured/identify';
import buildingStyle from './view/measured/building';
import spaceStyle from './view/measured/space';
import pulltukaStyle from './view/measured/pulltuka';
import correspondingStyle from './view/measured/corresponding';
import faceStyle from './view/measured/face';
import conformStyle from './view/measured/conform';
import doingStyle from './view/measured/doing';
import imitateStyle from './view/measured/imitate';
import findStyle from './view/measured/find';
import woofStyle from './view/measured/woof';

/* import `Components style` config */
import controlStyle from './components/control';
import spinnerStyle from './components/spinner';
import topicStyle from './components/topic';
import processStyle from './components/process';
import interfaceStyle from './components/interface';

const layerStyles = {
    login: loginStyle,
    result: resultStyle,
    information: informationStyle,
    model: modelStyle,
    lists: listsStyle,
    summary: summaryStyle,
    subject: subjectStyle,
    control: controlStyle,
    spinner: spinnerStyle,
    topic: topicStyle,
    process: processStyle,
    interface: interfaceStyle,
    question: questionStyle,
    features: featuresStyle,
    identify: identifyStyle,
    building: buildingStyle,
    space: spaceStyle,
    identifyLoad: identifyLoadStyle,
    corresponding: correspondingStyle,
    pulltuka: pulltukaStyle,
    'question-basic': questionBasicStyle,
    face: faceStyle,
    conform: conformStyle,
    doing: doingStyle,
    imitate: imitateStyle,
    find: findStyle,
    woof: woofStyle,
};

export default layerStyles;
