import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import * as routes from '../../constants/routes';
import facebook from '../../images/facebook.svg';
import twitter from '../../images/twitter.svg';
import youtube from '../../images/youtube.svg';
import linkedIn from '../../images/linkedIn.svg';

const activeStyle = { fontWeight: 600 };

const Footer = () => {
	const [t] = useTranslation('translations');

	return (
		<footer>
			<div className="footer_menu">
				<ul className="footer_navigation">
					<li>
						<span>{t('COMPANY_LC')}</span>
					</li>
					<br />
					<li>
						<NavHashLink className="nav" to={`${routes.ABOUT}#basic_info`}>
							{t('ABOUT')}
						</NavHashLink>
					</li>
					<li>
						<NavHashLink className="nav" to={`${routes.ABOUT}#team`}>
							{t('TEAM')}
						</NavHashLink>
					</li>
					<li>
						<NavHashLink className="nav" to={`${routes.ABOUT}#contact`}>
							{t('CONTACT')}
						</NavHashLink>
					</li>
				</ul>

				<ul className="footer_navigation">
					<li>
						<span>{t('GET_STARTED')}</span>
					</li>
					<br />
					<li>
						<NavLink className="nav" to={routes.REGISTER} activeStyle={activeStyle}>
							{t('START_INVESTING')}
						</NavLink>
					</li>
					<li>
						<NavHashLink className="nav" to={`${routes.RAISE_FUNDS}#top`} activeStyle={activeStyle}>
							{t('RAISE_FUNDS')}
						</NavHashLink>
					</li>
				</ul>

				<ul className="footer_navigation">
					<li>
						<span>{t('LEGAL_LP')}</span>
					</li>
					<br />
					<li>
						<NavLink className="nav" activeStyle={activeStyle} to={routes.PRIVACY}>
							{t('PRIVACY')}
						</NavLink>
					</li>
					<li>
						<NavLink className="nav" activeStyle={activeStyle} to={routes.TERMS}>
							{t('TERMS_OF_SERVICE')}
						</NavLink>
					</li>
					<li>
						<NavLink className="nav" to={routes.SECURITY} activeStyle={activeStyle}>
							{t('SECURITY')}
						</NavLink>
					</li>
				</ul>

				<ul className="footer_social">
					<span>{t('CONNECT')}</span>
					<br />
					<br />
					<img src={facebook} alt="" />
					<img src={twitter} alt="" />
					<img src={youtube} alt="" />
					<img src={linkedIn} alt="" />
				</ul>
			</div>
			<div className="footer_info">
				<hr />
				<p>
					{t('FOOTER_TEXT1')}
					<br />
					<br />
					{t('FOOTER_TEXT2')}
					<br />
					<span>{t('COPYRIGHT')}</span>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
