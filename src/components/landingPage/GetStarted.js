// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';
import inv from '../../images/landing_page/inv.png';
import Button from '../common/button/Button';
import { history } from '../../store/configureStore';
import * as routes from '../../constants/routes';
import raise from '../../images/landing_page/raise.png';

const GetStarted = () => {
	const [t] = useTranslation('translations');
	return (
		<div className={'landing_page'}>
			<div className={'get_started'}>
				<span>{t('GET_STARTED')}</span>
				<div>
					<div className={'started_card'}>
						<img alt={'startInvestingCard'} src={inv} />
						<span>{t('INVEST_CARD')}</span>
						<p>{t('INVEST_CARD_TEXT')}</p>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={'first_section_button'}
							name={t('START_INVESTING').toUpperCase()}
							onClick={() => history.push(routes.REGISTER)}
						/>
					</div>
					<div className={'started_card'}>
						<img alt={'raiseFundsCard'} src={raise} />
						<span>{t('RAISE_FUNDS_CARD')}</span>
						<p>{t('RAISE_FUNDS_CARD_TEXT')}</p>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={'first_section_button'}
							name={t('RAISE_FUNDS').toUpperCase()}
							onClick={() => history.push(routes.RAISE_FUNDS)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GetStarted;
