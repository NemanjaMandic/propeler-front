// @flow
import React, { Fragment } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

type PropsT = {
	message: {
		id: number,
		seen: boolean,
		content: string,
		senderFirstName: string,
		senderLastName: string,
		recipientId: number,
		date: Date,
		title: string,
	},
};

const MessagePreview = (props: PropsT) => {
	const { message } = props;
	const [t] = useTranslation('translations');
	return (
		<div className={'inbox_preview'}>
			{message && (
				<Fragment>
					<span>{moment(message.date).format('LLL')}</span>
					<span className={'inbox_preview_title'}>{message.title || '-'}</span>
					<span>
						{t('BY')}{' '}
						<span className={'inbox_preview_author'}>
							{message.senderFirstName} {message.senderLastName}
						</span>
					</span>
					<div className={'inbox_preview_text'}>{message.content}</div>
				</Fragment>
			)}
		</div>
	);
};

export default MessagePreview;
