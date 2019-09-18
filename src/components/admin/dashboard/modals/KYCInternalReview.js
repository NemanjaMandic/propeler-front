// @flow

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import File from '@material-ui/icons/InsertDriveFileOutlined';

import * as colors from '../../../../styles/modules/colors.scss';
import Button from '../../../common/button/Button';
import Input from '../../../common/input/Input';
import { closeKYCInternalReview } from '../../../../state/modals/actions';
import { acceptKYCInternalReview, rejectKYCInternalReview } from '../../../../state/admin/actions';
import { documentType } from '../../../../constants/userKYC';
import { ROLE_CORPORATE_INVESTOR } from '../../../../constants/roles';

type PropsT = {
	open: boolean,
	viewOnly: boolean,
	role: string,
	status: string,
	page: number,
	closeKYCInternalReview: Function,
	acceptKYCInternalReview: Function,
	rejectKYCInternalReview: Function,
	review: any,
	userKYC: any,
	classes: {
		paper: any,
		title: any,
		content: any,
		actions: any,
		icon: any,
		button: any,
		personalId: any,
		infoWrapper: any,
		textAreaForm: any,
	},
};

const styles = {
	paper: {
		maxWidth: 'none',
		minHeight: 'none',
		width: '1000px',
		height: '1000px',
		textAlign: 'center',
	},
	title: {
		color: colors.darkBlue,
		marginTop: '50px',
	},
	content: {
		overflow: 'auto',
	},
	actions: {
		margin: '20px 4px 40px 4px',
		justifyContent: 'center',
	},
	icon: {
		width: 20,
		height: 20,
	},
	button: {
		float: 'right',
		padding: 15,
		position: 'absolute',
		top: 0,
		right: 0,
	},
	personalId: {
		width: 540,
		margin: '0 auto',
		'& img': {
			maxWidth: '100%',
			width: '100%',
		},
	},
	infoWrapper: {
		background: '#F8F8F8',
		width: 540,
		margin: '0 auto',
		padding: '7px 42px',
		position: 'relative',
	},
	textAreaForm: {
		width: 540,
		maxWidth: 540,
		margin: 'auto',
		'& label': {
			transform: 'translate(10px, 177px)',
		},
	},
};

const KYCInternalReview = (props: PropsT) => {
	const {
		open,
		review,
		viewOnly,
		role,
		status,
		page,
		closeKYCInternalReview,
		acceptKYCInternalReview,
		rejectKYCInternalReview,
		userKYC,
		classes,
	} = props;

	const [t] = useTranslation('translations');

	const [rejectionMessage, setRejectionMessage] = useState('');
	const [errorMsg, setErrorMsg] = useState(false);
	const errorMsgText = 'Cannot enter more than 250 characters.';

	const handleChange = (event: any) => {
		setRejectionMessage(event.target.value);
		rejectionMessage.length >= 250 ? setErrorMsg(true) : setErrorMsg(false);
	};

	const submit = (approve: boolean) => {
		if (approve) {
			acceptKYCInternalReview({
				userKYCId: review.id,
				role: role,
				status: status,
				page: page,
			});
		} else {
			rejectKYCInternalReview({
				userKYCId: review.id,
				role: role,
				status: status,
				page: page,
				rejectionReason: rejectionMessage,
			});
		}
		setRejectionMessage('');
		closeKYCInternalReview();
	};

	return (
		<Dialog
			open={open}
			onClose={closeKYCInternalReview}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			classes={{ paper: classes.paper }}
		>
			<DialogTitle className={'twoFA--title app_review_title'}>
				<span>{'Identification documents'}</span>
				<IconButton onClick={closeKYCInternalReview} classes={{ root: classes.button }}>
					<CloseIcon classes={{ root: classes.icon }} />
				</IconButton>
			</DialogTitle>
			<DialogContent classes={{ root: classes.content }}>
				<div className={classes.personalId}>
					{userKYC.files.map((doc, index) =>
						doc && doc.type === documentType.USER_KYC ? (
							<div key={index} className={classes.personalId} style={{ marginBottom: 10 }}>
								<img src={`data:image/jpeg;base64,${doc.file}`} alt={''} />
							</div>
						) : null,
					)}
				</div>
				<div className="form__field" style={{ marginTop: 50 }}>
					<div className={classes.infoWrapper}>
						<i className="material-icons" style={{ color: '#39316C', position: 'absolute', left: 16 }}>
							error
						</i>
						<p>
							{`John Doe is marked as non politically exposed person under the
                          XY country law, therefore is allowed to participate in propeler
                          campaigns lorem ipsum dolor sit amet text..`}
						</p>
					</div>
				</div>
				{userKYC.data.userRole === ROLE_CORPORATE_INVESTOR && (
					<div className={'app_form_submitted_doc'} style={{ width: 540 }}>
						<div style={{ marginBottom: 20 }}>{t('COMPANY_DOCUMENTS')}</div>
						{userKYC.files.map((doc, index) =>
							doc.type === documentType.COMPANY_INVESTOR_KYC ? (
								<div key={index} style={{ marginBottom: 10 }}>
									<File />
									<a
										className={'app_form_submitted_doc_doc_title'}
										href={`data:application/pdf;base64,${doc.file}`}
										download={`${doc.title}`}
									>
										{doc.title || doc.url}
									</a>
								</div>
							) : null,
						)}
					</div>
				)}
				{!viewOnly && (
					<div className={classes.textAreaForm}>
						<Input
							size={'large'}
							name={'tagLine'}
							multiline
							rows="8"
							label={t('REJECT_MSG')}
							type={'text'}
							maxLength={250}
							meta={{
								touched: errorMsg,
								invalid: errorMsg,
								error: errorMsgText,
							}}
							onChange={handleChange}
						/>
					</div>
				)}
			</DialogContent>

			<DialogActions classes={{ root: classes.actions }}>
				{viewOnly ? (
					<Button
						type={'button'}
						variant={'contained'}
						color={'primary'}
						onClick={closeKYCInternalReview}
						name={`Close`}
					/>
				) : (
					<div className={'app_form_buttons'}>
						<Button
							type={'button'}
							variant={'outlined'}
							color={'primary'}
							name={t('REJECT')}
							disabled={!rejectionMessage}
							onClick={() => submit(false)}
						/>
						<Button
							type={'submit'}
							variant="contained"
							color={'primary'}
							name={t('APPROVE')}
							onClick={() => submit(true)}
						/>
					</div>
				)}
			</DialogActions>
		</Dialog>
	);
};

const mapStateToProps = state => {
	const {
		modals: {
			kycInternalReview: { open, viewOnly, review, role, status, page },
		},
		admin: { userKYC },
	} = state;
	return {
		open,
		viewOnly,
		review,
		userKYC,
		role,
		status,
		page,
	};
};

export default connect(
	mapStateToProps,
	{ closeKYCInternalReview, acceptKYCInternalReview, rejectKYCInternalReview },
)(withStyles(styles)(KYCInternalReview));
