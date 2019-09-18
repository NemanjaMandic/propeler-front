import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import RMTeam from '../../images/RealMarketTeam.png';
import aboutPropeler from '../../images/aboutPropeler.svg';

const About = () => {
	const [t] = useTranslation('translations');

	return (
		<Fragment>
			<div id="basic_info" className="about">
				<h1>{t('ABOUT_REALMARKET')}</h1>
				<p>{t('ABOUT_INFO')}</p>
			</div>
			<div id="team" className="about_team">
				<h2>{t('MEET_OUR_TEAM')}</h2>
				<p>{t('ABOUT_TEAM')}</p>
				<div className="parent">
					<img className="frontImg" src={RMTeam} />
					<img className="backImg" src={aboutPropeler} />
				</div>
				<h2 style={{ paddingTop: 0 }}>{t('JOIN_US')}</h2>
				<p>
					{t('JOIN_US_INFO')}
					<span>jobs@realmarket.co</span>
				</p>
				<h2 id="contact">{t('CONTACT_US')}</h2>
				<p>
					{t('PHONE_NUMBER_CONTACT')}
					<span>01234567890</span>
					<br />
					{t('E-MAIL')}
					<span>contactus@realmarket.co</span>
					<br />
					<br />
					{t('ADDRESS_RM')}
				</p>
			</div>
		</Fragment>
	);
};

export default About;
