import React from 'react';
import { connect } from "react-redux";

import { Drawer, Form, Button, Col, Row, Input, Select, message } from 'antd';

import { moduleFind, moduleSave } from '../../actions/module';
import { classeFind } from '../../actions/classe';
import { profFind } from '../../actions/prof';


const { Option } = Select;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AjouterModuleForm extends React.Component {
  state = { visible: false };

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getAllClasses();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getAllProfs();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      form: { validateFields },
      getAllModules,
      saveModule,
    } = this.props;

    validateFields((validationError, _module) => {
      if (!validationError)
        saveModule({
          nom: _module.name,

          chargeHoraire: {
            cours: _module.hrsCours,
            td:_module.hrsTD,
            tp:_module.hrsTP,
          },

          classeId: _module.classe,
          profId: _module.professeur,
        })
          .then(() => {
            this.setState({visible: false})
            return getAllModules()
          })
          .catch(err=>message.error(err.message))
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
    const {
      form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched },
      classes,
      profs,
    } = this.props;
    
    const { visible } = this.state;

    const classeList = classes.map((classe) =>
      <Option key={classe._id}>
        {classe.filiere} {classe.annee}
      </Option>
    );

    const profList = profs.map((prof) =>
      <Option key={prof._id}>
        {prof.nom} {prof.prenom}
      </Option>
    );
    
    const nameError = isFieldTouched('name') && getFieldError('name');
    const hrsCoursError = isFieldTouched('hrsCours') && getFieldError('hrsCours');
    const hrsTDError = isFieldTouched('hrsTD') && getFieldError('hrsTD');
    const hrsTPError = isFieldTouched('hrsTP') && getFieldError('hrsTP');
    const professeurError = isFieldTouched('professeur') && getFieldError('professeur');
    const classeError = isFieldTouched('classe') && getFieldError('classe');
    
    
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer} style={{float: 'right'}}>
          Ajouter Module
        </Button>
        <Drawer
          title="Ajouter Module"
          width={720}
          placement="right"
          onClose={this.onClose}
          maskClosable={false}
          visible={visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col span={24}>
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
            </Row>
            <Row gutter={16}>
              <h3>La Charge Horaire</h3>
              <Col span={8}>
                <Form.Item 
                  label="Cours"
                  validateStatus={hrsCoursError ? 'error' : ''}
                  help={hrsCoursError || ''}
                >
                  {getFieldDecorator('hrsCours', {
                    initialValue: 10,
                    rules: [
                      { type: "number", message: 'Doit etre un nombre' },
                      { required: true, message: 'Field is required' }
                    ],
                  })( <Input />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item 
                  label="TD"
                  validateStatus={hrsTDError ? 'error' : ''}
                  help={hrsTDError || ''}
                >
                  {getFieldDecorator('hrsTD', {
                    initialValue: 10,
                    rules: [
                      { type: "number", message: 'Doit etre un nombre' },
                      { required: true, message: 'Field is required' }
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item 
                  label="TP"
                  validateStatus={hrsTPError ? 'error' : ''}
                  help={hrsTPError || ''}
                >
                  {getFieldDecorator('hrsTP', {
                    initialValue: 10,
                    rules: [
                      { type: "number", message: 'Doit etre un nombre' },
                      { required: true, message: 'Field is required' }
                    ],
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
  {
    getAllModules: moduleFind,
    saveModule: moduleSave,
    getAllClasses: classeFind,
    getAllProfs: profFind,
  }
)(RegisterForm);