import React, { Component } from 'react';
import { connect } from "react-redux";

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Upload,Icon } from 'antd';

import { find, save } from '../../actions/classe';

const { Option } = Select;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AjoutClassForm extends React.Component {
  state = { visible: false };

  handleSubmit = (event) => {

    event.preventDefault();
    this.props.form.validateFields((err, classe) => {
      if (!err)
        this.props.save(classe ,  (err2, result) => {
          if (!err2) {
            console.log(result)
            // @TODO: clear form
            this.props.find();
            this.setState({visible: false})
            console.log('Successfully added a classe!');
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
    
    const filiereError = isFieldTouched('filiere') && getFieldError('filiere');
    const anneeError = isFieldTouched('annee') && getFieldError('annee');
    const nameError = isFieldTouched('name') && getFieldError('name');
    
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer} style={{marginBottom: '20px'}}>
          Ajouter Classe
        </Button>
        <Drawer
          title="Ajouter Classe"
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
          <Form layout="vertical" hideRequiredMark hideRequiredMark onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  label="Filière"
                  validateStatus={filiereError ? 'error' : ''}
                  help={filiereError || ''}
                >
                  {getFieldDecorator('filiere', {
                    rules: [{ required: true, message: 'please enter filiere' }],
                  })(<Input placeholder="please enter filiere" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item 
                label="Année"
                validateStatus={anneeError ? 'error' : ''}
                help={anneeError || ''}
              >
                  {getFieldDecorator('annee', {
                    rules: [{ required: true, message: 'please enter annee' }],
                  })(<Input placeholder="please enter annee" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
                  
              
              <Col span={12}>
                <Form.Item 
                  label="Name"
                  validateStatus={nameError ? 'error' : ''}
                  help={nameError || ''}
                >
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'please enter Nom' }],
                  })(<Input placeholder="name" />)}
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

const RegisterForm = Form.create()(AjoutClassForm);

export default connect(
  null,
  { find, save }
)(RegisterForm);