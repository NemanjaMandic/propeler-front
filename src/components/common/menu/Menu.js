// @flow

import React, { PureComponent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

type Option = {
	name: string,
	action: Function,
	actionParam?: any,
	disabled?: boolean,
	id?: any,
};
type PropsT = {
	options: Array<Option>,
	menuStyle?: string,
	icon?: any,
	showLabel?: boolean,
	rememberSelected?: boolean,
	label?: any,
	initial?: number,
	customLabelClass?: any,
	width?: any,
	padding?: boolean,
};
type StateT = {
	anchorEl: boolean | null,
	selectedIndex: number,
};

class LongMenu extends PureComponent<PropsT, StateT> {
	constructor(props: PropsT) {
		super(props);
		this.state = {
			anchorEl: null,
			selectedIndex: props.initial || 0,
		};
	}

	handleClick = (event: any) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = (selectedIndex?: number) => {
		const newState = selectedIndex !== undefined ? { anchorEl: null, selectedIndex } : { anchorEl: null };
		this.setState(newState);
	};

	render() {
		const {
			state: { anchorEl },
			props: { options, menuStyle, icon, showLabel, rememberSelected, label, customLabelClass, width, padding },
		} = this;
		const open = Boolean(anchorEl);

		return (
			<div className={`btn-menu`}>
				{icon && (
					<IconButton
						aria-label="More"
						aria-owns={open ? 'long-menu' : undefined}
						aria-haspopup="true"
						onClick={this.handleClick}
					>
						{icon}
					</IconButton>
				)}
				{label && (
					<span className={'pageNumber'} onClick={this.handleClick}>
						{' '}
						{label}{' '}
					</span>
				)}

				{showLabel && (
					<span className={customLabelClass ? `${customLabelClass} menu__label` : ' menu__label'}>
						{options[this.state.selectedIndex].name}
					</span>
				)}
				<Menu
					className={menuStyle || ''}
					id="long-menu"
					anchorEl={anchorEl}
					getContentAnchorEl={null}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={open}
					onClose={() => this.handleClose()}
					PaperProps={{
						style: {
							width: width || 200,
						},
					}}
				>
					{options.map((option, index) => (
						<MenuItem
							className={padding ? 'menu_item_custom_padding' : 'menu_item'}
							disabled={option.disabled || false}
							key={option.id || option.name}
							selected={rememberSelected && index === this.state.selectedIndex}
							onClick={() => {
								if (option.actionParam) option.action(option.actionParam);
								else option.action();
								this.handleClose(index);
							}}
						>
							{option.name}
						</MenuItem>
					))}
				</Menu>
			</div>
		);
	}
}

export default LongMenu;
