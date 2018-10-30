import React, { Component } from 'react';

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Upload,Icon } from 'antd';

const { Option } = Select;

class AjoutClassForm extends React.Component {
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
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Filière">
                  {getFieldDecorator('filiere', {
                    rules: [{ required: true, message: 'please enter filiere' }],
                  })(<Input placeholder="please enter filiere" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="Année">
                  {getFieldDecorator('annee', {
                    rules: [{ required: true, message: 'please enter annee' }],
                  })(<Input placeholder="please enter annee" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
                  
              
              <Col span={12}>
                <Form.Item label="Nom">
                  {getFieldDecorator('Nom', {
                    rules: [{ required: true, message: 'please enter Nom' }],
                  })(<Input placeholder="Nom & Prénom" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="CNE">
                  {getFieldDecorator('CNE', {
                    rules: [{ required: true, message: 'please enter CNE' }],
                  })(<Input placeholder="please enter CNE" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
              <Form.Item
                label="Dragger"
              >
                <div className="dropbox">
                  {getFieldDecorator('dragger', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                  })(
                    <Upload.Dragger name="files" action="/upload.do">
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                  )}
                </div>
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
            <Button onClick={this.onClose} type="primary">Ajouter</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const RegisterForm = Form.create()(AjoutClassForm);

export default RegisterForm;