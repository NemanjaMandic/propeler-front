// @flow

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, withStyles } from '@material-ui/core';
import { NotificationManager } from 'react-notifications';
import { closeUpdatesDialog } from '../../../state/modals/actions';
import { createCampaignUpdate, updateCampaignUpdate, deleteCampaignUpdate } from '../../../state/campaign/actions';
import { required } from '../../../utilities/validators';
import Button from '../../common/button/Button';
import Input from '../../common/input/Input';
import TextEditor from '../../common/editor/TextEditor';
import { getPublicFileAPI, uploadCampaignUpdateImageAPI, createCampaignUpdateAPI } from '../../../services/api';

const styles = {
	paper: {
		maxWidth: '900px',
		width: '900px',
		padding: 10,
		minHeight: '800px',
	},
};

type PropsT = {
	classes: Object,
	closeUpdatesDialog: Function,
	updatesDialog: {
		open: boolean,
		inProgress: boolean,
		create: boolean,
		update: Object,
	},
	invalid: boolean,
	handleSubmit: Function,
	createCampaignUpdate: Function,
	updateCampaignUpdate: Function,
	deleteCampaignUpdate: Function,
	info: any,
	reset: Function,
};

const UpdatesDialog = ({
	classes,
	updatesDialog: { open, create, update },
	closeUpdatesDialog,
	invalid,
	handleSubmit,
	updateCampaignUpdate,
	createCampaignUpdate,
	deleteCampaignUpdate,
	info: { urlFriendlyName },
	reset,
}: PropsT) => {
	const [currentContent, setCurrentContent] = useState(update ? update.content : null);
	const [currentTitle, setCurrentTitle] = useState('');
	const [currentUpdateId, setCurrentUpdateId] = useState(update ? update.id : null);

	const [t] = useTranslation('translations');

	const onSubmit = (data: any) => {
		if (create) {
			if (!currentUpdateId) {
				createCampaignUpdate({
					campaignName: urlFriendlyName,
					pageNumber: 0,
					pageSize: 5,
					data: { title: data.title, content: JSON.stringify(currentContent) },
				});
			} else {
				updateCampaignUpdate({
					campaignName: urlFriendlyName,
					pageNumber: 0,
					pageSize: 5,
					data: { title: currentTitle, content: JSON.stringify(currentContent) },
					updateId: currentUpdateId,
				});
			}
		} else {
			updateCampaignUpdate({
				campaignName: urlFriendlyName,
				pageNumber: 0,
				pageSize: 5,
				data: { title: data.title, content: JSON.stringify(currentContent) },
				updateId: update.id,
			});
		}
		setCurrentContent(null);
		setCurrentTitle(null);
		closeUpdatesDialog();
		reset();
	};
	const onChange = (event: any) => {
		setCurrentTitle(event.target.value);
	};
	const resizeImage = img => {
		const width = 768;
		const height = 432;
		const result = {
			height: 0,
			width: 0,
		};

		if (img.height < height && img.width < width) {
			result.height = img.height;
			result.width = img.width;
		} else if (img.height > height && img.width < width) {
			result.height = height;
			result.width = img.width * (height / img.height);
		} else if (img.height < height && img.width > width) {
			result.height = img.height * (width / img.width);
			result.width = width;
		} else {
			result.width = width;
			result.height = height;
		}

		return result;
	};
	const uploadImageCallBack = file => {
		return new Promise((resolve, reject) => {
			const fileName = file.name;
			const reader = new FileReader();

			reader.readAsDataURL(file);
			reader.onload = event => {
				const img = new Image();
				img.src = event.target.result;
				img.onload = () => {
					const elem = document.createElement('canvas');
					const result = resizeImage(img);
					elem.height = result.height;
					elem.width = result.width;

					const ctx = elem.getContext('2d');
					ctx.drawImage(img, 0, 0, elem.width, elem.height);
					ctx.canvas.toBlob(
						blob => {
							const picture = new File([blob], fileName, {
								type: 'image/jpeg',
								lastModified: Date.now(),
							});

							const result = { name: `${picture.name}`, data: picture };

							if (!currentContent) {
								const emptyContent = {
									blocks: [
										{
											key: 'ad1gi',
											text: ' ',
											type: 'unstyled',
											depth: 0,
											inlineStyleRanges: [],
											entityRanges: [],
											data: {},
										},
									],
									entityMap: {},
								};
								if (currentTitle) {
									// createCampaignUpdate({campaignName: urlFriendlyName, pageNumber: 0, pageSize: 5, data: { title: currentTitle, content: JSON.stringify(emptyContent)}})
									createCampaignUpdateAPI(urlFriendlyName, {
										title: currentTitle,
										content: JSON.stringify(emptyContent),
									})
										.then(res => {
											setCurrentUpdateId(res.data.id);
											// setCurrentContent(emptyContent);
											uploadCampaignUpdateImageAPI(res.data.id, result)
												.then(response => {
													const publicUrl = getPublicFileAPI(response.data.filename);
													const image = { data: { link: `${publicUrl}` } };
													resolve(image);
												})
												.catch(error => reject(error));
										})
										.catch(error => console.log(error));
								} else {
									reject();
									NotificationManager.error('Title not provided', '', 3000);
								}
							} else {
								uploadCampaignUpdateImageAPI(currentUpdateId, result)
									.then(response => {
										const publicUrl = getPublicFileAPI(response.data.filename);
										const image = { data: { link: `${publicUrl}` } };
										resolve(image);
									})
									.catch(error => reject(error));
							}
						},
						'image/jpeg',
						1,
					);
				};
			};
		});
	};
	const onClose = () => {
		setCurrentContent(null);
		setCurrentTitle(null);
		closeUpdatesDialog();
		reset();
		if (create && currentUpdateId) {
			deleteCampaignUpdate({ campaignName: urlFriendlyName, pageNumber: 0, pageSize: 5, updateId: currentUpdateId });
		}
	};
	return (
		<Dialog open={open} disableBackdropClick disableEscapeKeyDown classes={{ paper: classes.paper }}>
			<DialogContent>
				<form onSubmit={handleSubmit((data: *) => onSubmit(data))} className="campaign-basic--form">
					<div className={'form__field'}>
						{create ? (
							<Field
								name="title"
								component={Input}
								label={t('TITLE*')}
								type="text"
								end_icon="info"
								validate={[required]}
								onChange={onChange}
								tooltip={
									'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
								}
							/>
						) : (
							<Field name="title" component={Input} type="text" validate={[required]} disabled />
						)}
					</div>
					<div className={'form__field'}>
						<Field
							name="content"
							component={TextEditor}
							content={update.content ? update.content : null}
							onEditorChange={data => setCurrentContent(data)}
							imageUpload={uploadImageCallBack}
						/>
					</div>
					<div className={'cards__buttons edit'}>
						<Button type={'button'} variant={'outlined'} color={'primary'} name={t('CANCEL')} onClick={onClose} />
						<Button type={'submit'} variant="contained" color={'primary'} name={t('UPDATE_CL')} disabled={invalid} />
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

const mapStateToProps = ({ modals: { updatesDialog }, campaign: { info } }) => ({
	initialValues: { ...updatesDialog.update },
	updatesDialog,
	info,
});

export default compose(
	connect(
		mapStateToProps,
		{
			closeUpdatesDialog,
			createCampaignUpdate,
			updateCampaignUpdate,
			deleteCampaignUpdate,
		},
	),
	reduxForm({
		form: 'UpdatesForm',
		enableReinitialize: true,
		keepDirtyOnReinitialize: true,
	}),
)(withStyles(styles)(UpdatesDialog));
