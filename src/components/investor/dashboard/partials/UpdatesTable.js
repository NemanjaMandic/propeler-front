import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import styles from './UpdatesTable.styles';
import { getAllCampaigns } from '../../../../state/campaign/actions';
import companyAvatarImage from '../../../../images/company_avatar.svg';
import { history } from '../../../../store/configureStore';

type PropsT = {
	classes: any,
	heading: Array<string>,
	data: Array<Object>,
	logo: {
		file: string,
		type: string,
	},
};

const UpdatesTable = ({ classes, heading, data, logo }: PropsT) => {
	const companyAvatar = logo.file ? `data:image/jpeg;base64,${logo.file}` : companyAvatarImage;

	const [t] = useTranslation('translations');

	return (
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					{heading.map((h, index) => (
						<TableCell
							key={h}
							className={classes.tableCellHead}
							style={index === heading.length - 1 ? { textAlign: 'right' } : {}}
						>
							{t(h)}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{data &&
					data.content &&
					data.content.map(row => (
						<TableRow key={row.campaignUrlFriendlyName}>
							<TableCell className={`${classes.tableCell} ${classes.tableCellLight}`}>
								<img alt={'logo'} className={'dashboard__image'} src={companyAvatar} />
								<span className={classes.cellPrimeColor}>{`${row.campaignName}  `}</span>
								<span
									className={classes.cellExpanded}
									onClick={() =>
										history.push({
											pathname: `/overview/${row.campaignUrlFriendlyName}/updates/${row.id}`,
										})
									}
								>
									{row.title}
								</span>
							</TableCell>
							<TableCell className={classes.tableCellLast}>
								{row.postDate ? moment(row.postDate).format('lll') : '-'}
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	);
};

const mapStateToProps = ({
	company: {
		logo: { fileDto },
	},
}) => ({
	logo: fileDto,
});

export default connect(
	mapStateToProps,
	{ getAllCampaigns },
)(withStyles(styles)(UpdatesTable));
