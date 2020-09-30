import React from 'react';
import { requestGet, requestPost } from 'Network/requests';
import { getUrl } from 'Network/urls';

import { LOADING_THREADS, NO_THREADS_MESSAGE, LOAD_MORE_ENTRIES } from 'Constants/messages';
import IdeaBox from 'Components/IdeaBox/IdeaBox';

import './styles.less';

class AllUserIdeas extends React.Component {
  handleOpenProConModal = (id) => {
    const { handleToggleProConModal } = this.props;

    this.handleGetThread(id)
      .then((res) => {
        handleToggleProConModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTotalThreadsNumber = () => {
    return new Promise((resolve, reject) => {
      const url = getUrl('total_num_threads');

      requestGet(url)
        .then((res) => {
          const { thread_count } = JSON.parse(res);
          this.props.handleUpdateTotalThreads(thread_count);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  };

  getLatestUserIdeas = () => {
    return new Promise((resolve, reject) => {
      const { city } = this.props.map;

      const data = JSON.stringify({
        sort_by: 'latest',
        hashtags: [],
        city,
        search_text: '',
      });

      const url = getUrl('load_sorted_threads');

      requestPost(data, url)
        .then((res) => {
          const parsed = JSON.parse(res);
          this.props.handleSaveSearchedThreads(parsed.threads);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  };

  handleGetThread = (id) => {
    const { handleAddThreadInfoProConModal } = this.props;

    return new Promise((resolve, reject) => {
      const urlPath = getUrl('load_thread');
      const url = `${urlPath}?id=${id}`;

      requestGet(url)
        .then((res) => {
          const parsed = JSON.parse(res);
          handleAddThreadInfoProConModal(parsed.thread);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  };

  handleClickShowMore = () => {
    const { showThreads } = this.props.searched;
    const newNumber = showThreads + 9;
    this.props.handleChangeShowThreads(newNumber);
  };

  makeAllRequests = () => {
    this.getLatestUserIdeas().then((res) => {
      this.getTotalThreadsNumber().then((res) => {
        console.log('All requests finished');
      });
    });
  };

  componentDidMount() {
    this.makeAllRequests();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.map.city !== this.props.map.city) {
      this.makeAllRequests();
    }
  }

  render() {
    const { searched } = this.props;
    const { threads, showThreads, loadingThreads } = searched;

    const entries = threads && threads.length > 0 ? threads.slice(0, showThreads) : {};
    const loadMore = threads && threads.length > showThreads;

    return (
      <div styleName="ideas-container">
        <div styleName="user-ideas">
          {loadingThreads && <div styleName="general-message">{LOADING_THREADS}</div>}

          {!loadingThreads && Object.keys(entries).length === 0 && (
            <div styleName="general-message">{NO_THREADS_MESSAGE}</div>
          )}

          {!loadingThreads &&
            Object.keys(entries).length > 0 &&
            Object.values(entries).map((item, index) => (
              <IdeaBox key={index} item={item} handleOpenProConModal={this.handleOpenProConModal} />
            ))}
        </div>

        {!loadingThreads && loadMore && (
          <div styleName="see-more" onClick={this.handleClickShowMore}>
            {LOAD_MORE_ENTRIES}
          </div>
        )}
      </div>
    );
  }
}

export default AllUserIdeas;
