import React from 'react';
import { List, Avatar } from 'antd';

const isAdmin = role => role === 'admin'

export default ({ contacts, selectedId, handelSelect }) => (
  <List
    style={{ margin: '20px 20px 0 0' }}
    dataSource={contacts}
    renderItem={prof => (
      <List.Item
        key={prof._id}
        onClick={()=>{handelSelect(prof); }}
        style={
          prof._id === selectedId
          ? { borderLeft: '3px solid #1890ff',  paddingLeft: '17px'}
          : { paddingLeft: '20px'}
        }
      >
        <List.Item.Meta
          avatar={
            <Avatar style={{
                backgroundColor: isAdmin(prof.role) ? "#e74c3c" : "#00a2ae",
                verticalAlign: 'middle'
              }}
              size="large"
            >
              {prof.nom}
            </Avatar>
          }
          title={`${prof.nom} ${prof.prenom}`}
          description={prof.somme}
        />
      </List.Item>
    )}
  />
);

