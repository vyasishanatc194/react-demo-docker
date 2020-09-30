import React from 'react';
import LogoBox from './LogoBox/LogoBox';
import './styles.less';
import logoBrost from 'Assets/logos/logo_brost.png';
import logoKoerber from 'Assets/logos/logo_koerber.png';
import logoNebenan from 'Assets/logos/logo_nebenan.png';
import logoWaz from 'Assets/logos/logo_waz.png';
import skyline from 'Assets/skyline.png';

const Footer = ({ history }) => {
  const clickLink = (url) => {
    window.scrollTo(0, 0);
    window.open(url);
  };

  return (
    <div styleName="footer-container">
      <div styleName="sponsors">
        <div styleName="label">Eine Aktion von:</div>
        <div styleName="logo-box-row">
          <LogoBox
            main={true}
            name="Brost-Stiftung"
            logo={logoBrost}
            onClickMethod={() => window.open('https://www.broststiftung.ruhr/')}
          />
          <div styleName="spacer" />
          <LogoBox
            main={true}
            name="Körber Stiftung"
            logo={logoKoerber}
            onClickMethod={() => window.open('https://www.koerber-stiftung.de/')}
          />
        </div>
      </div>

      <div styleName="sponsors">
        <div styleName="label">Partner</div>
        <div styleName="logo-box-row">
          <LogoBox
            name="Nebenan.de"
            logo={logoNebenan}
            onClickMethod={() => window.open('https://www.nebenan.de/')}
          />
          <div styleName="partner-logo-spacer" />
          <LogoBox name="WAZ" logo={logoWaz} onClickMethod={() => window.open('https://www.waz.de/')} />
        </div>
      </div>

      <img src={skyline} alt="Ruhrgebiet" styleName="skyline" />
      <div styleName="bottom-container">
        <div styleName="links">
          <div styleName="link" onClick={() => clickLink('/impressum')}>
            Impressum
          </div>
          <div styleName="link" onClick={() => clickLink('/datenschutz')}>
            Datenschutz
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
