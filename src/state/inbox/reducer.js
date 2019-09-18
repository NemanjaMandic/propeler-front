// @flow

import * as actions from './actions';
import initialState from './initialState';

type ActionT = {
	type: String,
	payload: any,
};

export default (state: * = initialState(), action: ActionT) => {
	const { type, payload } = action;
	switch (type) {
		case actions.GET_ALL_NOTIFICATIONS:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: true,
				},
			};
		case actions.GET_ALL_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: false,
					notifications: payload,
					currentMessage: payload.content.length > 0 ? payload.content[0] : null,
				},
			};
		case actions.GET_ALL_NOTIFICATIONS_FAIL:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.MARK_NOTIFICATION_AS_READ:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: true,
				},
			};
		case actions.MARK_NOTIFICATION_AS_READ_SUCCESS:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: false,
					notifications: {
						...state.getAllNotifications.notifications,
						content: state.getAllNotifications.notifications.content.map(item => {
							if (item.id === payload) {
								return {
									...item,
									seen: true,
								};
							}
							return item;
						}),
					},
					unread: state.getAllNotifications.unread - 1,
				},
			};
		case actions.MARK_NOTIFICATION_AS_READ_FAIL:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.MARK_NOTIFICATION_AS_UNREAD:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: true,
				},
			};
		case actions.MARK_NOTIFICATION_AS_UNREAD_SUCCESS:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: false,
					notifications: {
						...state.getAllNotifications.notifications,
						content: state.getAllNotifications.notifications.content.map(item => {
							if (item.id === payload) {
								return {
									...item,
									seen: false,
								};
							}
							return item;
						}),
					},
					unread: state.getAllNotifications.unread + 1,
				},
			};
		case actions.MARK_NOTIFICATION_AS_UNREAD_FAIL:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.GET_NUMBER_OF_UNSEEN_NOTIFICATIONS:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: true,
				},
			};
		case actions.GET_NUMBER_OF_UNSEEN_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: false,
					unread: payload,
				},
			};
		case actions.GET_NUMBER_OF_UNSEEN_NOTIFICATIONS_FAIL:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.RECEIVED_NOTIFICATION: {
			if (state.getAllNotifications.notifications.content.length === state.getAllNotifications.notifications.size) {
				state.getAllNotifications.notifications.content.splice(
					state.getAllNotifications.notifications.content.length - 1,
					1,
				);
			}
			const tempNotifications = [payload, ...state.getAllNotifications.notifications.content];
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					notifications: {
						...state.getAllNotifications.notifications,
						content: tempNotifications,
					},
					unread: state.getAllNotifications.unread + 1,
					currentMessage: payload,
				},
			};
		}
		case actions.SET_CURRENT_MESSAGE:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					currentMessage: payload,
				},
			};

		case actions.DELETE_NOTIFICATION:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: true,
				},
			};

		case actions.DELETE_NOTIFICATION_SUCCESS:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: false,
				},
			};
		case actions.DELETE_NOTIFICATION_FAIL:
			return {
				...state,
				getAllNotifications: {
					...state.getAllNotifications,
					inProgress: false,
					errors: payload,
				},
			};
		default:
			return state;
	}
};
