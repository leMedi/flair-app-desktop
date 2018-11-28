import React from 'react';

import { Avatar, Row, Col, Tag} from 'antd';

const ProfProfile = ({selectedProf, selectedModules}) => (
  <div>
    { selectedProf !== 'no prof selectioner' &&
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
          <h1>{selectedProf.firstName} {selectedProf.lastName} </h1>
          <p><strong>Email:  </strong>{selectedProf.email}</p>
          <p><strong>Tel:  </strong>+(212){selectedProf.phone}</p>
          <div><strong>Module:  </strong>
            {
              selectedModules.map(_module => (<Tag key={_module._id} color="blue">{_module.name}</Tag> ))
            }
          </div>
        </Col>
      </Row>
    }
  </div>
);

export default ProfProfile;