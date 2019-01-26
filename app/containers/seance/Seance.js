import React from 'react';
import { Card, Row, Col, Table, Button, Progress, Switch, Divider, Tag } from "antd";
import { connect } from "react-redux";
// import styles from './Seance.less'

import SeanceServer from '../../socketServer'

import { seanceGetById } from '../../actions/seance';
import { etudiantFind } from '../../actions/etudiant';

class Seance extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      isLive: false,
      isAcceptingNewConnections: false,
  
      tasks: [],
      students: []
    }
  }
  

  
  componentDidMount() {
    const {
      match : { params: { id: seanceId } },
      history,
      getSeanceById,
      findEtudiants,
      _module
    } = this.props;

    
    if(!_module)
      history.push('/')
    else {
      getSeanceById(seanceId)
        .then((seance) => {
          this.setState({
            tasks: seance.tasks.map((t,i) => ({ index: i, nom: t, isDone: false })),
          })
          return seance
        })
        .then(seance =>
          findEtudiants({ classeId: _module.classeId }).then((etudiants) => {
            this.setState({
              students: etudiants.map(e => Object.assign(
                  e,
                  {
                    assignments: seance.assignments.map((t,i) => ({ index: i, nom: t, isDone: false })),
                    isConnected: false,
                  }
                )
              )
            })
            return seance
          })
        )
        .catch(() => null) // navigate to other page
    }
  }

  tachesColumns = [
    {
      width: 150,
      title: 'Order',
      dataIndex: 'index',
    },
    {
      title: 'Tache',
      dataIndex: 'nom',
    },
    {
      title: 'Est-Fait ?',
      key: 'action',
      render: (list, record, index) => (
        <Switch
          checked={record.isDone}
          onChange={() => { this.toggleTask(index) }}
        />
      ),
    }
  ];

  etudiantsColumns = [
    {
      title: 'CNE',
      dataIndex: 'cne',
    },
    {
      title: 'Nom & Prenom',
      dataIndex: 'nom',
      render: (list, record) => `${record.nom} ${record.prenom}`,
    },
    {
      title: 'Progresse',
      key: 'progresse',
      render: (list, record) => {
        let percent = 0;
        
        record.assignments.forEach(a => {
          if(a.isDone) percent += 1
        });
        percent /= record.assignments.length
        return <Progress percent={percent*100} size="small" />
      },
    },
    {
      title: 'Est-Present(e) ?',
      key: 'action',
      render: (list, record) => (
        <Tag color={record.isConnected ? '#87d068' : 'red' }>{record.isConnected ? 'Oui' : 'Non' }</Tag>
      ),
    }
  ];
  
  
  seanceServer = null


  // eslint-disable-next-line class-methods-use-this
  goLive(cb) {
    const {
      seance,
      _module,
    } = this.props;

    const { students, tasks } = this.state

    this.seanceServer = new SeanceServer({ 
      seance, _module,
      tasks,
      students,
    })

    this.seanceServer.onStudent(index => {
      // look for student and update it's 'isConnected' property
      students[index].isConnected = true
      this.setState({ students })
    })

    this.seanceServer.onStudents(_students => {
      this.setState({ students: _students })
    })

    this.seanceServer.onStudentDisconnect(index => {
      // look for student and update it's 'isConnected' property
      students[index].isConnected = false
      this.setState({ students })
    })
    
    return this.seanceServer.start(cb)
  }

  // eslint-disable-next-line class-methods-use-this
  endLive(cb) {
    console.log('stoping server')
    this.seanceServer.stop(cb)
    // save result
  }

  toggleLive() {
    const { isLive } = this.state
    if(isLive) { // end live
      // eslint-disable-next-line promise/catch-or-return
      this.endLive(() => {
        console.log('server stopped ')
        this.setState({
          isLive: false,
          isAcceptingNewConnections: false
        })
      })
      
    } else {
      // eslint-disable-next-line promise/catch-or-return
      this.goLive(() =>
        this.setState({
          isLive: true,
          isAcceptingNewConnections: true
        })
      )
    }      
  }

  // eslint-disable-next-line class-methods-use-this
  toggleNewConnections() {
    const { isAcceptingNewConnections } = this.state
    if(isAcceptingNewConnections) { // end live
      this.setState({
        isAcceptingNewConnections: false
      })
    } else {
      this.setState({
        isAcceptingNewConnections: true
      })
    }    
  }

  toggleTask(index) {
    const { isLive, tasks } = this.state;

    if(!isLive) return false
    
    console.log('toggleTask', index)
    
    
    tasks[index].isDone = !tasks[index].isDone
    
    this.setState({ tasks })
    
    this.seanceServer.setTasks(tasks)
  }

  renderHeaderActions() {
    const { isLive, isAcceptingNewConnections } = this.state
    return (
      <React.Fragment>
        <Button
          onClick={this.toggleLive.bind(this)}
          type={isLive ? 'danger' : 'primary'}
        >{isLive ? 'Arreter' : 'Demarer'} la Seance</Button>
        &nbsp;
        <Button
          onClick={this.toggleNewConnections.bind(this)}
          ghost
          disabled={!isLive}
          type={ isAcceptingNewConnections ? 'danger' : 'primary' }
        >{isAcceptingNewConnections ? 'Ne pas accepter' : 'Accepter'} de nouvelles connexions</Button>
      </React.Fragment>
    )
  }

  render() {

    const {
      seance,
      _module,
    } = this.props;

    const { tasks, students } = this.state;

    return (
      <div>
         { seance && tasks && students &&
          <Card
            title={`Module: ${_module.nom} - Seance: ${seance.name}`}
            extra={this.renderHeaderActions()}
          >
            <Row>
              <Col>
                <Table 
                  columns={this.tachesColumns}
                  dataSource={tasks}
                  rowKey="index"
                  bordered
                  pagination={false}
                />
              </Col>
              <Col>
                  <Divider>Etudiants</Divider>
                  <Table 
                    columns={this.etudiantsColumns}
                    dataSource={students}
                    expandedRowRender={record =>
                      <p style={{ margin: 0 }}>{
                        record.assignments.map(a => 
                          <Tag color={a.isDone ? '#87d068' : 'red' }>{a.nom}</Tag>  
                        )
                      }</p>
                    }
                    rowKey="_id"
                    pagination={false}
                  />
              </Col>
            </Row>
            
          </Card>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  seance: state.seance.current,
  _module: state.module.current,
  etudiants: state.etudiant.list,
});

export default connect(
  mapStateToProps,
  { 
    getSeanceById: seanceGetById,
    findEtudiants: etudiantFind,
  }
)(Seance);