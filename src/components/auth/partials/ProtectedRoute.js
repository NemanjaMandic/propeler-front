// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { LOGIN, USER, INVESTOR, ADMIN, CAMPAIGNS_VIEW } from '../../../constants/routes';
import {
	ROLE_ADMIN,
	ROLE_ENTREPRENEUR,
	ROLE_INDIVIDUAL_INVESTOR,
	ROLE_CORPORATE_INVESTOR,
} from '../../../constants/roles';

type PropsT = {
	isAuthenticated: boolean,
	path: string,
	auth: boolean,
	role: string,
	type?: string,
};

const getPath = role => {
	switch (role) {
		case ROLE_ENTREPRENEUR:
			return USER;
		case ROLE_INDIVIDUAL_INVESTOR:
		case ROLE_CORPORATE_INVESTOR:
			return INVESTOR;
		case ROLE_ADMIN:
			return ADMIN;
		default:
			return CAMPAIGNS_VIEW;
	}
};

const ProtectedRoute = ({ isAuthenticated, auth, type, role, ...rest }: PropsT) => {
	if (isAuthenticated && (auth || (type && type !== role))) {
		return (
			<Redirect
				to={{
					pathname: getPath(role),
					state: { from: rest.path },
				}}
			/>
		);
	}
	if (!isAuthenticated && !auth) {
		return (
			<Redirect
				to={{
					pathname: LOGIN,
					state: { from: rest.path },
				}}
			/>
		);
	}
	return <Route {...rest} />;
};

const mapStateToProps = ({
	auth: {
		authentication: { isAuthenticated, role },
	},
}) => ({
	isAuthenticated,
	role,
});

export default connect(
	mapStateToProps,
	{},
)(ProtectedRoute);
