import React from 'react';
import { connect } from "react-redux";
import { Layout, Card, Row, Table, Divider } from 'antd';


import { getById as getModuleById } from '../../actions/module';
import { find as findAllSeance } from '../../actions/seance';
import AjoutSeanceForm  from '../seance/AjoutSeanceForm';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, 
{
  title: 'Leçon',
  dataIndex: 'leçon',
  key: 'leçon',
},  
{
  title: 'Devoir',
  dataIndex: 'Devoir',
  key: 'Devoir',
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


class Module extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const moduleId = this.props.match.params.id;
    this.props.getModuleById(moduleId);
    this.props.findAllSeance();

}

  render() {

    const module = this.props.module;
    const professeur = this.props.profModule;
    const seances = this.props.seances;

    return (
      <div>
        { module && 
          <Card title={module.name}>
          
          <h3>Professeur : {professeur.firstName} </h3>

          </Card>
        }

        <Card title="Seances"  bordered={false}>
        <AjoutSeanceForm />
        <Table 
              columns={columns}
              dataSource={seances}
              rowKey="_id"
              onRow={(seance) => {
                return {
                  onClick: () => { // click row
                    this.props.history.push({
                      pathname: '/seances/' + seance._id,
                    })
                  } 
                };
              }}
            />
            </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  module: state.module.currentModule,
  profModule: state.prof.profCurrent,
  seances: state.seance.list
});

export default connect(
  mapStateToProps,
  {getModuleById, findAllSeance}
)(Module);