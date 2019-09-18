// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';
import FilterList from '@material-ui/icons/FilterList';
import Menu from '../menu/Menu';

type PropsT = {
	options: Array<{ key: string, label: string }>,
	action: Function,
	initial?: number,
	label?: boolean,
	customLabelClass?: any,
};

const Filter = ({ options, action, initial, label, customLabelClass }: PropsT) => {
	const [t] = useTranslation('translations');
	const filterOptions = options.map(option => ({
		name: t(option.label),
		action: () => action(option),
	}));
	return (
		<div className={'filter__wrapper'}>
			<Menu
				options={filterOptions}
				icon={<FilterList />}
				showLabel={label !== false}
				rememberSelected
				initial={initial}
				customLabelClass={customLabelClass}
			/>
		</div>
	);
};

export default Filter;
