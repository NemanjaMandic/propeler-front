// @flow

import React from 'react';
import { connect } from 'react-redux';
import { fileDownload } from '../../../utilities/downloader';
import { getDocument } from '../../../state/campaign/actions';

const DocumentsCard = (props: { name: string, url: string, file: any, inProgress: boolean, getDocument: Function }) => {
	const { name, url, file, inProgress, getDocument } = props;

	const downloadFile = () => {
		getDocument(url);
		if (!inProgress && file.file) fileDownload({ type: file.type, file: file.file }, name);
	};

	return (
		<div className="overview-campaignInfo--content-documents">
			<div className="overview-campaignInfo--content-documents--name">{name}</div>
			<div onClick={downloadFile} className="overview-campaignInfo--content-documents--link" download>
				Download&nbsp;
				<i className="material-icons">get_app</i>
			</div>
		</div>
	);
};

const mapStateToProps = ({
	campaign: {
		getFile: { file, inProgress },
	},
}) => ({
	file,
	inProgress,
});

export default connect(
	mapStateToProps,
	{ getDocument },
)(DocumentsCard);
