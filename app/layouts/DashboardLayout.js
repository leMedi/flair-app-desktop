import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { connect } from 'react-redux';
import SiderMenu from '../components/SiderMenu';
import logo from '../assets/logo.svg';
import routes, { Router as DashboardRouter } from '../config/router.dashboard';
import Header from '../components/Dashboard/Header';

import { updateCurrentProf } from '../actions/session';
import { Session } from '../utils/Session';


const { Content } = Layout;

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

  

  constructor(props) {
    super(props);

    this.state = {
      // rendering: true,
      isMobile: false,
      collapsed: false,
      menuData: memoizeOneFormatter(routes),
    };

    
    this.props.updateCurrentProf()
  }

  
  getLayoutStyle = () => {
    const { isMobile } = this.state;
    const { fixSiderbar, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  getContentStyle = () => {
    const { fixedHeader } = this.props;
    return {
      margin: '24px 24px 0',
      paddingTop: fixedHeader ? 64 : 0,
    };
  };

  handleMenuCollapse = collapsed => {
    this.setState({
      collapsed,
    });
  };
  

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location,
      location: { pathname },
      currentProf,
      currentProfModules,
    } = this.props;

    const { isMobile, menuData, collapsed } = this.state;
    const isTop = PropsLayout === 'topmenu';
    
    console.log('currentUser', currentProf);

    return(
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            trigger={null}
            onCollapse={this.handleMenuCollapse}
            collapsed={collapsed}
            menuData={menuData}
            menuModulesData={currentProfModules}
            theme={navTheme}
            isMobile={isMobile}
            location={location}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            collapsed={collapsed}
            />
          <Content style={this.getContentStyle()}>
            <DashboardRouter url={pathname} />
          </Content>
        </Layout>
      </Layout>
    )
  }
}


function mapStateToProps(state) {
  return {
    ...state.theme,
    currentProf: state.session.currentProf,
    currentProfModules: state.session.modules,
    modules: state.module.list
    
  };
}

export default connect(
  mapStateToProps,
  { updateCurrentProf }
)(DashboardLayout);
