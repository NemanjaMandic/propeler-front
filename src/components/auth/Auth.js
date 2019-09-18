// @flow

import React, { Suspense, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import {
	LOGIN,
	REGISTER,
	REGISTER_ENTREPRENEUR,
	REGISTER_INVESTOR,
	REGISTER_INVESTOR_TYPE,
	FORGOT_PASSWORD,
	FORGOT_USERNAME,
	CHANGE_PASSWORD,
	AUTH,
	CONFIRM_REGISTRATION,
	CONFIRM_EMAIL_CHANGE,
	TWO_FACTOR_AUTHENTICATION,
} from '../../constants/routes';
import ProtectedRoute from './partials/ProtectedRoute';
import SkeletonSpinner from '../common/spinner/SkeletonSpinner';
import { confirmRegistration } from '../../state/auth/actions';
import { confirmEmailChange } from '../../state/user/profile/actions';

const Login = lazy(() => import('./views/Login'));
const InvestorRegistration = lazy(() => import('./views/investor/InvestorRegistration'));
const Register = lazy(() => import('./views/Register'));
const ForgotPassword = lazy(() => import('./views/ForgotPassword'));
const ForgotUsername = lazy(() => import('./views/ForgotUsername'));
const ChangePassword = lazy(() => import('./views/ChangePassword'));
const ConfirmLink = lazy(() => import('./confirmLink/ConfirmLink'));
const TwoFactorAuthentication = lazy(() => import('./views/TwoFactorAuthentication/TwoFactorAuthentication'));
const PageNotFound = lazy(() => import('../common/pageNotFound/PageNotFound'));

const Auth = () => (
	<Suspense fallback={<SkeletonSpinner />}>
		<Switch>
			<Redirect exact from={AUTH} to={LOGIN} />
			<Route path={LOGIN} render={() => <Login />} />
			<ProtectedRoute auth path={FORGOT_PASSWORD} render={() => <ForgotPassword />} />
			<ProtectedRoute auth path={FORGOT_USERNAME} render={() => <ForgotUsername />} />
			<ProtectedRoute auth path={CHANGE_PASSWORD} render={props => <ChangePassword location={props.location} />} />
			<Route path={REGISTER} exact render={props => <InvestorRegistration {...props} />} />
			<Route path={REGISTER_INVESTOR_TYPE} render={props => <Register {...props} />} />
			<Route path={REGISTER_INVESTOR} exact render={props => <Register {...props} />} />
			<Route path={REGISTER_ENTREPRENEUR} exact render={props => <Register {...props} />} />
			<ConfirmLink path={CONFIRM_REGISTRATION} tokenName={'registrationToken'} action={confirmRegistration} />
			<ConfirmLink path={CONFIRM_EMAIL_CHANGE} tokenName={'emailChangeToken'} action={confirmEmailChange} />
			<ProtectedRoute auth path={TWO_FACTOR_AUTHENTICATION} render={() => <TwoFactorAuthentication />} />
			<Route render={() => <PageNotFound />} />
		</Switch>
	</Suspense>
);

export default Auth;
