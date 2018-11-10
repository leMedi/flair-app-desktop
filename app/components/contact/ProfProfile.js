import React from 'react';

import { Avatar, Row, Col, Tag} from 'antd';

const ProfProfile = (props) => (
  <div>
    {console.log(props)}
    { props.selectedProf != 'no prof selectioner' &&
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
          <h1>{props.selectedProf.firstName} {props.selectedProf.lastName} </h1>
          <p><strong>Email:  </strong>{props.selectedProf.email}</p>
          <p><strong>Tel:  </strong>+(212){props.selectedProf.phone}</p>
          <div><strong>Module:  </strong>
            {
              props.selectedModules.map((module) => (<Tag key={module._id} color="blue">{module.name}</Tag> ))
            }
          </div>
        </Col>
      </Row>
    }
  </div>
);

export default ProfProfile;