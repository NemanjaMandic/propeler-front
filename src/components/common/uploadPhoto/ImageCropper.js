// @flow

import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle, DialogActions, withStyles, CircularProgress } from '@material-ui/core';
import Button from '../../common/button/Button';
import { imageCropperStyles } from './UploadPhoto.styles';

type PropsT = {
	data: any,
	width: number,
	height: number,
	open: boolean,
	action: Function,
	classes: {
		paper: any,
	},
	onClose: Function,
};

const ImageCropper = (props: PropsT) => {
	const { data, width, height, open, classes, action, onClose } = props;
	const [scale, setScale] = useState(1);
	let editor = useRef();

	const [t] = useTranslation('translations');

	const setEditorRef = e => {
		editor = e;
	};

	const onConfirm = () => {
		// $FlowIssue
		const canvas = editor.getImageScaledToCanvas().toDataURL();
		const base64 = canvas.split('base64,').splice(-1);
		fetch(canvas)
			.then(res => res.blob())
			.then(blob => {
				action({ data: blob, name: data.name, base64 });
				onClose();
			})
			.catch(() => NotificationManager.error(t('UNEXPECTED_ERROR')));
	};
	const handleScale = e => {
		setScale(parseFloat(e.target.value));
	};

	return (
		<Dialog open={open} disableBackdropClick disableEscapeKeyDown maxWidth={'md'} classes={{ paper: classes.paper }}>
			<DialogTitle className={'twoFA--title'}>{t('CROP_YOUR_PICTURE')}</DialogTitle>
			<DialogContent className={`change-dialog`}>
				{data ? (
					<div>
						<AvatarEditor
							ref={setEditorRef}
							image={data}
							width={width || 350}
							height={height || 350}
							border={25}
							color={[255, 255, 255, 0.6]}
							scale={scale}
						/>
						<div className="slidecontainer">
							<input
								name="scale"
								type="range"
								onChange={handleScale}
								min="1"
								max="4"
								step="0.02"
								defaultValue="1"
								className="slider"
							/>
						</div>
					</div>
				) : (
					<CircularProgress />
				)}
			</DialogContent>
			<DialogActions>
				<div className={'cancel-ok__buttons'}>
					<Button type={'button'} variant={'outlined'} color={'primary'} name={t('CANCEL')} onClick={onClose} />
					<Button type={'button'} variant={'contained'} color={'primary'} name={t('CROP')} onClick={onConfirm} />
				</div>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(imageCropperStyles)(ImageCropper);
