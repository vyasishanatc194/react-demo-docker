import React from 'react';
import PageTemplate from 'Components/PageTemplate/PageTemplate';
import AboutProject from 'Components/AboutProject/AboutProject';
import { loadEtrackerScript } from 'Utils/functions';

class AboutProjectPage extends React.Component {
  componentDidMount = () => {
    loadEtrackerScript(() => {
      console.log('Etracker loaded -> About project');
    });
  };

  render() {
    return (
      <PageTemplate title="Über das Projekt">
        <AboutProject />
      </PageTemplate>
    );
  }
}

export default AboutProjectPage;
