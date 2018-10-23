import React, { Component } from 'react';
import { List, message, Avatar, Spin } from 'antd';
import './ContactList.css';

class ContactList extends React.Component {
  render() {
    return (
        <List
        dataSource={this.props.contacts}
        // renderItem={ item=>( <li onClick={()=>{console.log(item); this.props.handelSelect(item.id)}}>{item.id}</li>)}
        renderItem={item => (
            <List.Item
                key={item.id}
                onClick={()=>{console.log(item); this.props.handelSelect(item.id)}}
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