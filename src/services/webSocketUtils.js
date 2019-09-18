// @flow

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const connectionEndpoint = process.env.NODE_ENV === 'production' ? '/api/ws' : 'http://localhost:8080/api/ws';
const broker = '/user';

let stompClientRef;

function connect() {
	const socket = new SockJS(connectionEndpoint);
	stompClientRef = Stomp.over(socket);

	const headers = {
		authorization: `Bearer ${localStorage.getItem('authorization')}`,
	};
	return new Promise((resolve, reject) => {
		stompClientRef.connect(headers, resolve, reject);
	});
}

function subscribeToChannel(destination, messageCallback) {
	return stompClientRef.subscribe(broker + destination, messageCallback);
}

function unsubscribe(sub) {
	if (stompClientRef.subscriptions.hasOwnProperty(sub)) {
		stompClientRef.unsubscribe(sub);
	}
}

function disconnect() {
	if (!stompClientRef || !stompClientRef.connected) return;
	if (stompClientRef.subscriptions) {
		for (const sub in stompClientRef.subscriptions) {
			if (stompClientRef.subscriptions.hasOwnProperty(sub)) {
				stompClientRef.unsubscribe(sub);
			}
		}
	}
	stompClientRef.disconnect();
}

export default {
	connect,
	subscribeToChannel,
	unsubscribe,
	disconnect,
};
