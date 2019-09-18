// @flow

import React from 'react';
import Button from '../../../common/button/Button';

type PropsT = {
	title: string,
	description?: Function,
	buttonTitle?: string,
	buttonAction?: Function,
	buttonClass?: any,
};

const Description = ({ title, description, buttonTitle, buttonAction, buttonClass }: PropsT) => (
	<div className={'dashboard__info'}>
		<div className={'dashboard__title'}>{title} </div>
		{description && <div className={'dashboard__description'}>{description()}</div>}
		{buttonTitle && (
			<div className={'dashboard__button'}>
				<Button
					type={'button'}
					variant={'outlined'}
					color={'primary'}
					name={buttonTitle}
					className={buttonClass}
					onClick={buttonAction}
				/>
			</div>
		)}
	</div>
);

export default Description;
