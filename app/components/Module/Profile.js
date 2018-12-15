import React from 'react';

import { Avatar, Row, Col} from 'antd';

const ProfProfile = ({module: _module, classe, prof}) => (
  <div>
    { (typeof _module === 'object') &&
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
          <h1>{_module.nom}</h1>
          <h3>Charge Horaire</h3>
          <p style={{ paddingLeft: '20px' }}>
            <strong>Cours: </strong>{_module.chargeHoraire.cours} <br/>
            <strong>TP: </strong>{_module.chargeHoraire.tp} <br/>
            <strong>TD: </strong>{_module.chargeHoraire.td}
          </p>
          { classe &&
            <h3>Classe: <strong>{classe.filiere} {classe.annee}</strong></h3>
          }
          {
            prof &&
            <h3>Prof: <strong>{prof.nom} {prof.prenom}</strong></h3>
          }
        </Col>
      </Row>
    }
  </div>
);

export default ProfProfile;