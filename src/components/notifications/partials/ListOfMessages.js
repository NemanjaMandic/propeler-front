// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import TripOrigin from '@material-ui/icons/TripOrigin';
import Tooltip from '../../common/tooltip/Tooltip';
import Pagination from '../../common/pagination/Pagination';
import {
	markNotificationAsRead,
	markNotificationAsUnRead,
	getAllNotifications,
	setCurrentMessage,
	deleteNotification,
} from '../../../state/inbox/actions';
import { renderTime } from '../../../utilities/notificationUtils';

type PropsT = {
	data: any,
	markNotificationAsRead: Function,
	markNotificationAsUnRead: Function,
	getAllNotifications: Function,
	currentFilter: any,
	setCurrentMessage: Function,
	deleteNotification: Function,
	currentMessage: any,
};

const ListOfMessages = (props: PropsT) => {
	const {
		data,
		setCurrentMessage,
		markNotificationAsRead,
		markNotificationAsUnRead,
		getAllNotifications,
		currentFilter,
		deleteNotification,
		currentMessage,
	} = props;
	const [t] = useTranslation('translations');
	const currentMessageId = currentMessage ? currentMessage.id : null;

	const handleClick = (message: any) => {
		setCurrentMessage(message);
		if (!message.seen) {
			markNotificationAsRead(message.id);
		}
	};

	const readMessage = (id: any, value: any, e: Event) => {
		if (value) {
			markNotificationAsRead(id);
		} else {
			markNotificationAsUnRead(id);
		}
		e.stopPropagation();
	};

	const renderSingleMessage = (message: any) => {
		return (
			<div
				key={message.id}
				className={
					message.seen
						? message.id === currentMessageId
							? 'messages_active'
							: ''
						: message.id === currentMessageId
						? 'messages_unseen messages_active'
						: 'messages_unseen'
				}
				onClick={() => handleClick(message)}
			>
				<div className={'messages_title'}>{message.title || '-'}</div>
				<div>
					<span>{renderTime(message.date)}</span>
					<Tooltip title={t('DELETE_MSG')} placement={'right'}>
						<IconButton
							onClick={() =>
								deleteNotification({
									id: message.id,
									pageNumber: data.number,
									filter: currentFilter,
									size: data.size,
								})
							}
							style={{ margin: '0 10px' }}
						>
							<DeleteOutline className={'icon_class'} />
						</IconButton>
					</Tooltip>
					<Tooltip title={message.seen ? t('MARK_AS_UNREAD') : t('MARK_AS_READ')} placement={'right'}>
						<IconButton onClick={e => readMessage(message.id, !message.seen, e)}>
							<TripOrigin className={message.seen ? 'messages_icon' : 'messages_icon_unseen'} />
						</IconButton>
					</Tooltip>
				</div>
			</div>
		);
	};
	return (
		<div className={'inbox_list'}>
			{data.content.length > 0 ? (
				<Fragment>
					<div className={'messages'}>{data.content.map(msg => renderSingleMessage(msg))}</div>
					<div className={'inbox_pagination'}>
						<Pagination
							currentPage={data.number}
							totalPages={data.totalPages}
							next={getAllNotifications}
							previous={getAllNotifications}
							first={data.first}
							last={data.last}
							actionParams={{ size: data.size, filter: currentFilter }}
						/>
					</div>
				</Fragment>
			) : (
				<div className={'empty_table margin_auto'}> {t('NO_MESSAGES')}</div>
			)}
		</div>
	);
};

export default connect(
	null,
	{
		markNotificationAsRead,
		markNotificationAsUnRead,
		getAllNotifications,
		setCurrentMessage,
		deleteNotification,
	},
)(ListOfMessages);
