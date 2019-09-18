// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Badge from '@material-ui/core/Badge';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import Menu from '../menu/Menu';
import rmLogo from '../../../images/rm-logo.svg';
import * as routes from '../../../constants/routes';
import { logoutUser } from '../../../state/auth/actions';
import Button from '../button/Button';
import { history } from '../../../store/configureStore';
import { ROLE_ENTREPRENEUR } from '../../../constants/roles';
import { openCampaignOverview } from '../../../state/campaign/actions';
import { renderTime } from '../../../utilities/notificationUtils';
import { setCurrentMessage, markNotificationAsRead } from '../../../state/inbox/actions';

type PropsT = {
	logoutUser: Function,
	isAuthenticated: boolean,
	profilePhoto: Object,
	location: any,
	role: string,
	campaignInfo: Object,
	companyInfo: Object,
	openCampaignOverview: Function,
	unread: number,
	listOfNotifications: any,
	setCurrentMessage: Function,
	markNotificationAsRead: Function,
};

const activeStyle = { fontWeight: 'bold' };

const Header = (props: PropsT) => {
	const {
		isAuthenticated,
		logoutUser,
		profilePhoto: { fileDto },
		location,
		role,
		campaignInfo,
		companyInfo,
		openCampaignOverview,
		unread,
		listOfNotifications,
		setCurrentMessage,
		markNotificationAsRead,
	} = props;
	const imageSrc = fileDto ? fileDto.file : null;
	const [t] = useTranslation('translations');

	const menuAction = route => {
		history.push(route);
	};
	const menuOptions = [
		{
			name: t('PROFILE_SL'),
			action: menuAction,
			actionParam: routes.USER_PROFILE,
		},
		{
			name: t('DASHBOARD_SL'),
			action: menuAction,
			actionParam: routes.USER_DASHBOARD,
		},
		{ name: t('LOG_OUT'), action: logoutUser, actionParam: null },
	];

	const buttonAction = (route: any) => {
		if (route) {
			history.push(route);
		} else {
			openCampaignOverview({ open: true, hash: location.hash });
		}
	};

	const renderButton = () => {
		let name = '';
		let show = false;
		let route = '';

		if (location.pathname === routes.CAMPAIGN) {
			show = true;
			name = 'PREVIEW';
			route = null;
		} else if (!campaignInfo.exists) {
			show = !campaignInfo.inProgress;
			if (companyInfo.name) {
				name = 'START_CREATING_CAMPAIGN';
				route = routes.CAMPAIGN;
			} else {
				name = 'REGISTER_COMPANY';
				route = routes.COMPANY;
			}
		}

		return (
			<Fragment>
				{role === ROLE_ENTREPRENEUR && show && (
					<Button
						name={t(name)}
						variant={'outlined'}
						color={'primary'}
						className={name === 'PREVIEW' ? 'preview_btn' : 'reg_company_btn'}
						onClick={() => buttonAction(route)}
					/>
				)}
			</Fragment>
		);
	};

	const notificationAction = notification => {
		if (!notification.seen) {
			markNotificationAsRead(notification.id);
		}
		setCurrentMessage(notification);
		history.push(routes.INBOX);
	};

	const renderNotificationDropdown = () => {
		if (listOfNotifications.length > 5) listOfNotifications.slice(0, 4);

		const notificationDropdownOptions = [];
		listOfNotifications.forEach(notification => {
			const option = {
				name: (
					<div className={notification.seen ? 'notification_menu_option' : 'notification_menu_option_unread'}>
						<span>{notification.title}</span>
						<span>{renderTime(notification.date)}</span>
					</div>
				),
				action: notificationAction,
				actionParam: notification,
				id: notification.id,
			};

			notificationDropdownOptions.push(option);
		});

		if (listOfNotifications.length === 0) {
			notificationDropdownOptions.push({
				name: <div className={'no_notifications'}>{t('INBOX_EMPTY')}</div>,
				action: console.log,
				actionParam: null,
				id: t('INBOX_EMPTY'),
			});
		}
		notificationDropdownOptions.push({
			name: <div className={'notification_menu_see_all'}>{t('SEE_ALL')}</div>,
			action: menuAction,
			actionParam: routes.INBOX,
			id: t('SEE_ALL'),
		});

		return (
			<Menu
				width={400}
				options={notificationDropdownOptions}
				padding
				menuStyle={'custom_menu'}
				icon={
					unread > 0 ? (
						<Badge badgeContent={unread} invisible={false}>
							<ChatBubbleOutline className={'badge_icon'} />
						</Badge>
					) : (
						<ChatBubbleOutline className={'badge_icon'} />
					)
				}
			/>
		);
	};

	return (
		<div className={`header`}>
			<div className={'header__title'}>
				<NavLink to={routes.BASE}>
					<img src={rmLogo} alt={'RealMarket Logo'} />
				</NavLink>
			</div>
			<div className={`header__items`}>
				<div className={`header__navs`}>
					<NavLink to={routes.CAMPAIGNS_VIEW} activeStyle={activeStyle} className={`nav`}>
						{t('START_INVESTING')}
					</NavLink>
					{!isAuthenticated && (
						<NavLink to={routes.RAISE_FUNDS} activeStyle={activeStyle} className={`nav`}>
							{t('RAISE_FUNDS')}
						</NavLink>
					)}
					<NavLink to={routes.ABOUT} activeStyle={activeStyle} className={`nav`}>
						{t('ABOUT')}
					</NavLink>
					{/*<NavLink to={routes.FAQ} activeStyle={activeStyle} className={`nav`}>*/}
					{/*{t("FAQ")}*/}
					{/*</NavLink>*/}
				</div>
				{isAuthenticated ? (
					<div className={'header__menu'}>
						{renderButton()}
						<div className={`header__menu--dropdown margin-left-10`}>{renderNotificationDropdown()}</div>
						<div className={`header__menu--dropdown`}>
							<Menu options={menuOptions} icon={<ArrowDropDownIcon className={`menu-icon`} />} />
						</div>
						<div className={`header__menu--avatar`}>
							{imageSrc && (
								<img
									src={`data:image/jpeg;base64,${imageSrc}`}
									className={`header__menu--avatar--icon`}
									alt={'profile'}
								/>
							)}
						</div>
					</div>
				) : (
					<div className={'auth_buttons'}>
						<Button
							name={t('LOGIN')}
							variant={'outlined'}
							color={'primary'}
							className={'preview_btn'}
							onClick={() => history.push(routes.LOGIN)}
						/>
						<Button
							name={t('REGISTER')}
							variant={'contained'}
							color={'primary'}
							onClick={() => history.push(routes.START_INVESTING)}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = ({
	auth: {
		authentication: { isAuthenticated, role },
	},
	user,
	campaign,
	company,
	inbox: {
		getAllNotifications: { notifications, unread },
	},
}) => ({
	isAuthenticated,
	role,
	profilePhoto: user.profile.getProfilePhoto,
	campaignInfo: campaign.activeCampaign,
	companyInfo: company.info,
	unread,
	listOfNotifications: notifications.content,
});

export default connect(
	mapStateToProps,
	{
		logoutUser,
		openCampaignOverview,
		setCurrentMessage,
		markNotificationAsRead,
	},
)(Header);
