import React from 'react';
import { connect } from "react-redux";

import { Drawer, Form, Button, Col, Row, Input } from 'antd';

import { etudiantFind, etudiantSave } from '../../actions/etudiant';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AjoutEtudForm extends React.Component {
  state = { visible: false };
  
  handleSubmit = (event) => {
    event.preventDefault();

    const {
      form: { validateFields },
      newEtudiant,
      fetchEtudiants,
      classe,
    } = this.props;

    validateFields((validationError, etudiant) => {
      if (!validationError)
      newEtudiant({
        ...etudiant,
        classeId: classe._id,
        password: 'NO_PASSWORD' // TODO: auto generate
      }) // add new student
      .then(() => fetchEtudiants({ classeId: classe._id })) // update students list
      .then(()=> this.setState({visible: false})) // hide form
      .catch(err=>console.error(err.message)) 
    });

  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    
    const {
      form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched },
      classe,
    } = this.props;

    const { visible } = this.state;
    
    const cneError = isFieldTouched('cne') && getFieldError('cne');
    const nomError = isFieldTouched('nom') && getFieldError('nom');
    const prenomError = isFieldTouched('prenom') && getFieldError('prenom');

    return (
      <div>
        <Button type="primary" onClick={this.showDrawer} style={{marginLeft: '100px'}}>
          Ajouter Etudiant
        </Button>
        <Drawer
          title="Ajouter Etudiant"
          width={720}
          placement="right"
          onClose={this.onClose}
          maskClosable={false}
          visible={visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  label="cne"
                  validateStatus={cneError ? 'error' : ''}
                  help={cneError || ''} 
                >
                  {getFieldDecorator('cne', {
                    rules: [{ required: true, message: 'please enter your cne' }],
                  })(<Input placeholder="13111278" />)}
                </Form.Item>
              </Col>
              <Col span={12}> 
                <Form.Item label="Classe">
                  <Input value={classe.filiere} disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  label="Nom"
                  validateStatus={nomError ? 'error' : ''}
                  help={nomError || ''}
                >
                  {getFieldDecorator('nom', {
                    rules: [{ required: true, message: 'please enter first name' }],
                  })(<Input placeholder="please enter first name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item 
                label="Last Name"
                validateStatus={prenomError ? 'error' : ''}
                help={prenomError || ''}
              >
                  {getFieldDecorator('prenom', {
                    rules: [{ required: true, message: 'please enter last name' }],
                  })(<Input placeholder="please enter last name" />)}
                </Form.Item>
              </Col>
            </Row>
            
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e8e8e8',
                padding: '10px 16px',
                textAlign: 'right',
                left: 0,
                background: '#fff',
                borderRadius: '0 0 4px 4px',
              }}
            >
              <Button
                style={{
                  marginRight: 8,
                }}
                onClick={this.onClose}
              >
                Cancel
              </Button>
              <Button 
                htmlType="submit"
                type="primary"
                onClick={this.handleSubmit}
                disabled={hasErrors(getFieldsError())}
              >
                Ajouter
              </Button>
            </div>
          </Form>
        </Drawer>
      </div>
    );
  }
}

const RegisterForm = Form.create()(AjoutEtudForm);

export default connect(
  null,
  { 
    fetchEtudiants: etudiantFind,
    newEtudiant: etudiantSave
  }
)(RegisterForm);