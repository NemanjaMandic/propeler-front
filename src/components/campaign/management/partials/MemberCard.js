// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';

type PropsT = {
	values: {
		id: number,
		name: string,
		title: string,
		description: string,
		linkedinUrl: string,
		twitterUrl: string,
		facebookUrl: string,
		customProfileUrl: string,
	},
};

const MemberCard = (props: PropsT) => {
	const {
		values: { name, title, description, linkedinUrl, twitterUrl, facebookUrl, customProfileUrl },
	} = props;
	const [t] = useTranslation('translations');

	return (
		<div className={'member_container'}>
			<div>
				<div className={'member_field'}>
					<label>{t('MEMBER_NAME')}</label>
					<div>{name || '-'}</div>
				</div>
				<div className={'member_field'}>
					<label>{t('MEMBER_TITLE')}</label>
					<div>{title || '-'}</div>
				</div>
				<div className={'member_field multiline'}>
					<label>{t('MEMBER_DESCRIPTION')}</label>
					<div>{description || '-'}</div>
				</div>
			</div>
			<div>
				<div className={'member_field'}>
					<label>{t('LINKEDIN_PROFILE_URL')}</label>
					<div>{linkedinUrl || '-'}</div>
				</div>
				<div className={'member_field'}>
					<label>{t('TWITTER_PROFILE_URL')}</label>
					<div>{twitterUrl || '-'}</div>
				</div>
				<div className={'member_field'}>
					<label>{t('FACEBOOK_PROFILE_URL')}</label>
					<div>{facebookUrl || '-'}</div>
				</div>
				<div className={'member_field'}>
					<label>{t('ADD_CUSTOM_PROFILE_URL')}</label>
					<div>{customProfileUrl || '-'}</div>
				</div>
			</div>
		</div>
	);
};

export default MemberCard;
