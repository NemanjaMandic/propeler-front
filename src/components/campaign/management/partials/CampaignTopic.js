// @flow

import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextEditor from '../../../common/editor/TextEditor';

import {
	setStep,
	createCampaignTopic,
	updateCampaignTopic,
	setCampaignCurrentTopic,
} from '../../../../state/campaign/actions';
import Button from '../../../common/button/Button';
import { getPublicFileAPI, uploadCampaignTopicImageAPI } from '../../../../services/api';

type PropsT = {
	setStep: Function,
	current_topic: Object,
	info: Object,
	createCampaignTopic: Function,
	updateCampaignTopic: Function,
	topicType: string,
	topicContent: Object,
	setCampaignCurrentTopic: Function,
	step: number,
	modal: boolean,
	closeModal?: Function,
};

const CampaignTopic = (props: PropsT) => {
	const {
		modal,
		closeModal,
		setStep,
		current_topic,
		info,
		createCampaignTopic,
		updateCampaignTopic,
		topicType,
		topicContent,
		setCampaignCurrentTopic,
		step,
	} = props;
	const currentTopic = current_topic[topicType.toLowerCase()].content
		? JSON.stringify(current_topic[topicType.toLowerCase()].content)
		: topicContent.content;

	const createTopic = () => {
		const data = {
			content: current_topic[topicType.toLowerCase()].content
				? JSON.stringify(current_topic[topicType.toLowerCase()].content)
				: null,
		};
		if (data.content) {
			if (topicContent.content) {
				if (topicContent.content !== data.content) {
					updateCampaignTopic({
						campaignName: info.urlFriendlyName,
						topicType,
						campaignTopicData: data,
					});
				}
			} else {
				createCampaignTopic({
					campaignName: info.urlFriendlyName,
					topicType,
					campaignTopicData: data,
				});
			}
		}
		setCampaignCurrentTopic({
			content: null,
			topicType: topicType.toLowerCase(),
		});
		if (!modal) {
			setStep(step + 1);
		}
		if (closeModal) {
			closeModal();
		}
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

							const result = {
								name: `${topicType}${picture.name}`,
								data: picture,
							};

							if (!info.topicStatus[topicType.toLowerCase()]) {
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
								createCampaignTopic({
									campaignName: info.urlFriendlyName,
									topicType,
									campaignTopicData: { content: JSON.stringify(emptyContent) },
								});
							}
							uploadCampaignTopicImageAPI(info.urlFriendlyName, topicType, result)
								.then(response => {
									const publicUrl = getPublicFileAPI(response.data.filename);
									const image = { data: { link: `${publicUrl}` } };
									resolve(image);
								})
								.catch(error => reject(error));
						},
						'image/jpeg',
						1,
					);
				};
			};
		});
	};
	const disableButton =
		(current_topic[topicType.toLowerCase()].content && current_topic[topicType.toLowerCase()].content.blocks[0].text) ||
		false;
	const [t] = useTranslation('translations');
	return (
		<div className={'campaign__topic'}>
			{!topicContent.inProgress ? (
				<TextEditor
					content={currentTopic}
					campaignName={info.urlFriendlyName}
					topicType={topicType}
					onEditorChange={data => {
						if (data && data.blocks[0].text && data.blocks[0].text.trim())
							setCampaignCurrentTopic({
								content: data,
								topicType: topicType.toLowerCase(),
							});
						else
							setCampaignCurrentTopic({
								content: null,
								topicType: topicType.toLowerCase(),
							});
					}}
					imageUpload={uploadImageCallBack}
				/>
			) : (
				<CircularProgress />
			)}
			{!modal ? (
				<div className={'buttons'}>
					<span
						onClick={() => {
							setCampaignCurrentTopic({
								content: null,
								topicType: topicType.toLowerCase(),
							});
							setStep(step - 1);
						}}
					>
						{t('BACK')}
					</span>
					<span
						className={'skip__step'}
						onClick={() => {
							setCampaignCurrentTopic({
								content: null,
								topicType: topicType.toLowerCase(),
							});
							setStep(step + 1);
						}}
					>
						{t('SKIP_THIS_STEP')}
					</span>
					<Button
						type={'button'}
						variant={'contained'}
						color={'primary'}
						name={t('SAVE_AND_CONTINUE')}
						disabled={!disableButton}
						onClick={createTopic}
					/>
				</div>
			) : (
				<div className={'cards__buttons edit'}>
					<Button type={'button'} variant={'outlined'} color={'primary'} name={t('CANCEL')} onClick={closeModal} />
					<Button
						type={'button'}
						variant={'contained'}
						color={'primary'}
						name={t('SAVE')}
						disabled={!disableButton}
						onClick={createTopic}
					/>
				</div>
			)}
		</div>
	);
};
const mapStateToProps = (state, ownProps) => {
	const {
		campaign: {
			info,
			marketImage,
			current_topic,
			createCampaign: { step },
		},
	} = state;
	const topicContent = state.campaign[`${ownProps.topicType.toLowerCase()}`];
	return {
		topicContent,
		info,
		marketImage,
		current_topic,
		step,
	};
};

export default connect(
	mapStateToProps,
	{
		setStep,
		createCampaignTopic,
		updateCampaignTopic,
		setCampaignCurrentTopic,
	},
)(CampaignTopic);
