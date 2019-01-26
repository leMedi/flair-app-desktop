import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Spin, Menu, Icon, Dropdown, Avatar } from 'antd';
import { profLogout } from '../../actions/session'
import styles from './index.less';

export class GlobalHeaderRight extends PureComponent {

  render() {
    const {
      currentUser,
      logout
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]}>
        <Menu.Item key="userinfo">
          <Icon type="setting" />
            account settings
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />
            Trigger Error
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={()=>{
          
          logout()
          // .then(() => this.props.history.push('/login'))
          // .catch(() => null)
        }}>
          <Icon type="logout" />
            logout
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.right}>
        {currentUser ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.nom}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    currentUser: state.session.currentProf,
    theme: state.theme.navTheme
  };
}

export default connect(
  mapStateToProps,
  { logout: profLogout }
)(GlobalHeaderRight);
