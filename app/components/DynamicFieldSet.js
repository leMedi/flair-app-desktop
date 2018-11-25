import React from 'react'
import { Form, Input, Icon, Button } from 'antd';

const FormItem = Form.Item;

class DynamicFieldSet extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.keys = `${this.props.listName}-keys`;
  }
  
  keys

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue(this.keys);
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      [this.keys]: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue(this.keys);
    const nextKeys = keys.concat(keys.length);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      [this.keys]: nextKeys,
    });
  }

  render() {
    const {
      listName,
      form: { getFieldDecorator, getFieldValue }
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator(this.keys, { initialValue: [] });
    const keys = getFieldValue(this.keys);
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? listName : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`${listName}[${k}]`, {
            rules: [{
              required: true,
              message: "Please fill input or delete this field.",
            }],
          })(
            <Input style={{ width: '60%', marginRight: 8 }} />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });
    return (
      <div>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
      </div>
    );
  }
}

export default DynamicFieldSet;