import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Filter from '../../common/filter/FilterComponent';
import PaymentsReviewTable from './partials/PaymentsReviewTable';
import { paymentsStates } from '../../../constants/paymentsStates';
import { getAllPayments } from '../../../state/payment/actions';

const paymentsFilterOptions = [
	{ key: paymentsStates.ALL, label: 'ALL' },
	{ key: paymentsStates.OWNER_APPROVED, label: 'PENDING' },
	{ key: paymentsStates.PAID, label: 'PAID' },
	{ key: paymentsStates.EXPIRED, label: 'EXPIRED' },
];

const paymentsHeading = ['NAME', 'AMOUNT', 'CREATED DATE', 'PAYMENT DATE', 'STATUS', 'ACTION'];

type PropsT = {
	getAllPayments: Function,
};
const PaymentsReview = (props: PropsT) => {
	const { getAllPayments } = props;
	const [t] = useTranslation('translations');

	const [paymentsFilter, setPaymentsFilter] = useState(paymentsFilterOptions[0]);

	const handlePaymentsFilterChange = selectedFilter => {
		setPaymentsFilter(selectedFilter);
		getAllPayments({
			page: 0,
			size: 5,
			filter: selectedFilter.key,
		});
	};

	useEffect(() => {
		getAllPayments({
			page: 0,
			size: 5,
			filter: paymentsFilter.key,
		});
	}, []);

	return (
		<div className={'dashboard'}>
			<div className={'dashboard__table'}>
				<div className={'dashboard__title'}>
					{t('PAYMENTS')}
					<Filter action={handlePaymentsFilterChange} options={paymentsFilterOptions} initial={0} />
				</div>
				<PaymentsReviewTable heading={paymentsHeading} currentFilter={paymentsFilter} />
			</div>
		</div>
	);
};

export default connect(
	null,
	{ getAllPayments },
)(PaymentsReview);
