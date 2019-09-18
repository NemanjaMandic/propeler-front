// @flow

import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { parse } from 'qs';
import { redirectToLogin } from '../../../state/auth/actions';

type PropsT = {
	location: {
		search: string,
	},
	action: Function,
	tokenName: string,
	dispatch: Function,
};
const ConfirmLink = (props: PropsT) => {
	const {
		location: { search },
		action,
		tokenName,
		dispatch,
	} = props;
	const query = parse(search, {
		ignoreQueryPrefix: true,
	});
	if (query && query[tokenName]) {
		dispatch(action({ token: query[tokenName] }));
	} else {
		dispatch(redirectToLogin());
	}
	return (
		<div className={'successScreen'}>
			<CircularProgress />
		</div>
	);
};

export default connect(null)(ConfirmLink);
