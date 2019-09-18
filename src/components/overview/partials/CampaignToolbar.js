// @flow

import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import Button from '../../common/button/Button';

type PropsT = {
	text: string,
	darkButton: {
		name: string,
		action: Function,
		disabled?: boolean,
	},
	whiteButton: {
		name: string,
		action: Function,
		disabled?: boolean,
	},
};

const CampaignToolbar = ({ text, darkButton, whiteButton }: PropsT) => {
	return (
		<section>
			<div className="overview-control-bar">
				<div className="overview-control-bar-content">
					<div>
						<InfoIcon className="overview-control-bar-icon" />
						<span>{text}</span>
					</div>
					<div className="overview-control-bar-buttons">
						{darkButton && (
							<Button
								color={'inherit'}
								variant={'outlined'}
								classes={{
									root: 'overview-control-bar-button-action',
									label: 'overview-control-bar-button-action-label',
								}}
								name={darkButton.name}
								disabled={darkButton.disabled}
								onClick={darkButton.action}
							/>
						)}
						{whiteButton && (
							<Button
								color={'inherit'}
								variant={'outlined'}
								classes={{
									root: 'overview-control-bar-button',
									label: 'overview-control-bar-button-label',
								}}
								name={whiteButton.name}
								disabled={whiteButton.disabled}
								onClick={whiteButton.action}
							/>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default CampaignToolbar;
