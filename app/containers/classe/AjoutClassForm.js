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
    return this.xlsJsonData.map(e => {
      const _etudiant = {
        cne: e[colNames.cne],

        nom: e[colNames.nom],
        prenom: e[colNames.prenom],

        password: 'helloWorld', // TODO: random generate

        classe_id: 'NO_CLASSE_YET'
      }
      Etudiant._validate(_etudiant)
      return _etudiant
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { xlsFile } = this.state;
    const {
      form: { validateFields },
      getAllClasses, saveClass
    } = this.props;
    
    if(!xlsFile) {
      this.setState({ xlsFileError: 'please provide an excel file'});
    }else
      validateFields((validationError, formData) => {
        if (!validationError) {
          // get data from excel
          let etudiants = this.parseXSLS(
            this.xlsJsonData,
            { cne: formData.cneColName, nom: formData.nomColName, prenom: formData.prenomColName}
          )

          saveClass({
            filiere: formData.filiere,
            annee: formData.annee
          }).then(classe =>{
            etudiants = etudiants.map((e) => { e.classe_id = classe._id; return e; }) // set class if for students
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
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched }
    } = this.props;

    const { visible, xlsFile, xlsFileError, loadingXslFile } = this.state;
    

    const filiereError = isFieldTouched('filiere') && getFieldError('filiere');
    const anneeError = isFieldTouched('annee') && getFieldError('annee');
    const nameError = isFieldTouched('name') && getFieldError('name');

    const nomColError = isFieldTouched('nomColName') && getFieldError('nomColName');
    const cneColError = isFieldTouched('cneColName') && getFieldError('cneColName');
    const dateColError = isFieldTouched('dateColName') && getFieldError('dateColName');

    return (
      <div>
        <Button type="primary" onClick={this.showDrawer} style={{marginBottom: '20px'}}>
          Ajouter Classe
        </Button>
        <Drawer
          title="Ajouter Classe"
          width={720}
          placement="right"
          onClose={this.onClose}
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
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  label="Name"
                  validateStatus={nameError ? 'error' : ''}
                  help={nameError || ''}
                >
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'please enter Nom' }],
                  })(<Input placeholder="name" />)}
                </Form.Item>
              </Col>
            </Row>

            <h3>Etudiants</h3>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item 
                  label="Nom"
                  validateStatus={nomColError ? 'error' : ''}
                  help={nomColError || ''}
                >
                  {getFieldDecorator('nomColName', {
                    initialValue: 'nom & prenom',
                    rules: [{ required: true, message: 'Ce champ est requis!' }],
                  })(<Input name="nomColName" id="nomColName"/>)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item 
                  label="CNE"
                  validateStatus={cneColError ? 'error' : ''}
                  help={cneColError || ''}
                >
                  {getFieldDecorator('cneColName', {
                    initialValue: 'cne',
                    rules: [{ required: true, message: 'Ce champ est requis!' }],
                  })(<Input name="cneColName" id="cneColName"/>)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item 
                  label="Date de Naissance"
                  validateStatus={dateColError ? 'error' : ''}
                  help={dateColError || ''}
                >
                  {getFieldDecorator('dateColName', {
                    initialValue: 'date de naissance',
                    rules: [{ required: true, message: 'Ce champ est requis!' }],
                  })(<Input name="dateColName" id="dateColName"/>)}
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
                onClick={this.onClose}
              >
                Cancel
              </Button>
              <Button 
                htmlType="submit"
                type="primary"
                onClick={this.handleSubmit}
                disabled={hasErrors(getFieldsError()) || !xlsFile}
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