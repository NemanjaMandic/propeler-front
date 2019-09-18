import * as colors from '../../../styles/modules/colors.scss';

export const baseStyle = gradient => ({
	backgroundImage: `linear-gradient(white, white, white, ${gradient || 'white'})`,
});

export const activeStyle = {
	borderStyle: 'dashed',
	borderColor: colors.green,
	backgroundImage: `linear-gradient(${colors.magnolia}, ${colors.magnolia})`,
};
export const rejectStyle = {
	borderStyle: 'dashed',
	borderColor: colors.red,
	backgroundImage: `linear-gradient(${colors.magnolia}, ${colors.magnolia})`,
};

export const imageCropperStyles = {
	paper: {
		padding: '15px 15px 25px',
		textAlign: 'center',
	},
};
