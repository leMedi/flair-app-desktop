import React, { Component } from 'react';
import { connect } from "react-redux";

import { Drawer, Form, Button, Col, Row, Input } from 'antd';

import { find, save } from '../../actions/prof';


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AjouterProfForm extends React.Component {
  state = { 
    visible: false,
  };

  handleSubmit = (event) => {

    event.preventDefault();
    this.props.form.validateFields((err, prof) => {
      if (!err)
        this.props.save(prof ,  (err2, result) => {
          if (!err2) {
            console.log(result)
            // @TODO: clear form
            this.props.find();
            this.setState({visible: false})
            console.log('Successfully added a prof!');
          }
        });
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
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const firstNameError = isFieldTouched('firstName') && getFieldError('firstName');
    const lastNameError = isFieldTouched('lastName') && getFieldError('lastName');
    const emailError = isFieldTouched('email') && getFieldError('email');

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
          visible={this.state.visible}
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
  { find, save }
)(RegisterForm);

// export default RegisterForm;