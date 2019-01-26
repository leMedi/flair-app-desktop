import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import pathToRegexp from 'path-to-regexp';
import memoizeOne from 'memoize-one';
import styles from './index.less';

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export const getMenuMatches = memoizeOne(
  (flatMenuKeys, path) => flatMenuKeys.filter(item => item && pathToRegexp(item).test(path)),
  isEqual
);

export default class BaseMenu extends PureComponent {

  getMenuItems = (menuData) => (
      menuData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => (
        <Menu.Item key={item.path}>{this.getMenuItem(item)}</Menu.Item>
        ))
  )

  getMenuItemsAdmin = (currentUser, menuData) => {
    if(currentUser && currentUser.role && currentUser.role === 'admin')
      return menuData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => (
        <Menu.Item key={item.path}>{this.getMenuItem(item)}</Menu.Item>
        ))
    return null
  }

  getMenuItem = item => {
    const { name, target } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);

    const { location, isMobile, onCollapse } = this.props;

    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  render() {
    const {
      theme,
      mode,
      // location: { pathname },
    } = this.props;
    
    // if pathname can't match, use the nearest parent's key
    // let selectedKeys = this.getSelectedMenuKeys(pathname);
    const { currentUser, style, menuData, menuModulesData } = this.props;

    return (
      <Menu
        key="Menu"
        mode={mode}
        theme={theme}
        // selectedKeys={selectedKeys}
        style={style}
        className={mode === 'horizontal' ? 'top-nav-menu' : ''}
      >
        <div className="ant-menu-item-group-title" title="Module">Module</div>
        {this.getMenuItems(menuModulesData)}

        {currentUser && currentUser.role && currentUser.role === 'admin' &&
        <div className="ant-menu-item-group-title" title="Admin">Admin</div>
        }
        {this.getMenuItemsAdmin(currentUser, menuData)}
      </Menu>
    );
  }
}
