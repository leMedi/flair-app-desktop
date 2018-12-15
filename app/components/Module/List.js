import React from 'react';
import { List, Avatar } from 'antd';

export default ({ modules, selectedId, handelSelect }) => (
  <List
    style={{ margin: '20px 20px 0 0' }}
    dataSource={modules}
    renderItem={_module => (
      <List.Item
        key={_module._id}
        onClick={()=>{handelSelect(_module); }}
        style={
          _module._id === selectedId
          ? { borderLeft: '3px solid #1890ff',  paddingLeft: '17px'}
          : { paddingLeft: '20px'}
        }
      >
        <List.Item.Meta
          avatar={
            <Avatar style={{
                backgroundColor: "#00a2ae",
                verticalAlign: 'middle'
              }}
              size="large"
            >
              {_module.nom}
            </Avatar>
          }
          title={_module.nom}
          description={_module.profId ? 'prof' : 'pas encore assigner'}
        />
      </List.Item>
    )}
  />
);

