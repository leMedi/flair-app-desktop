import React, { Component } from 'react';

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';

import { save } from '../../models/Prof';

const { Option } = Select;

class AjouterProfForm extends React.Component {
  state = { 
    visible: false,
    prof: {
      firstName: '',
      lastName: '',
      email: ''
    }
  };
  //----------------------------------------------------------------------------------------------------------

  //---- chuf had handleSubmit bach njib les elements mn input jerabtha b event (name) dima kayb9a state f etat 9dima

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ 
      visible: false,
      prof: {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value
      }
      
    });
  
    
    console.log(this.state);

    save(this.state.prof , function callback(err, result) {
      if (!err) {
        console.log('Successfully added a prof!');
      }
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
    const { getFieldDecorator } = this.props.form;
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
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="First Name">
                  {getFieldDecorator('firstName', {
                      rules: [{ required: true, message: 'Please enter fisrtNmae' }],
                    })(
                      <Input placeholder="please enter last name" />
                    )}
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="Last Name">
                  {getFieldDecorator('lastName', {
                      rules: [{ required: true, message: 'Please enter lastName' }],
                    })(
                      <Input placeholder="please enter last name" />
                    )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
                  
              {/* <Col span={12}> 
                <Form.Item label="Owner">
                  {getFieldDecorator('owner', {
                    rules: [{ required: true, message: 'Please select an owner' }],
                  })(
                    <Select placeholder="Please select an owner">
                      <Option value="xiao">Xiaoxiao Fu</Option>
                      <Option value="mao">Maomao Zhou</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col> */}
              <Col span={12}>
                <Form.Item label="Email">
                  {getFieldDecorator('email', {
                      rules: [{ required: true, message: 'Please choose the addresse' }],
                    })(
                      <Input placeholder="please enter first name" />
                    )}
                </Form.Item>
              </Col>
               <Col span={12}>
              {/* <Form.Item label="Phone number">
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'please enter phone number' }],
                  })(<Input placeholder="please enter phone number" />)}
                </Form.Item> */}
              </Col>
            </Row>
            {/*<Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Addresse">
                  {getFieldDecorator('addresse', {
                    rules: [{ required: true, message: 'Please choose the addresse' }],
                  })(
                    <Input placeholder="please enter Adresse" />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="DateTime">
                  {getFieldDecorator('dateTime', {
                    rules: [{ required: true, message: 'Please choose the dateTime' }],
                  })(
                    <DatePicker.RangePicker
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
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
            </Row> */}
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
            <Button onClick={ this.handleSubmit } type="primary">Submit</Button>
          </div>
        </Drawer>
      </div>
    );
  }


}
//this.onClose

//------------------ hada khdamme -------//

// var prof = {}

// const handleSubmit = (event) => {
//   event.preventDefault();
  
//   prof = {
//     firstName: document.getElementById('firstName').value,
//     lastName: document.getElementById('lastName').value,
//     email: document.getElementById('email').value,
//   }

//   console.log(prof);
//   save(prof , function callback(err, result) {
//     if (!err) {
//       console.log('Successfully added a prof!');
//     }
//   });
// }
  


const RegisterForm = Form.create()(AjouterProfForm);

export default RegisterForm;