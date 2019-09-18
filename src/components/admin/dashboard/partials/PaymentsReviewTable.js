import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import styles from '../../../investor/dashboard/partials/InvestorDashboardCampaignsTable.styles';
import Pagination from '../../../common/pagination/Pagination';
import { paymentsStates } from '../../../../constants/paymentsStates';
import Button from '../../../common/button/Button';
import { openPaymentConfirmDialog } from '../../../../state/modals/actions';
import { getAllPayments } from '../../../../state/payment/actions';

//TODO implement pagination and filters

export type PaymentTypeT = {
	content: Array<Object>,
	first: boolean,
	last: boolean,
	number: number,
	numberOfElements: number,
	pageable: {
		offset: number,
		pageNumber: number,
		pageSize: number,
		paged: boolean,
		sort: {
			sorted: boolean,
			unsorted: boolean,
		},
		unpaged: boolean,
	},
	size: number,
	sort: {
		sorted: boolean,
		unsorted: boolean,
	},
	totalElements: number,
	totalPages: number,
};

type PropsT = {
	classes: any,
	data: PaymentTypeT,
	heading: Array<string>,
	content: PaymentTypeT,
	number: number,
	size: number,
	first: boolean,
	last: boolean,
	totalPages: number,
	pageNumber: number,
	openPaymentConfirmDialog: Function,
	getAllPayments: Function,
	platformCurrency: Object,
};

const PaymentsReviewTable = ({
	classes,
	heading,
	openPaymentConfirmDialog,
	content,
	getAllPayments,
	number,
	data,
	size,
	first,
	last,
	totalPages,
	pageNumber,
	platformCurrency,
}: PropsT) => {
	const [t] = useTranslation('translations');

	const { symbol } = platformCurrency;

	useEffect(() => {
		getAllPayments({
			page: 0,
			size: 5,
		});
	}, []);

	const renderLastCell = row => {
		console.log('ROW', row);
		switch (row.paymentState) {
			case paymentsStates.PENDING:
			case paymentsStates.OWNER_APPROVED:
				return (
					<Button
						variant={'outlined'}
						color={'primary'}
						className={'confirm_table_button'}
						name={t('CONFIRM')}
						onClick={() =>
							openPaymentConfirmDialog({
								open: true,
								paymentId: row.investmentId,
								submit: null,
							})
						}
					/>
				);
			case paymentsStates.PAID:
				return (
					<Button
						variant={'outlined'}
						color={'primary'}
						className={'view_report_table_button'}
						name={t('VIEW_REPORT')}
						onClick={() => console.log('dsdss')}
					/>
				);
			case paymentsStates.EXPIRED:
				return (
					<Button
						variant={'outlined'}
						color={'primary'}
						className={'view_report_table_button'}
						name={t('VIEW_REPORT')}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<Fragment>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						{heading.map((h, index) => (
							<TableCell
								key={h}
								className={classes.tableCellHead}
								style={index === heading.length - 1 ? { textAlign: 'right', paddingRight: '80px' } : {}}
							>
								{t(h).toUpperCase()}
								{console.log('H', content)}
								{h && index !== 5 && (
									<IconButton onClick={() => console.log(h)}>
										<ArrowDownward />
									</IconButton>
								)}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{content.map(row => (
						<TableRow key={row.investmentId}>
							<TableCell className={classes.tableCell}>{row.investorName}</TableCell>
							<TableCell className={classes.tableCell}>{`${row.amount} ${symbol}`}</TableCell>
							<TableCell className={classes.tableCell}>
								{row.creationDate ? moment(row.creationDate).format('YYYY-MM-DD') : '-'}
							</TableCell>
							<TableCell className={classes.tableCell}>
								{row.paymentDate ? moment(row.paymentDate).format('YYYY-MM-DD') : '-'}
							</TableCell>
							{console.log('ROW', row)}
							<TableCell className={classes.tableCell}>{t(row.paymentState)}</TableCell>
							<TableCell className={`${classes.tableCell} ${classes.tableCellPointer} ${classes.tableCellLight}`}>
								{renderLastCell(row)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{content.length > 0 && (
				<Pagination
					currentPage={pageNumber}
					totalPages={totalPages}
					next={getAllPayments}
					previous={getAllPayments}
					first={first}
					last={last}
					actionParams={console.log}
				/>
			)}
		</Fragment>
	);
};

const mapStateToProps = ({
	payment: {
		allPayments: {
			data: {
				content,
				number,
				totalPages,
				size,
				first,
				last,
				pageable: { pageNumber },
			},
		},
	},
	auth: {
		platformSettings: {
			settings: { platformCurrency },
		},
	},
}) => ({
	content,
	number,
	totalPages,
	size,
	first,
	pageNumber,
	last,
	platformCurrency,
});
export default connect(
	mapStateToProps,
	{ openPaymentConfirmDialog, getAllPayments },
)(withStyles(styles)(PaymentsReviewTable));
