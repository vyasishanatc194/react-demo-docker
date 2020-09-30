import React from 'react';
import { deactivateScroll, reactivateScroll } from 'Utils/functions';

import SortFilterSearch from 'Containers/SortFilterSearch';
import AllUserIdeas from 'Containers/AllUserIdeas';
import ProConModal from 'Containers/ProConModal';
import './styles.less';

class AllIdeas extends React.Component {
  renderButtons = () => {
    const divs = [];
    const cities = ['Oberhausen', 'Bottrop', 'Herne', 'Alle Städte'];

    cities.forEach((item, index) => {
      const itemName = item;
      if (item === 'Alle Städte') {
        item = '';
      }
      const style = this.props.map.city === item ? 'city-button active' : 'city-button inactive';
      divs.push(
        <button key={index} styleName={style} onClick={() => this.props.setCity(item)}>
          {itemName}
        </button>
      );
    });
    return divs;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.showProConModal !== this.props.showProConModal) {
      if (this.props.showProConModal === true) {
        deactivateScroll();
      } else {
        reactivateScroll();
      }
    }
  }

  render() {
    const { showProConModal } = this.props;

    return (
      <div>
        <div styleName="container">
          <div styleName="text">
            Auf unserer Online-Plattform können Sie Ihre Meinungen, Ideen, Wünsche oder Anregungen einbringen
            und mit Gleichgesinnten diskutieren.
            <p styleName="line-spacing"></p>
            Die vielversprechendsten Beiträge werden in der zweiten Projektphase aufgegriffen und weiter
            ausgearbeitet.
            <p styleName="line-spacing"></p>
            Hier finden Sie alle bisher eingereichten Beiträge, geordnet nach den jeweiligen Kommunen.
          </div>

          <div styleName="label">Städte</div>
          <div styleName="button-container">{this.renderButtons()}</div>
          <SortFilterSearch />
          <AllUserIdeas />
        </div>

        {showProConModal && <ProConModal />}
      </div>
    );
  }
}

export default AllIdeas;
