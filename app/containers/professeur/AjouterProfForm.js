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
          .then(AllProfs)
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

    const firstNameError = isFieldTouched('firstName') && getFieldError('firstName');
    const lastNameError = isFieldTouched('lastName') && getFieldError('lastName');
    const emailError = isFieldTouched('email') && getFieldError('email');
    const phoneError = isFieldTouched('phone') && getFieldError('phone');
    const password = isFieldTouched('password') && getFieldError('phone');

    return (
      <div>
        <Button type="primary" onClick={this.showDrawer} style={{marginLeft: '100px'}}>
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
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  validateStatus={firstNameError ? 'error' : ''}
                  help={firstNameError || ''}
                >
                  {getFieldDecorator('firstName', {
                    rules: [{ required: true, message: 'Please enter fisrtName' }],
                  })(
                    <Input placeholder="please enter your first name" onChange={this.handleChange} />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                label="Last Name"
                validateStatus={lastNameError ? 'error' : ''}
                help={lastNameError || ''}
                >
                {getFieldDecorator('lastName', {
                    rules: [{ required: true, message: 'Please enter lastName' }],
                  })(
                    <Input placeholder="please enter last name" onChange={this.handleChange} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  validateStatus={emailError ? 'error' : ''}
                  help={emailError || ''}  
                >
                  {getFieldDecorator('email', {
                    rules: [
                      { type: 'email', message: 'The input is not valid E-mail!' },
                      { required: true, message: 'Please input your E-mail!' },
                    ],
                  })(
                    <Input placeholder="please enter email" onChange={this.handleChange} />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mot de Pass"
                  validateStatus={password ? 'error' : ''}
                  help={password || ''}  
                >
                  {getFieldDecorator('password', {
                    rules: [
                      { required: true, message: 'Please provide a Password!' },
                    ],
                  })(
                    <Input type="password" onChange={this.handleChange} />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  validateStatus={phoneError ? 'error' : ''}
                  help={phoneError || ''}  
                >
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Please enter the phone number' }],
                  })(
                    <Input placeholder="please enter phone" onChange={this.handleChange} />
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
