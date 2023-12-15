/* import behaviors file */
import nameAction from './behavior/call-name';
import interestAction from './behavior/ask-interest';
import correspondingAction from './behavior/corresponding';
import buildingHouseAction from './behavior/building-house';
import buildingOwnAction from './behavior/building-own';
import puzzleAction from './behavior/puzzle';

/* import instruction file */
import nameExplain from './instruction/call-name';
import gameExplain from './instruction/invite-game';
import interestExplain from './instruction/ask-interest';
import featuresEyeExplain from './instruction/features-eye';
import featuresAbdomenExplain from './instruction/features-abdomen';
import featuresFootExplain from './instruction/features-foot';
import identifyBowlExplain from './instruction/identify-bowl';
import identifyDoorExplain from './instruction/identify-door';
import identifyPuppyExplain from './instruction/identify-puppy';
import actionBookExplain from './instruction/action-book';
import actionSleepExplain from './instruction/action-sleep';
import actionHandwashingExplain from './instruction/action-handwashing';
import actionFlyExplain from './instruction/action-fly';
import correspondingExplain from './instruction/corresponding';
import buildingHouseExplain from './instruction/building-house';
import buildingOwnExplain from './instruction/building-own';
import voiceBallonExplain from './instruction/voice-ballon';
import voiceBananaExplain from './instruction/voice-banana';
import voiceCarExplain from './instruction/voice-car';
import woofExplain from './instruction/woof';
import imitateExplain from './instruction/imitate';
import puzzleExplain from './instruction/puzzle';
import findCupExplain from './instruction/find-cup';
import findSpoonExplain from './instruction/find-spoon';

/* import practise file */
import correspondingPractise from './practise/corresponding';
import featuresPractise from './practise/features';

const questions = {
    "call-name": { instruction: nameExplain, behavior: nameAction },
    "invite-game": { instruction: gameExplain },
    "ask-interest": { instruction: interestExplain, behavior: interestAction },
    "features-eye": { instruction: featuresEyeExplain, practise: featuresPractise },
    "features-abdomen": { instruction: featuresAbdomenExplain },
    "features-foot": { instruction: featuresFootExplain },
    "identify-bowl": { instruction: identifyBowlExplain },
    "identify-door": { instruction: identifyDoorExplain },
    "identify-puppy": { instruction: identifyPuppyExplain },
    "action-book": { instruction: actionBookExplain },
    "action-sleep": { instruction: actionSleepExplain },
    "action-handwashing": { instruction: actionHandwashingExplain },
    "action-fly": { instruction: actionFlyExplain },
    "corresponding": { instruction: correspondingExplain, behavior: correspondingAction, practise: correspondingPractise },
    "building-house": { instruction: buildingHouseExplain, behavior: buildingHouseAction },
    "building-own": { instruction: buildingOwnExplain, behavior: buildingOwnAction },
    "voice-ballon": { instruction: voiceBallonExplain },
    "voice-banana": { instruction: voiceBananaExplain },
    "voice-car": { instruction: voiceCarExplain },
    "woof": { instruction: woofExplain },
    "imitate": { instruction: imitateExplain },
    "puzzle": { instruction: puzzleExplain, behavior: puzzleAction },
    "find-cup": { instruction: findCupExplain },
    "find-spoon": { instruction: findSpoonExplain }
}

export default questions;