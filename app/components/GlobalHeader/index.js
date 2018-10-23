import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
// import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import RightContent from './RightContent';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  /* eslint-disable*/
  // @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    console.log("toggle", !collapsed)
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  render() {
    const { collapsed, isMobile, logo } = this.props;
    return (
      <div className={styles.header} onClick={this.toggle}>
        {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>
        )}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <RightContent/>
      </div>
    );
  }
}
