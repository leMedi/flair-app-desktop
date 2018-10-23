import React from 'react';

import { Avatar, Row, Col} from 'antd';



const ContactProfile = (props) => (
    <div>

        { props.selectedProf != 'no prof selectioner' &&
            <Row type="flex" >
            <Col span={8} order={3}>
            <Avatar size={64} icon="user" />
                <h1>{props.selectedProf.firstName} {props.selectedProf.lastName} </h1>
                <p>{props.selectedProf.email}</p>
            </Col>
            </Row>
        }

</div>
   


);

export default ContactProfile;