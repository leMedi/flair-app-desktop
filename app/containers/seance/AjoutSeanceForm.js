import React, { Component } from 'react';
import { connect } from "react-redux";
 
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Upload, Icon, TimePicker } from 'antd';

import { find, save } from '../../actions/seance';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AjoutSeanceForm extends React.Component {
  state = { visible: false };

  handleSubmit = (event) => {

    event.preventDefault();
    this.props.form.validateFields((err, seance) => {
      if (!err)
        this.props.save({
          ...seance,
          semaineDebut: seance.semaine[0].format('YYYY-MM-DD'),
          semaineFin: seance.semaine[1].format('YYYY-MM-DD'),
          semaine: null
        },  (err2, result) => {
          if (!err2) {
            console.log(result)
            // @TODO: clear form
            this.props.find();
            this.setState({visible: false})
            console.log('Successfully added a Seance!');
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
    
    const nameError = isFieldTouched('name') && getFieldError('name');
    const leçonError = isFieldTouched('leçon') && getFieldError('leçon');
    const devoirError = isFieldTouched('devoir') && getFieldError('devoir');
    const semaineError = isFieldTouched('semaine') && getFieldError('semaine');
    const descriptionError = isFieldTouched('description') && getFieldError('description');
    
    
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer} style={{marginBottom: '20px'}}>
          Ajouter Seance
        </Button>
        <Drawer
          title="Ajouter Seance"
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
          <Form layout="vertical" hideRequiredMark  onSubmit={this.handleSubmit}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item 
                    label="Name"
                    validateStatus={nameError ? 'error' : ''}
                    help={nameError || ''}
                  >
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: 'please enter name' }],
                    })(<Input placeholder="please enter name" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item 
                  label="Leçon"
                  validateStatus={leçonError ? 'error' : ''}
                  help={leçonError || ''}
                >
                    {getFieldDecorator('leçon', {
                      rules: [{ required: true, message: 'please enter leçon' }],
                    })(<Input placeholder="please enter leçon" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                    
                
                <Col span={12}>
                  <Form.Item 
                    label="Devoir"
                    validateStatus={devoirError ? 'error' : ''}
                    help={devoirError || ''}
                  >
                    {getFieldDecorator('Devoir', {
                      rules: [{ required: true, message: 'please enter Devoir' }],
                    })(<Input placeholder="Devoir" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item 
                    label="Semaine"
                    validateStatus={semaineError ? 'error' : ''}
                    help={semaineError || ''}
                  >
                    {getFieldDecorator('semaine', {
                      rules: [{ required: true, message: 'please select Week' }],
                    })(<RangePicker />)}
                </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item 
                      label="Description"
                      validateStatus={descriptionError ? 'error' : ''}
                      help={descriptionError || ''}
                    >
                      {getFieldDecorator('description', {
                        rules: [{  message: 'please enter description' }],
                      })(<TextArea rows={4} />)}
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

const RegisterForm = Form.create()(AjoutSeanceForm);


export default connect(
  null,
  { find, save }
)(RegisterForm);