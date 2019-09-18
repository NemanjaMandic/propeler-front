import React from 'react';
import { useTranslation } from 'react-i18next';

type PropsT = {
	history: Array<Object>,
};

const DocumentsHistory = (props: PropsT) => {
	const { history } = props;
	const [t] = useTranslation('translations');

	return (
		<div className="navigation_container documents__history">
			<div className={'documents__history__title'}>{t('UPLOADED_DOCUMENTS')}</div>
			<div className={'documents__history__content'}>
				{history.map(h => {
					return (
						<div className={'documents__history__content__doc'} key={h.id}>
							<span>{h.name}</span>
							<span>{h.dateAdded}</span>
						</div>
					);
				})}
			</div>
			<div className={'documents__history__see_all'}>{t('VIEW_ALL')}</div>
		</div>
	);
};

export default DocumentsHistory;
