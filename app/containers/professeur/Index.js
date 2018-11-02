import React from 'react';
import { connect } from "react-redux";

import { Layout, Card, Row, Col } from 'antd';

import ContactSearch from '../../components/contact/ContactSearch';
import ContactProfile from '../../components/contact/ContactProfile';
import ContactList from '../../components/contact/ContactList';
import RegisterForm from './AjouterProfForm';

// redux
import { find } from '../../actions/prof';
import { save } from '../../models/Prof';

const {  Content, Sider } = Layout;

function filterContacts(contacts, search) {
    search = search.toUpperCase();
    return search
      ? contacts.filter(contact => contact.lastName.toUpperCase().includes(search))
      : contacts;
}

// var prof = {
//     firstName: 'achraf',
//     lastName: 'jacobi',
//     email: 'achraf@jacobi.com'
// };

// save(prof, function callback(err, result) {
//     if (!err) {
//       console.log('Successfully added a prof!');
//     }
// });

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
			this.props.find()
    }

    onSearchInputChange (event)  {
        this.setState({ search: event.target.value });
    }

    render() {

        const selected = this.props.profs.filter(prof=>(prof._id === this.state.selectedId))

        const selectedProf = selected.length ? selected[0] : 'no prof selectioner';
        //console.log('selectedProf', selectedProf)

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


const mapStateToProps = state => ({
  profs: state.prof.list
});

export default connect(
  mapStateToProps,
  { find }
)(Index);



