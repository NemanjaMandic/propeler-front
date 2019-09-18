import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import styles from '../../../investor/dashboard/partials/InvestorDashboardCampaignsTable.styles';
import Button from '../../../common/button/Button';
import Pagination from '../../../common/pagination/Pagination';
import { openFundraisingAppReview } from '../../../../state/modals/actions';
import { getFundrisingApplications } from '../../../../state/admin/actions';

type PropsT = {
	classes: any,
	heading: Array<string>,
	data: Array<Object>,
	logo: {
		file: string,
		type: string,
	},
	openFundraisingAppReview: Function,
	userId: number,
	currentFilter: any,
	getFundrisingApplications: Function,
};

const FundRaisingAppTable = ({
	classes,
	heading,
	data,
	openFundraisingAppReview,
	getFundrisingApplications,
}: PropsT) => {
	const [t] = useTranslation('translations');

	const openReview = (row, viewOnly) => {
		openFundraisingAppReview({ review: row, viewOnly });
	};

	const renderLastCell = row => (
		<Button
			variant={'outlined'}
			color={'primary'}
			className={row.proposalState === 'PENDING' ? 'campaign_table_button' : 'fund_raise_table_button'}
			name={row.proposalState === 'PENDING' ? t('REVIEW') : t('VIEW')}
			onClick={() => {
				row.proposalState === 'PENDING' ? openReview(row, false) : openReview(row, true);
			}}
		/>
	);

	return (
		<Fragment>
			<Table className={classes.table}>
				<TableHead>
					<TableRow className="tableHead">
						{heading.map((h, index) => (
							<TableCell
								key={h}
								className={classes.tableCellHead}
								style={index === heading.length - 1 ? { textAlign: 'right' } : {}}
							>
								{t(h).toUpperCase()}{' '}
								{h && (
									<IconButton
										classes={{ label: 'rm-arrow-icon' }}
										className={'icon-button'}
										onClick={() => console.log(h)}
									>
										<ArrowDownward />
									</IconButton>
								)}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.content.map(row => (
						<TableRow key={row.id}>
							<TableCell className={classes.tableCell}>{`${row.firstName} ${row.lastName}`} </TableCell>
							<TableCell className={classes.tableCell}>{row.companyName}</TableCell>
							<TableCell className={classes.tableCell}>{row.previouslyRaised}</TableCell>
							<TableCell className={classes.tableCell}>{row.fundingGoals}</TableCell>
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
					next={getFundrisingApplications}
					previous={getFundrisingApplications}
					first={data.first}
					last={data.last}
					actionParams={{ size: data.size }}
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
	{
		openFundraisingAppReview,
		getFundrisingApplications,
	},
)(withStyles(styles)(FundRaisingAppTable));
