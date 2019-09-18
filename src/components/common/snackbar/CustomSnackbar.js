//@flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/es/Snackbar/Snackbar';
import CustomSnackbarContent from './CustomSnackbarContent';
import { removeSnackbarOption } from '../../../state/modals/actions';

const CustomSnackbar = ({ snackbar, removeSnackbarOption }) => {
	const close = i => {
		removeSnackbarOption({ key: i });
	};

	return (
		Object.values(snackbar).length > 0 && (
			<Snackbar open anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Fragment>
					{Object.keys(snackbar).map((o, index) => (
						<CustomSnackbarContent
							message={snackbar[o].message}
							variant={snackbar[o].variant}
							key={index}
							onClose={() => close(o)}
							className={'default_snack_bar'}
						/>
					))}
				</Fragment>
			</Snackbar>
		)
	);
};
const mapStateToProps = ({ modals: { snackbar } }) => ({
	snackbar,
});

export default connect(
	mapStateToProps,
	{ removeSnackbarOption },
)(CustomSnackbar);
