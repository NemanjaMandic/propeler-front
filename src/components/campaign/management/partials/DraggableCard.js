// @flow

import React, { useEffect } from 'react';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { SortableHandle } from 'react-sortable-hoc';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';
import Edit from '@material-ui/icons/Edit';
import UploadPhoto from '../../../common/uploadPhoto/UploadPhoto';
import Tooltip from '../../../common/tooltip/Tooltip';

type PropsT = {
	listName: string,
	values: any,
	currentForm: number,
	removeItem: Function,
	toggleForm: Function,
	updateItem: Function,
	uploadPhoto: Function,
	deletePhoto: Function,
	getPhoto: Function,
	anonymous: any,
	CardComponent: any,
	FormComponent: any,
	platformCurrency: any,
};

const DraggableCard = (props: PropsT) => {
	const {
		values,
		removeItem,
		currentForm,
		toggleForm,
		updateItem,
		uploadPhoto,
		deletePhoto,
		getPhoto,
		anonymous,
		listName,
		CardComponent,
		FormComponent,
		platformCurrency,
	} = props;
	const isForm = values.id === currentForm;

	useEffect(() => {
		if (values.photoUrl) {
			getPhoto(values.id);
		}
	}, []);

	const toggleAnonymous = () => {
		updateItem(values.id, { ...values, isAnonymous: !values.isAnonymous });
	};
	const [t] = useTranslation('translations');

	const DragHandle = SortableHandle(() => (
		<Tooltip title={t('REPOSITION_CARD')} placement="bottom">
			<Menu />
		</Tooltip>
	));

	const removeCard = id => {
		removeItem(id);
		isForm && toggleForm();
	};

	return (
		<div className={`member__form ${!isForm ? 'member__card' : ''}`}>
			<div className={'card_action_bar'}>
				<div className={'actions'}>
					<Tooltip title={t('EDIT_INFO')} placement="bottom">
						<IconButton onClick={() => toggleForm(values.id)} className={isForm ? 'active-icon' : ''}>
							<Edit />
						</IconButton>
					</Tooltip>
					<Tooltip title={t('DELETE')} placement="bottom">
						<IconButton onClick={() => removeCard(values.id)}>
							<DeleteOutline />
						</IconButton>
					</Tooltip>
					<DragHandle />
				</div>
				{anonymous && !isForm && (
					<span onClick={toggleAnonymous}>{`${t('SET')}${listName}${t('AS')}${
						values.isAnonymous ? 'public' : t('ANONYMOUS')
					}`}</span>
				)}
			</div>
			<div className={'card__content'}>
				<UploadPhoto
					name={`member${values.id}_picture`}
					uploadPhoto={data => uploadPhoto(values.id, data)}
					deletePhoto={() => deletePhoto(values.id)}
					fileDto={values.fileDto}
					inProgress={values.inProgress}
					info={{ maxImageSize: '4MB', accepts: 'JPG, PNG' }}
				/>
				{!isForm ? (
					<CardComponent values={values} platformCurrency={platformCurrency} />
				) : (
					<FormComponent
						initialValues={values}
						removeItem={() => removeItem(values.id)}
						toggleForm={toggleForm}
						updateItem={data => updateItem(values.id, data)}
						platformCurrency={platformCurrency}
					/>
				)}
			</div>
		</div>
	);
};

export default DraggableCard;
