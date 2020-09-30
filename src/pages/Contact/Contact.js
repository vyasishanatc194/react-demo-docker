import React from 'react';
import PageTemplate from 'Components/PageTemplate/PageTemplate';
import ContactForm from 'Components/ContactForm/ContactForm';
import { loadEtrackerScript } from 'Utils/functions';

class ContactPage extends React.Component {
  componentDidMount = () => {
    loadEtrackerScript(() => {
      console.log('Etracker loaded -> Contact');
    });
  };

  render() {
    return (
      <PageTemplate title="Kontakt">
        <ContactForm />
      </PageTemplate>
    );
  }
}

export default ContactPage;
