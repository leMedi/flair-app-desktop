import React from 'react';

import ContactSearch from '../../components/contact/ContactSearch';
import ContactProfile from '../../components/contact/ContactProfile';
import ContactList from '../../components/contact/ContactList';
import RegisterForm from './AjouterModuleForm';

import { Layout, Card, Row, Col , Button } from 'antd';

const {  Content, Sider } = Layout;

const profs = [
    {
        id: 1,
        firstName: 'fgfg',
        lastName: '2122',
        email: "norman.weaver@example.com",
    },
    {
        id: 11,
        firstName: 'test1',
        lastName: 'last1',
        email: "norman.weaver@example.com",
    },
    {
        id: 12,
        firstName: 'test2',
        lastName: 'last1',
        email: "norman.weaver@example.com",
    },
    {
        id: 13,
        firstName: 'test3',
        lastName: 'last1',
        email: "norman.weaver@example.com",
    },
    {
        id: 19,
        firstName: 'test4',
        lastName: 'last1',
        email: "norman.weaver@example.com",
    }
]

function filterContacts(contacts, search) {
    search = search.toUpperCase();
    return search
      ? contacts.filter(contact => contact.lastName.toUpperCase().includes(search))
      : contacts;
}

class Index extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          selectedId: -1,
          search: '',
          profs: profs,
        }
        this.onSearchInputChange = this.onSearchInputChange.bind(this);

    }

    onSearchInputChange (event)  {
        this.setState({ search: event.target.value });
    }

 

      
    render() {

        const selected = this.state.profs.filter(prof=>(prof.id === this.state.selectedId))

        const selectedProf = selected.length ? selected[0] : 'no prof selectioner';
        //console.log('selectedProf', selectedProf)

        const profs = filterContacts(this.state.profs, this.state.search);

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
                                contacts={profs}
                                handelSelect={ id => {
                                    this.setState({selectedId: id});
                                }}
                                selectedId = {this.state.selectedId}
                            />
                        </Sider>
                        <Content style={{ padding: '0 80px', margin: '70px 80px' , minHeight: 280, borderLeft:'1px solid rgba(128, 128, 128, 0.28)' }}>
                            <ContactProfile selectedProf = {selectedProf}></ContactProfile>
                        </Content>
                    </Layout>
                </Content>
                    
            </Card>

        )
    };

} 

export default Index;


