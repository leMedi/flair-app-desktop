import React from 'react';

import { Avatar, Row, Col} from 'antd';

const ProfProfile = ({ etudiant }) => (
  <div>
    { (typeof etudiant === 'object') &&
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
          <h1>{etudiant.nom} {etudiant.prenom}</h1>
          <h4><strong>CNE:  </strong>{etudiant.cne}</h4>
        </Col>
      </Row>
    }
  </div>
);

export default ProfProfile;