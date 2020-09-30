import React from 'react';
import { requestGet } from 'Network/requests';
import { getUrl } from 'Network/urls';

import ThemeAreas from './ThemeAreas/ThemeAreas';
import searchThemes from 'Constants/searchThemes';

import IdeasIcon from 'Assets/Ideas.svg';
import voodleLogo from 'Assets/logos/logo_voodle.png';
import './styles.less';

class BestIdeasTopic extends React.Component {
  state = {
    selected: [],
    error: '',
  };

  handleChangeThemeArea = (value) => {
    let themes = this.state.selected;

    if (themes.includes(value)) {
      const index = themes.indexOf(value);
      themes.splice(index, 1);
    } else {
      themes.push(value);
    }

    this.setState({ selected: themes });
  };

  handleContinue = () => {
    const { selected } = this.state;
    const { match, bestIdeas } = this.props;
    const cityname = match.params.cityname || bestIdeas.votingCity;
    this.setState({ error: '' });
    if (selected.length > 0) {
      this.props.handleSetBestIdeaTheme(selected);
      this.props.handleSetVotingCity(cityname);
      window.scrollTo(0, 0);
      this.props.history.push('/beste-ideen-wahl');
    } else {
      this.setState({ error: 'Bitte wählen Sie ein Thema' });
    }
  };

  handleReturnToMainPage = () => {
    this.props.handleSetBestIdeaTheme('');
    this.props.handleSetVotingCity('');
    window.scrollTo(0, 0);
    this.props.history.push('/');
  };

  getVotingUserSession = () => {
    const url = getUrl('get_voting_user_session');

    requestGet(url)
      .then((res) => {
        const response = JSON.parse(res);
        this.props.handleSetVotingUser(response.user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    const { bestIdeas, match } = this.props;
    let cityname = match.params.cityname;
    cityname = cityname == 'Oberhausen' || cityname == 'Bottrop' ? true : false;
    if (cityname || bestIdeas.votingCity !== '') {
      this.getVotingUserSession();
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    const { selected, error } = this.state;
    const { match, bestIdeas } = this.props;
    const cityName = bestIdeas.votingCity || match.params.cityname;

    return (
      <div styleName="choice-box">
        <div styleName="box-circle">
          <div styleName="red-circle">
            <img src={IdeasIcon} />
          </div>
        </div>

        <div styleName="heading">Die besten Ideen für {cityName}</div>

        <div styleName="parent-container">
          <div styleName="left-container">
            <div styleName="header">So funktioniert's:</div>

            <div styleName="step-box">
              <div styleName="circle">
                <span>1</span>
              </div>
              <div styleName="text">
                Wählen Sie aus, für welche Bereiche Sie sich interessieren. Sie stimmen dann nur über Ideen
                dieser Kategorie ab. Sie können auch mehrere Kategorien auswählen oder Ideen in allen
                Bereichen bewerten.
              </div>
            </div>
            <div styleName="step-box">
              <div styleName="circle">
                <span>2</span>
              </div>
              <div styleName="text">
                Wir zeigen Ihnen jeweils zwei Ideen und Sie sollen zwischen diesen beiden entscheiden: Welche
                der gezeigten Ideen ist aus Ihrer Sicht für ganz {cityName} relevanter, hat ein größeres
                Potenzial, umgesetzt zu werden und dient am ehesten dem Allgemeinwohl.
              </div>
            </div>
            <div styleName="step-box">
              <div styleName="circle">
                <span>3</span>
              </div>
              <div styleName="text">
                Bewerten Sie so viele Ideen wie Sie möchten. Wenn Sie sich für keine der beiden Idee
                entscheiden können, überspringen Sie das Paar. Wenn Sie fertig sind, klicken Sie einfach auf
                Voting beenden. Sie können jederzeit ein neues Voting beginnen und zum Beispiel für andere
                Kategorien Ihre Stimme abgeben.
              </div>
            </div>
            <div styleName="step-box">
              <div styleName="circle">
                <span>4</span>
              </div>
              <div styleName="text">
                Mit der Abstimmung tragen Sie dazu bei, dass die Ideen innerhalb der Kategorien nach ihrer
                Relevanz für die Stadt sortiert werden. Anschließend werden wir die wichtigsten Ideen in
                unseren Ideenwerkstätten weiterdiskutieren.
              </div>
            </div>
            <div styleName="bottom-text">
              Klicken Sie auf „Jetzt Ideen bewerten“, um mit der Bewertung der Vorschläge zu beginnen
            </div>
          </div>
          <div styleName="right-container">
            <ThemeAreas selected={selected} handleChangeThemeArea={this.handleChangeThemeArea} />

            <div styleName="continue-button" onClick={this.handleContinue}>
              Jetzt Ideen bewerten
            </div>
            <div styleName="back-button" onClick={this.handleReturnToMainPage}>
              Zurück zur Hauptseite
            </div>

            {/* <div styleName="supported-by">Supported by</div>
            <img src={voodleLogo} alt="" styleName="voodle-logo" /> */}
          </div>
          {error !== '' && <div styleName="error-message">{error}</div>}
        </div>
      </div>
    );
  }
}

export default BestIdeasTopic;
