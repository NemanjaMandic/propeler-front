// @flow
import 'date-fns';
import React, { useState, useRef } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm, change } from 'redux-form';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
import { KeyboardDatePicker } from '@material-ui/pickers/DatePicker';

import Icon from '@material-ui/core/Icon';
import Button from '../../../common/button/Button';
import Input from '../../../common/input/Input';
import { required } from '../../../../utilities/validators';
import * as colors from '../../../../styles/modules/colors.scss';
import * as documentEntity from '../../../../constants/documentEntity';
import UploadDocument from '../../../common/uploadDocument/UploadDocument';
import { uploadDocument, removeUploadedDocument } from '../../../../state/campaign/actions';
import { getDocumentTypes } from '../../../../state/documents/actions';
import { closePaymentConfirmDialog } from '../../../../state/modals/actions';
import { sendPaymentConfirmation } from '../../../../state/payment/actions';

type PropsT = {
	classes: {
		paper: any,
		title: any,
		inputDate: any,
	},
	currentUpload: any,
	change: Function,
	invalid: boolean,
	campaign: any,
	reset: Function,
	handleSubmit: Function,
	getDocumentTypes: Function,
	sendPaymentConfirmation: Function,
	documentTypes: any,
	removeUploadedDocument: Function,
	uploadDocument: Function,
	closePaymentConfirmDialog: Function,
};

const styles = {
	paper: {
		width: '700px',
		minHeight: '410px',
		textAlign: 'center',
	},
	title: {
		color: colors.darkBlue,
	},
};

const PaymentConfirmationDialog = (props: PropsT) => {
	const {
		classes,
		currentUpload: { docName, name, inProgress },
		invalid,
		reset,
		change,
		campaign,
		handleSubmit,
		removeUploadedDocument,
		paymentConfirmationDialog: { open, paymentId, submit, submitParams },
		uploadDocument,
		getDocumentTypes,
		sendPaymentConfirmation,
		documentTypes,
		closePaymentConfirmDialog,
	} = props;
	const [t] = useTranslation('translations');
	const [selectedDate, setSelectedDate] = useState(new Date());

	const formatDate = (date: Object) => {
		return date.toISOString();
	};

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	const onClose = () => {
		reset();
		removeUploadedDocument();
		closePaymentConfirmDialog();
	};

	const onSubmit = data => {
		const dataToSubmit = {
			...data,
			documentUrl: docName,
			paymentDate: formatDate(selectedDate),
		};

		sendPaymentConfirmation({ investmentId: paymentId, data: dataToSubmit });
		reset();
		removeUploadedDocument();
		closePaymentConfirmDialog();
	};

	const renderSubmittedDoc = () => {
		console.log('docName', docName);
		return (
			<div className={'submitted__doc'}>
				<div className={'submitted__doc__name'}>{name}</div>
				<div>
					<Icon className={'icon_class'} onClick={() => removeUploadedDocument()}>
						close
					</Icon>
				</div>
			</div>
		);
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			classes={{ paper: classes.paper }}
		>
			<DialogTitle className={'twoFA--title'}>{'Confirm payment'}</DialogTitle>
			<DialogContent>
				<span className={'dialog__content'}> {t('DRAG_AND_DROP_FILE')} </span>
				<form className={'dialog__form'} id="fileinfo" onSubmit={handleSubmit((data: *) => onSubmit(data))}>
					<div className={'form__field'}>
						<Field
							name="documentTitle"
							component={Input}
							label={t('SUBMISSION_TITLE')}
							type="text"
							end_icon="info"
							validate={[required]}
						/>
					</div>
					<div className={'form__field'}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								className={'customPicker'}
								disableToolbar
								variant="dialog"
								format="yyyy-MM-dd"
								margin="normal"
								maxDate={new Date()}
								id="date-picker-inline"
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
						</MuiPickersUtilsProvider>
					</div>

					{!docName && (
						<div className={'form__field upload__doc_btn'}>
							<UploadDocument
								title={t('UPLOAD_DOCUMENT')}
								backgroundColor={colors.blue}
								border={'dashed'}
								borderColor={colors.blue}
								inProgress={inProgress}
								upload={uploadDocument}
								textColor={colors.lightBlue}
							/>
						</div>
					)}
					<div className={'form__field list__sub__doc'}>{docName && renderSubmittedDoc()}</div>
					<div className={'buttons__upload__doc'}>
						<Button type={'button'} variant={'outlined'} color={'primary'} name={t('CANCEL')} onClick={onClose} />
						<Button
							type={'submit'}
							variant={'contained'}
							color={'primary'}
							name={t('SUBMIT')}
							disabled={invalid || !docName}
						/>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

const mapStateToProps = state => {
	const {
		campaign: { documentActions },
	} = state;

	const {
		modals: { paymentConfirmationDialog },
	} = state;

	const {
		documents: {
			documentTypes: { data },
		},
	} = state;

	return {
		currentUpload: documentActions,
		documentTypes: data,
		paymentConfirmationDialog,
	};
};

export default compose(
	connect(
		mapStateToProps,
		{
			uploadDocument,
			closePaymentConfirmDialog,
			removeUploadedDocument,
			getDocumentTypes,
			sendPaymentConfirmation,
		},
	),
	reduxForm({
		form: 'DocumentUpload',
	}),
)(withStyles(styles)(PaymentConfirmationDialog));
