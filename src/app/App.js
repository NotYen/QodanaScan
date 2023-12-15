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
import Result from './pages/result';
import Information from './pages/information';
import Mission from './pages/mission/index';
import TaskBasic from './pages/mission/basic';
import TaskList from './pages/mission/list';
import GamesIndex from './pages/games/index';
import GamesContainer from './pages/games/container';
import Features from './pages/measured/features';
import Identify from './pages/measured/identify';
import Action from './pages/measured/action';
import Building from './pages/measured/building';
import Disappear from './pages/measured/disappear';
import Space from './pages/measured/space';
import Pulltuka from './pages/measured/pulltuka';
import PulltukaPractise from './pages/demonstration/pulltuka';
import Corresponding from './pages/measured/corresponding';
import CorresPractise from './pages/demonstration/corresponding';
import Shape from './pages/measured/shape';
import ErrorPage from './pages/error-page';

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
							<Route path='identify/measured' element={ <Identify /> } />							
							<Route path='action/measured' element={ <Action /> } />
							<Route path='building/measured' element={ <Building /> } />
							<Route path='disappear/measured' element={ <Disappear /> } />
							<Route path='space/measured' element={ <Space /> } />
							<Route path='pull/measured' element={ <Pulltuka /> } />
							<Route path='shape/measured' element={ <Shape /> } />
							<Route path='pull/demonstration' element={ <PulltukaPractise /> } />
							<Route path='corresponding/measured' element={ <Corresponding /> } />
							<Route path='corresponding/demonstration' element={ <CorresPractise /> } />
							<Route path='build/measured' element={ <Building /> } />
							<Route path='straight/measured' element={ <Building /> } />
						</Route>
						<Route exact path='result' element={ <Result /> } />
					</Route>
					<Route exact path='login' element={ <Login /> } />
					<Route path='*' element={ <ErrorPage /> } />
				</Routes>
			</AnimatePresence>
		</ChakraProvider>
	)
};
interceptor();
export default App;
