import React from 'react';

import { Avatar, Row, Col, Tag} from 'antd';

const ProfProfile = ({prof, modules}) => (
  <div>
    { (typeof prof === 'object') &&
      <Row type="flex" >
        <Col span={12} order={3}>
          <Avatar 
              size={84} 
              src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
              style={{
                  marginBottom:'20px',
                  marginLeft:'25px'
              }}
          />
          <h1>{prof.nom} {prof.prenom} </h1>
          <p><strong>Somme:  </strong>{prof.somme}</p>
          <div><strong>Module:  </strong>
            {
              modules.map(_module => (<Tag key={_module._id} color="blue">{_module.nom}</Tag> ))
            }
          </div>
        </Col>
      </Row>
    }
  </div>
);

export default ProfProfile;