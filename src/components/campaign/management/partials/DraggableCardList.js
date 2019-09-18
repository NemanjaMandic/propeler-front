// @flow

import React, { useState, useRef, useEffect, Fragment } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { useTranslation } from 'react-i18next';
import DraggableCard from './DraggableCard';
import { usePrevious } from '../../../../services/usePrevious';

type PropsT = {
	listName: string,
	setPosition: Function,
	addItem: Function,
	removeItem: Function,
	updateItem: Function,
	items: Array<any>,
	getPhoto: Function,
	uploadPhoto: Function,
	deletePhoto: Function,
	anonymous?: any,
	CardComponent: any,
	FormComponent: any,
	platformCurrency: any,
};

const SortableItem = SortableElement(props => <DraggableCard {...props} />);

const SortableList = SortableContainer(({ items, children, currentForm, ...rest }) => (
	<div className={'members__container'}>
		{items.map((value, index) => (
			<SortableItem key={`${value.id}`} index={index} values={value} currentForm={currentForm} {...rest} />
		))}
		{children}
	</div>
));

const DraggableCardList = (props: PropsT) => {
	const { listName, setPosition, addItem, items, ...listProps } = props;
	const [currentForm, setCurrentForm] = useState();
	const teamDiv = useRef();
	const prevItems = usePrevious(items);

	useEffect(() => {
		return () => {
			const unsaved = items.find(item => item.initial);
			unsaved && listProps.removeItem(unsaved.id);
		};
	}, []);

	useEffect(() => {
		if ((!prevItems && items.length) || (prevItems && prevItems.length < items.length)) {
			const lastItem = items.slice(-1)[0];
			if (lastItem.initial) {
				setCurrentForm(lastItem.id);
			}
			teamDiv.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}, [items.length]);

	const onSortEnd = ({ oldIndex, newIndex }) => {
		setPosition(
			arrayMove(items, oldIndex, newIndex).map((member, index) => ({
				...member,
				orderNumber: index,
			})),
		);
	};

	const addNewCard = () => {
		if (currentForm) return;
		addItem();
	};

	const [t] = useTranslation('translations');

	return (
		<Fragment>
			<SortableList
				helperClass="sortableHelper"
				listName={listName}
				items={items}
				onSortEnd={onSortEnd}
				lockAxis={'y'}
				lockToContainerEdges
				useDragHandle
				toggleForm={setCurrentForm}
				currentForm={currentForm}
				{...listProps}
			>
				<div ref={teamDiv} />
			</SortableList>
			<div className={'upload__link'} style={{ margin: 30 }} onClick={currentForm ? null : addNewCard}>{`${t(
				'ADD_NEW',
			)}${listName}`}</div>
		</Fragment>
	);
};

export default DraggableCardList;
