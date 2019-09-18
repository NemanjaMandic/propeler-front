// @flow

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Filter from '../common/filter/FilterComponent';
import ListOfMessages from './partials/ListOfMessages';
import MessagePreview from './partials/MessagePreview';
import { getAllNotifications } from '../../state/inbox/actions';

const notificationFilterOptions = [
	{ key: null, label: 'ALL' },
	{ key: false, label: 'UNREAD' },
	{ key: true, label: 'READ' },
];

type PropsT = {
	notifications: any,
	getAllNotifications: Function,
	currentMessage: any,
};

const Inbox = (props: PropsT) => {
	const { notifications, getAllNotifications, currentMessage } = props;

	const [t] = useTranslation('translations');
	const [notificationFilter, setNotificationFilter] = useState(notificationFilterOptions[0]);

	const handleNotificationFilterChange = selected => {
		setNotificationFilter(selected);
		getAllNotifications({ pageNumber: 0, filter: selected.key, size: 10 });
	};

	useEffect(() => {
		getAllNotifications({ pageNumber: 0, filter: null, size: 10 });
	}, []);

	return (
		<div className={'inbox'}>
			<div className={'inbox_title'}>{t('INBOX')}</div>
			<div className={'inbox_subtitle'}>
				{t('NOTIFICATIONS').toLowerCase()}
				<Filter action={handleNotificationFilterChange} options={notificationFilterOptions} initial={0} />
			</div>
			<div className={'inbox_content'}>
				<ListOfMessages data={notifications} currentFilter={notificationFilter.key} currentMessage={currentMessage} />
				<MessagePreview message={currentMessage} />
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	const {
		inbox: {
			getAllNotifications: { notifications, currentMessage },
		},
	} = state;
	return {
		notifications,
		currentMessage,
	};
};
export default connect(
	mapStateToProps,
	{ getAllNotifications },
)(Inbox);
