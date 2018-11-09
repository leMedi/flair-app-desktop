import React, { Component } from 'react';
import { List, message, Avatar, Spin } from 'antd';

class ModuleList extends React.Component {
  render() {
    return (
        <List style={{ margin: '20px' }}
            dataSource={this.props.modules}
            renderItem={item => (
                <List.Item
                    key={item._id}
                    onClick={()=>{console.log(item); this.props.handelSelect(item);}}
                    style={item._id == this.props.selectedId? { borderLeft:'3px solid #1890ff', paddingLeft: '20px' } : {}}
                >
                    <List.Item.Meta
                        avatar={<Avatar src="http://icons.iconarchive.com/icons/icojam/blue-bits/256/module-puzzle-icon.png" />}
                        title={item.name}
                    />
                </List.Item>
            )}
            >
        </List>
    );
  }
}
// 


export default ModuleList;