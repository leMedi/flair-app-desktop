import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '+212',
    })(
      <Select style={{ width: 70 }}>
        <Option value="212">+212</Option>
        <Option value="33">+33</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));







    return (
        <Card bordered={false}>
            <Form onSubmit={this.handleSubmit}>

                <FormItem
                {...formItemLayout}
                label="FirstName"
                >
                {getFieldDecorator('FirstName', {
                    rules: [{ required: true, message: 'Please input your FirstName!', whitespace: true }],
                })(
                    <Input />
                )}
                </FormItem>

                <FormItem
                {...formItemLayout}
                label="LastName"
                >
                {getFieldDecorator('LastName', {
                    rules: [{ required: true, message: 'Please input your LastName!', whitespace: true }],
                })(
                    <Input />
                )}
                </FormItem>

                <FormItem
                {...formItemLayout}
                label="E-mail"
                >
                {getFieldDecorator('email', {
                    rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                    required: true, message: 'Please input your E-mail!',
                    }],
                })(
                    <Input />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="Password"
                >
                {getFieldDecorator('password', {
                    rules: [{
                    required: true, message: 'Please input your password!',
                    }, {
                    validator: this.validateToNextPassword,
                    }],
                })(
                    <Input type="password" />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="Confirm Password"
                >
                {getFieldDecorator('confirm', {
                    rules: [{
                    required: true, message: 'Please confirm your password!',
                    }, {
                    validator: this.compareToFirstPassword,
                    }],
                })(
                    <Input type="password" onBlur={this.handleConfirmBlur} />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label={(
                    <span>
                    Nickname&nbsp;
                    <Tooltip title="What do you want others to call you?">
                        <Icon type="question-circle-o" />
                    </Tooltip>
                    </span>
                )}
                >
                {getFieldDecorator('nickname', {
                    rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(
                    <Input />
                )}
                </FormItem>

                <FormItem
                {...formItemLayout}
                label="Adresse"
                >
                {getFieldDecorator('Adresse', {
                    rules: [{ required: true, message: 'Please input your Adresse!', whitespace: true }],
                })(
                    <Input />
                )}
                </FormItem>
                
                <FormItem
                {...formItemLayout}
                label="Phone Number"
                >
                {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                })(
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
                </FormItem>
                
                
                
                <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
      </Card>
    );
  }
}

const AjouterProf = Form.create()(RegistrationForm);

export default AjouterProf;















