import React from 'react';
import './styles.less';

const LogoBox = ({ main, logo, name, onClickMethod }) => {
  const mainStyle = main ? ' main' : '';
  const style = `logo-box${mainStyle}`;
  let imgStyle = '';

  if (name === 'Körber Stiftung') {
    imgStyle = ' koerber';
  } else if (name === 'Nebenan.de') {
    imgStyle = ' nebenan';
  } else if (name === 'WAZ') {
    imgStyle = ' waz';
  }

  return (
    <div styleName={style}>
      <img src={logo} alt={name} onClick={onClickMethod} styleName={imgStyle} />
    </div>
  );
};

export default LogoBox;
