import React from 'react';
import './styles.less';

class FinalEvent extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div>
          Die Abschlussveranstaltung findet am 22. Juni 2020 in der Zeche Carl, Wilhelm-Nieswandt-Allee 100,
          45326 Essen, statt. Dort übergeben wir die Ergebnisse der Bürgerbeteiligung an die
          Entscheidungsträger aus der Politik.
        </div>

        <div styleName="url-div">
          <iframe
            src="https://hbmstatic.squarespace.com/rbm-abschluss"
            styleName="url-abschlussveranstaltung"
          ></iframe>
        </div>
      </div>
    );
  }
}

export default FinalEvent;
