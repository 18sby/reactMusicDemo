import React, { useState } from 'react';
import '../../styles/components/home/top-tab.scss';
import classnames from 'classnames';

export const TopTab = (props) => {
  let [activeTabIndex, setActiveTabIndex] = useState(0);

  // todo 设置 tab Index
  const clickTab = (index) => {
    setActiveTabIndex(index);
    // todo 告诉父组件点击了tab，请求接口，接口要做缓存
    console.log( 'this.parent', props.changeRouteByTabActiveIndex );
    props.changeRouteByTabActiveIndex(index);
  }

  // * render
  return (
    <div className="home-top-tab-container">
      <ul className="nav-box flx">
        <li onClick={() => clickTab(0)} className="f-j-c">
          <div
            className={classnames('f-c', {'show': activeTabIndex === 0})}
          >
            推荐音乐
          </div>
        </li>
        <li onClick={() => clickTab(1)} className="f-j-c">
          <div
            className={classnames('f-c', {'show': activeTabIndex === 1})}
          >
            热歌榜
          </div>
        </li>
        <li onClick={() => clickTab(2)} className="f-j-c">
          <div
            className={classnames('f-c', {'show': activeTabIndex === 2})}
          >
            搜索
          </div>
        </li>
      </ul>
    </div>
  );
}