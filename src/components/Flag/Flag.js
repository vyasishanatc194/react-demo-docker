import React from 'react';
import { FLAG_CONFIRMATION } from 'Constants/messages';
import FlagIcon from 'Assets/flag-icon-grey.svg';
import './styles.less';

class Flag extends React.Component {
  constructor(props) {
    super(props);
    this.enabled = true;
  }

  setMinuteTimeout = () => {
    const time = 60000; // 60 secs.

    if (this.enabled) {
      this.enabled = false;
      console.log('Flagging is disabled');
    }

    setTimeout(() => {
      this.enabled = true;
      console.log('Flagging is re-enabled');
    }, time);
  };

  handleFlag = (event) => {
    event.preventDefault();

    if (this.enabled) {
      const confirmed = confirm(FLAG_CONFIRMATION);

      if (confirmed) {
        console.log('Flagging item');
        this.props.onClickMethod();
        this.setMinuteTimeout();
      }
    }
  };

  render() {
    return (
      <div styleName="flag" onClick={this.handleFlag}>
        <img src={FlagIcon} alt="" />
      </div>
    );
  }
}

export default Flag;
