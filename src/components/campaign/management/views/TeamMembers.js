// @flow

import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '../../../common/button/Button';
import DraggableCardList from '../partials/DraggableCardList';
import MemberCardForm from '../partials/MemberCardForm';
import MemberCard from '../partials/MemberCard';
import {
	setMembersPosition,
	addTeamMember,
	deleteTeamMember,
	updateTeamMember,
	reorderTeamMembers,
	setStep,
	uploadMemberPhoto,
	getMemberPhoto,
	deleteMemberPhoto,
} from '../../../../state/campaign/actions';

type PropsT = {
	setMembersPosition: Function,
	addTeamMember: Function,
	deleteTeamMember: Function,
	updateTeamMember: Function,
	reorderTeamMembers: Function,
	uploadMemberPhoto: Function,
	getMemberPhoto: Function,
	deleteMemberPhoto: Function,
	campaignName: string,
	setStep: Function,
	modal: boolean,
	closeModal?: Function,
	team: {
		members: Array<{
			id: number,
			customProfileUrl: string,
			description: string,
			facebookUrl: string,
			linkedinUrl: string,
			name: string,
			title: string,
			twitterUrl: string,
		}>,
	},
	step: number,
};

const TeamMembers = (props: PropsT) => {
	const {
		team: { members },
		campaignName,
		setMembersPosition,
		addTeamMember,
		deleteTeamMember,
		updateTeamMember,
		reorderTeamMembers,
		uploadMemberPhoto,
		getMemberPhoto,
		deleteMemberPhoto,
		setStep,
		step,
		modal,
		closeModal,
	} = props;

	const saveAndContinue = () => {
		reorderTeamMembers({ campaignName, data: members.map(value => value.id) });
		if (!modal) {
			setStep(step + 1);
		}
		if (closeModal) {
			closeModal();
		}
	};

	const [t] = useTranslation('translations');

	return (
		<div className={`draggable-list__container ${modal ? 'edit' : ''}`}>
			<DraggableCardList
				listName={t('TEAM_MEMBER')}
				items={members}
				setPosition={setMembersPosition}
				addItem={div => addTeamMember({ campaignName, data: {}, div })}
				removeItem={memberId => deleteTeamMember({ campaignName, memberId })}
				updateItem={(memberId, data) => updateTeamMember({ campaignName, memberId, data })}
				getPhoto={id => getMemberPhoto({ id, campaignName })}
				uploadPhoto={(id, data) => uploadMemberPhoto({ id, campaignName, data })}
				deletePhoto={id => deleteMemberPhoto({ id, campaignName })}
				CardComponent={MemberCard}
				FormComponent={MemberCardForm}
			/>
			{!modal ? (
				<div className={'cards__buttons'}>
					<span onClick={() => setStep(step - 1)}>{t('BACK')}</span>
					<span className={'skip__step'} onClick={() => setStep(step + 1)}>
						{t('SKIP_THIS_STEP')}
					</span>
					<Button
						type={'button'}
						variant={'contained'}
						color={'primary'}
						name={t('SAVE_AND_CONTINUE')}
						onClick={saveAndContinue}
					/>
				</div>
			) : (
				<div className={'cards__buttons edit draggable'}>
					<Button type={'button'} variant={'outlined'} color={'primary'} name={t('CANCEL')} onClick={closeModal} />
					<Button type={'button'} variant={'contained'} color={'primary'} name={t('SAVE')} onClick={saveAndContinue} />
				</div>
			)}
		</div>
	);
};

const mapStateToProps = ({
	campaign: {
		team,
		info: { urlFriendlyName },
		createCampaign: { step },
	},
}) => ({
	team,
	campaignName: urlFriendlyName,
	step,
});

export default connect(
	mapStateToProps,
	{
		setMembersPosition,
		addTeamMember,
		deleteTeamMember,
		updateTeamMember,
		reorderTeamMembers,
		setStep,
		uploadMemberPhoto,
		getMemberPhoto,
		deleteMemberPhoto,
	},
)(TeamMembers);
