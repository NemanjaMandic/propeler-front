// @flow

import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { Link } from 'react-router-dom';

type PropsT = {
	content: string,
	path: string,
	label: string,
};

const useStyles = makeStyles({
	card: {
		border: '1px solid #F4F4F4',
		transition: '0.2s ease',
		borderRadius: 4,
		width: 380,
		height: 220,
		marginLeft: 20,
		'&:hover': {
			border: '1px solid #3DC6FA',
		},
	},
	contentWrapper: {
		marginBottom: 20,
		marginTop: 54,
		width: '60%',
		margin: '54px auto 20px',
	},
	content: {
		color: '#39316C',
		fontWeight: 600,
		textAlign: 'center',
	},
	linkWrapper: {
		padding: '13px',
	},
	link: {
		fontSize: 16,
		background: '#3DC6FA',
		borderRadius: 4,
		color: '#FFF',
		padding: '14px 33px',
		textDecoration: 'none',
		transition: '0.2s ease',
		'&:hover': {
			textDecoration: 'none',
			color: '#FFF',
		},
	},
});

const RegistrationCard = (props: PropsT) => {
	const { content, path, label } = props;
	const classes = useStyles();

	return (
		<div className={classes.card}>
			<div className={classes.contentWrapper}>
				<p className={classes.content}>{content}</p>
			</div>
			<div className={classes.linkWrapper}>
				<Link className={classes.link} to={path}>
					{label}
				</Link>
			</div>
		</div>
	);
};

export default RegistrationCard;
