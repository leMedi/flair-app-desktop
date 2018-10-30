import React, { Component } from 'react';
import { List, message, Avatar, Spin } from 'antd';

class ContactList extends React.Component {
  render() {
    return (
        <List style={{ margin: '20px' }}
        dataSource={this.props.contacts}
        renderItem={item => (
            <List.Item
                key={item.id}
                onClick={()=>{console.log(item); this.props.handelSelect(item.id)}}
                 style={item.id == this.props.selectedId ? { borderLeft:'3px solid #1890ff', paddingLeft: '20px' } : {}}
            >
                <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={item.lastName}
                    description={item.email}
                />
            </List.Item>
        )}
        >
        </List>
    );
  }
}

export default ContactList;