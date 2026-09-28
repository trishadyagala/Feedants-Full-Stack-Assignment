import React from 'react';
import { ScrollView } from 'react-native';
import CompetitionHeader from '../components/CompetitionHeader';
import CompetitionSummary from '../components/CompetitionSummary';
import ImportantDates from '../components/ImportantDates';
import PreviousWinners from '../components/PreviousWinners';
import InfoTabs from '../components/InfoTabs';
import Rewards from '../components/Rewards';
import RegisterButton from '../components/RegisterButton';

const CompetitionDetailsScreen = ({ route }) => {
  // TODO: fetch competition details by route.params.id
  const competition = {
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    winners: [],
    rewards: [],
    tabs: [],
  };

  return (
    <ScrollView>
      <CompetitionHeader title={competition.title} />
      <CompetitionSummary description={competition.description} />
      <ImportantDates startDate={competition.startDate} endDate={competition.endDate} />
      <InfoTabs tabs={competition.tabs} />
      <PreviousWinners winners={competition.winners} />
      <Rewards rewards={competition.rewards} />
      <RegisterButton onPress={() => {}} />
    </ScrollView>
  );
};

export default CompetitionDetailsScreen;
