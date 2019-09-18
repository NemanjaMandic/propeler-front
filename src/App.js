// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import 'react-notifications/lib/notifications.css';
import Auth from './components/auth/Auth';
import User from './components/user/User';
import Investor from './components/investor/Investor';
import {
	USER,
	AUTH,
	LINK_EXPIRED,
	BASE,
	COMPANY,
	CAMPAIGN,
	OVERVIEW,
	CAMPAIGNS_VIEW,
	INVESTOR,
	ADMIN,
	RAISE_FUNDS,
	INBOX,
	START_INVESTING,
	ABOUT,
	PRIVACY,
	TERMS,
	SECURITY,
	SUCCESS_SCREEN,
	FAILURE_SCREEN,
	LANDING_PAGE,
} from './constants/routes';
import Overview from './components/overview/Overview';
import Campaigns from './components/campaigns/Campaigns';
import './styles/main.scss';
import Header from './components/common/header/Header';
import PageNotFound from './components/common/pageNotFound/PageNotFound';
import LinkExpired from './components/auth/confirmLink/LinkExpired';
import TwoFADialog from './components/2FA/TwoFADialog';
import { theme } from './App.styles';
import RecoveryCodesDialog from './components/2FA/RecoveryCodesDialog';
import Company from './components/company/Company';
import Campaign from './components/campaign/Campaign';
import ConfirmModal from './components/common/confirmModal/ConfirmModal';
import InvestDialog from './components/modals/InvestDialog';
import RejectionNoteDialog from './components/modals/RejectionNoteDialog';
import DocumentDialog from './components/campaign/management/modals/DocumentDialog';
import DocumentPreview from './components/campaign/management/modals/DocumentPreview';
import DocumentDialogUpdate from './components/campaign/management/modals/DocumentDialogUpdate';
import Admin from './components/admin/Admin';
import FundrisingApplication from './components/fundrisingApplication/FundrisingApplication';
import About from './components/landingPage/About';
import FundRaisingAppReview from './components/admin/dashboard/modals/FundRaisingAppReview';
import DocumentSigningDialog from './components/modals/DocumentSigningDialog';
import Inbox from './components/notifications/Inbox';
import ProtectedRoute from './components/auth/partials/ProtectedRoute';
import KYCInternalReview from './components/admin/dashboard/modals/KYCInternalReview';
import UserPreviewDialog from './components/user/dashboard/modals/UserPreviewDialog';
import PaymentConfirmationDialog from './components/admin/dashboard/modals/PaymentConfirmationDialog';
import Footer from './components/landingPage/Footer.js';
import Privacy from './components/landingPage/Privacy.js';
import Terms from './components/landingPage/Terms.js';
import Security from './components/landingPage/Security.js';
import { connectWebSocket } from './state/websockets/actions';
import LandingPage from './components/landingPage/LandingPage';
import GetStarted from './components/landingPage/GetStarted';
import ResponseScreen from './components/common/screens/ResponseScreen';
import { getAllNotifications, getNumberOfUnseenNotifications, receivedNotification } from './state/inbox/actions';
import { getKYCNotification } from './state/user/profile/actions';
import { getPlatformSettings } from './state/auth/actions';
import * as notificationType from './constants/notificationType';
import { getReqDocumentNotification } from './state/campaign/actions';
import { ROLE_ADMIN } from './constants/roles';
import CloseCampaignDialog from './components/admin/dashboard/modals/CloseCampaignDialog';

type PropsT = {
	history: any,
	connectWebSocket: Function,
	receivedNotification: Function,
	userId: number,
	getNumberOfUnseenNotifications: Function,
	getAllNotifications: Function,
	getKYCNotification: Function,
	getReqDocumentNotification: Function,
	role: string,
	getPlatformSettings: Function,
};

const App = (props: PropsT) => {
	const {
		history,
		receivedNotification,
		connectWebSocket,
		userId,
		getNumberOfUnseenNotifications,
		getAllNotifications,
		getKYCNotification,
		getReqDocumentNotification,
		role,
		getPlatformSettings,
	} = props;

	const onNotificationReceived = response => {
		if (response) {
			const notification = JSON.parse(response.body);
			receivedNotification(notification);

			if (notification.type === notificationType.KYC_APPROVAL || notification.type === notificationType.KYC_REJECTION)
				getKYCNotification(notification.type);

			if (
				notification.type === notificationType.ACCEPT_DOCUMENTS ||
				notification.type === notificationType.REJECT_DOCUMENTS
			)
				getReqDocumentNotification(notificationType.requestDocumentStatus.get(notification.type));
		}
	};

	useEffect(() => {
		if (userId) {
			connectWebSocket({ userId, callback: onNotificationReceived });
			getNumberOfUnseenNotifications();
			getAllNotifications({ pageNumber: 0, filter: null, size: 10 });
		}
	}, [userId]);

	useEffect(() => {
		getPlatformSettings();
	}, []);

	return (
		<MuiThemeProvider theme={theme}>
			<div className={'app-container'}>
				<Header location={history.location} />
				<Switch>
					<Route path={AUTH} component={Auth} />
					<Route path={ADMIN} component={Admin} />
					<Route path={USER} component={User} />
					<Route path={INVESTOR} component={Investor} />
					<Route path={COMPANY} component={Company} />
					<Route path={OVERVIEW} component={Overview} />
					<Route path={CAMPAIGN} component={Campaign} />
					<Route path={CAMPAIGNS_VIEW} component={Campaigns} />
					<Route path={RAISE_FUNDS} component={FundrisingApplication} />
					<Route path={ABOUT} component={About} />
					<Route path={PRIVACY} component={Privacy} />
					<Route path={TERMS} component={Terms} />
					<Route path={SECURITY} component={Security} />
					<ProtectedRoute path={INBOX} component={Inbox} />
					<Route path={START_INVESTING} component={GetStarted} />
					<Route path={LINK_EXPIRED} component={LinkExpired} />
					<Route path={LANDING_PAGE} component={LandingPage} />
					<Redirect exact from={`(${BASE}|/)`} to={LANDING_PAGE} />
					<Route path={SUCCESS_SCREEN} render={props => <ResponseScreen {...props} />} />
					<Route path={FAILURE_SCREEN} render={props => <ResponseScreen {...props} />} />
					<Redirect exact from={`(${BASE}|/)`} to={BASE} />
					<Route component={PageNotFound} />
				</Switch>

				<TwoFADialog />

				{userId && (
					<>
						<NotificationContainer />
						<RecoveryCodesDialog />
						<ConfirmModal />
						<RejectionNoteDialog />
						<InvestDialog />
						<DocumentDialog />
						<DocumentPreview />
						<DocumentDialogUpdate />
						<FundRaisingAppReview />
						<DocumentSigningDialog />
						<KYCInternalReview />
						<UserPreviewDialog />
						<PaymentConfirmationDialog />
					</>
				)}
				{userId && role === ROLE_ADMIN && (
					<>
						<CloseCampaignDialog />
					</>
				)}
				<Footer />
			</div>
		</MuiThemeProvider>
	);
};

const mapStateToProps = ({
	auth: {
		authentication: { userId, role },
	},
	webSockets,
}) => ({
	userId,
	webSockets,
	role,
});
export default withRouter(
	connect(
		mapStateToProps,
		{
			connectWebSocket,
			receivedNotification,
			getAllNotifications,
			getNumberOfUnseenNotifications,
			getKYCNotification,
			getReqDocumentNotification,
			getPlatformSettings,
		},
	)(App),
);
