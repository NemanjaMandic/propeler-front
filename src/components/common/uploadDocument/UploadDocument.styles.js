import * as colors from '../../../styles/modules/colors.scss';

export const baseStyle = (gradient, border, borderColor, textColor, width) => ({
	backgroundImage: `linear-gradient(${gradient}, ${gradient})`,
	borderStyle: `${border}`,
	borderColor: `${borderColor}`,
	color: `${textColor}`,
	fontWeight: 600,
	width: `${width}px`,
});

export const activeStyle = {
	borderStyle: 'dashed',
	borderColor: colors.green,
	backgroundImage: `linear-gradient(${colors.magnolia}, ${colors.magnolia})`,
	color: colors.green,
	fontWeight: 600,
};
export const rejectStyle = {
	borderStyle: 'dashed',
	borderColor: colors.red,
	backgroundImage: `linear-gradient(${colors.magnolia}, ${colors.magnolia})`,
	color: colors.red,
	fontWeight: 600,
};
