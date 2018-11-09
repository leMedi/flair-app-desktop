import React from 'react';
import { connect } from "react-redux";

import { Layout, Card, Row, Col , Button } from 'antd';

import ContactSearch from '../../components/contact/ContactSearch';
import EtudiantProfile from '../../components/contact/EtudiantProfile';
import ContactList from '../../components/contact/ContactList';
import RegisterForm from '../etudiant/AjoutEtudForm';

// redux
import { find as findEtudiants } from '../../actions/etudiant';
import { getById as getClassById } from '../../actions/classe';

const {  Content, Sider } = Layout;

function filterContacts(contacts, search) {
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
        const classId = this.props.match.params.id;
	    this.props.getClassById(classId);
        this.props.findEtudiants({ classe: classId })
    }

    onSearchInputChange (event)  {
        this.setState({ search: event.target.value });
    }

    render() {
        const selected = this.props.etudiants.filter(etudiant=>(etudiant._id === this.state.selectedId))

        const selectedEtudiant = selected.length ? selected[0] : 'no etudiant selectioner';


        const etudiants = filterContacts(this.props.etudiants, this.state.search);

        return (

            <Card bordered={false}>
                {this.props.classeEtudiant && (
                <Content style={{ padding: '0 10px' }}>
                    <h3>{this.props.classeEtudiant.name}</h3>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={250} style={{ background: '#fff' }}>
                            <Row>
                                <Col span={12}>
                                    <ContactSearch value={this.state.search} onSearchInputChange={this.onSearchInputChange} />
                                </Col>
                                <Col span={12}>
                                    <RegisterForm classe={this.props.classeEtudiant} />
                                </Col>
                            </Row>
                            <ContactList 
                                contacts={etudiants}
                                handelSelect={ etudiant => {
                                    this.setState({selectedId: etudiant._id});
                                }}
                                selectedId = {this.state.selectedId}
                            />
                        </Sider>
                        <Content style={{ padding: '0 80px', margin: '70px 80px' , minHeight: 280, borderLeft:'1px solid rgba(128, 128, 128, 0.28)' }}>
                            <EtudiantProfile classe={this.props.classeEtudiant} selectedEtudiant={selectedEtudiant}></EtudiantProfile>
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
    classeEtudiant: state.classe.classeCurrent
});

export default connect(
    mapStateToProps,
    { findEtudiants, getClassById }
)(Classe);


