import React from 'react';
import { connect } from "react-redux";
import { Button, Card, Table, Divider, Tag } from 'antd';


import { moduleGetById as getModuleById } from '../../actions/module';
import { find as findAllSeance } from '../../actions/seance';
import AjoutSeanceForm  from '../seance/AjoutSeanceForm';

import Seance from '../../models/Seance'


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Semaine',
    key: 'semaine',
    render: (text, record) => (
      <React.Fragment>
        <Tag color="blue">{record.dateDebut}</Tag> - <Tag color="purple">{record.dateFin}</Tag>
      </React.Fragment>
    )
  },
  {
    title: 'Taches',
    dataIndex: 'taches',
    key: 'taches',
    render: (list, record) =>(
      record.tasks.length
    )
  },  
  {
    title: 'Devoirs',
    dataIndex: 'devoirs',
    key: 'devoirs',
    render: (list, record) =>(
      record.assignments.length
    )
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
  }
];


class Module extends React.Component {

  

  componentDidMount() {
    // 
    // console.log("componentDidMount", moduleId)
    // this.props.getModuleById(moduleId);
    // this.props.findAllSeance();
  }

  componentDidUpdate(prevProps) {
    const moduleId = this.props.match.params.id;
    if (moduleId !== prevProps.match.params.id) {
      this.props.getModuleById(moduleId);
      this.props.findAllSeance({
        moduleId: moduleId
      });
    }
  }

  render() {

    const {
      _module,
      professeur,
      seances,
      history
    } = this.props;

    return (
      <div>
        { _module && 
          <Card title={_module.nom}>
            <h4>Charge Horaire : </h4>
            <h5>Cours: <b>{_module.chargeHoraire.cours}</b> - TD: <b>{_module.chargeHoraire.td}</b> - TP: <b>{_module.chargeHoraire.tp}</b></h5>
          </Card>
        }

        <Card title="Seances" bordered={false}>
          <AjoutSeanceForm /> 
          
          <Table 
            columns={columns}
            dataSource={seances}
            rowKey="_id"
            onRow={(seance) => (
              {
                onClick: () => { // click row
                  history.push({
                    pathname: `/seances/${seance._id}`,
                  })
                } 
              }
            )}
          />
            
          <Button
            type="danger"
            onClick={(e)=>{
              e.preventDefault()
              // delete all seances
              Seance.bulkDelete(seances)
            }}
          >
            Supprimer toutes les Seances
          </Button>
          
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  _module: state.module.current,
  professeur: state.session.currentProf,
  seances: state.seance.list
});

export default connect(
  mapStateToProps,
  {getModuleById, findAllSeance}
)(Module);