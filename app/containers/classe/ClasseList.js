import React, { Component } from 'react';
import { Button ,Card, Table, Divider, Tag } from 'antd';

import RegisterForm from './AjoutClassForm';




const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  }, {
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

  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    email: 'jhon@brown.com'
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    email: 'jim@brown.com'
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    email: 'Joe@black.com',
  }];

  class ClasseList extends Component {
    componentDidMount() {
      
    }
  
    render() {
      
      return (
        
          <Card bordered={false}>


            <RegisterForm />
            
            <Table columns={columns} dataSource={data} />
            
          </Card>
        
      );
    }
  }
  
  export default ClasseList;