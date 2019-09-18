// @flow

import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonSpinner = () => (
	<div className={'skeleton-spinner'}>
		<div className={'skeleton-spinner__title'}>
			<Skeleton width={600} height={60} />
		</div>
		<div className={'skeleton-spinner__content'}>
			<Skeleton height={32} count={8} />
		</div>
	</div>
);

export default SkeletonSpinner;
