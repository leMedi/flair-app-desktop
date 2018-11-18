import React from 'react';
import { connect } from "react-redux";

import { Layout, Card, Row, Col , Button } from 'antd';
import { List, message, Avatar, Spin } from 'antd';

import ContactSearch from '../../components/contact/ContactSearch';
import ContactList from '../../components/contact/ContactList';
import ModuleProfile from '../../components/contact/ModuleProfile';
import ModuleList from '../../components/contact/ModuleList';
import RegisterForm from './AjouterModuleForm';

// redux
import { find } from '../../actions/module';
import { getById as getClasseById } from '../../actions/classe';
import { getById as getProfById } from '../../actions/prof';

const {  Content, Sider } = Layout;

function filterContacts(contacts, search) {
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
	    this.props.find()
    }

    onSearchInputChange (event)  {
        this.setState({ search: event.target.value });
    }

    render() {

        const selected = this.props.modules.filter(module=>(module._id === this.state.selectedId))

        const selectedModule = selected.length ? selected[0] : 'no module selectioner';
        const modules = filterContacts(this.props.modules, this.state.search);
        console.log("props", this.props.modules);
        console.log("module", modules);

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

                            <ModuleList
                                modules={modules}
                                handelSelect={ module => {
                                    this.setState({selectedId: module._id});
                                    this.props.getClasseById(module.classe);
                                    this.props.getProfById(module.professeur);
                                }}
                                selectedId = {this.state.selectedId} 
                            />
                        </Sider>
                        <Content style={{ padding: '0 80px', margin: '70px 80px' , minHeight: 280, borderLeft:'1px solid rgba(128, 128, 128, 0.28)' }}>
                            <ModuleProfile selectedModule={selectedModule} classe={this.props.classeModule} prof={this.props.profModule} />
                        </Content>
                    </Layout>
                </Content>
                    
            </Card>
        )
    };
} 

const mapStateToProps = state => ({
    modules: state.module.list,
    classeModule: state.classe.classeCurrent,
    profModule: state.prof.profCurrent
  });

  export default connect(
    mapStateToProps,
    { find, getClasseById, getProfById }
  )(Index);


