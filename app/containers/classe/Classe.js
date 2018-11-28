import React from 'react';
import { connect } from "react-redux";

import { Layout, Card, Row, Col } from 'antd';

import ContactSearch from '../../components/contact/ContactSearch';
import EtudiantProfile from '../../components/contact/EtudiantProfile';
import ContactList from '../../components/contact/ContactList';
import RegisterForm from '../etudiant/AjoutEtudForm';

// redux
import { etudiantFind } from '../../actions/etudiant';
import { classeGetById } from '../../actions/classe';

const {  Content, Sider } = Layout;

function filterContacts(contacts, search) {
    // eslint-disable-next-line no-param-reassign
    search = search.toUpperCase();
    return search
      ? contacts.filter(contact => contact.lastName.toUpperCase().includes(search))
      : contacts;
}

class Classe extends React.Component {

  constructor(props) {
      super(props);
  
      this.state = {
        selectedId: -1,
        search: '',
      }

      this.onSearchInputChange = this.onSearchInputChange.bind(this);
  }

  componentDidMount() {
    const {
      match: { params: id },
      findEtudiants,
      getClass
    } = this.props
    
    getClass(id);
    findEtudiants({ classe_id: id })
  }

  onSearchInputChange (event)  {
    this.setState({ search: event.target.value });
  }

  render() {
    const { etudiants, classe } = this.props;
    const { search, selectedId } = this.state;

    const selected = etudiants.filter(etudiant=>(etudiant._id === selectedId))

    const selectedEtudiant = selected.length ? selected[0] : 'no etudiant selectioner';

    const etudiantsFiltered = filterContacts(etudiants, search);

    return (

      <Card bordered={false}>
          
        {classe && (
        <Content style={{ padding: '0 10px' }}>
          <h3>{classe.name}</h3>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={250} style={{ background: '#fff' }}>
              <Row>
                <Col span={12}>
                  <ContactSearch value={search} onSearchInputChange={this.onSearchInputChange} />
                </Col>
                <Col span={12}>
                  <RegisterForm classe={classe} />
                </Col>
              </Row>
              <ContactList 
                contacts={etudiantsFiltered}
                handelSelect={ etudiant => {
                    this.setState({selectedId: etudiant._id});
                }}
                selectedId = {selectedId}
              />
            </Sider>
            <Content style={{ padding: '0 80px', margin: '70px 80px' , minHeight: 280, borderLeft:'1px solid rgba(128, 128, 128, 0.28)' }}>
              <EtudiantProfile classe={classe} selectedEtudiant={selectedEtudiant}/>
            </Content>
          </Layout>
        </Content>
        )}
              
      </Card>

    )
  };

}

const mapStateToProps = state => ({
  etudiants: state.etudiant.list,
  classe: state.classe.current
});

export default connect(
  mapStateToProps,
  {
    findEtudiants: etudiantFind,
    getClass: classeGetById
  }
)(Classe);


