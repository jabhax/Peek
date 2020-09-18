import React from 'react';
import './TabsNav.css';
import logo from '../icon.png';


function TabsNav() {
  const colorMap = [
    { RED: { background_color: 'bgcc_red', tab_color: 'tcc_red', bg_class: 'BG-RED', tc_class: 'TC-RED' } },
    { ORANGE: { background_color: 'bgcc_orange', tab_color: 'tcc_orange', bg_class: 'BG-ORANGE', tc_class: 'TC-ORANGE' } },
    { YELLOW: { background_color: 'bgcc_yellow', tab_color: 'tcc_yellow', bg_class: 'BG-YELLOW', tc_class: 'TC-YELLOW' } },
    { GREEN: { background_color: 'bgcc_green', tab_color: 'tcc_green', bg_class: 'BG-GREEN', tc_class: 'TC-GREEN' } },
    { BLUE: { background_color: 'bgcc_blue', tab_color: 'tcc_blue', bg_class: 'BG-BLUE', tc_class: 'TC-BLUE' } },
    { VIOLET: { background_color: 'bgcc_violet', tab_color: 'tcc_violet', bg_class: 'BG-VIOLET', tc_class: 'TC-VIOLET' } },
    { BLACK: { background_colo: 'bgcc_black', tab_color: 'tcc_black', bg_class: 'BG-BLACK', tc_class: 'TC-BLACK' } },
    { WHITE: { background_color: 'bgcc_white', tab_color: 'tcc_white', bg_class: 'BG-WHITE', tc_class: 'TC-WHITE' } },
    { GREY: { background_color: 'bgcc_grey', tab_color: 'tcc_grey', bg_class: 'BG-GREY', tc_class: 'TC-GREY' } }
  ];

  const BG_COLORS = Object.keys(colorMap).map(key => {
    const bg_color_class = [(colorMap[key]['background_color'], colorMap[key]['bg_class'])];
    return bg_color_class.map((colorID, colorClass) => (
      <p key={ key } id={ colorID } className={`${ colorClass } ripple rcorners col s4`}>
        <label htmlFor={ colorID } />
      </p>
    ));
  });

  const TAB_COLORS = Object.keys(colorMap).map(key => {
    const tc_color_class = [ (colorMap[key]['tab_color'], colorMap[key]['tc_class']) ];
    return tc_color_class.map((colorID, colorClass) => (
      <p key={ key } id={ colorID } className={`${ colorClass } ripple rcorners col s4`} >
        <label htmlFor={ colorID } />
      </p>
    ));
  });

  return (
    <div className='TabsNav'>
      <nav>
        <div className="TabsNavWrapper nav-wrapper container">
  		    <ul className="left hide-on-med-and-down" id="nav-mobile">
            <li>
              <button data-target="slide-out" className="sidenav-trigger show-on-large">
                <i className="MenuIcon large material-icons waves-effect">menu</i>
              </button>
            </li>
          </ul>
          <form className="center">
            <div className="input-group">
              <input id="search" type="search" className="TabSearch form-control" placeholder="Find"/>
            </div>
          </form>
        </div>
      </nav>

      <ul id="slide-out" className="TabsNavWrapper side-nav">
        <li>
          <div className="userView">
            <img className="CircleLogo circle" src={logo} alt='Circle Logo'/>
            <p><span className="CircleTitle white-text name">Peek</span></p>
          </div>
        </li>
        <li>
          <ul className="collapsible popout" data-collapsible="accordion">
            <li>
              <div className="collapsible-header waves-effect">
                <i className="large material-icons">web</i>Change Views
              </div>
              <div className="collapsible-body">
                <ul className="row">
                  <li className="ColCollapsible col s4">
                    <button id="listPreviewsButton" className="large material-icons waves-effect">clear_all</button>
                  </li>
                  <li className="ColCollapsible col s4">
                    <button id="groupPreviewsButton" className="large material-icons waves-effect">view_module</button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>

        <li><div className="divider"></div></li>

        <li>
          <ul className="collapsible popout" data-collapsible="accordion">
            <li>
              <div className="collapsible-header waves-effect">
                <i className="large material-icons">invert_colors</i>Background Color
              </div>
              <div className="collapsible-body">
                <form action="" className="row form1">{ BG_COLORS }</form>
              </div>
            </li>
          </ul>
        </li>

        <li><div className="divider"></div></li>

        <li>
          <ul className="collapsible popout " data-collapsible="accordion">
            <li>
              <div className="collapsible-header waves-effect ">
                <i className="large material-icons ">invert_colors</i>Tab Background Color
              </div>
              <div className="collapsible-body ">
                <form action="" className="row form2 ">{ TAB_COLORS }</form>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <hr/>
      <div className='PreviewGroup'></div>
      <ul className='PreviewList'></ul>
    </div>
  );
}

export default TabsNav;
