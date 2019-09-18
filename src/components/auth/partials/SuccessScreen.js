// @flow

import React from 'react';
import jumpingGirl from '../../../images/jumpingGirl.svg';

type PropsT = {
	title: string,
	body: string,
	children?: any,
};

const SuccessScreen = (props: PropsT) => {
	const { title, body, children } = props;

	return (
		<div className="successScreen">
			<img src={jumpingGirl} alt="" />
			<h1>{title}</h1>
			<p>{body}</p>
			{children}
		</div>
	);
};

export default SuccessScreen;
