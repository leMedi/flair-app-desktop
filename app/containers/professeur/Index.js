import React from 'react';
import { connect } from "react-redux";

import { Layout, Card, Row, Col } from 'antd';

import ContactSearch from '../../components/contact/ContactSearch';
import ProfProfile from '../../components/contact/ProfProfile';
import ContactList from '../../components/contact/ContactList';
import RegisterForm from './AjouterProfForm';

// redux
import { find } from '../../actions/prof';
import { find as findModule } from '../../actions/module';

const {  Content, Sider } = Layout;

function filterContacts(contacts, search) {
  search = search.toUpperCase();
  return search
    ? contacts.filter(contact => contact.lastName.toUpperCase().includes(search))
    : contacts;
}

function filterModule(modules, profId) {
  return profId
    ? modules.filter(module => module.professeur == profId)
    : [];
}


class Index extends React.Component {
    

  constructor(props) {
    super(props);

    this.state = {
      selectedId: -1,
      search: '',
    }

    this.onSearchInputChange = this.onSearchInputChange.bind(this);
  }


  async componentDidMount() {
    this.props.find();
    this.props.findModule();
    
  }

   
  onSearchInputChange (event)  {
    this.setState({ search: event.target.value });
  }

  render() {

    const selected = this.props.profs.filter(prof=>(prof._id === this.state.selectedId))

    const selectedProf = selected.length ? selected[0] : 'no prof selectioner';
    const modules = this.props.modules;
    const selectedModules = filterModule(modules, selectedProf._id);
    console.log('prof module', selectedModules);

    const profs = filterContacts(this.props.profs, this.state.search);

    return (

      <Card bordered={false}>
        <Content style={{ padding: '0 10px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={250} style={{ background: '#fff' }}>
              <Row>
                <Col span={12}>
                  <ContactSearch value={this.state.search} onSearchInputChange={this.onSearchInputChange} />
                </Col>
                <Col span={12}>
                  <RegisterForm />
                </Col>
              </Row>
              <ContactList
                onClick={this.profUpdate}
                contacts={profs}
                handelSelect={ prof => {
                  console.log('prof id', prof._id)
                  this.setState({selectedId: prof._id});
                }}
                selectedId={this.state.selectedId}
              />
            </Sider>
            <Content 
              style={
                { padding: '0 80px',
                  margin: '70px 80px', 
                  minHeight: 280, 
                  borderLeft:'1px solid rgba(128, 128, 128, 0.28)' 
                }}>
              <ProfProfile selectedProf={selectedProf} selectedModules={selectedModules} />
            </Content>
          </Layout>
      </Content>
      </Card>

    )
  };

} 

const mapStateToProps = state => ({
  profs: state.prof.list,
  modules: state.module.list
});

export default connect(
  mapStateToProps,
  { find, findModule }
)(Index);



