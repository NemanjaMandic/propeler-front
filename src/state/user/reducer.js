import { combineReducers } from 'redux';
import profile from './profile/reducer';
import dashboard from './dashboard/reducer';

const userReducer = combineReducers({
	profile,
	dashboard,
});

export default userReducer;
