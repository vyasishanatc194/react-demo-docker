import React from 'react';
import { getUrl } from 'Network/urls';
import { requestGet, requestPostJSON } from 'Network/requests';
import { validateEmail } from 'Utils/functions';

import PubTalksDropDown from 'Components/shared/newModal/PubTalksDropDown/PubTalksDropDown';
import TextInputField from 'Components/shared/newModal/TextInputField/TextInputField';
import NormalButton from 'Components/shared/NormalButton/NormalButton';

import './styles.less';

class AddParticipant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pubTalks: {
        Oberhausen: [],
        Bottrop: [],
        Herne: [],
      },
      selectedPubTalk: 0,
      nickname: '',
      email: '',
      error: '',
      message: '',
    };
  }

  handleChangePubTalk = (event) => {
    let value = event.target.value;
    value = parseInt(value, 10);
    this.setState({ selectedPubTalk: value, message: '' });
  };

  handleChangeField = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, message: '' });
  };

  handleClear = () => {
    this.setState({ selectedPubTalk: 0, nickname: '', email: '', error: '', message: '' });
  };

  handleSubmit = () => {
    const { selectedPubTalk, nickname, email } = this.state;
    const emailValid = validateEmail(email);
    this.setState({ error: '', message: '' });

    if (selectedPubTalk === 0) {
      this.setState({ error: 'Bitte wählen Sie ein Kneipengespräch aus.' });
    } else if (!nickname || !email) {
      this.setState({ error: 'Bitte füllen Sie beide Felder aus.' });
    } else if (!emailValid) {
      this.setState({ error: 'Bitte geben Sie eine gültige Email-Adresse ein.' });
    } else {
      this.handleParticipantSubmit();
    }
  };

  parseMessage = (status) => {
    const SUCCESS_MESSAGE = 'User has been added to the list';
    const ALREADY_ON_LIST_ERROR = 'Already on the list';

    const SUCCESS_MESSAGE_RES = 'Teilnehmer wurde erfolgreich gespeichert.';
    const GENERAL_ERROR_RES = 'Ein Fehler ist aufgetreten.';
    const ALREADY_ON_LIST_ERROR_RES = 'Teilnehmer bereits für dieses Kneipengespräch angemeldet.';

    let msg = '';

    switch (status) {
      case SUCCESS_MESSAGE:
        msg = SUCCESS_MESSAGE_RES;
        break;
      case ALREADY_ON_LIST_ERROR:
        msg = ALREADY_ON_LIST_ERROR_RES;
        break;
      default:
        msg = GENERAL_ERROR_RES;
    }
    return msg;
  };

  handleParticipantSubmit = () => {
    const { selectedPubTalk, nickname, email } = this.state;
    const url = getUrl('register_manually');
    const token = localStorage.getItem('jwt');

    const data = JSON.stringify({
      pub_talk_id: selectedPubTalk,
      user: {
        nickname,
        email,
      },
      hashtags: [],
    });

    requestPostJSON(data, url, token)
      .then((res) => {
        const response = JSON.parse(res);
        const message = this.parseMessage(response.status);
        this.setState({ message });
      })
      .catch((err) => {
        console.log(err);
        const response = JSON.parse(err);
        const error = this.parseMessage(response.status);
        this.setState({ error });
      });
  };

  handleGetPubTalks = () => {
    const url = getUrl('get_pub_talks');

    requestGet(url)
      .then((res) => {
        const response = JSON.parse(res);
        this.setState({ pubTalks: { ...response.pub_talks } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    // wait till after authentication check
    setTimeout(() => {
      this.handleGetPubTalks();
    }, 1500);
  }

  render() {
    const { pubTalks, selectedPubTalk, nickname, email, error, message } = this.state;

    return (
      <div styleName="container">
        <div styleName="center-800">
          <div styleName="title">Teilnehmer manuell hinzufügen</div>

          <div styleName="field-heading">Kneipengespräch auswählen*</div>
          <div styleName="field-container">
            <PubTalksDropDown
              placeholder="Bitte auswählen"
              value={selectedPubTalk}
              options={pubTalks}
              onChangeMethod={this.handleChangePubTalk}
            />
          </div>

          <div styleName="field-heading pad-top-sm">Teilnehmer Name*</div>
          <div styleName="field-container">
            <TextInputField
              value={nickname}
              name="nickname"
              placeholder="Name"
              borderColor="dark-grey-border"
              onChangeMethod={this.handleChangeField}
            />
          </div>

          <div styleName="field-heading pad-top-sm">Teilnehmer Email*</div>
          <div styleName="field-container pad-top-sm">
            <TextInputField
              value={email}
              name="email"
              placeholder="Email"
              borderColor="dark-grey-border"
              onChangeMethod={this.handleChangeField}
            />
          </div>

          <div styleName="required-fields">* erforderlich</div>

          <div styleName="message">
            {error && <div styleName="error">{error}</div>}
            {message && <div styleName="success">{message}</div>}
          </div>

          <div styleName="button-container">
            <div styleName="button">
              <NormalButton label="Abschicken" onClickMethod={this.handleSubmit} />
            </div>
            <div styleName="button">
              <NormalButton label="Leeren" onClickMethod={this.handleClear} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddParticipant;
