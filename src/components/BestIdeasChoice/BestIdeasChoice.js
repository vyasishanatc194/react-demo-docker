import React from 'react';
import { requestPost, requestPostJSON } from 'Network/requests';
import { getUrl } from 'Network/urls';
import { getCategory } from 'Utils/functions';
import { LOADING_MESSAGE } from 'Constants/messages';

import UserSuggestionBox from './UserSuggestionBox/UserSuggestionBox';
import searchThemes from 'Constants/searchThemes';

import IdeasIcon from 'Assets/Ideas.svg';
import voodleLogo from 'Assets/logos/logo_voodle.png';
import './styles.less';

class BestIdeasChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: '',
      data: {},
      pause: false,
    };

    this.pausing;
  }

  handleReturn = (url) => {
    clearTimeout(this.pausing);
    this.props.handleSetBestIdeaTheme('');
    window.scrollTo(0, 0);
    this.props.history.push(url);
  };

  jumpAhead = () => {
    const { pause } = this.state;

    if (!pause) {
      this.setPause();
      this.getVotingChoices();
    }
  };

  getVotingChoices = () => {
    const { bestIdeas } = this.props;
    let hashed = [];

    for (let i = 0; i < bestIdeas.theme.length; i++) {
      hashed.push(getCategory(bestIdeas.theme[i]));
    }

    const data = JSON.stringify({ category: hashed, city: bestIdeas.votingCity });
    const url = getUrl('get_voting_choices');
    requestPostJSON(data, url, '')
      .then((res) => {
        const parsed = JSON.parse(res);
        this.setState({ loaded: parsed.status, data: parsed.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setVotingChoice = (threadId) => {
    const { pause } = this.state;
    const { bestIdeas } = this.props;

    if (!pause) {
      this.setPause();

      const data = JSON.stringify({
        id: this.state.data.id,
        thread_chosen: threadId,
        user_id: bestIdeas.votingUser,
      });
      const url = getUrl('send_voting_choice');

      requestPost(data, url)
        .then((res) => {
          this.getVotingChoices();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  setPause = () => {
    this.setState({ pause: true });

    this.pausing = setTimeout(() => {
      this.setState({ pause: false });
    }, 2000);
  };

  componentDidMount() {
    const { bestIdeas, history } = this.props;

    if (bestIdeas.theme.length === 0) {
      history.push('/beste-ideen-thema');
    } else {
      this.getVotingChoices();
    }
  }

  componentWillUnmout() {
    clearTimeout(this.pausing);
  }

  render() {
    const { bestIdeas } = this.props;
    const { loaded, data, pause } = this.state;

    const selectedTheme =
      Object.keys(data).length > 0 && data.category
        ? searchThemes.find((item) => getCategory(item.value) === data.category)
        : {};

    return (
      <div styleName="choice-box">
        <div styleName="box-circle">
          <div styleName="red-circle">
            <img src={IdeasIcon} />
          </div>
        </div>

        <div styleName="heading">Welcher Vorschlag macht {bestIdeas.votingCity} besser?</div>

        {Object.keys(data).length > 0 && loaded === 'success' && (
          <div styleName="directions">
            Klicken Sie <span>direkt auf den Vorschlag</span>, der aus Ihrer Sicht das höchste Potential hat,{' '}
            {bestIdeas.votingCity} besser zu machen.
          </div>
        )}

        {selectedTheme && Object.keys(selectedTheme).length > 0 && (
          <div styleName="button-row">
            <div styleName="button">
              <div styleName="theme">
                <img src={selectedTheme.icon2} alt="" />
                <div styleName="label">{selectedTheme.value}</div>
              </div>
            </div>
          </div>
        )}

        {Object.keys(data).length > 0 && loaded === 'success' && (
          <div styleName="suggestions-container">
            <UserSuggestionBox
              key="thread1"
              item={data.thread1}
              handleVoteForSuggestion={this.setVotingChoice}
              style={pause ? 'wait' : 'pointer'}
            />

            <div styleName="box-space" />

            <UserSuggestionBox
              key="thread2"
              item={data.thread2}
              handleVoteForSuggestion={this.setVotingChoice}
              style={pause ? 'wait' : 'pointer'}
            />
          </div>
        )}

        {Object.keys(data).length === 0 && loaded === 'success' && (
          <div styleName="no-suggestions">
            Es gibt keine Ideen.
            <br />
            Bitte wählen Sie andere Themenbereiche.
          </div>
        )}

        {loaded !== 'success' && <div styleName="no-suggestions">{LOADING_MESSAGE}</div>}

        <div styleName="buttons">
          {/* <div styleName="themes button" onClick={() => this.handleReturn('/beste-ideen-thema')}>
            <div>Themenübersicht</div>
          </div> */}
          <div
            styleName="themes button"
            onClick={() => this.handleReturn(`/voting_trial/${this.props.bestIdeas.votingCity}`)}
          >
            <div>Themenübersicht</div>
          </div>

          {Object.keys(data).length > 0 && loaded === 'success' && (
            <div styleName="jump button" onClick={this.jumpAhead}>
              <div>Überspringen</div>
            </div>
          )}

          <div styleName="back button" onClick={() => this.handleReturn('/')}>
            Voting beenden
          </div>
        </div>
        {/* <div styleName="supported-by">Supported by</div>

        <img src={voodleLogo} alt="" styleName="voodle-logo" /> */}
      </div>
    );
  }
}

export default BestIdeasChoice;
