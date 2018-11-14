import React, { Component } from 'react';
import { connect } from "react-redux";

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';

import { find, save } from '../../actions/module';
import { find as findClasse } from '../../actions/classe';
import { find as findProf } from '../../actions/prof';


const { Option } = Select;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AjouterModuleForm extends React.Component {
  state = { visible: false };

  handleSubmit = (event) => {

    event.preventDefault();
    this.props.form.validateFields((err, module) => {
      if (!err)
        this.props.save(module ,  (err2, result) => {
          if (!err2) {
            console.log(result)
            // @TODO: clear form
            this.props.find();
            this.setState({visible: false})
            console.log('Successfully added a module!');
          }
        });
      console.log(module);
    });

  }
  componentDidMount() {
    this.props.findClasse();
    this.props.findProf();
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
    const hrsCoursError = isFieldTouched('hrsCours') && getFieldError('hrsCours');
    const hrsTDError = isFieldTouched('hrsTD') && getFieldError('hrsTD');
    const hrsTPError = isFieldTouched('hrsTP') && getFieldError('hrsTP');
    const professeurError = isFieldTouched('professeur') && getFieldError('professeur');
    const classeError = isFieldTouched('classe') && getFieldError('classe');
    
    const classes = this.props.classes;
    const classeList = classes.map((classe) =>
      <Option key={classe._id}>
        {classe.filiere}
      </Option>
    );

    const profs = this.props.profs;
    const profList = profs.map((prof) =>
      <Option key={prof._id}>
        {prof.lastName}
      </Option>
    );
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
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  label="Name"
                  validateStatus={nameError ? 'error' : ''}
                  help={nameError || ''}
                >
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'please enter Name' }],
                  })(<Input placeholder="please enter Name" />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item 
                  label="Nbr hrs Cours"
                  validateStatus={hrsCoursError ? 'error' : ''}
                  help={hrsCoursError || ''}
                >
                  {getFieldDecorator('hrsCours', {
                    rules: [{ required: true, message: 'Field is required' }],
                  })( <Input />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item 
                  label="Nbrs hrs TD"
                  validateStatus={hrsTDError ? 'error' : ''}
                  help={hrsTDError || ''}
                >
                  {getFieldDecorator('hrsTD', {
                    rules: [{ required: true, message: 'Field is required' }],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item 
                  label="Nbrs hrs TP"
                  validateStatus={hrsTPError ? 'error' : ''}
                  help={hrsTPError || ''}
                >
                  {getFieldDecorator('hrsTP', {
                    rules: [{ required: true, message: 'Field is required' }],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}> 
                <Form.Item 
                  label="Professeur"
                  validateStatus={professeurError ? 'error' : ''}
                  help={professeurError || ''}
                >
                  {getFieldDecorator('professeur', {
                    rules: [{ required: true, message: 'Please select a Professeur' }],
                  })(
                    <Select placeholder="Please select an Professeur">
                      {profList}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}> 
                <Form.Item 
                  label="Classe"
                  validateStatus={classeError ? 'error' : ''}
                  help={classeError || ''}
                >
                  {getFieldDecorator('classe', {
                    rules: [{ required: true, message: 'Please select a Classe' }],
                  })(
                    <Select placeholder="Please select an Classe">
                      {classeList}
                    </Select>
                  )}
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
                Submit
              </Button>
            </div>
          </Form>
        </Drawer>
      </div>
    );
  }
}

const RegisterForm = Form.create()(AjouterModuleForm);

const mapStateToProps = state => ({
  classes: state.classe.list,
  profs: state.prof.list
});

export default connect(
  mapStateToProps,
  { find, save, findClasse, findProf}
)(RegisterForm);