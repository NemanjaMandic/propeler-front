// @flow

import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MultiToggle from 'react-multi-toggle';
import { NavHashLink } from 'react-router-hash-link';
import Button from '../common/button/Button';
import headerLanding from '../../images/landing_page/headerPropeler.png';
import startInvesting from '../../images/landing_page/startInvesting.png';
import raiseFunds from '../../images/landing_page/raiseFunds.png';
import startInvestingBackground from '../../images/landing_page/startInvestingBackground.svg';
import transaction from '../../images/landing_page/transaction.svg';
import network from '../../images/landing_page/network.svg';
import support from '../../images/landing_page/support.svg';
import inv from '../../images/landing_page/inv.png';
import raise from '../../images/landing_page/raise.png';
import { history } from '../../store/configureStore';
import * as routes from '../../constants/routes';

const LandingPage = () => {
	const [t] = useTranslation('translations');
	const mailto = 'support@realmarket.co';

	const [startInvestingToggle, setStartInvestingToggle] = useState(1);
	const startInvestingToggleOptions = [
		{
			displayName: '1',
			value: 1,
		},
		{
			displayName: '2',
			value: 2,
		},
		{
			displayName: '3',
			value: 3,
		},
	];

	const [raiseFundsToggle, setRaiseFundsToggle] = useState(1);
	const raiseFundsToggleOptions = [
		{
			displayName: '1',
			value: 1,
		},
		{
			displayName: '2',
			value: 2,
		},
		{
			displayName: '3',
			value: 3,
		},
	];

	const renderStartInvestingToggleText = () => {
		let text = '';
		let subtitle = '';
		switch (startInvestingToggle) {
			case 1:
				text = t('START_INVESTING_TEXT1');
				subtitle = t('START_INVESTING_SUBTITLE1');
				break;
			case 2:
				text = t('START_INVESTING_TEXT2');
				subtitle = t('START_INVESTING_SUBTITLE2');
				break;
			default:
				text = t('START_INVESTING_TEXT3');
				subtitle = t('START_INVESTING_SUBTITLE3');
				break;
		}
		return (
			<Fragment>
				<div className={'start_investing_title'}>{t('START_INVESTING_TITLE')}</div>
				<div className={'start_investing_subtitle'}>{subtitle}</div>
				<div className={'toggle_text'}>{text}</div>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					className={'first_section_button'}
					name={t('START_INVESTING').toUpperCase()}
					onClick={() => history.push(routes.REGISTER)}
				/>
			</Fragment>
		);
	};

	const renderRaiseFundsToggleText = () => {
		let text = '';
		let subtitle = '';
		switch (raiseFundsToggle) {
			case 1:
				text = t('RAISE_FUNDS_TEXT1');
				subtitle = t('RAISE_FUNDS_SUBTITLE1');
				break;
			case 2:
				text = t('RAISE_FUNDS_TEXT2');
				subtitle = t('RAISE_FUNDS_SUBTITLE2');
				break;
			default:
				text = t('RAISE_FUNDS_TEXT3');
				subtitle = t('RAISE_FUNDS_SUBTITLE3');
				break;
		}
		return (
			<Fragment>
				<div className={'raise_funds_title'}>{t('RAISE_FUNDS_TITLE')}</div>
				<div className={'raise_funds_subtitle'}>{subtitle}</div>
				<div className={'raise_funds_toggle_text'}>{text}</div>

				<NavHashLink style={{ textDecoration: 'none' }} to={`${routes.RAISE_FUNDS}#top`}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className={'first_section_button'}
						name={t('RAISE_FUNDS').toUpperCase()}
						onClick={() => history.push(routes.RAISE_FUNDS)}
					/>
				</NavHashLink>
			</Fragment>
		);
	};

	return (
		<div className={'landing_page'}>
			<div className={'first_section'}>
				<div className="first_section_title">{t('EQUITY_CROWDFUNDING')}</div>
				<div className={'first_section_large_text'}>{t('INVEST_IN')}</div>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					className={'first_section_button'}
					name={t('GET_STARTED').toUpperCase()}
					onClick={() => history.push(routes.START_INVESTING)}
				/>
				<img src={headerLanding} alt="headerLanding" />
				<div className={'first_section_subtitle'}>{t('OWN_PIECE')}</div>
				<div className={'first_section_medium_text'}>{t('OWN_PIECE_TEXT')}</div>
			</div>
			<div className={'second_section'}>
				<div className={'start_investing'}>
					<div className={'start_investing_text'}>
						<MultiToggle
							options={startInvestingToggleOptions}
							selectedOption={startInvestingToggle}
							onSelectOption={value => setStartInvestingToggle(value)}
						/>
						<div>{renderStartInvestingToggleText()}</div>
					</div>
					<div className={'start_investing_image'} style={{ backgroundImage: `url(${startInvestingBackground})` }}>
						<img src={startInvesting} alt="startInvesting" className={'margin-top-60 margin-left-50 '} />
					</div>
				</div>
				<div className={'raise_funds'}>
					<div className={'raise_funds_image'} style={{ backgroundImage: `url(${startInvestingBackground})` }}>
						<img src={raiseFunds} alt="raiseFunds" className={'margin-top-60 margin-left-20'} />
					</div>
					<div className={'raise_funds_text'}>
						<MultiToggle
							options={raiseFundsToggleOptions}
							selectedOption={raiseFundsToggle}
							onSelectOption={value => setRaiseFundsToggle(value)}
						/>
						<div>{renderRaiseFundsToggleText()}</div>
					</div>
				</div>
			</div>
			<div className={'third_section'}>
				<div>
					<span>{t('WE_CARE')}</span>
					<span>{t('WE_CARE_TEXT')}</span>
				</div>
				<div>
					<div>
						<div className={'we_care_card_title'}>
							<img src={network} alt={'network'} />
							<span>{t('ACTIVE_NETWORK')}</span>
						</div>
						<p>{t('ACTIVE_NETWORK_TEXT')}</p>
					</div>
					<div>
						<div className={'we_care_card_title'}>
							<img src={support} alt={'support'} />
							<span>{t('SUPPORT')}</span>
						</div>
						<p>
							{t('SUPPORT_TEXT1')}
							<a className={'upload__link'} href={`mailto:${mailto}`}>
								{mailto}
							</a>
							{t('SUPPORT_TEXT2')}
							<span className={'upload__link'}>{'\n063 666 7 666'}</span>.
						</p>
					</div>
					<div>
						<div className={'we_care_card_title'}>
							<img src={transaction} alt={'transaction'} />
							<span>{t('SECURE_TRANSACTION')}</span>
						</div>
						<p>{t('SECURE_TRANSACTION_TEXT')}</p>
					</div>
				</div>
			</div>
			<div className={'fourth_section'}>
				<span>{t('PARTNERS')}</span>
				<div className={'partners'}>
					<div>{t('PARTNER')} 1</div>
					<div>{t('PARTNER')} 2</div>
					<div>{t('PARTNER')} 3</div>
					<div>{t('PARTNER')} 4</div>
				</div>
			</div>
			<div className={'fifth_section'}>
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
						<NavHashLink style={{ textDecoration: 'none' }} to={`${routes.RAISE_FUNDS}#top`}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={'first_section_button'}
								name={t('RAISE_FUNDS').toUpperCase()}
								onClick={() => history.push(routes.RAISE_FUNDS)}
							/>
						</NavHashLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
