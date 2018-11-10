import React, { Component } from "react";
import { connect } from 'react-redux';


function filterModule(modules, profId) {
  return profId
    ? modules.filter(module => module.professeur == profId)
    : [];
}

class HomeTemp extends Component {

  constructor(props){
    super(props);
  }

  render() {

    const currentUser = this.props.currentUser;
    console.log('currentUser' ,currentUser);
    let userModules = [];

    if(currentUser != null){
      userModules = this.props.modules || [];
      console.log('UserModules' ,userModules);
    }

    return (
      <div>
          <h1>Hello World</h1>
           <ul>
            {userModules.map((module) => (<li  key={module._id}>{module.name}</li>))}
          </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    modules: state.module.modulesProf
  };
}

export default connect(
  mapStateToProps,
  {}
)(HomeTemp);