import React from 'react';
import { getTimeAgo } from 'Utils/functions';

import thumbsUpIcon from 'Assets/thumbs-up.svg';
import thumbsDownIcon from 'Assets/thumbs-down.svg';
import ShareIconGrey from 'Assets/share-icon-grey.svg';
import AmbassadorIcon from 'Assets/pubtalks-icon.svg';

import './styles.less';

const UserSuggestionBox = ({ item, handleVoteForSuggestion, style }) => {
  const renderHashatags = (hashtags) => {
    if (hashtags.length > 0) {
      let totalCount = 0;

      hashtags.forEach((item) => {
        totalCount += item.length;
      });

      let tags = hashtags.map((item, index) => (
        <div styleName="tag" key={index}>
            {`#${item}`}
        </div>
      ));

      const threeTags = hashtags.slice(0, 3).map((item, index) => (
        <div styleName="tag" key={index}>
          {`#${item}`}
        </div>
      ));

      if (totalCount > 80) {
        tags = threeTags;
      }

      return tags;
    }
  };

  return (
    <div styleName={`box ${style}`} onClick={() => handleVoteForSuggestion(item.id)}>
      <div styleName="user-location">
        {item.user.is_ambassador ? (
          <div styleName="user-moderator">{item.user.nickname}</div>
        ) : (
          <div styleName="user">{item.user.nickname}</div>
        )}
        {item.user.is_ambassador && (
          <div styleName="location-red">Redakteur*in von „Ruhrgebiet besser machen“</div>
        )}
        <div styleName="location">{item.location.city}</div>
      </div>
      {item.user.is_ambassador ? (
        <img src={AmbassadorIcon} alt="" styleName="ambassador-icon" />
      ) : (
        <div styleName="time">{getTimeAgo(item.created_at)}</div>
      )}

      <div styleName="title">{item.subject}</div>
      <div styleName="text">{item.content}</div>

      <div styleName="hash-tags">{renderHashatags(item.hashtags)}</div>
    </div>
  );
};

export default UserSuggestionBox;
