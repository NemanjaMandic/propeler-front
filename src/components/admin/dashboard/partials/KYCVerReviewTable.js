import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Filter from '../../../common/filter/FilterComponent';
import Pagination from '../../../common/pagination/Pagination';
import Button from '../../../common/button/Button';
import styles from '../../../investor/dashboard/partials/InvestorDashboardCampaignsTable.styles';
import { openKYCInternalReview } from '../../../../state/modals/actions';
import { auditKYC, getKYCRequest, getUserKYC } from '../../../../state/admin/actions';

import { status } from '../../../../constants/statusKYC';
import { userRole } from '../../../../constants/userKYC';

type PropsT = {
	classes: any,
	userId: number,
	openKYCInternalReview: Function,
	auditKYC: Function,
	heading: Array<string>,
	getKYCRequest: Function,
	getUserKYC: Function,
};

//TODO: when BE provides API check userRole names
const userRoleFilterOptions = [
	{ key: userRole.ALL, label: 'ALL' },
	{ key: userRole.ENTREPRENEUR, label: 'ENTREPRENEUR' },
	{ key: userRole.INVESTOR, label: 'INDIVIDUAL_INVESTOR' },
	{ key: userRole.COMPANY, label: 'COMPANY_INVESTOR' },
];

const statusFilterOptions = [
	{ key: status.ALL, label: 'ALL' },
	{ key: status.PENDING, label: 'PENDING' },
	// { key: status.READY_TO_REVIEW, label: "READY_TO_REVIEW" },
	{ key: status.UNDER_REVIEW, label: 'UNDER_REVIEW' },
	{ key: status.COMPLETE, label: 'COMPLETE' },
	{ key: status.INCOMPLETE, label: 'INCOMPLETE' },
	// { key: status.SUSPENDED, label: "SUSPENDED" },
	// { key: status.FAILURE, label: "FAILURE" },
];

const KYCVerReviewTable = ({
	classes,
	heading,
	data,
	openKYCInternalReview,
	auditKYC,
	getKYCRequest,
	userId,
	getUserKYC,
}: PropsT) => {
	const openReview = (row, viewOnly, role, status, page) => {
		openKYCInternalReview({
			review: row,
			viewOnly,
			role: role,
			status: status,
			page: page,
		});
		getUserKYC({ userKYCId: row.id });
	};

	const assignConfirmation = row => {
		auditKYC({ auditorId: userId, userKYCId: row.id });
	};

	const [t] = useTranslation('translations');

	const [userRoleFilter, setUserRoleFilter] = useState(userRoleFilterOptions[0]);
	const [statusFilter, setStatusFilter] = useState(statusFilterOptions[0]);

	const handleUserRoleFilterChange = selectedFilter => {
		setUserRoleFilter(selectedFilter);
		getKYCRequest({
			page: 0,
			size: 5,
			role: selectedFilter.key,
			state: statusFilter.key,
		});
	};

	const handleStatusFilterChange = selectedFilter => {
		setStatusFilter(selectedFilter);
		getKYCRequest({
			page: 0,
			size: 5,
			role: userRoleFilter.key,
			state: selectedFilter.key,
		});
	};

	const renderLastCell = row => {
		switch (row.requestState) {
			case 'PENDING':
				if (!row.auditorId)
					return (
						<Button
							variant={'outlined'}
							color={'primary'}
							className={'campaign_table_button'}
							name={t('ASSIGN')}
							onClick={() => assignConfirmation(row)}
						/>
					);
				else if (row.auditorId === userId)
					return (
						<Button
							variant={'outlined'}
							color={'primary'}
							className={'campaign_table_button'}
							name={t('REVIEW')}
							onClick={() => openReview(row, false, userRoleFilter.key, statusFilter.key, data.number)}
						/>
					);
				return null;

			case 'APPROVED':
				return (
					<Button
						variant={'outlined'}
						color={'primary'}
						className={'view_report_table_button'}
						name={t('VIEW')}
						onClick={() => openReview(row, true, userRoleFilter.key, statusFilter.key, data.number)}
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
								style={index === heading.length - 1 ? { textAlign: 'right' } : {}}
							>
								{t(h).toUpperCase()}
								{h && index === 0 && (
									<IconButton onClick={() => console.log(h)}>
										<ArrowDownward />
									</IconButton>
								)}
								{h && index === 1 && (
									<IconButton onClick={() => console.log(h)}>
										<ArrowDownward />
									</IconButton>
								)}
								{h && index === 2 && (
									<Filter action={handleUserRoleFilterChange} options={userRoleFilterOptions} initial={0} />
								)}
								{h && index === 4 && (
									<Filter action={handleStatusFilterChange} options={statusFilterOptions} initial={0} />
								)}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.content.map(row => (
						<TableRow key={row.id}>
							<TableCell className={classes.tableCell}>{`${row.firstName} ${row.lastName}`} </TableCell>
							<TableCell className={classes.tableCell}>{row.userName}</TableCell>
							<TableCell className={classes.tableCell}>{t(row.userRole)}</TableCell>
							<TableCell className={classes.tableCell}>{row.companyName || '-'}</TableCell>
							<TableCell className={classes.tableCell}>
								{row.requestState === 'PENDING'
									? !row.auditorId
										? t(row.requestState)
										: t('UNDER_REVIEW')
									: t(row.requestState)}
							</TableCell>
							<TableCell className={`${classes.tableCell} ${classes.tableCellPointer} ${classes.tableCellLight}`}>
								{renderLastCell(row)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{data.content.length > 0 && (
				<Pagination
					currentPage={data.number}
					totalPages={data.totalPages}
					next={getKYCRequest}
					previous={getKYCRequest}
					first={data.first}
					last={data.last}
					actionParams={{
						size: data.size,
						state: statusFilter.key,
						role: userRoleFilter.key,
					}}
				/>
			)}
		</Fragment>
	);
};

const mapStateToProps = ({
	company: {
		logo: { fileDto },
	},
	auth: {
		authentication: { userId },
	},
}) => ({
	logo: fileDto,
	userId,
});

export default connect(
	mapStateToProps,
	{ openKYCInternalReview, auditKYC, getKYCRequest, getUserKYC },
)(withStyles(styles)(KYCVerReviewTable));
