import { Routes, Route, useLocation } from 'react-router-dom';

/* import `Provider` component */
import { ChakraProvider } from '@chakra-ui/react';

/* import `Reset Style` file */
import './assecs/style/normalize.css';

/* import `Chakra Style` config */
import theme from './utility/style';

/* import `Pages transitions` components */
import { AnimatePresence } from 'framer-motion';

/* import `API interceptors` function */
import interceptor from './services/interceptors';

/* import `Pages` components */
import Index from './pages/index';
import Login from './pages/login';
import Forget from './pages/forget';
import Reset from './pages/reset';
import Result from './pages/result';
import Information from './pages/information';
import Mission from './pages/mission/index';
import TaskBasic from './pages/mission/basic';
import TaskList from './pages/mission/list';
import GamesIndex from './pages/games/index';
import GamesContainer from './pages/games/container';
import Features from './pages/measured/features';
import FeaturesPractise from './pages/demonstration/features';
import Identify from './pages/measured/identify';
import Action from './pages/measured/action';
import Building from './pages/measured/building';
import Disappear from './pages/measured/disappear';
import DisappearPractise from './pages/demonstration/disappear';
import Space from './pages/measured/space';
import Pulltuka from './pages/measured/pulltuka';
import PulltukaPractise from './pages/demonstration/pulltuka';
import Pullcar from './pages/measured/pullcar';
import Corresponding from './pages/measured/corresponding';
import CorresPractise from './pages/demonstration/corresponding';
import Shape from './pages/measured/shape';
import ErrorPage from './pages/error-page';
import Face from './pages/measured/face';
import FacePractise from './pages/demonstration/face';
import Conform from './pages/measured/conform';
import Doing from './pages/measured/doing';
import Voice from './pages/measured/voice';
import Woof from './pages/measured/woof';
import Imitate from './pages/measured/imitate';
import Imitates from './pages/measured/imitates.js';
import Puzzle from './pages/measured/puzzle';
import Puzzles from './pages/measured/puzzles';
import Find from './pages/measured/find';
import Nameface from './pages/measured/nameface';
import Nameconform from './pages/measured/nameconform';
import Namedoing from './pages/measured/namedoing';
import Straight from './pages/measured/straight';

const App = () => {
	const location = useLocation();

	return (
		<ChakraProvider theme={ theme }>
			<AnimatePresence mode='wait'>
				<Routes location={ location } key={ location.pathname }>
					<Route exact path='/' element={ <Index /> }>
						<Route path='information' index element={ <Information /> } />
						<Route exact path='mission' element={ <Mission /> } >
							<Route path='basic' element={ <TaskBasic /> } />
							<Route path='list' element={ <TaskList /> } />
						</Route>
						<Route path='games' element={ <GamesIndex /> }>
							<Route path=':router' element={ <GamesContainer /> } />
							<Route path='features/measured' element={ <Features /> } />
							<Route path='features/demonstration' element={ <FeaturesPractise /> } />
							<Route path='identify/measured' element={ <Identify /> } />
							<Route path='action/measured' element={ <Action /> } />
							<Route path='building/measured' element={ <Building /> } />
							<Route path='disappear/measured' element={ <Disappear /> } />
							<Route path='disappear/demonstration' element={ <DisappearPractise /> } />
							<Route path='space/measured' element={ <Space /> } />
							<Route path='pulltuka/measured' element={ <Pulltuka /> } />
							<Route path='pullcar/measured' element={ <Pullcar /> } />
							<Route path='shape/measured' element={ <Shape /> } />
							<Route path='pulltuka/demonstration' element={ <PulltukaPractise /> } />
							<Route path='corresponding/measured' element={ <Corresponding /> } />
							<Route path='corresponding/demonstration' element={ <CorresPractise /> } />
							<Route path='build/measured' element={ <Building /> } />
							<Route path='straight/measured' element={ <Straight /> } />
							<Route path='face/measured' element={ <Face /> } />
							<Route path='face/demonstration' element={ <FacePractise /> } />
							<Route path='conform/measured' element={ <Conform /> } />
							<Route path='doing/measured' element={ <Doing /> } />
							<Route path='voice/measured' element={ <Voice /> } />
							<Route path='woof/measured' element={ <Woof /> } />
							<Route path='imitate/measured' element={ <Imitate /> } />
							<Route path='imitates/measured' element={ <Imitates /> } />
							<Route path='puzzle/measured' element={ <Puzzle /> } />
							<Route path='puzzles/measured' element={ <Puzzles /> } />
							<Route path='find/measured' element={ <Find /> } />
							<Route path='nameface/measured' element={ <Nameface /> } />
							<Route path='nameconform/measured' element={ <Nameconform /> } />
							<Route path='namedoing/measured' element={ <Namedoing /> } />
							<Route path='puzzles/measured' element={ <Puzzles /> } />
						</Route>
						<Route exact path='result' element={ <Result /> } />
					</Route>
					<Route exact path='login' element={ <Login /> } />
					<Route exact path='forget' element={ <Forget /> } />
					<Route exact path='reset' element={ <Reset /> } />
					<Route path='*' element={ <ErrorPage /> } />
				</Routes>
			</AnimatePresence>
		</ChakraProvider>
	)
};
interceptor();
export default App;
