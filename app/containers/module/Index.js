import React from 'react';
import { connect } from "react-redux";

import { Layout, Card, Row, Col } from 'antd';

import ContactSearch from '../../components/contact/ContactSearch';
import {List, Profile} from '../../components/Module';
import RegisterForm from './AjouterModuleForm';

// redux
import { moduleFind } from '../../actions/module';
import { classeGetById } from '../../actions/classe';
import { profGetById } from '../../actions/prof';

const {  Content, Sider } = Layout;

function filterContacts(contacts, search) {
  // eslint-disable-next-line no-param-reassign
  search = search.toUpperCase();
  return search
    ? contacts.filter(contact => contact.name.toUpperCase().includes(search))
    : contacts;
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
      // eslint-disable-next-line
	    this.props.getAllModules()
    }

    onSearchInputChange (event)  {
      this.setState({ search: event.target.value });
    }

    render() {
        const {
          modules,
          classe,
          prof,

          // action
          getProf,
          getClasse
        } = this.props;

        const {
          search,
          selectedId
        } = this.state;

        const selected = modules.filter( _module =>(_module._id === selectedId))

        const selectedModule = selected.length ? selected[0] : 'no module selectioner';
        const modulesFiltered = filterContacts(modules, search);

        return (
          <Card bordered={false}>
            <Content style={{ padding: '0 10px' }}>
              <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <Sider width={250} style={{ background: '#fff' }}>
                  <Row>
                    <Col span={24}>
                      <ContactSearch value={search} onSearchInputChange={this.onSearchInputChange} />
                    </Col>
                  </Row>

                  <List
                    modules={modulesFiltered}
                    handelSelect={ _module => {
                      this.setState({ selectedId: _module._id });
                      getClasse(_module.classeId);
                      getProf(_module.profId);
                    }}
                    selectedId={selectedId} 
                  />
                </Sider>
                <Content>
                  <RegisterForm />
                  <Content style={{
                    padding: '30px 80px',
                    minHeight: 280, 
                    borderLeft:'1px solid rgba(128, 128, 128, 0.28)' 
                  }}>
                    <Profile module={selectedModule} classe={classe} prof={prof} />
                  </Content>
                </Content>
              </Layout>
            </Content>
          </Card>
        )
    };
} 

const mapStateToProps = state => ({
  modules: state.module.list,
  classe: state.classe.current,
  prof: state.prof.current
});


export default connect(
  mapStateToProps,
  {
    getAllModules: moduleFind,
    getClasse: classeGetById,
    getProf: profGetById
  }
)(Index);


