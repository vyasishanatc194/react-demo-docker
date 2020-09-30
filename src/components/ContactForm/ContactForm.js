import React from 'react';
import { getUrl } from 'Network/urls';
import { validateEmail } from 'Utils/functions';
import { requestPostJSON } from 'Network/requests';
import './styles.less';

import TextInputField from 'Components/shared/newModal/TextInputField/TextInputField';
import TextBox from 'Components/shared/newModal/TextBox/TextBox';
import CheckBoxDataProtect from 'Components/shared/newModal/CheckBoxDataProtect/CheckBoxDataProtect';
import NormalButton from 'Components/shared/NormalButton/NormalButton';

const PRODUCTION_URL = process.env.PRODUCTION_URL;

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      error: '',
      success: false,
    };
  }

  handleChangeField = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  isFormValid = () => {
    const { name, email, message } = this.state;
    let isValid = true;
    let error = '';

    if (!name || !message) {
      error += 'Bitte füllen Sie alle Felder aus. ';
    }
    if (!email || !validateEmail(email)) {
      error += 'Geben Sie eine gültige E-Mail-Adresse ein. ';
    }

    if (error !== '') {
      isValid = false;
      this.setState({ error });
    }

    return isValid;
  };

  handleCheckForm = () => {
    this.setState({
      error: '',
      success: false,
    });

    const isValid = this.isFormValid();

    if (isValid) this.handleSubmitForm();
  };

  handleSubmitForm = () => {
    const { name, email, message } = this.state;
    const url = getUrl('support_contact');

    const data = JSON.stringify({
      name,
      email,
      message,
    });

    requestPostJSON(data, url, '')
      .then((res) => {
        console.log(res);
        this.setState({ name: '', email: '', message: '', success: true });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: 'Die Nachricht wurde nicht zugestellt. Bitte versuchen Sie es nochmals.' });
      });
  };

  render() {
    const { name, email, message, error, success } = this.state;

    return (
      <div styleName="container">
        <div styleName="content">
          <div styleName="title">Schreiben Sie uns</div>
          <div styleName="field-heading pad-top-sm">Name*</div>
          <div styleName="field-container">
            <TextInputField
              value={name}
              name="name"
              placeholder="Name"
              borderColor="dark-grey-border"
              onChangeMethod={this.handleChangeField}
            />
          </div>

          <div styleName="field-heading pad-top-sm">Email*</div>
          <div styleName="field-container pad-top-sm">
            <TextInputField
              value={email}
              name="email"
              placeholder="Email"
              borderColor="dark-grey-border"
              onChangeMethod={this.handleChangeField}
            />
          </div>

          <div styleName="field-heading pad-top-sm">Ihre Nachricht*</div>
          <div styleName="field-container pad-top-sm">
            <TextBox
              rows={6}
              name="message"
              value={message}
              maxLength={2000}
              borderColor="light-grey-border"
              onChangeMethod={this.handleChangeField}
            />
          </div>

          <div styleName="required-fields">* erforderlich</div>

          <div styleName="bottom-message">
            Durch Abschicken des Formulars bestätigen Sie ihr Einverständnis mit der{' '}
            <span styleName="link" onClick={() => window.open(`${PRODUCTION_URL}/datenschutz`)}>
              Datenschutzerklärung
            </span>{' '}
            von <span styleName="italic">Ruhrgebiet Besser Machen</span>.
          </div>

          <div styleName="message">
            <div styleName="error">{error}</div>
            {success && <div styleName="success">Ihre Nachricht wurde erfolgreich zugestellt</div>}
          </div>

          <div styleName="button-container">
            <div styleName="button">
              <NormalButton label="Abschicken" onClickMethod={this.handleCheckForm} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactForm;
