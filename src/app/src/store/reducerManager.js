// Common slice
import listsReducer from './listsSlice';
import gamesReducer from './gamesSlice';

const reducer = {
    lists: listsReducer,
    games: gamesReducer
}

export default reducer;