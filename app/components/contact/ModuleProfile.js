import React from 'react';

import { Avatar, Row, Col, Tag} from 'antd';

const ModuleProfile = (props) => (
  <div>
  { props.selectedModule != 'no module selectioner' &&
    <Row type="flex" >
      <Col span={12} order={3}>
        <Avatar size={64} src="http://icons.iconarchive.com/icons/icojam/blue-bits/256/module-puzzle-icon.png"/>
        <h1>{props.selectedModule.name}</h1>
        {(props.prof && (
          <div><strong>Professeur:  </strong> {props.prof.firstName} {props.prof.lastName} 
          </div>
        ))}
        {(props.classe && (
          <div><strong>Classe:  </strong>{props.classe.name} 
          </div>
        ))}
        <div>
          <strong>Cours: </strong><Tag color="blue">{props.selectedModule.hrsCours}h</Tag>
          <strong>TD:  </strong><Tag color="blue">{props.selectedModule.hrsTD}h</Tag>
          <strong>TP:  </strong><Tag color="blue">{props.selectedModule.hrsTP}h</Tag>
        </div>
      </Col>
    </Row>
  }
</div>
);

export default ModuleProfile;