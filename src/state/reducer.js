import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';
import auth from './auth/reducer';
import user from './user/reducer';
import twoFA from './2FA/reducer';
import company from './company/reducer';
import campaign from './campaign/reducer';
import modals from './modals/reducer';
import investor from './investor/reducer';
import admin from './admin/reducer';
import inbox from './inbox/reducer';
import documents from './documents/reducer';
import signature from './signature/reducer';
import webSockets from './websockets/reducer';
import payment from './payment/reducer';
import { CREATE_FRIENDLY_URL } from './campaign/actions';
import { basicUrl } from '../components/campaign/management/constants/general';
import { CONVERT_EQUITY_FAIL, CONVERT_EQUITY_SUCCESS } from './investor/actions';

const authPersistConfig = {
	key: 'auth',
	storage,
	whitelist: ['authentication', 'twoFAInit'],
};

const rootReducer = combineReducers({
	form: formReducer.plugin({
		CampaignBasic: (state, action) => {
			const { type, payload } = action;
			switch (type) {
				case CREATE_FRIENDLY_URL:
					return {
						...state,
						values: {
							...state.values,
							name: payload.name,
							urlFriendlyName: `${basicUrl}${payload.url}`,
						},
					};
				default:
					return state;
			}
		},
		InvestDialogForm: (state, action) => {
			const { type, payload } = action;
			switch (type) {
				case CONVERT_EQUITY_SUCCESS:
					return {
						...state,
						values: {
							...state.values,
							[payload.field]: payload.data,
						},
					};
				case CONVERT_EQUITY_FAIL:
					return {
						...state,
						values: {
							...state.values,
							[payload.field]: '',
						},
					};
				default:
					return state;
			}
		},
	}),
	auth: persistReducer(authPersistConfig, auth),
	user,
	twoFA,
	company,
	campaign,
	modals,
	investor,
	admin,
	inbox,
	documents,
	webSockets,
	signature,
	payment,
});

export default rootReducer;
