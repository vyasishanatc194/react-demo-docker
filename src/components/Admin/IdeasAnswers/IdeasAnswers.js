import React from 'react';
import { formatDateTime } from 'Utils/functions';

import NormalButton from 'Components/shared/NormalButton/NormalButton';
import DropDownBorderSmall from 'Components/shared/DropDownBorderSmall/DropDownBorderSmall';
import FlaggedPost from './FlaggedPost/FlaggedPost';
import FlaggedThread from './FlaggedThread/FlaggedThread';

import { loadEtrackerScript } from 'Utils/functions';

import {
  unflagPostWithPostId,
  unflagThreadWithThreadId,
  hidePostWithPostId,
  hideThreadWithThreadId,
  getFlaggedPosts,
  getFlaggedThreads,
} from 'Network/adminRequests';

import './styles.less';

import { UNFLAG_MESSAGE, DELETE_THREAD_MESSAGE, DELETE_POST_MESSAGE } from 'Constants/messages';

class IdeasAnswers extends React.Component {
  state = {
    flaggedThreads: {},
    flaggedPosts: {},
    threadsFlags: '1',
    postsFlags: '1',
  };

  handleChangeDropDown = (event, field) => {
    const { value } = event.target;
    this.setState({ [field]: value }, () => {
      this.loadFlaggedItems();
    });
  };

  loadFlaggedItems = () => {
    const { auth } = this.props;
    const { threadsFlags, postsFlags } = this.state;
    const token = localStorage.getItem('jwt');

    getFlaggedThreads(threadsFlags,token).then((res) => {
      const flaggedThreads = res.threads;

      getFlaggedPosts(postsFlags,token).then((res) => {
        const flaggedPosts = res.posts;
        this.setState({
          flaggedThreads,
          flaggedPosts,
        });
      });
    });

  };

  handleUnflagPost = (id) => {
    const confirmed = confirm(UNFLAG_MESSAGE);
    const token = localStorage.getItem('jwt');
    if (confirmed) {
      unflagPostWithPostId(id,token).then((res) => {
        this.loadFlaggedItems();
      });
    }
  };

  handleUnflagThread = (id) => {
    const confirmed = confirm(UNFLAG_MESSAGE);
    const token = localStorage.getItem('jwt');
    if (confirmed) {
      unflagThreadWithThreadId(id,token).then((res) => {
        this.loadFlaggedItems();
      });
    }
  };

  handleDeletePost = (id) => {
    const confirmed = confirm(DELETE_POST_MESSAGE);
    const token = localStorage.getItem('jwt');
    if (confirmed) {
      hidePostWithPostId(id,token).then((res) => {
        this.loadFlaggedItems();
      });
    }
  };

  handleDeleteThread = (id) => {
    const confirmed = confirm(DELETE_THREAD_MESSAGE);
    const token = localStorage.getItem('jwt');
    if (confirmed) {
      hideThreadWithThreadId(id,token).then((res) => {
        this.loadFlaggedItems();
      });
    }
  };

  authenticationCheck = () => {
    const { history, location } = this.props;
    const token = localStorage.getItem('jwt');

    if (!token) {
      history.replace({
        pathname: '/admin/login',
        state: { from: location },
      });
    }
  };

  componentDidMount() {
    this.authenticationCheck();
    
    this.setState(()=>{
      this.loadFlaggedItems();
    })
    
    loadEtrackerScript(() => {
      console.log('Etracker loaded -> Admin');
    });
  }

  render() {
    const { auth } = this.props;
    const token = localStorage.getItem('jwt');
    const { flaggedThreads, flaggedPosts, threadsFlags, postsFlags } = this.state;
    const flagOptions = ['1', '2', '3', '5', '10'];

    return (
      <div styleName="admin">
        {token ? (
          <div styleName="body">
            <div styleName="title">Ideen & Antworten regeln</div>

            <h2>Markierte Ideen</h2>

            <div styleName="flags-dropdown">
              <div>Mindestanzahl von Markierungen:</div>
              <DropDownBorderSmall
                placeholder=""
                value={threadsFlags}
                options={flagOptions}
                onChangeMethod={(event) => this.handleChangeDropDown(event, 'threadsFlags')}
              />
            </div>

            <div styleName="flagged-threads-table">
              <table>
                <tbody>
                  <tr>
                    <th>Nr-Flags</th>
                    <th>Titel</th>
                    <th>Inhalt</th>
                    <th>Hashtags</th>
                    <th>Benutzername</th>
                    <th>Datum/Zeit</th>
                    <th colSpan="2">Aktionen</th>
                  </tr>

                  {Object.keys(flaggedThreads) && Object.keys(flaggedThreads).length > 0 ? (
                    Object.values(flaggedThreads).map((item, index) => (
                      <FlaggedThread
                        key={`ft_${index}`}
                        item={item}
                        handleUnflagThread={this.handleUnflagThread}
                        handleDeleteThread={this.handleDeleteThread}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">Keine</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <h2>Markierte Antworten</h2>

            <div styleName="flags-dropdown">
              <div>Mindestanzahl von Markierungen:</div>
              <DropDownBorderSmall
                placeholder=""
                value={postsFlags}
                options={flagOptions}
                onChangeMethod={(event) => this.handleChangeDropDown(event, 'postsFlags')}
              />
            </div>

            <table>
              <tbody>
                <tr>
                  <th>Nr-Flags</th>
                  <th>Inhalt</th>
                  <th>Benutzername</th>
                  <th>Datum/Zeit</th>
                  <th colSpan="2">Aktionen</th>
                </tr>

                {Object.keys(flaggedPosts) && Object.keys(flaggedPosts).length > 0 ? (
                  Object.values(flaggedPosts).map((item, index) => (
                    <FlaggedPost
                      key={`fp_${index}`}
                      item={item}
                      handleUnflagPost={this.handleUnflagPost}
                      handleDeletePost={this.handleDeletePost}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Keine</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div styleName="access-denied">Access denied</div>
        )}
      </div>
    );
  }
}

export default IdeasAnswers;
