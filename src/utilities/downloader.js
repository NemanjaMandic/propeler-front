// @flow

function _downloadURI(uri, name) {
	let link = document.createElement('a');
	link.download = name;
	link.href = uri;
	// $FlowIssue
	document.body.appendChild(link);
	link.click();
	// $FlowIssue
	document.body.removeChild(link);
	link = null;
}

export const getFileURI = (fileDocument: { type: string, file: string }) => {
	let fileType;
	switch (fileDocument.type) {
		case 'pdf':
			fileType = 'application/pdf';
			break;
		case 'txt':
			fileType = 'text/plain';
			break;
		default:
			fileType = `image/${fileDocument.type}`;
	}

	return `data:${fileType};base64,${fileDocument.file}`;
};

export const fileDownload = (
	fileDocument: {
		type: string,
		file: string,
	},
	title: string,
	callBackAction?: any,
) => {
	if (title) {
		const uri = getFileURI(fileDocument);
		_downloadURI(uri, title);
		if (callBackAction) callBackAction();
	}
};
