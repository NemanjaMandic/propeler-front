import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Warning from '@material-ui/icons/Warning';
import { Link } from 'react-router-dom';
import { BASE, USER_DASHBOARD } from '../../../constants/routes';

const ResponseScreen = (props: any) => {
	const [t] = useTranslation('translations');
	const mailto = 'support@realmarket.co';
	return (
		<div style={{ marginTop: 250, marginBottom: 250 }} className="successScreen">
			<h1>
				{props.location.state.success ? (
					<Fragment>
						<CheckCircle style={{ color: '#1CCD77', marginBottom: '3px' }} /> {t('CONGRATS_SCREEN')}
					</Fragment>
				) : (
					<Fragment>
						<Warning style={{ color: '#FA3877', marginBottom: '3px' }} /> {t('SOMETHING_WENT_WRONG')}
					</Fragment>
				)}
			</h1>
			<p>
				{t(props.location.state.info)}
				{!props.location.state.success && (
					<Fragment>
						{t('MORE_INFO')}
						<a className={'upload__link'} href={`mailto:${mailto}`}>
							{' '}
							{t('SUPPORT_SERVICE_SS')}{' '}
						</a>
					</Fragment>
				)}
			</p>

			<p>
				{!props.isAuthenticated ? (
					<Link to={BASE}>{t('BACK_TO_HOME')}</Link>
				) : (
					<Link to={USER_DASHBOARD}>{t('BACK_TO_DASHBOARD')}</Link>
				)}
			</p>
		</div>
	);
};
const mapStateToProps = ({
	auth: {
		authentication: { isAuthenticated },
	},
}) => ({
	isAuthenticated,
});
export default connect(
	mapStateToProps,
	null,
)(ResponseScreen);
