import React, { Component } from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import List from './List';

const FormItem = Form.Item;

class Tasks extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  onSubmit = (event) => {
    event.preventDefault();
    
    
    this.props.form.validateFields((err, { name }) => {
      if (!err)
        this.props.onNew(name);
    });
    
  }

  render() {
    const { getFieldDecorator, isFieldTouched, getFieldError } = this.props.form;
    
    const nameError = isFieldTouched('name') && getFieldError('name');
    
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormItem
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 16 },
            }}
            extra="We must make sure that your are a human."
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
          >
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '!! required !!' }],
                })(
                  <Input />
                )}
              </Col>
              <Col span={12}>
                <Button icon="download">Ajouter</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
        <List items={this.props.list} />
      </div>
    );
  }
}

const WrappedTasks = Form.create()(Tasks);

export default WrappedTasks;