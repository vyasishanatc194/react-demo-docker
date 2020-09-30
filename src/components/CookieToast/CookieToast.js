import React, { Fragment } from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';

import './styles.less';

const CookieToast = () => {
    const clickLink = (url) => {
        window.scrollTo(0, 0);
        window.open(url);
      };

  const privacyAccepted = Cookies.get('privacy');

  return (
    <Fragment>
      {!privacyAccepted && (
        <CookieConsent
          location="bottom"
          cookieName="privacy"
          buttonText="annehmen"
          buttonStyle={{
            borderRadius: '4px',
            backgroundColor: '#0c6ca0',
            color: '#ffffff',
            fontSize: '20px',
            padding: '12px 15px',
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#2B373B',
            fontSize: '16px',
            fontWeight: 400,
            paddingTop: 10,
            paddingBottom: 10,
          }}
          onAccept={() => {
            Cookies.set('privacy', true);
          }}
        >
          Wir verwenden Cookies, um die Benutzerfreundlichkeit unserer Website zu verbessern. Weitere
          Informationen zu Cookies erhalten Sie in unserer{' '}
          <span
            styleName={'cookie-daten'}
            onClick={() => clickLink('/datenschutz')}
          >
            Datenschutzerklärung
          </span>
        </CookieConsent>
      )}
    </Fragment>
  );
};

export default CookieToast;
