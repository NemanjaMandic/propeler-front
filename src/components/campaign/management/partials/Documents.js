// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { setStep } from '../../../../state/campaign/actions';
import Button from '../../../common/button/Button';
import DocumentSection from './DocumentSection';
import { useTranslation } from 'react-i18next';

type PropsT = {
	documents: any,
	setStep: Function,
	step: any,
	companyDoc: any,
	info: any,
	members: any,
	shareHolders: any,
};

const Documents = (props: PropsT) => {
	const {
		documents: { content },
		setStep,
		step,
		companyDoc,
		info,
		members,
		shareHolders,
	} = props;

	{
		/* TODO: check again */
	}
	const readyForSubmit = () => {
		if (!info.topicStatus.overview) {
			return false;
		} else if (!info.topicStatus.problem) {
			return false;
		} else if (!info.topicStatus.solution) {
			return false;
		} else if (!info.topicStatus.market) {
			return false;
		} else if (!info.topicStatus.traction) {
			return false;
		} else if (!info.topicStatus.updates) {
			return false;
		} else if (!info.topicStatus.risk_and_competition) {
			return false;
		} else if (Object.keys(content).length === 0 || companyDoc.length === 0) {
			return false;
		} else if (members.length === 0) {
			return false;
		} else if (shareHolders.length === 0) {
			return false;
		}

		return true;
	};

	const [t] = useTranslation('translations');

	return (
		<Fragment>
			<div className={'campaign__doc'}>
				<DocumentSection companyDoc={companyDoc} campaignDoc={content} />
				<div className={'buttons'}>
					<span onClick={() => setStep(step - 1)}>{t('BACK')}</span>
					<Button
						type={'button'}
						variant={'contained'}
						color={'primary'}
						name={t('SUBMIT_CAMPAIGN')}
						onClick={() => setStep(step + 1)}
						// disabled={!readyForSubmit()}
					/>
				</div>
			</div>
		</Fragment>
	);
};

const mapStateToProps = ({
	campaign: {
		info,
		documents,
		createCampaign: { step },
		team: { members },
	},
	auth: {
		authentication: { userId },
	},
	company: {
		documents: { content: companyDoc },
		shareHolders: { shareHolders },
	},
}) => ({
	info,
	documents,
	step,
	userId,
	companyDoc,
	shareHolders,
	members,
});

export default connect(
	mapStateToProps,
	{ setStep },
)(Documents);
