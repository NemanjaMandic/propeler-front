import { createAction } from 'redux-actions';

export const GET_ALL_NOTIFICATIONS = '[Inbox] Get all notifications';
export const getAllNotifications = createAction(GET_ALL_NOTIFICATIONS);

export const GET_ALL_NOTIFICATIONS_SUCCESS = `${GET_ALL_NOTIFICATIONS} success`;
export const getAllNotificationsSuccess = createAction(GET_ALL_NOTIFICATIONS_SUCCESS);

export const GET_ALL_NOTIFICATIONS_FAIL = `${GET_ALL_NOTIFICATIONS} fail`;
export const getAllNotificationsFail = createAction(GET_ALL_NOTIFICATIONS_FAIL);

export const MARK_NOTIFICATION_AS_READ = '[Inbox] Mark notification as read';
export const markNotificationAsRead = createAction(MARK_NOTIFICATION_AS_READ);

export const MARK_NOTIFICATION_AS_READ_SUCCESS = `${MARK_NOTIFICATION_AS_READ} success`;
export const markNotificationAsReadSuccess = createAction(MARK_NOTIFICATION_AS_READ_SUCCESS);

export const MARK_NOTIFICATION_AS_READ_FAIL = `${MARK_NOTIFICATION_AS_READ} fail`;
export const markNotificationAsReadFail = createAction(MARK_NOTIFICATION_AS_READ_FAIL);

export const MARK_NOTIFICATION_AS_UNREAD = '[Inbox] Mark notification as unread';
export const markNotificationAsUnRead = createAction(MARK_NOTIFICATION_AS_UNREAD);

export const MARK_NOTIFICATION_AS_UNREAD_SUCCESS = `${MARK_NOTIFICATION_AS_UNREAD} success`;
export const markNotificationAsUnReadSuccess = createAction(MARK_NOTIFICATION_AS_UNREAD_SUCCESS);

export const MARK_NOTIFICATION_AS_UNREAD_FAIL = `${MARK_NOTIFICATION_AS_UNREAD} fail`;
export const markNotificationAsUnReadFail = createAction(MARK_NOTIFICATION_AS_UNREAD_FAIL);

export const GET_NUMBER_OF_UNSEEN_NOTIFICATIONS = '[Inbox] Get unseen notification number';
export const getNumberOfUnseenNotifications = createAction(GET_NUMBER_OF_UNSEEN_NOTIFICATIONS);

export const GET_NUMBER_OF_UNSEEN_NOTIFICATIONS_SUCCESS = `${GET_NUMBER_OF_UNSEEN_NOTIFICATIONS} success`;
export const getNumberOfUnseenNotificationsSuccess = createAction(GET_NUMBER_OF_UNSEEN_NOTIFICATIONS_SUCCESS);

export const GET_NUMBER_OF_UNSEEN_NOTIFICATIONS_FAIL = `${GET_NUMBER_OF_UNSEEN_NOTIFICATIONS} fail`;
export const getNumberOfUnseenNotificationsFail = createAction(GET_NUMBER_OF_UNSEEN_NOTIFICATIONS_FAIL);

export const RECEIVED_NOTIFICATION = '[Inbox] Notification has received';
export const receivedNotification = createAction(RECEIVED_NOTIFICATION);

export const SET_CURRENT_MESSAGE = '[Inbox] Set current message';
export const setCurrentMessage = createAction(SET_CURRENT_MESSAGE);

export const DELETE_NOTIFICATION = '[Inbox] Delete notification';
export const deleteNotification = createAction(DELETE_NOTIFICATION);

export const DELETE_NOTIFICATION_SUCCESS = `${DELETE_NOTIFICATION} success`;
export const deleteNotificationSuccess = createAction(DELETE_NOTIFICATION_SUCCESS);

export const DELETE_NOTIFICATION_FAIL = `${DELETE_NOTIFICATION} fail`;
export const deleteNotificationFail = createAction(DELETE_NOTIFICATION_FAIL);
