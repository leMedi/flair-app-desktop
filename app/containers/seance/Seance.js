import React from 'react';
import { connect } from "react-redux";
import { getById as getSeanceById } from '../../actions/seance';
import { Card, Avatar,Row, Col } from "antd";



class Module extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const seanceId = this.props.match.params.id;
    this.props.getSeanceById(seanceId);

  }

  render() {

    const seance = this.props.seance;

    return (
      <div>
         { seance &&
          <Card title={"Seance: " + seance.name}>
          <Row gutter={24}>
            <Col span={6} >
            <Avatar size={64} src="http://icons.iconarchive.com/icons/icojam/blue-bits/256/module-puzzle-icon.png" style={{ marginLeft:'80px', marginBottom:'10px'}} />
            </Col>
            <Col span={6} style={{ marginTop: '20px' }}>
            <span><strong>Leçon: </strong>{seance.leçon}  </span> <br/>
            <span><strong>Devoir: </strong>{seance.Devoir}  </span>
            
            </Col>
          </Row>
          <Row>
          <Col span={12} >
          
          <span><strong>Debut: </strong> {seance.semaineDebut} ~ <strong> Fin: </strong> {seance.semaineFin} </span>
          
          <p style={{ marginTop:'15px'}}><strong>description:</strong> <br/> {seance.description}</p>
          </Col>
          </Row>
          </Card>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  seance: state.seance.currentSeance
});

export default connect(
  mapStateToProps,
  {getSeanceById}
)(Module);