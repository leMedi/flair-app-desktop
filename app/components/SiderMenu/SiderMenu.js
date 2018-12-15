import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.less';
import BaseMenu from './BaseMenu';

const { Sider } = Layout;

class SiderMenu extends PureComponent {
  render() {
    const { logo, collapsed, onCollapse, fixSiderbar, theme } = this.props;

    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderbar]: fixSiderbar,
      [styles.light]: theme === 'light',
    });

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        theme={theme}
        className={siderClassName}
      >
        <div className={styles.logo} id="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
          <BaseMenu
            {...this.props}
            mode="inline"
            style={{ padding: '16px 0', width: '100%', overflowX: 'hidden' }}
          />
      </Sider>
    );
  }
}


function mapStateToProps() {
  return {
  };
}

export default connect(
  mapStateToProps,
  {}
)(SiderMenu);