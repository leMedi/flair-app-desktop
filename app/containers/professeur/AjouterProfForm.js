import React from 'react';
import { connect } from "react-redux";

import { Drawer, Form, Button, Col, Row, Input } from 'antd';

import { profFind, profSave } from '../../actions/prof';


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AjouterProfForm extends React.Component {

  state = { 
    visible: false,
  };

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.form.validateFields();
  }

  handleSubmit = (event) => {
    event.preventDefault();

     const {
       form: { validateFields },
       AllProfs,
       newProf,
     } = this.props;

    validateFields((validationError, prof) => {
      if (!validationError)
        newProf(prof)
          .then(() => AllProfs())
          .then(this.onClose)
          .catch(err=>console.error(err))
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
      form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } 
    }= this.props;

    const { visible } = this.state;

    const nomError = isFieldTouched('nom') && getFieldError('nom');
    const prenomError = isFieldTouched('prenom') && getFieldError('prenom');
    const sommeError = isFieldTouched('somme') && getFieldError('somme');
    const password = isFieldTouched('password') && getFieldError('password');

    return (
      <div>
        <Button type="primary" onClick={this.showDrawer} style={{float: 'right'}}>
          Ajouter Prof
        </Button>
        <Drawer
          title="Ajouter Professeur"
          width={720}
          placement="right"
          onClose={this.onClose}
          maskClosable={false}
          visible={visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}>
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="somme"
                  validateStatus={sommeError ? 'error' : ''}
                  help={sommeError || ''}  
                >
                  {getFieldDecorator('somme', {
                    rules: [
                      { required: true, message: 'le numero de somme est invalid' },
                    ],
                  })(
                    <Input placeholder="numero de somme" onChange={this.handleChange} />
                  )}
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
                    rules: [{ required: true, message: 'le Nom est invalid' }],
                  })(
                    <Input placeholder="Hafidi" onChange={this.handleChange} />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                label="Prenom"
                validateStatus={prenomError ? 'error' : ''}
                help={prenomError || ''}
                >
                {getFieldDecorator('prenom', {
                    rules: [{ required: true, message: 'le Prenom est invalid' }],
                  })(
                    <Input placeholder="Imad" onChange={this.handleChange} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Mot de Pass"
                  validateStatus={password ? 'error' : ''}
                  help={password || ''}  
                >
                  {getFieldDecorator('password', {
                    rules: [
                      { required: true, message: 'Please provide a Password!' },
                      { min: 4, message: 'Password must be at least 4 chars!' },
                    ],
                  })(
                    <Input type="password" onChange={this.handleChange} />
                  )}
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
                Submit
              </Button>
            </div>
          </Form>
          
        </Drawer>
      </div>
    );
  }
}

const RegisterForm = Form.create()(AjouterProfForm);

export default connect(
  null,
  {
    AllProfs: profFind,
    newProf: profSave,
  }
)(RegisterForm);
