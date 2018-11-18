import React, { Component } from 'react';
import { connect } from "react-redux";

import { Card, Table, Divider, Icon, Popconfirm, message } from 'antd';

import RegisterForm from './AjoutClassForm';

import { find } from '../../actions/classe';
import { removeClasse } from '../../models/Classe';


type Props = {
  getAllClasses: () => Promise,
  classes: Array,
  history: {
    push: ({ pathname: string }) => Promise
  }
};

class ClasseList extends Component<Props> {

  componentDidMount() {
    const { getAllClasses } = this.props;
    getAllClasses();
  }

  columns = [{
    title: 'filiere',
    dataIndex: 'filiere',
    key: 'filiere',
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
        <a>Edit</a>
        <Divider type="vertical" />
        <Popconfirm
          title="Vous êtes sur？"
          icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
          okText="Oui" 
          cancelText="Non"
          onConfirm={(e)=>{e.stopPropagation(); this.deleteClasse(record)}}
          >
          <a href="#" onClick={(e) => e.stopPropagation()}>Delete</a>
        </Popconfirm>
      </span>
    ),
  }];

  deleteClasse(classe) {
    const { getAllClasses } = this.props;
    removeClasse(classe).then(() => (
      getAllClasses() // update classes list after delete
    )).catch((err) => {message.error(`Couldn't delete Classe: ${err.message}`)})
    return false;
  }

  render() {

    const { classes, history } = this.props;
    
    return (
      
        <Card bordered={false}>

          <RegisterForm />
          
          <Table
            columns={this.columns}
            dataSource={classes}
            rowKey="_id"
            onRow={(classe) => ({
              onClick: () => ( // click row
                history.push({
                  pathname: `/classes/${classe._id}`
                })
              ) 
            })}
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
  { getAllClasses: find }
)(ClasseList);
  