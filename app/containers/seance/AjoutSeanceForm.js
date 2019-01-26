import React, { Component } from 'react';
import { connect } from "react-redux";
 
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  DatePicker,
  message
} from 'antd';

import DynamicFieldSet from '../../components/DynamicFieldSet';
// import TaskList from '../../components/TaskList';

import { seancesFindByModule, seanceSave } from '../../actions/seance';
import Seance from '../../models/Seance'

const { TextArea } = Input;


class AjoutSeanceForm extends Component {
  state = {
    visible: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      module: { _id: moduleId },
      findByModule,
      form: { validateFields }
    } = this.props;

    validateFields((err, {name, description, date, taches, devoirs}) => {
      if (!err) {
        const seance = new Seance({
          moduleId,
          
          name,
          description,
          
          date: date.format('YYYY-MM-DD'),

          tasks: taches,
          assignments: devoirs,
        })

        seance.save()
          .then(() => {
            console.log('seance save', seance.toObject())
            this.setState({visible: false})
            return findByModule(moduleId) // update Module Seances list
          })
          .catch(saveError => console.error('Seance Save Error', saveError))

      }else{
        message.error('Seance Save ValidationError', err.message)
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
    const {
      form, 
      form : { getFieldDecorator, getFieldError, isFieldTouched },
    } = this.props;

    const {
      visible,
    } = this.state;
    
    const nameError = isFieldTouched('name') && getFieldError('name');
    // const leçonError = isFieldTouched('leçon') && getFieldError('leçon');
    // const devoirError = isFieldTouched('devoir') && getFieldError('devoir');
    const dateError = isFieldTouched('date') && getFieldError('date');
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
          visible={visible}
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
                      rules: [{ required: true, message: 'please enter name' }],
                    })(<Input placeholder="please enter name" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item 
                      label="Date"
                      validateStatus={dateError ? 'error' : ''}
                      help={dateError || ''}
                    >
                      {getFieldDecorator('date', {
                        rules: [{ required: true, message: 'please select Date' }],
                      })(<DatePicker />)}
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

              <DynamicFieldSet listName='taches' form={form}/>
              <DynamicFieldSet listName='devoirs' form={form}/>
                

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

const mapStateToProps = state => ({
  module: state.module.current,
});

export default connect(
  mapStateToProps,
  {
    findByModule: seancesFindByModule,
    save: seanceSave
  }
)(RegisterForm);