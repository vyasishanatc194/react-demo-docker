import React from 'react';
import searchThemes from 'Constants/searchThemes';
import './styles.less';

const ThemeAreas = ({ selected, handleChangeThemeArea }) => {
  const allThemes = [
    ...searchThemes
  ];
  allThemes.pop()
  return (
    <div styleName="theme-area-container">
      {allThemes.map((item, index) => {
        const active = selected.includes(item.value);
        const buttonStyle =  active ? `button active` : `button normal`;
        const labelStyle =  active ? `label active` : `label normal`;
        const icon = active ? item.icon2 : item.icon3;
        let label = item.value;
        let iconStyle = `normal`;

        if (label === "Anderes") {
          label = "Andere";
          iconStyle = `other`;
        }

          return (
            <div key={index} styleName="button-row">
              <div onClick={() => handleChangeThemeArea(item.value)} styleName={buttonStyle}>
                <div styleName="theme">
                  {icon !== "" ? <img src={icon} alt="" styleName={iconStyle} /> : <div style={{ height: 36 }} />}
                  <div styleName={labelStyle}>{label}</div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default ThemeAreas;
