// @flow

import { createAction } from 'redux-actions';

export const WEB_SOCKET_CONNECT = '[WEB SOCKET] Connect';
export const connectWebSocket = createAction(WEB_SOCKET_CONNECT);

export const WEB_SOCKET_CONNECT_SUCCESS = `${WEB_SOCKET_CONNECT} success`;
export const connectWebSocketSuccess = createAction(WEB_SOCKET_CONNECT_SUCCESS);

export const WEB_SOCKET_CONNECT_FAIL = `${WEB_SOCKET_CONNECT} fail`;
export const connectWebSocketFail = createAction(WEB_SOCKET_CONNECT_FAIL);

export const WEB_SOCKET_DISCONNECT = '[WEB SOCKET] Disconnect';
export const disconnectWebSocket = createAction(WEB_SOCKET_DISCONNECT);

export const WEB_SOCKET_DISCONNECT_SUCCESS = `${WEB_SOCKET_DISCONNECT} success`;
export const disconnectWebSocketSuccess = createAction(WEB_SOCKET_DISCONNECT_SUCCESS);

export const WEB_SOCKET_DISCONNECT_FAIL = `${WEB_SOCKET_DISCONNECT} fail`;
export const disconnectWebSocketFail = createAction(WEB_SOCKET_DISCONNECT_FAIL);

export const LISTEN_FOR_NOTIFICATIONS = '[Inbox] Listen for notifications';
export const listenForNotifications = createAction(LISTEN_FOR_NOTIFICATIONS);

export const LISTEN_FOR_NOTIFICATIONS_SUCCESS = `${LISTEN_FOR_NOTIFICATIONS} success`;
export const listenForNotificationsSuccess = createAction(LISTEN_FOR_NOTIFICATIONS_SUCCESS);

export const LISTEN_FOR_NOTIFICATIONS_FAIL = `${LISTEN_FOR_NOTIFICATIONS} fail`;
export const listenForNotificationsFail = createAction(LISTEN_FOR_NOTIFICATIONS_FAIL);
