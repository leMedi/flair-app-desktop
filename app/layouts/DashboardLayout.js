import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { connect } from 'react-redux';
import SiderMenu from '../components/SiderMenu';
import logo from '../assets/logo.svg';
import routes, { Router as DashboardRouter } from '../config/router.dashboard';
import Header from '../components/Dashboard/Header';
import HomeTemp from '../containers/HomeTemp';
import { getModulesByProf } from '../actions/module';


import { getById as fetchUser } from '../actions/user';


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

    this.props.fetchUser('412e4b67-2ecb-4194-9210-fbb357933752', (user) => {
      this.props.getModulesByProf(user._id)
    });
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
      currentUserModules,
    } = this.props;

    const { isMobile, menuData, collapsed } = this.state;
    const isTop = PropsLayout === 'topmenu';
    
    const currentUser = this.props.currentUser;
    console.log('currentUser' ,currentUser);

    return(
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            trigger={null}
            onCollapse={this.handleMenuCollapse}
            collapsed={collapsed}
            menuData={menuData}
            menuModulesData={currentUserModules}
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
    currentUser: state.user.currentUser,
    currentUserModules: state.user.modules,
    modules: state.module.list
    
  };
}

export default connect(
  mapStateToProps,
  {fetchUser, getModulesByProf}
)(DashboardLayout);
