/* import behaviors file */
import nameAction from './behavior/call-name';
import interestAction from './behavior/ask-interest';
import pullTukaAction from './behavior/pull-tuka';
import pullCarAction from './behavior/pull-car';
import houseAction from './behavior/building-house';
import trainAction from './behavior/building-train';
import takeAction from './behavior/building-take';
import straightAction from './behavior/straight';
import puzzlesAction from './behavior/puzzles';

/* import instruction file */
import nameExplain from './instruction/call-name';
import gameExplain from './instruction/invite-game';
import interestExplain from './instruction/ask-interest';
import disappearAnswerExplain from './instruction/disappear-answer';
import spaceBoxExplain from './instruction/space-box';
import spaceTableExplain from './instruction/space-table';
import spaceSizExplain from './instruction/space-siz';
import pullTukaExplain from './instruction/pull-tuka';
import pullCarExplain from './instruction/pull-car';
import shapeExplain from './instruction/shape';
import houseExplain from './instruction/building-house';
import trainExplain from './instruction/building-train';
import takeExplain from './instruction/building-take';
import straightExplain from './instruction/straight';
import faceNoseExplain from './instruction/face-nose';
import faceMouthExplain from './instruction/face-mouth';
import faceHairExplain from './instruction/face-hair';
import conformFlyExplain from './instruction/conform-fly';
import conformSitExplain from './instruction/conform-sit';
import conformDrawExplain from './instruction/conform-draw';
import conformEatExplain from './instruction/conform-eat';
import doingRideExplain from './instruction/doing-ride';
import doingJumpExplain from './instruction/doing-jump';
import doingBlowExplain from './instruction/doing-blow';
import namefaceEyeExplain from './instruction/nameface-eye';
import namefaceEarExplain from './instruction/nameface-ear';
import namefaceNoseExplain from './instruction/nameface-nose';
import namefaceMouthExplain from './instruction/nameface-mouth';
import namefaceHandExplain from './instruction/nameface-hand';
import namefaceFootExplain from './instruction/nameface-foot';
import nameconformTrainExplain from './instruction/nameconform-train';
import nameconformClothingExplain from './instruction/nameconform-clothing';
import nameconformChairExplain from './instruction/nameconform-chair';
import nameconformGrapeExplain from './instruction/nameconform-grape';
import nameconformPenExplain from './instruction/nameconform-pen';
import nameconformAirplaneExplain from './instruction/nameconform-airplane';
import namedoingHandwashingExplain from './instruction/namedoing-handwashing';
import namedoingReadbookExplain from './instruction/namedoing-readbook';
import namedoingPlayfootballExplain from './instruction/namedoing-playfootball';
import imitatesExplain from './instruction/imitates';
import puzzlesExplain from './instruction/puzzles';

/* import practise file */
import pullTukaPractise from './practise/pull-tuka';
import facePractise from './practise/face';
import disappearPractise from './practise/disappear';

const questions = {
    "call-name": { instruction: nameExplain, behavior: nameAction },
    "invite-game": { instruction: gameExplain },
    "ask-interest": { instruction: interestExplain, behavior: interestAction },
    "disappear-answer": { instruction: disappearAnswerExplain, practise: disappearPractise },
    "space-box": { instruction: spaceBoxExplain },
    "space-table": { instruction: spaceTableExplain },
    "space-size": { instruction: spaceSizExplain },
    "pull-tuka": { instruction: pullTukaExplain, behavior: pullTukaAction, practise: pullTukaPractise },
    "pull-car": { instruction: pullCarExplain, behavior: pullCarAction },
    "shape": { instruction: shapeExplain },
    "building-house": { instruction: houseExplain, behavior: houseAction },
    "building-train": { instruction: trainExplain, behavior: trainAction },
    "building-take": { instruction: takeExplain, behavior: takeAction },
    "straight": { instruction: straightExplain, behavior: straightAction },
    "face-nose": { instruction: faceNoseExplain, practise: facePractise },
    "face-mouth": { instruction: faceMouthExplain },
    "face-hair": { instruction: faceHairExplain },
    "conform-fly": { instruction: conformFlyExplain },
    "conform-sit": { instruction: conformSitExplain },
    "conform-draw": { instruction: conformDrawExplain },
    "conform-eat": { instruction: conformEatExplain },
    "doing-ride": { instruction: doingRideExplain },
    "doing-jump": { instruction: doingJumpExplain },
    "doing-blow": { instruction: doingBlowExplain },
    "nameface-eye": { instruction: namefaceEyeExplain },
    "nameface-ear": { instruction: namefaceEarExplain },
    "nameface-nose": { instruction: namefaceNoseExplain },
    "nameface-mouth": { instruction: namefaceMouthExplain },
    "nameface-hand": { instruction: namefaceHandExplain },
    "nameface-foot": { instruction: namefaceFootExplain },
    "nameconform-train": { instruction: nameconformTrainExplain },
    "nameconform-clothing": { instruction: nameconformClothingExplain },
    "nameconform-chair": { instruction: nameconformChairExplain },
    "nameconform-grape": { instruction: nameconformGrapeExplain },
    "nameconform-pen": { instruction: nameconformPenExplain },
    "nameconform-airplane": { instruction: nameconformAirplaneExplain },
    "namedoing-handwashing": { instruction: namedoingHandwashingExplain },
    "namedoing-readbook": { instruction: namedoingReadbookExplain },
    "namedoing-playfootball": { instruction: namedoingPlayfootballExplain },
    "imitates": { instruction: imitatesExplain },
    "puzzles": { instruction: puzzlesExplain, behavior: puzzlesAction },
}

export default questions;