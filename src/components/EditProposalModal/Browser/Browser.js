import React from 'react';
import Modal from 'react-modal';
import { editThreadWithThreadId } from 'Network/userRequests';
import { requestGet } from 'Network/requests';
import { getUrl } from 'Network/urls';

import TagsInputField from 'Components/shared/TagsInputField/TagsInputField';
import LargeTextBox from 'Components/shared/LargeTextBox/LargeTextBox';
import NormalButton from 'Components/shared/NormalButton/NormalButton';
import DropDownPlain from 'Components/shared/DropDownPlain/DropDownPlain';

import { convertToLowerCase } from 'Utils/functions';
import { checkHashtag } from 'Utils/functions';

import hashtagsList from 'Constants/hashtags.json';
import closeIcon from 'Assets/close-icon-grey.svg';

import './styles.less';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
  },
};

Modal.setAppElement('#root');

class Browser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      content: '',
      topic: 'Bitte wählen',
      hashtags: [],
      error: '',
      disableTagging: true,
      disableButton: false,
    };
  }

  componentDidMount = () => {
    let topicExists = false;
    let topic = 'Bitte wählen';

    for (let i = 0; i < this.props.editProposal.hashtags.length; i++) {
      const tag = this.props.editProposal.hashtags[i];

      for (let j = 0; j < hashtagsList.length; j++) {
        const item = hashtagsList[j];

        if (tag === `#${convertToLowerCase(item)}`) {
          topicExists = true;
          topic = item;

          break;
        }
      }
    }

    let loadedTagsObject = [];

    if (this.props.editProposal.hashtags && this.props.editProposal.hashtags.length > 0) {
      this.props.editProposal.hashtags.map((tag) => {
        const checked = checkHashtag(tag);

        if (`#${convertToLowerCase(topic)}` !== checked) {
          const newTag = { id: checked, text: checked };
          loadedTagsObject.push(newTag);
        }
      });
    }

    this.setState({
      ...this.state,
      subject: this.props.editProposal.subject,
      content: this.props.editProposal.content,
      hashtags: loadedTagsObject,
      id: this.props.editProposal.id,
      disableTagging: !topicExists,
      topic,
    });
  };

  afterOpenModal = () => {
    // console.log("Modal has opened...");
  };

  handleChangeField = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleTopicChangeDropDown = (event) => {
    const { value } = event.target;

    if (value !== 'Bitte wählen') {
      this.setState({
        topic: value,
        disableTagging: false,
      });
    } else if (value === 'Bitte wählen') {
      this.setState({
        topic: value,
        disableTagging: true,
      });
    }
  };

  handleAddTag = (tag) => {
    const { hashtags } = this.state;

    if (tag !== '') {
      let tags = hashtags;
      tags.push(tag);
      this.setState({ hashtags: tags });
    }
  };

  handleDeleteTag = (index) => {
    let tags = this.state.hashtags;
    tags.splice(index, 1);
    this.setState({ hashtags: tags });
  };

  getHashtagsArray = () => {
    const { hashtags } = this.state;
    let hashtagsArray = [];

    for (let key in hashtags) {
      hashtagsArray.push(hashtags[key].text);
    }
    return hashtagsArray;
  };

  handleAcceptButtonClick = (event) => {
    const { subject, content, topic } = this.state;

    const hashtags = this.getHashtagsArray();

    this.setState({ error: '' });

    if (subject === '' || content === '' || topic === 'Bitte wählen' || hashtags.length === 0) {
      this.setState({ error: 'Bitte füllen Sie alle Felder aus' });
    } else {
      this.handleSubmitProposal();
    }
  };

  handleSubmitProposal = (flag) => {
    const { subject, content, topic, id } = this.state;

    this.setState({
      disableButton: true,
    });

    const hashtags = this.getHashtagsArray();
    hashtags.push(`#${topic}`);

    editThreadWithThreadId(subject, content, hashtags, id).then((res) => {
      this.reactivateScroll();
      this.handleCloseButton();
      //this.props.history.push("/profil");
    });
  };

  handleCloseButton = () => {
    this.handleGetUserCreatedThreads();
    this.props.updateVisible(false);
  };

  handleGetUserCreatedThreads = () => {
    return new Promise((resolve, reject) => {
      const url = getUrl('user_created_threads');

      requestGet(url)
        .then((res) => {
          const parsed = JSON.parse(res);
          this.props.handleSaveUserThreads(parsed.threads);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  };

  reactivateScroll = () => {
    document.body.style.height = '';
    document.body.style.overflow = '';
  };

  render() {
    const { editProposal, proposal } = this.props;
    const { subject, content, topic, hashtags, error, disableButton, disableTagging } = this.state;

    const hashtagsOptions = ['Bitte wählen', ...hashtagsList];

    return (
      <Modal
        isOpen={editProposal.visible}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.handleCloseButton}
        style={customStyles}
        contentLabel=""
      >
        <div styleName="proposal-modal">
          <img src={closeIcon} alt="" styleName="close-icon" onClick={this.handleCloseButton} />
          <div styleName="title">Editieren Idee</div>

          <div styleName="subject-field-heading">Kurztitel für Ihre Idee</div>

          <div styleName="subject-field">
            <input
              autoFocus={true}
              styleName="input-field"
              type="text"
              name="subject"
              maxLength={40}
              value={subject}
              onChange={this.handleChangeField}
            />
          </div>
          <div styleName="description-field-heading">Beschreibung</div>
          <div styleName="description-field">
            <LargeTextBox
              rows={5}
              maxLength={3000}
              name="content"
              value={content}
              onChangeMethod={this.handleChangeField}
            />
          </div>

          <div styleName="topic-tags-container">
            <div styleName="topic-container">
              <div styleName="topic-field-heading">Themenbereich</div>
              <div styleName="topic-field">
                <DropDownPlain
                  value={topic}
                  options={hashtagsOptions}
                  onChangeMethod={this.handleTopicChangeDropDown}
                />
              </div>
            </div>
            <div styleName="tags-container">
              <div styleName="tags-field-heading">Tags</div>
              <div styleName="tags-field">
                {!disableTagging ? (
                  <TagsInputField
                    readOnly={disableTagging}
                    tags={hashtags}
                    topHashtags={proposal.topHashtags}
                    handleAddTag={this.handleAddTag}
                    handleDeleteTag={this.handleDeleteTag}
                  />
                ) : (
                  <div styleName="pick-topic">Bitte Themenbereich auswählen</div>
                )}
              </div>
            </div>
          </div>

          <div styleName="error-message">{error}</div>

          <div styleName="button-container">
            <div styleName="button">
              <NormalButton
                disabled={disableButton}
                label="Abschicken"
                onClickMethod={this.handleAcceptButtonClick}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default Browser;
