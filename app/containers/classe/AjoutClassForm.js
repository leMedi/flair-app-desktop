import React from 'react';
import { connect } from "react-redux";
import XLSX from 'xlsx';
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Upload,
  Icon,
  Switch,
  message,
} from 'antd';

import { classeFind, classeSave } from '../../actions/classe';
import Etudiant from '../../models/Etudiant';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function beforeUpload(file) {
  const allowedMimeTypes = [
    'application/vnd.ms-excel',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

    'text/csv'
  ]

  const isXsls = allowedMimeTypes.includes(file.type);

  if (!isXsls) {
    message.error('You can only upload JPG file!');
  }
 
  return isXsls;
}

function xlsToJson(xlsFilePath) {
  const workbook = XLSX.readFile(xlsFilePath)
  return XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
}

class AjoutClassForm extends React.Component {

  state = {
    visible: false,
    
    isXlsFile: false,
    xlsFile: null,
    xlsFileError: null,
    loadingXslFile: false,
  };
  
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.form.validateFields();
  }

  xlsJsonData = null;

  uploaderHandleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loadingXslFile: true });
      return;
    }
    if (info.file.status === 'done') {
      try{
        this.xlsJsonData = xlsToJson(info.file.originFileObj.path);
        this.setState({
          xlsFile: {
            name: info.file.name,
            path: info.file.originFileObj.path,
          },
          loadingXslFile: false,
          xlsFileError: null,
        });
        console.log(this.xlsJsonData)
      }catch(e){
        this.setState({
          xlsFile: null,
          loadingXslFile: false,
          xlsFileError: e.message
        });
      }
      
    }
  }

  parseXSLS(jsonData, colNames) {
    let isAllOk = true
    const etudiants = this.xlsJsonData.map((e, i) => {
      const _etudiant = {
        type: 'etudiant',

        cne: '' + e[colNames.cne],

        nom: e[colNames.nom],
        prenom: e[colNames.prenom],

        password: 'helloWorld', // TODO: random generate

        classeId: 'NO_CLASSE_YET'
      }
      
      if (_etudiant.cne && _etudiant.nom && _etudiant.prenom && _etudiant.password && _etudiant.classeId) {
        return _etudiant
      }

      isAllOk = false
      message.error(`etudiant ${i} n'est pas valide cne: ${_etudiant.cne} - nom: ${_etudiant.nom}` )
      return false
    })
    return isAllOk ? etudiants: false
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { isXlsFile, xlsFile } = this.state;
    const {
      form: { validateFields },
      getAllClasses, saveClass
    } = this.props;
    
    console.log("handlesubmit")

    if(isXlsFile && !xlsFile) {
      this.setState({ xlsFileError: 'please provide an excel file'});
      console.log("handlesubmit please rovide")

    }else
    console.log("handlesubmit else")

      validateFields((validationError, formData) => {
    console.log("validateFields ", validationError)

        if (!validationError) {

         console.log("validateFields good")

          let etudiants;
          
          if(isXlsFile)
          console.log("isXlsFile good", isXlsFile)
            // get data from excel
            etudiants = this.parseXSLS(
              this.xlsJsonData,
              { cne: formData.cneColName, nom: formData.nomColName, prenom: formData.prenomColName}
            )
          
            if(etudiants)
              saveClass({
                filiere: formData.filiere,
                annee: formData.annee
              }).then(classe =>{
                console.log("classe", classe)

                if(!isXlsFile)
                  return false
                etudiants = etudiants.map((e) => { e.classeId = classe.get('_id'); return e; }) // set class if for students
                console.log("etudiants", etudiants)
                return Etudiant.bulkSave(etudiants)
              }).then(()=>{
                this.setState({visible: false});
                return getAllClasses() // update classes list
              })
              .catch(err=>(
                message.error(err.message)
              ))

        }
      });
  }

  showDrawer = () => {
    console.log("show drawer")
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onXlsSwitch(checked) { this.setState({ isXlsFile: checked }) }

  render() {
    const {
      form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched },
    } = this.props;

    const { visible, isXlsFile, xlsFile, xlsFileError, loadingXslFile } = this.state;
    

    const filiereError = isFieldTouched('filiere') && getFieldError('filiere');
    const anneeError = isFieldTouched('annee') && getFieldError('annee');

    const cneColError = isFieldTouched('cneColName') && getFieldError('cneColName');
    const nomColError = isFieldTouched('nomColName') && getFieldError('nomColName');
    const prenomColError = isFieldTouched('prenomColName') && getFieldError('prenomColName');

    return (
      <div>
        <Button type="primary" onClick={this.showDrawer.bind(this)} style={{ float: 'right', marginBottom: '10px' }}>
          Ajouter Classe
        </Button>
        <Drawer
          title="Ajouter Classe"
          width={720}
          placement="right"
          onClose={this.onClose.bind(this)}
          maskClosable={false}
          visible={visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  label="Filière"
                  validateStatus={filiereError ? 'error' : ''}
                  help={filiereError || ''}
                >
                  {getFieldDecorator('filiere', {
                    rules: [{ required: true, message: 'please enter filiere' }],
                  })(<Input placeholder="please enter filiere" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item 
                label="Année"
                validateStatus={anneeError ? 'error' : ''}
                help={anneeError || ''}
              >
                  {getFieldDecorator('annee', {
                    rules: [{ required: true, message: 'please enter annee' }],
                  })(<Input placeholder="please enter annee" />)}
                </Form.Item>
              </Col>
            </Row>


            <h3>Etudiants</h3>
            <Form.Item
              label="Fichier Excel Des Etudiants"
            >
              <Switch onChange={this.onXlsSwitch.bind(this)}/>
            </Form.Item>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item 
                  label="CNE"
                  validateStatus={cneColError ? 'error' : ''}
                  help={cneColError || ''}
                >
                  {getFieldDecorator('cneColName', {
                    initialValue: 'CNE',
                    rules: [{ required: true, message: 'Ce champ est requis!' }],
                  })(<Input name="cneColName" disabled={!isXlsFile}/>)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item 
                  label="Nom"
                  validateStatus={nomColError ? 'error' : ''}
                  help={nomColError || ''}
                >
                  {getFieldDecorator('nomColName', {
                    initialValue: 'Nom',
                    rules: [{ required: true, message: 'Ce champ est requis!' }],
                  })(<Input name="nomColName" disabled={!isXlsFile}/>)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item 
                  label="Prenom"
                  validateStatus={prenomColError ? 'error' : ''}
                  help={prenomColError || ''}
                >
                  {getFieldDecorator('prenomColName', {
                    initialValue: 'Prenom',
                    rules: [{ required: true, message: 'Ce champ est requis!' }],
                  })(<Input name="prenomColName" disabled={!isXlsFile}/>)}
                </Form.Item>
              </Col>

              <Col span={24}>
                <div className="ant-upload-text">Fichier Excel</div>
                <Upload
                  style={{
                    border: (xlsFileError) ? '1px solid red' : null
                  }}
                  name="avatar"
                  listType="picture-card"
                  className="excel-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={this.uploaderHandleChange}
                  disabled={!isXlsFile}
                >
                  {xlsFile ? (
                    <div>
                      <Icon type="file-done" />
                      <div className="ant-upload-text">{xlsFile.name}</div>
                    </div>
                  ) : 
                    <div>
                      <Icon type={loadingXslFile ? 'loading' : 'plus'} />
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  }
                </Upload>
                <div className="ant-form-explain text-error">{xlsFileError}</div>
              </Col>
            </Row>
           
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e8e8e8',
                padding: '10px 16px',
                textAlign: 'right',
                left: 0,
                background: '#fff',
                borderRadius: '0 0 4px 4px',
              }}
            >
              <Button
                style={{
                  marginRight: 8,
                }}
                onClick={this.onClose.bind(this)}
              >
                Cancel
              </Button>
              <Button 
                htmlType="submit"
                type="primary"
                onClick={this.handleSubmit}
                disabled={hasErrors(getFieldsError()) || (isXlsFile && !xlsFile)}
              >
                Ajouter
              </Button>
            </div>
          </Form>
        </Drawer>
      </div>
    );
  }
}

const RegisterForm = Form.create()(AjoutClassForm);

export default connect(
  null,
  { 
    getAllClasses: classeFind,
    saveClass: classeSave
  }
)(RegisterForm);