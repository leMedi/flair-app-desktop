import React, { Component } from 'react';
import { connect } from "react-redux";

import { Button ,Card, Table, Divider, Tag } from 'antd';

import RegisterForm from './AjoutClassForm';

import { find } from '../../actions/classe';


const columns = [{
    title: 'filiere',
    dataIndex: 'filiere',
    key: 'filiere',
    // render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: 'annee',
    dataIndex: 'annee',
    key: 'annee',
  }, {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Edit </a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    ),
  }];

  class ClasseList extends Component {

    constructor(props) {
      super(props);
    }

    componentDidMount() {
	    this.props.find();
    }
  
    render() {

      const classes = this.props.classes;
      
      return (
        
          <Card bordered={false}>

            <RegisterForm />
            
            <Table
              columns={columns}
              dataSource={classes}
              rowKey="_id"
              onRow={(classe) => {
                return {
                  onClick: () => { // click row
                    this.props.history.push({
                      pathname: '/classes/' + classe._id,
                    })
                  } 
                };
              }}
            />
            
          </Card>
        
      );
    }
  }

  const mapStateToProps = state => ({
    classes: state.classe.list
  });

  export default connect(
    mapStateToProps,
    { find }
  )(ClasseList);
  