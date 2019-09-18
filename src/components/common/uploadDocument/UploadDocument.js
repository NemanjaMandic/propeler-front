// @flow

import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import { rejectStyle, activeStyle, baseStyle } from './UploadDocument.styles';

type PropsT = {
	title: string,
	backgroundColor: string,
	border: string,
	borderColor: string,
	upload: Function,
	inProgress: boolean,
	textColor: string,
	params?: any,
	width?: any,
};

const UploadDocument = (props: PropsT) => {
	const { title, backgroundColor, border, borderColor, upload, inProgress, textColor, params, width } = props;

	const [t] = useTranslation('translations');

	const onDrop = (accepted, rejected) => {
		if (accepted.length > 0) {
			upload({
				data: { data: accepted[0], name: accepted[0].name },
				...params,
			});
		} else if (rejected.length > 1) {
			NotificationManager.error(t('UPLOAD_FILE'));
		} else {
			NotificationManager.error(t('MAX_FILE_SIZE_PDF'));
		}
	};
	return (
		<Fragment>
			<div className={'upload__doc'}>
				{!inProgress ? (
					<Dropzone accept="application/pdf" onDrop={onDrop} multiple={false}>
						{({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
							const customWidth = width || 400;
							let styles = baseStyle(backgroundColor, border, borderColor, textColor, customWidth);
							styles = isDragActive ? { ...activeStyle } : styles;
							styles = isDragReject ? { ...rejectStyle } : styles;
							return (
								<div {...getRootProps()}>
									<input {...getInputProps()} name={title} />
									<div className={'upload__doc__container'} style={styles}>
										<div>{title}</div>
									</div>
								</div>
							);
						}}
					</Dropzone>
				) : (
					<CircularProgress />
				)}
			</div>
		</Fragment>
	);
};

export default UploadDocument;
