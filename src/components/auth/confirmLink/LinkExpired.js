// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import jumpingGirl from '../../../images/jumpingGirl.svg';
import { LOGIN } from '../../../constants/routes';

type PropsT = {
	location: {
		state: {
			path: string,
		},
	},
};

const LinkExpired = ({ location: { state } }: PropsT) => {
	const path = state ? state.path : LOGIN;
	const [t] = useTranslation('translations');
	return (
		<div className="successScreen">
			<img src={jumpingGirl} alt="" />
			<h1>{t('SORRY_LIN_EXP')}</h1>
			<p>
				{t('INFO_LIN_EXP')}
				<Link to={path}>{t('TRY_AGAIN')}</Link>
			</p>
		</div>
	);
};

export default LinkExpired;
