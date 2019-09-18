import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import KYCVerReviewTable from './partials/KYCVerReviewTable';
import { getKYCRequest } from '../../../state/admin/actions';
import { status } from '../../../constants/statusKYC';
import { userRole } from '../../../constants/userKYC';

const reviewKYCTableHeading = ['NAME', 'USERNAME', 'USER_ROLE', 'COMPANY', 'STATUS', ''];

type PropsT = {
	getKYCRequest: Function,
	requests: any,
};

const KYCVerificationReview = (props: PropsT) => {
	const { getKYCRequest, requests } = props;

	const [t] = useTranslation('translations');

	useEffect(() => {
		getKYCRequest({
			page: 0,
			size: 5,
			role: userRole.INVESTOR,
			state: status.ALL,
		});
	}, []);

	return (
		<div className={'dashboard'}>
			<div className={'dashboard__table'}>
				<div className={'dashboard__title'}>{t('KYC_VERIFICATION')}</div>
				<KYCVerReviewTable heading={reviewKYCTableHeading} data={requests} />
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	const {
		admin: {
			KYCRequest: { data },
		},
	} = state;
	return {
		requests: data,
	};
};

export default connect(
	mapStateToProps,
	{ getKYCRequest },
)(KYCVerificationReview);
