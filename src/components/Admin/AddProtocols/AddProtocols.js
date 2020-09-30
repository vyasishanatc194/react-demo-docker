import React from 'react';
import { getUrl } from 'Network/urls';
import { requestGet,requestPut, requestPostJSON } from 'Network/requests';
import { deactivateScroll, reactivateScroll } from 'Utils/functions';

import PubTalksDropDown from 'Components/shared/newModal/PubTalksDropDown/PubTalksDropDown';
import TextBox from 'Components/shared/newModal/TextBox/TextBox';
import NormalButton from 'Components/shared/NormalButton/NormalButton';
import PreviewProtocols from 'Components/Admin/AddProtocols/PreviewProtocols/PreviewProtocols';
import './styles.less';

class AddProtocols extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pubTalks: {
        Oberhausen: [],
        Bottrop: [],
        Herne: [],
      },
      selectedPubTalk: 0,
      protocolcontent: '',
      error: '',
      message:'',
      showPreviewPopup: false,
      editMarkDown:false,
      getPubTalk:false,
    };
  }

  handleTopicChangeLog = (event) => {
    let value = event.target.value;
    value = parseInt(value, 10);
    this.setState({ selectedPubTalk: value ,message:''});
  };

  handleGetPubTalks = () => {
    const url = getUrl('get_pub_talks');

    requestGet(url)
      .then((res) => {
        const response = JSON.parse(res);
        this.setState({ pubTalks: { ...response.pub_talks },getPubTalk:true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChangeField = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value ,message:''});
  };

  handleSubmit = () => {
    const { selectedPubTalk, protocolcontent ,editMarkDown} = this.state;
    this.setState({ error: '',message:'' });
    if (selectedPubTalk === 0 || !protocolcontent) {
      this.setState({ error: 'Bitte füllen Sie beide Felder aus.' });
    } 
    else {
      if(editMarkDown) {
        this.handleEditPubTalkSubmit();
      }
      else {
        this.handlePubTalkSubmit();
     }
    }
  };

  handleEditPubTalkSubmit = () => { 
    const { selectedPubTalk, protocolcontent } = this.state;
    const url = getUrl('edit_protocol');
    const token = localStorage.getItem('jwt');
    const data = JSON.stringify({
      pub_talk_id: `${selectedPubTalk}`,
      markdown_text: protocolcontent,
    });
    requestPut(data, url, token)
    .then((res)=>{
      this.setState({
        message:'Ihr Protokoll wurde erfolgreich aktualisiert',
      });
    })
    .catch((err) => {
      console.log(err)
    });
  };

  handlePubTalkSubmit = () => {
    const { selectedPubTalk, protocolcontent } = this.state;
    const url = getUrl('submit_protocol');
    const token = localStorage.getItem('jwt');
    const data = JSON.stringify({
      pub_talk_id: `${selectedPubTalk}`,
      markdown_text: protocolcontent,
    });

    requestPostJSON(data, url, token)
    .then((res) => {
      this.setState({
        message:'Ihr Protokoll wurde erfolgreich hinzugefügt',
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  handleShowPreviewPopup = () => {
    if (!this.state.protocolcontent) {
      this.setState({ error: 'Füllen Sie bitte das Protokoll aus.' });
    } else {
      this.setState({ showPreviewPopup: true, error: '' });
      deactivateScroll();
    }
  };

  handleClose = () => {
    this.setState({ showPreviewPopup: false });
    reactivateScroll();
  };

  handleGetProtocol = ( ) => {
    const id = this.state.selectedPubTalk;
    if(id !== 0) {
      const baseUrl = getUrl('get_protocol');
      const url = `${baseUrl}=${id}`;
      const token = localStorage.getItem('jwt');
      requestGet(url, token)
        .then((res) => {
          const response = JSON.parse(res);
          this.setState({protocolcontent:response.protocol.markdown_text,editMarkDown:true});
        })
        .catch((err) => {
          this.setState({ protocolcontent:'',editMarkDown:false });
        });
    } 
  }

  componentDidUpdate (prevProps,prevState) {
    if(this.state.getPubTalk === false) {
      this.handleGetPubTalks();
    }
    if(prevState.selectedPubTalk !== this.state.selectedPubTalk) {
      this.handleGetProtocol();
    }
  }

  componentDidMount() {
    this.handleGetPubTalks();
  }
  
  render() {
    const { selectedPubTalk, protocolcontent, error, showPreviewPopup, pubTalks,message } = this.state;
    return (
      <div styleName="container">
        <div styleName="center-800">
          <div styleName="title">Protokoll hinzufügen</div>

          <div styleName="field-label">Kneipengespräch auswählen</div>
          <div styleName="select-field-container">
            <PubTalksDropDown
              placeholder="Bitte auswählen"
              value={selectedPubTalk}
              options={pubTalks}
              onChangeMethod={this.handleTopicChangeLog}
            />
          </div>
          <div styleName="field-label"> Protokoll eintragen</div>
          <div styleName="text-field-container">
            <TextBox
              value={protocolcontent}
              rows={25}
              name="protocolcontent"
              borderColor="dark-grey-border"
              onChangeMethod={this.handleChangeField}
            />
          </div>
          <div styleName='message'>
            {error ? <div styleName="error">{error}</div> : null}
            {message ? <div styleName="success">{message}</div> : null} 
          </div>
          <div styleName="field-row-content">
            <div styleName="field-row">
              <div styleName="field-75" onClick={this.handleShowPreviewPopup}>
                Vorschau
              </div>
              <div styleName="field-25">
                <NormalButton disabled={false} label="Veröffentlichen" onClickMethod={this.handleSubmit} />
              </div>
            </div>
          </div>
        </div>

        {showPreviewPopup && (
          <PreviewProtocols handleClose={this.handleClose} protocolcontent={protocolcontent} />
        )}
      </div>
    );
  }
}

export default AddProtocols;
