// @flow

import React, { Fragment, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '../tooltip/Tooltip';
import { rejectStyle, activeStyle, baseStyle } from './UploadPhoto.styles';
import ImageCropper from './ImageCropper';

type PropsT = {
	size?: string,
	name: string,
	uploadPhoto: Function,
	deletePhoto: Function,
	fileDto: Object,
	inProgress: boolean,
	info?: {
		maxImageSize?: string,
		accepts?: string,
		tooltip?: string,
	},
	helperText?: string,
	gradient?: string,
	confirmDelete?: Function,
	disable?: boolean,
};

const getParams = size => {
	switch (size) {
		case 'md':
			return { width: 768, height: 432 };
		case 'lg':
			return { width: 500, height: 155 };
		case 'rectangle':
			return { width: 260, height: 160 };
		default:
			return { width: 180, height: 180 };
	}
};

const UploadPhoto = (props: PropsT) => {
	const {
		size,
		fileDto,
		inProgress,
		uploadPhoto,
		deletePhoto,
		info,
		helperText,
		gradient,
		name,
		confirmDelete,
		disable,
	} = props;
	const imageSrc = fileDto ? fileDto.file : null;
	const { width, height } = getParams(size);

	const [data, setData] = useState();
	const [open, setOpen] = useState(false);

	const [t] = useTranslation('translations');

	const onDrop = (accepted, rejected) => {
		if (accepted.length > 0) {
			setData(accepted[0]);
			setOpen(true);
		} else if (rejected.length > 1) {
			NotificationManager.error('You can only uploadPhoto one file!');
		} else {
			NotificationManager.error('Max. file size: 4MB. Accepted formats: JPG, PNG!');
		}
	};

	const onClose = () => {
		setOpen();
		setData();
	};

	const handleDelete = () => {
		if (confirmDelete) {
			confirmDelete({
				open: true,
				title: t('PHOTO_DELETION'),
				subtitle: t('CONFIRM_PHOTO_DELETION'),
				actionLabel: t('DELETE'),
				cancelLabel: t('CANCEL'),
				actionMethod: deletePhoto,
			});
		} else {
			deletePhoto();
		}
	};

	return (
		<Fragment>
			<div className={`upload__photo__wrapper ${size || 'sm'}`}>
				<div className={'upload__photo'}>
					{!imageSrc && !inProgress ? (
						<Dropzone accept="image/*" onDrop={onDrop} multiple={false} disabled={disable}>
							{({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
								let styles = baseStyle(gradient);
								styles = isDragActive ? { ...styles, ...activeStyle } : styles;
								styles = isDragReject ? { ...styles, ...rejectStyle } : styles;
								return (
									<div {...getRootProps()}>
										<input {...getInputProps()} name={name} />
										<div
											className={disable ? 'upload__photo__container disabled_thumbnail' : 'upload__photo__container'}
											style={styles}
										>
											<div>
												<i className="material-icons">add_a_photo</i>
												<div className={'upload__text'}>
													<span className={disable ? 'upload__link__disabled' : 'upload__link'}>
														{t('UPLOAD_PHOTO')}
													</span>
													{t('JUST_DRAG_AND_DROP')}
												</div>
												{helperText && <div>{helperText}</div>}
											</div>
										</div>
									</div>
								);
							}}
						</Dropzone>
					) : (
						<div className={disable ? 'photo__thumbnail disabled_thumbnail' : 'photo__thumbnail '}>
							{imageSrc && <img src={`data:image/jpeg;base64,${fileDto.file}`} alt={'profile'} />}
							{!imageSrc && inProgress && <CircularProgress />}
						</div>
					)}
				</div>
				{imageSrc && !disable && (
					<div className={'delete__photo'} onClick={handleDelete}>
						<Tooltip title={'Delete photo'} placement="bottom">
							<i className="material-icons">clear</i>
						</Tooltip>
					</div>
				)}
				<div className={'upload__photo__info'}>
					{!imageSrc && info && (
						<div>
							{info.maxImageSize && <div>{`${t('MAX_FILE_SIZE')}${info.maxImageSize}.`}</div>}
							<div className={'custom__tooltip'}>
								{info.accepts && <span>{`${t('ACCEPTED_FORMATS')}${info.accepts}`}</span>}
								{info.tooltip && (
									<Tooltip title={info.tooltip} placement="right">
										<i className="material-icons info_icon">info</i>
									</Tooltip>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
			<ImageCropper
				data={data}
				width={width}
				height={height}
				open={open || false}
				onClose={onClose}
				action={uploadPhoto}
			/>
		</Fragment>
	);
};

export default UploadPhoto;
