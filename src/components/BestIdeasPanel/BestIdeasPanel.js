import React from 'react';
import { withRouter } from 'react-router';
import './styles.less';

const BestIdeasPanel = ({ history }) => {
  const handleClickLink = () => {
    window.scrollTo(0, 0);
    history.push('/beste-ideen-thema');
  };

  return (
    <div styleName="best-ideas">
      <div styleName="content">
        <div styleName="text1">Die besten Ideen für unsere Stadt</div>

        <div styleName="text2">
          Wählen Sie zwischen zwei Ideen ihre Favouriten für ein besseres Ruhrgebiet
        </div>

        <div styleName="button" onClick={handleClickLink}>
          Loslegen!
        </div>
      </div>
    </div>
  );
};

export default withRouter(BestIdeasPanel);
