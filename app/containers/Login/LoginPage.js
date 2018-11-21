import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Alert, Icon, Form, Input, Button } from 'antd';
import styles from './LoginPage.less';

import { profLogin as _profLogin } from '../../actions/session'

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginPage extends Component {
  state = {
    autoLogin: true,
  };

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      profLogin,
      history,
      form: { validateFields }
    } = this.props
    
    const { autoLogin } = this.state

    validateFields((err, values) => {
      if (!err) {
        profLogin(values.email, values.password)
          .then((prof) => {
            history.push('/')
            return prof
          })
          .catch(() => null)
      }
    });
  }

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const {
      form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched },
      submitError
    } = this.props;

    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div className={styles.main}>
        {submitError && this.renderMessage(submitError)}
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
          >
            {getFieldDecorator('email', {
              rules: [
                { type: 'email', message: 'The email is not valid!' },
                { required: true, message: 'Please input your email!' },
              ],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
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
  { profLogin: _profLogin }
)(WrappedLoginPage);
