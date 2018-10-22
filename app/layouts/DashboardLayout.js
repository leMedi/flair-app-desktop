import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { connect } from 'react-redux';
import SiderMenu from '../components/SiderMenu';
import logo from '../assets/logo.svg';
import routes, { Router as DashboardRouter } from '../config/router.dashboard';


const { Header, Content } = Layout;


// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      let locale = 'menu';
      if (parentName && item.name) {
        locale = `${parentName}.${item.name}`;
      } else if (item.name) {
        locale = `menu.${item.name}`;
      } else if (parentName) {
        locale = parentName;
      }
      if (item.path) {
        const result = {
          ...item,
          locale,
          authority: item.authority || parentAuthority,
        };
        if (item.routes) {
          const children = formatter(item.routes, item.authority, locale);
          // Reduce memory usage
          result.children = children;
        }
        delete result.routes;
        return result;
      }

      return null;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

class DashboardLayout extends Component {

  state = {
    // rendering: true,
    isMobile: false,
    collapsed: false,
    menuData: memoizeOneFormatter(routes),
  };

  

  toggle = () => {
    const { collapsed } = this.state
    this.setState({
      collapsed: !collapsed,
    });
  }

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
    } = this.props;

    const { isMobile, menuData } = this.state;
    const isTop = PropsLayout === 'topmenu';

    const { collapsed } = this.state
    
    return(
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            trigger={null}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            theme={navTheme}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content>
            <DashboardRouter url={pathname} />
          </Content>
        </Layout>
      </Layout>
    )
  }
}


function mapStateToProps(state) {
  return {
    ...state.theme
  };
}

export default connect(
  mapStateToProps,
  {}
)(DashboardLayout);
