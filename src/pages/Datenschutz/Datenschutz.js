import React from 'react';
import PageTemplate from 'Components/PageTemplate/PageTemplate';
import Datenschutz from 'Components/Datenschutz/Datenschutz';

import { loadEtrackerScript } from 'Utils/functions';

class DatenschutzPage extends React.Component {
  componentDidMount = () => {
    loadEtrackerScript(() => {
      console.log('Etracker loaded -> Datenschutz');
    });
  };

  render() {
    return (
      <PageTemplate title="Datenschutzerklärung">
        <Datenschutz />
      </PageTemplate>
    );
  }
}

export default DatenschutzPage;
