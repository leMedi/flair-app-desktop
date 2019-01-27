import React from 'react';
import { connect } from "react-redux";

import { Layout, Card, Row, Popconfirm, Button } from 'antd';

import { List, Profile } from '../../components/Etudiant';
import ContactSearch from '../../components/contact/ContactSearch';
import RegisterForm from '../etudiant/AjoutEtudForm';

// redux
import { etudiantFind, etudiantDelete } from '../../actions/etudiant';
import { classeGetById } from '../../actions/classe';

const {  Content, Sider } = Layout;

function filterContacts(contacts, search) {
    // eslint-disable-next-line no-param-reassign
    search = search.toUpperCase();
    return search
      ? contacts.filter(contact => (
          contact.nom.toUpperCase().includes(search)
          || contact.prenom.toUpperCase().includes(search)
        ))
      : contacts
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
      match: { params: { id } },
      findEtudiants,
      getClass
    } = this.props
  
    this.id = id
    getClass(id);
    findEtudiants({ classeId: id })
  }

  onSearchInputChange (event)  {
    this.setState({ search: event.target.value });
  }

  deleteEtudiant(etudiant) {
    const { deleteEtudiant, findEtudiants } = this.props;
    
    deleteEtudiant(etudiant)
      .then(() => findEtudiants({ classeId: this.id }))
      .catch(err => console.log('delete student error', err))
  }

  render() {
    const { etudiants, classe } = this.props;
    const { search, selectedId } = this.state;

    const selected = etudiants.filter(etudiant=>(etudiant._id === selectedId))

    const selectedEtudiant = selected.length ? selected[0] : 'no etudiant selectioner';

    const etudiantsFiltered = filterContacts(etudiants, search);

    return (
      <div>
      {classe && (
        <Card
          title={`Classe: ${classe.filiere} ${classe.annee}`}
          extra={<RegisterForm classe={classe} />}
          bordered
        >
          <Content style={{ padding: '0 10px' }}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sider width={250} style={{ background: '#fff' }}>
                <Row>
                  <ContactSearch value={search} onSearchInputChange={this.onSearchInputChange} />
                </Row>
                <List 
                  contacts={etudiantsFiltered}
                  handelSelect={ etudiant => {
                      this.setState({selectedId: etudiant._id});
                  }}
                  selectedId={selectedId}
                />
              </Sider>
              <Content style={{ padding: '20px 80px', minHeight: 280, borderLeft:'1px solid rgba(128, 128, 128, 0.28)' }}>
                <Profile etudiant={selectedEtudiant}/>

                { (typeof selectedEtudiant === 'object') &&
                  <Popconfirm
                    title="Are you sure delete this task?"
                    okText="Oui"
                    cancelText="Non"
                    onConfirm={() => this.deleteEtudiant(selectedEtudiant) }
                  >
                    <Button type="danger" style={{marginTop: 30}}>Supprimer</Button>
                  </Popconfirm>
                }
              </Content>
            </Layout>
          </Content>
        </Card>
      )}
      </div>
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
    deleteEtudiant: etudiantDelete,
    getClass: classeGetById
  }
)(Classe);


