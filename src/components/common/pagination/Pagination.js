// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Menu from '../menu/Menu';

type PropsT = {
	currentPage: number,
	totalPages: number,
	next: Function,
	previous: Function,
	first: boolean,
	last: boolean,
	actionParams: any,
};

const Pagination = (props: PropsT) => {
	const { currentPage, totalPages, next, previous, first, last, actionParams } = props;

	const [t] = useTranslation('translations');

	const menuOptions = [
		{
			name: t('NEWEST'),
			action: next,
			actionParam: {
				pageNumber: totalPages - 1,
				...actionParams,
				size: actionParams.size || 5,
			},
			disabled: last,
		},
		{
			name: t('OLDEST'),
			action: previous,
			actionParam: { pageNumber: 0, ...actionParams },
			disabled: first,
		},
	];
	return (
		<div className={'pagination'}>
			<Menu options={menuOptions} label={`${currentPage + 1} of ${totalPages}`} />
			<IconButton
				onClick={() =>
					next({
						pageNumber: currentPage - 1,
						...actionParams,
						size: actionParams.size || 5,
					})
				}
				disabled={first}
			>
				<KeyboardArrowLeft className={'icon_class'} />
			</IconButton>
			<IconButton
				onClick={() =>
					previous({
						pageNumber: currentPage + 1,
						...actionParams,
						size: actionParams.size || 5,
					})
				}
				disabled={last}
			>
				<KeyboardArrowRight className={'icon_class'} />
			</IconButton>
		</div>
	);
};
export default Pagination;
