import React from 'react';
import { List, Avatar } from 'antd';

export default ({ contacts, selectedId, handelSelect }) => (
  <List
    style={{ margin: '20px 20px 0 0' }}
    dataSource={contacts}
    renderItem={etudiant => (
      <List.Item
        key={etudiant._id}
        onClick={()=>{handelSelect(etudiant); }}
        style={
          etudiant._id === selectedId
          ? { borderLeft: '3px solid #1890ff',  paddingLeft: '17px'}
          : { paddingLeft: '20px'}
        }
      >
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
          title={`${etudiant.nom} ${etudiant.prenom}`}
          description={etudiant.cne}
        />
      </List.Item>
    )}
  />
);

