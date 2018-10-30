import React, { Component } from 'react';

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';

const { Option } = Select;

class AjouterModuleForm extends React.Component {
  state = { visible: false };

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
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer} style={{marginLeft: '100px'}}>
          Ajouter Module
        </Button>
        <Drawer
          title="Ajouter Module"
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
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Name">
                  {getFieldDecorator('Name', {
                    rules: [{ required: true, message: 'please enter Name' }],
                  })(<Input placeholder="please enter Name" />)}
                </Form.Item>
              </Col>
              <Col span={4}>
              <Form.Item label="Nbr hrs Cours">
                  {getFieldDecorator('hrsCours', {
                    rules: [{ required: true, message: 'please enter last name' }],
                  })( <Input />)}
                </Form.Item>
              </Col>
              <Col span={4}>
              <Form.Item label="Nbrs hrs TD">
                  {getFieldDecorator('hrsTD', {
                    rules: [{ required: true, message: 'please enter last name' }],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={4}>
              <Form.Item label="Nbrs hrs TP">
                  {getFieldDecorator('hrsTP', {
                    rules: [{ required: true, message: 'please enter last name' }],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}> 
                <Form.Item label="Professeur">
                  {getFieldDecorator('Professeur', {
                    rules: [{ required: true, message: 'Please select an Professeur' }],
                  })(
                    <Select placeholder="Please select an Professeur">
                      <Option value="xiao">Xiaoxiao Fu</Option>
                      <Option value="mao">Maomao Zhou</Option>
                      <Option value="msqdao">Maomao Zhou</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}> 
                <Form.Item label="Classe">
                  {getFieldDecorator('Classe', {
                    rules: [{ required: true, message: 'Please select an Classe' }],
                  })(
                    <Select placeholder="Please select an Classe">
                      <Option value="xiao">Xiaoxiao Fu</Option>
                      <Option value="mao">Maomao Zhou</Option>
                      <Option value="msqdao">Maomao Zhou</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Description">
                  {getFieldDecorator('description', {
                    rules: [
                      {
                        required: true,
                        message: 'please enter url description',
                      },
                    ],
                  })(<Input.TextArea rows={4} placeholder="please enter url description" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
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
            <Button onClick={this.onClose} type="primary">Submit</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const RegisterForm = Form.create()(AjouterModuleForm);

export default RegisterForm;