// @flow

import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { chunk } from 'lodash';
import Print from '@material-ui/icons/Print';

type PropsT = {
	wildcards: Array<string>,
	step?: boolean,
};

const Step3 = ({ wildcards, step }: PropsT) => {
	const arrayWildcards = chunk(wildcards, 5);
	const [t] = useTranslation('translations');
	return (
		<Fragment>
			{step && <p>{t('STEP3')}</p>}
			<div className={'recovery-codes__print'}>
				<h2>{t('REALMARKET_RECOVERY_CODE')}</h2>
				<p>
					{t('IMPORTANT-STEP3_1')}
					<br />
					{t('IMPORTANT-STEP3_2')}
					<a target="_blank" rel="noopener noreferrer" href="mailto:support@realmarket.io">
						{t('SUPPORT_SERVICE')}
					</a>
					<span className={'recovery-codes__print-email'}>{` at support@realmarket.io`}</span>.
				</p>
				<div className="two-factor--step3_keys">
					{arrayWildcards.map(w => (
						<div key={w} className="two-factor--step3_keys__content">
							{w.map(a => (
								<div key={a}>{a}</div>
							))}
						</div>
					))}
				</div>
			</div>
			<div className="two-factor--step3_recover">
				<div>
					<Print />
					<span className="upload__link" onClick={() => window.print()}>
						{t('PRINT_RECOVERY_CODES')}
					</span>
				</div>
			</div>
			{step && <p>{t('ALL_SET')}</p>}
		</Fragment>
	);
};

export default Step3;
