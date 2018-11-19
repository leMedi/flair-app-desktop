import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import { Router as UserRouter } from '../config/router.user';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
  </Fragment>
);

class UserLayout extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>Ant Design</span>
            </div>
            <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
          </div>
          <UserRouter />
        </div>
        <GlobalFooter copyright={copyright} />
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
  };
}

export default connect(
  mapStateToProps,
  {}
)(UserLayout);