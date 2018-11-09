import React, { Component } from 'react';
import { connect } from "react-redux";

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';

import { find, save } from '../../actions/etudiant';

const { Option } = Select;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AjoutEtudForm extends React.Component {
  state = { visible: false };
  
  handleSubmit = (event) => {

    event.preventDefault();
    this.props.form.validateFields((err, etudiant) => {
      console.log('student form', etudiant)
      if (!err)
        this.props.save({
          ...etudiant,
          classe: this.props.classe._id // change classe name by it's id
        } ,  (err2, result) => {
          if (!err2) {
            console.log(result)
            // @TODO: clear form
            this.props.find({ classe: this.props.classe._id});
            this.setState({visible: false})
            console.log('Successfully added a student!');
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
    const classes = this.props.classes;
    const listItems = classes.map((classe) =>
      <Option key={classe._id}>
        {classe.filiere}
      </Option>
    );
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    
    const firstNameError = isFieldTouched('firstName') && getFieldError('firstName');
    const lastNameError = isFieldTouched('lastName') && getFieldError('lastName');
    const emailError = isFieldTouched('email') && getFieldError('email');
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
                    rules: [{ required: true, message: 'please enter first name' }],
                  })(<Input placeholder="please enter first name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item 
                label="Last Name"
                validateStatus={lastNameError ? 'error' : ''}
                help={lastNameError || ''}
              >
                  {getFieldDecorator('lastName', {
                    rules: [{ required: true, message: 'please enter last name' }],
                  })(<Input placeholder="please enter last name" />)}
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
                    rules: [{ required: true, message: 'please enter your email' }],
                  })(<Input placeholder="please enter email" />)}
                </Form.Item>
              </Col>
              <Col span={12}> 
                <Form.Item label="Classe">
                  <Input value={this.props.classe.filiere} disabled={true} />
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

const mapStateToProps = state => ({
  classes: state.classe.list
});

export default connect(
  mapStateToProps,
  { find, save }
)(RegisterForm);