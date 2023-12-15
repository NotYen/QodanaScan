import basic from './basic.json';
import action from './action.json';
import features from './features.json';
import identify from './identify.json';
import building from './building.json';
import disappear from './disappear.json';
import space from './space.json';
import pulltuka from './pulltuka.json';
import pullcar from './pullcar.json';
import shape from './shape.json';
import corresponding from './corresponding.json';
import build from './build.json';
import straight from './straight.json';
import face from './face.json';
import conform from './conform.json';
import doing from './doing.json';
import voice from './voice.json';
import woof from './woof.json';
import imitate from './imitate.json';
import imitates from './imitates.json';
import puzzle from './puzzle.json';
import puzzles from './puzzles.json';
import find from './find.json';
import nameface from './nameface.json';
import nameconform from './nameconform.json';
import namedoing from './namedoing.json';

const config = {
    '1Y6M': { basic, find, features, identify, action, corresponding, voice, woof, imitate, puzzle, building },
    '2Y6M': { basic, face, conform, doing, space, disappear, pulltuka, pullcar, shape, nameface, nameconform, namedoing, build, straight, puzzles, imitates }
};

export default config;