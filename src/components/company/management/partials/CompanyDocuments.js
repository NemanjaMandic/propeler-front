// @flow

import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { stepBack, stepNext } from '../../../../state/company/actions';
import Button from '../../../common/button/Button';
import DocumentsRegisterSection from './DocumentsRegisterSection';
import Description from '../../../user/dashboard/partials/Description';
import { COMPANIES } from '../../../../constants/documentEntity';

type PropsT = {
	campaignDocuments: any,
	companyDoc: Array<Object>,
	stepBack: Function,
	stepNext: Function,
};

const CompanyDocuments = (props: PropsT) => {
	const { companyDoc, stepBack, stepNext } = props;

	const [t] = useTranslation('translations');

	// useEffect(()=> {
	//   addSnackbarOption({key: COMPANY_BRAND, content: {variant: "warning", message: t("WARNING_COMPANY_BRAND")}});
	//
	//   return function cleanup() {
	//    removeSnackbarOption({ key: COMPANY_BRAND});
	//   };
	// },[]);

	return (
		<div>
			<div className={'dashboard'}>
				<Description title={t('Submit Documents')} />

				<span>
					Submit base documents that verify your company. If you want to leave this blank, you can fill this later on
					before campaign submission.
				</span>

				<DocumentsRegisterSection documents={companyDoc} documentEntity={COMPANIES} />
			</div>
			<div className={'buttons'}>
				<span onClick={stepBack}>{t('BACK')}</span>
				<Button
					type={'button'}
					variant={'contained'}
					color={'primary'}
					name={t('SAVE_AND_CONTINUE')}
					onClick={stepNext}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = ({
	user: {
		dashboard: { campaignDocuments },
	},
	company: {
		documents: { content: companyDoc },
	},
}) => ({
	campaignDocuments,
	companyDoc,
});

export default connect(
	mapStateToProps,
	{ stepBack, stepNext },
)(CompanyDocuments);
