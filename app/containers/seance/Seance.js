import React from 'react';
import { Card, Row, Col, Button, Icon, Divider, Tag } from "antd";
import { connect } from "react-redux";
import styles from './Seance.less'

import SeanceServer from '../../socketServer'

import { getById as getSeanceById } from '../../actions/seance';
import { find as findEtudiants } from '../../actions/etudiant';


class Seance extends React.Component {

  state = {
    isSeanceStarted: false,
    accepetingNewStuddents: false,
    tasksDone: [],
    connectedStudents: [],
  }

  
  componentDidMount() {
    const seanceId = this.props.match.params.id;
    
    if(!this.props._module)
      this.props.history.push('/')
    else {
      this.props.findEtudiants({ classe: this.props._module.classe })    
      this.props.getSeanceById(seanceId)
    }
  }
  
  seanceServer = null

  startSeance() {
    const {
      seance,
      _module,
      etudiants,
    } = this.props;

    const {
      connectedStudents
    } = this.state;

    this.seanceServer = new SeanceServer(seance, _module, etudiants)
    
    this.seanceServer.onStudent((cne) => {
      this.setState({ connectedStudents: connectedStudents.concat(cne) })
    })
    this.seanceServer.onStudentDisconnect((cne) => {
      const index = connectedStudents.indexOf(cne)
      this.setState({ connectedStudents: connectedStudents.splice(index, 1) })
    })
    
    this.seanceServer.start(() => {
      this.setState({ isSeanceStarted: true, accepetingNewStuddents: true })

    })
  }

  stopAccepetingNewStuddents() {
    // this.seanceSever = new SeanceServer()
    this.setState({ accepetingNewStuddents: false })
    this.seanceServer.stop(()=>{console.log('server stopped')})
  }

  startAccepetingNewStuddents() {
    // this.seanceSever = new SeanceServer()
    this.setState({ accepetingNewStuddents: true })
  }

  renderSeanceButton() {
    if(!this.state.isSeanceStarted)
      return (<Button type="primary" onClick={this.startSeance.bind(this)}>Demarer la Seance</Button>)
    
    if(!this.state.accepetingNewStuddents)
      return (<Button type="ghost" onClick={this.startAccepetingNewStuddents.bind(this)}>Accepter les connexions</Button>)
  
    return (<Button type="danger" onClick={this.stopAccepetingNewStuddents.bind(this)}>Arreter</Button>)
  }

  taskToggel(index) {
    const { tasksDone } = this.state;
    const i = tasksDone.indexOf(index);
    if(i > -1) {
      tasksDone.splice(i, 1)
      this.seanceServer.toggleTask(index, false)
    }else{
      this.seanceServer.toggleTask(index, true)
      tasksDone.push(index)
    }

    this.setState({ tasksDone })
  }

  studentState(student) {
    if(this.state.connectedStudents.includes(student.cne+'')){
      return styles.connected
    }
    
    if(this.state.accepetingNewStuddents)
      return styles.not_connected
    
    return styles.disabled
  }

  render() {

    const {
      seance,
      _module,
      etudiants,
    } = this.props;

    const { tasksDone } = this.state;

    if(seance)
      console.log('seance', seance)
    return (
      <div>
         { seance &&
          <Card title={`Seance: ${seance.name}`}>
            {this.renderSeanceButton()}
            

            <Row>
              <Col>
                <h3 style={{ textAlign: 'center' }}>Taches</h3>
                <ul
                  style={{ listStyle: 'none', padding: 0, margin: '0 auto', width: 500, }}
                >
                  {
                    seance.tasks.map((tasks, index)=>(
                      <li
                        key={index}
                      >
                        <div
                          style={{
                            display: 'table',
                            margin: '4px auto',
                            border: '1px solid rgba(127, 143, 166,1.0)',
                            padding: '5px 10px',
                            textAlign: 'center',
                            fontSize: '18px'
                          }}

                          onClick={(e)=>{
                            e.preventDefault()
                            this.taskToggel(index)
                          }}
                        >
                          {
                            tasksDone.includes(index) ?  
                              (<Icon
                                type="check-circle"
                                theme="twoTone"
                                twoToneColor="#52c41a"
                                style={{
                                  paddingRight: '10px '
                                }}
                              />)
                              :
                              (<Icon
                                type="clock-circle"
                                theme="twoTone"
                                twoToneColor="#eb2f96"
                                style={{
                                  paddingRight: '10px '
                                }}
                              />)
                          }
                          {tasks}
                        </div>
                        
                      </li>
                    ))
                  }
                </ul>
              </Col>
              <Col>
                  <Divider>Etudiants</Divider>
                  { etudiants &&
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {
                       etudiants.map((etudiant, i) =>(
                        <li
                          key={i}
                          className={`${styles.student_card} ${this.studentState(etudiant)}`}
                        >
                          <p style={{marginBottom: 2}}>Nom: <b>{etudiant.firstName} {etudiant.lastName}</b></p>
                          <p style={{marginBottom: 2}}>CNE: <b>{etudiant.cne}</b></p>
                          <Divider />
                          <p>
                            Devoir: &nbsp;&nbsp;
                            {
                              seance.assignments.map((assignment, j)=>(
                                <Tag key={j} color="red">{assignment}</Tag> 
                              ))
                            }  
                          </p>
                        </li>
                       ))  
                    }
                  </ul>
                  }
              </Col>
            </Row>
            
          </Card>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  seance: state.seance.currentSeance,
  _module: state.module.currentModule,
  etudiants: state.etudiant.list,
});

export default connect(
  mapStateToProps,
  { getSeanceById, findEtudiants }
)(Seance);