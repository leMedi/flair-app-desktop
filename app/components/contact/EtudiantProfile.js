import React from 'react';

import { Avatar, Row, Col, Tag} from 'antd';



const EtudiantProfile = (props) => (
    <div>
        { props.selectedEtudiant != 'no etudiant selectioner' &&
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
                    <h1>{props.selectedEtudiant.firstName} {props.selectedEtudiant.lastName} </h1>
                    <p><strong>Email:  </strong>{props.selectedEtudiant.email}</p>
                    {(props.classe && (
                    <div><strong>Classe:  </strong><Tag color="blue"> {props.classe.name} </Tag></div>
                    ))}
                    
                </Col>
            </Row>
        }
    </div>

   


);

export default EtudiantProfile;