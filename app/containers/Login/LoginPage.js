import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Alert, Icon, Form, Input, Button } from 'antd';
import styles from './LoginPage.less';

import { profLogin } from '../../actions/session'
import routes from '../../constants/routes.json'

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginPage extends Component {

  componentDidMount() {
    // To disabled submit button at the beginning.
    // eslint-disable-next-line react/destructuring-assignment
    this.props.form.validateFields()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const {
      login,
      history,
      form: { validateFields }
    } = this.props
    
    validateFields((err, {somme, password}) => {
      if (!err) {
        login(somme, password)
          // redirect to home
          .then(()=> history.push(routes.HOME))
          .catch()
      }
    });
  }

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const {
      form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched },
      submitError
    } = this.props;

    const sommeError = isFieldTouched('somme') && getFieldError('somme');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div className={styles.main}>
        {submitError && this.renderMessage(submitError)}
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem
            validateStatus={sommeError ? 'error' : ''}
            help={sommeError || ''}
          >
            {getFieldDecorator('somme', {
              rules: [
                { required: true, message: 'Numero de somme invalid' },
              ],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="somme" />
            )}
          </FormItem>
          <FormItem
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a style={{ float: 'right' }} href="">Forgot password</a>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              disabled={hasErrors(getFieldsError())}
            >
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedLoginPage = Form.create()(LoginPage);

const mapStateToProps = state => ({
  submitError: state.session.loginError
});

export default connect(
  mapStateToProps,
  { login: profLogin }
)(WrappedLoginPage);
