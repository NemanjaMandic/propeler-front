// @flow

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AboutCompany from './partials/AboutCompany';
import CompanyBrand from './partials/CompanyBrand';
import CompanyDocuments from './partials/CompanyDocuments';
import CustomExpansionPanel from '../../common/expansionPanel/CustomExpansionPanel';
import { getUserCompany } from '../../../state/company/actions';
import SuccessScreen from '../../auth/partials/SuccessScreen';
import Button from '../../common/button/Button';
import { history } from '../../../store/configureStore';
import * as routes from '../../../constants/routes';

const STEP1 = 1;
const STEP2 = 2;
const STEP3 = 3;
const STEP4 = 4;
const STEPS_NUMBER = 3;

type PropsT = {
	step: number,
	getUserCompany: Function,
	id: string,
};

const panelContent = [
	{
		title: 'Expansion Panel 1',
		detail:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
	},
	{
		title: 'Expansion Panel 2',
		detail:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
	},
	{
		title: 'Expansion Panel 3',
		detail:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
	},
];

const titles = ['TELL_US_ABOUT_COMPANY', 'BRAND_COMPANY'];

const details = ['FILL_OUT_REGISTRATION_COMPANY', 'CREATING_BRAND_IDENTITY'];

const CompanyManagement = (props: PropsT) => {
	const { step, getUserCompany, id } = props;

	const [t] = useTranslation('translations');

	useEffect(() => {
		getUserCompany();
	}, []);

	return (
		<div className={'register__form'}>
			{step === STEP4 ? (
				<SuccessScreen title={t('CONGRATS_REGISTRATION_COMPANY')} body={t('VERIFY_KYC_PROCESS')}>
					<div className="buttons">
						{/* TODO: Add button actions */}
						<span>{t('GO_TO_COMPANY_DASH')}</span>
						<Button
							type={'button'}
							variant={'contained'}
							color={'primary'}
							name={t('START_CREATING_CAMPAIGN')}
							onClick={() => history.push(routes.CAMPAIGN)}
						/>
					</div>
				</SuccessScreen>
			) : (
				<Fragment>
					<div className={'step'}>
						{t('STEP')}
						{step}/{STEPS_NUMBER}
					</div>
					<div className={'about__company__info'}>
						<span>{t(titles[step - 1])}</span>
						<pre>{t(details[step - 1])}</pre>
					</div>
					<div className={'wizard_content'}>
						{step === STEP1 && <AboutCompany id={id} />}
						{step === STEP2 && <CompanyBrand />}
						{step === STEP3 && <CompanyDocuments />}
					</div>
					<div className={'panels'}>
						<CustomExpansionPanel options={panelContent} />
					</div>
				</Fragment>
			)}
		</div>
	);
};

const mapStateToProps = ({
	company: {
		createCompany: { step },
		info: { id },
	},
}) => ({
	step,
	id,
});

export default connect(
	mapStateToProps,
	{ getUserCompany },
)(CompanyManagement);
