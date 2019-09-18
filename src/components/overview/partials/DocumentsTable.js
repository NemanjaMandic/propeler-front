import React, { Fragment } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Info from '@material-ui/icons/Info';
import Tooltip from '../../common/tooltip/Tooltip';

type PropsT = {
	entityTitle: string,
	title: string,
	documents: Array<any>,
	previewDocument: Function,
	editable: boolean,
	editDocument: Function,
	deleteDocument: Function,
	openDocumentDialog: Function,
	types: {
		documents: Array<any>,
		inProgress: boolean,
	},
};

const DocumentsTable = ({
	entityTitle,
	title,
	documents,
	previewDocument,
	openDocumentDialog,
	editable,
	editDocument,
	deleteDocument,
	types,
}: PropsT) => {
	const [t] = useTranslation('translations');

	const language = localStorage.getItem('language') !== null ? localStorage.getItem('language') : 'en';
	moment().locale(language === 'sr' ? 'sr' : 'en-gb');

	const uploadTypeAllowed = docType => {
		const numOfDocTypes = documents.reduce((total, doc) => (doc.type === docType.type ? total + 1 : total), 0);
		return !docType.maxUploads || numOfDocTypes < docType.maxUploads;
	};

	return (
		<Fragment>
			{(types && types.inProgress) || !editable ? null : (
				<Fragment>
					<div className={'margin-top-20'}>
						{entityTitle}{' '}
						<Tooltip title={'Lorem ipsum ...'} placement="right">
							<IconButton>
								<Info className={'icon_class'} />
							</IconButton>
						</Tooltip>
					</div>
					<div className={'submit__doc'}>
						{types &&
							types.documents.map(docType => (
								<div
									key={docType.type}
									onClick={() => {
										uploadTypeAllowed(docType) && openDocumentDialog(docType.type);
									}}
									className={!uploadTypeAllowed(docType) ? 'disabled_submit' : null}
								>
									{t(docType.type)}
								</div>
							))}
					</div>
				</Fragment>
			)}
			{documents && documents.length > 0 && (
				<Fragment>
					<div className={`documents__table__heading`} key={title}>
						<div>{title}</div>
						<div>{t('DATE_ADDED')}</div>
						<div> </div>
					</div>
					{documents.map(document => (
						<div className={'documents__table__row'} key={document.title}>
							<div onClick={() => previewDocument(document.url)}>{document.title}</div>
							<div>{moment(document.uploadDate).format('ll')}</div>
							<div>
								{editable ? (
									<div>
										<IconButton onClick={() => editDocument(document)} className={'edit_icon'}>
											<Edit />
										</IconButton>
										<IconButton onClick={() => deleteDocument(document.id)} className={'edit_icon'}>
											<Delete />
										</IconButton>
									</div>
								) : (
									''
								)}
							</div>
						</div>
					))}
				</Fragment>
			)}
		</Fragment>
	);
};

export default DocumentsTable;
