import React from 'react';
import './styles.less';

import prozessImage from 'Assets/prozess.png';

class AboutProject extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="text">
          Das Projekt „Ruhrgebiet besser machen“ möchte BürgerInnen die Chance geben, gemeinsam Zukunftsvisionen für das 
          Zusammenleben in den drei Pilotkommunen Bottrop, Herne und Oberhausen zu entwickeln. und das nachbarschaftliche 
          Miteinander stärken. Das Projekt zielt darauf ab, besonders vielversprechende Ideen gemeinsam mit BürgerInnen und 
          Kommunen in die Praxis umzusetzen.
        </div>
        <div styleName="text">
          In einem mehrstufigen Prozess suchen wir deshalb nach den besten Ideen für die Region:
        </div>
        <div styleName="text">
          <img src={prozessImage} styleName="process-image"/>
        </div>
        <div styleName="text">
          Ihre Ideen können Sie natürlich auch laufend auf unserer Online-Plattform einbringen. Bitte beachten Sie, dass neue 
          Ideen nur bis zum 10. April 2020 abgeben werden können. Die bereits geposteten Vorschläge und Anregungen können auf der 
          Seite noch bis zum 15. Mai 2020 kommentiert und weiterdiskutiert werden.
        </div>
        <div styleName="text">
          Die besten Ideen aus den Kneipengesprächen und den Ideenwerkstätten bringen wir bei unserer Abschlusskonferenz auf die Bühne. 
          Danach wird die Brost-Stiftung den Dialog zwischen Bürgern, Politik und Verwaltung in den drei Pilotkommunen weiterverfolgen 
          und konstruktiv begleiten.
        </div>
        <div styleName="text">
          <b>Die Initiatoren</b>
        </div>
        <div styleName="text">
          „Ruhrgebiet besser machen“ ist ein Projekt der Brost-Stiftung in Kooperation mit der Körber-Stiftung. Die Funke-Mediengruppe 
          unterstützt das Projekt als Medienpartner, weiterer Partner ist nebenan.de.
        </div>
      </div>
    );
  }
}

export default AboutProject;
