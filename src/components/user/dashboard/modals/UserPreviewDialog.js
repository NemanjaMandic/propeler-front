// @flow

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import * as colors from '../../../../styles/modules/colors.scss';
import Avatar from '../../../../images/team-investor_avatar.svg';
import anonymousAvatar from '../../../../images/anonymous_avatar.svg';
import { absoluteLink } from '../../../../utilities/linkUtils';
import fb from '../../../../images/fb.svg';
import tw from '../../../../images/tw.svg';
import yt from '../../../../images/yt.svg';
import ln from '../../../../images/ln.svg';
import { closeUserPreviewDialog, getUserPreviewPhoto } from '../../../../state/modals/actions';
import { countries } from '../../../../constants/countries';

type PropsT = {
	classes: {
		paper: any,
		title: any,
		button: any,
		icon: any,
	},
	user: any,
	open: boolean,
	loadingPhoto: boolean,
	closeUserPreviewDialog: Function,
};

const styles = {
	paper: {
		width: '500px',
		minHeight: '450px',
		textAlign: 'center',
	},
	title: {
		color: colors.darkBlue,
	},
	button: {
		float: 'right',
		padding: 15,
		position: 'absolute',
		top: 0,
		right: 0,
	},
	icon: {
		width: 20,
		height: 20,
	},
};

const renderCountry = user => {
	const country = countries.find(c => c.value === user.countryOfResidence);
	if (!user.city && country) return country.label;
	return user.countryOfResidence;
};

const UserPreviewDialog = (props: PropsT) => {
	const { classes, user, open, closeUserPreviewDialog, getUserPreviewPhoto, loadingPhoto } = props;

	useEffect(() => {
		user && !user.photo && user.profilePictureUrl && getUserPreviewPhoto(user.id);
	}, [user]);

	const imageUrl =
		user && user.photo
			? `data:image/jpeg;base64,${user.photo}`
			: user && (!user.firstName && !user.companyName)
			? anonymousAvatar
			: Avatar;

	return (
		<Dialog
			open={open}
			onClose={closeUserPreviewDialog}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			classes={{ paper: classes.paper }}
		>
			<DialogContent>
				<IconButton onClick={closeUserPreviewDialog} classes={{ root: classes.button }}>
					<CloseIcon classes={{ root: classes.icon }} />
				</IconButton>
				{user && (
					<Fragment>
						<div className={'user_preview'}>
							<div className={'user_preview_avatar'}>
								{loadingPhoto ? (
									<CircularProgress />
								) : (
									<img src={imageUrl} alt={'profile'} className={'user_preview_avatar'} />
								)}
							</div>
							<div>
								<div>{user.companyName || `${user.firstName} ${user.lastName || ''}`}</div>
								{user.companyIdentificationNumber && <div>{user.companyIdentificationNumber}</div>}
								<div>
									{user.city ? `${user.city}, ` : ''}
									{renderCountry(user)}
								</div>
								<div>
									{user.facebookUrl && (
										<a href={absoluteLink(user.facebookUrl)} rel="noreferrer noopener" target="_blank">
											<img src={fb} alt="Facebook" />
										</a>
									)}
									{user.twitterUrl && (
										<a href={absoluteLink(user.twitterUrl)} rel="noreferrer noopener" target="_blank">
											<img src={tw} alt="Twitter" />
										</a>
									)}
									{user.customProfileUrl && (
										<a href={absoluteLink(user.customProfileUrl)} rel="noreferrer noopener" target="_blank">
											<img src={yt} alt="Youtube" />
										</a>
									)}
									{user.linkedinUrl && (
										<a href={absoluteLink(user.linkedinUrl)} rel="noreferrer noopener" target="_blank">
											<img src={ln} alt="LinkedIn" />
										</a>
									)}
								</div>
							</div>
						</div>
						<div className={'user_bio'}>{user.shortBiography}</div>
						{/* <div className={"user_previous_campaign"}>
              <div>Previous Campaigns</div>
              <div>Niki</div>
              <div>Maki</div>
              <div>Milanka</div>
              <div>Endzi</div>
            </div> */}
					</Fragment>
				)}
			</DialogContent>
		</Dialog>
	);
};

const mapStateToProps = ({
	modals: {
		userPreviewDialog: { user, open, loadingPhoto },
	},
}) => ({
	user,
	open,
	loadingPhoto,
});

export default connect(
	mapStateToProps,
	{ closeUserPreviewDialog, getUserPreviewPhoto },
)(withStyles(styles)(UserPreviewDialog));
