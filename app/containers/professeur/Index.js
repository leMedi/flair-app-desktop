import React from 'react';
import { connect } from "react-redux";

import { Layout, Card, Row, Col } from 'antd';

import ContactSearch from '../../components/contact/ContactSearch';
import ProfProfile from '../../components/contact/ProfProfile';
import ContactList from '../../components/contact/ContactList';
import RegisterForm from './AjouterProfForm';

// redux
import { profFind } from '../../actions/prof';
import { moduleFind } from '../../actions/module';

const {  Content, Sider } = Layout;

function filterContacts(contacts, search) {
  // eslint-disable-next-line no-param-reassign
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
    const {
      allProfs,
      allModules,
    } = this.props;

    allProfs();
    allModules();
  }

   
  onSearchInputChange (event)  {
    this.setState({ search: event.target.value });
  }

  render() {
    const {
      profs,
      modules,
    } = this.props;

    const {
      selectedId,
      search,
    } = this.state;

    const selected = profs.filter(prof=>(prof._id === selectedId))

    const selectedProf = selected.length ? selected[0] : 'no prof selectioner';
    const selectedModules = filterModule(modules, selectedProf._id);

    const profsFiltered = filterContacts(profs, search);

    return (

      <Card bordered={false}>
        <Content style={{ padding: '0 10px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={250} style={{ background: '#fff' }}>
              <Row>
                <Col span={12}>
                  <ContactSearch value={search} onSearchInputChange={this.onSearchInputChange} />
                </Col>
                <Col span={12}>
                  <RegisterForm />
                </Col>
              </Row>
              <ContactList
                onClick={this.profUpdate}
                contacts={profsFiltered}
                handelSelect={ prof => {
                  console.log('prof id', prof._id)
                  this.setState({selectedId: prof._id});
                }}
                selectedId={selectedId}
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
  {
    allProfs: profFind,
    allModules: moduleFind,
  }
)(Index);



