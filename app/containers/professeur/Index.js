import React from 'react';

import ContactSearch from '../../components/contact/ContactSearch';
import ContactProfile from '../../components/contact/ContactProfile';
import ContactList from '../../components/contact/ContactList';

import { Row, Col } from 'antd';

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

        // const selectedProf = this.state.selectedIndex >= 0
        // ? this.state.profs[this.state.selectedIndex]
        // : null;

        const selected = this.state.profs.filter(prof=>(prof.id === this.state.selectedId))

        const selectedProf = selected.length ? selected[0] : 'no prof selectioner';
        //console.log('selectedProf', selectedProf)

        const profs = filterContacts(this.state.profs, this.state.search);

        return (

            <div>
                <Row>
                    <Col span={8}>
                        <ContactSearch value={this.state.search} onSearchInputChange={this.onSearchInputChange} />
                        <ContactList
                            contacts={profs}
                            handelSelect={ id => {
                                this.setState({selectedId: id});
                            }}
                        />
                    </Col>
                    <Col span={16}> <ContactProfile selectedProf = {selectedProf}></ContactProfile> </Col>
                    {/* <Col span={16}> <ContactProfile /> </Col> */}
                </Row>
            </div>

        )
    };

} 

export default Index;


