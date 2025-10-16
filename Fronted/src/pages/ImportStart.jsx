import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Radio, 
  Upload, 
  Button, 
  message, 
  Space, 
  Row, 
  Col,
  Steps,
  Divider
} from 'antd';
import { 
  InboxOutlined, 
  FileExcelOutlined, 
  FilePdfOutlined,
  UserOutlined,
  TeamOutlined,
  CustomerServiceOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../assets/css/import.css';

const { Title, Text } = Typography;
const { Dragger } = Upload;

const ImportStart = () => {
  const navigate = useNavigate();
  const [importType, setImportType] = useState('ticket');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const importTypes = [
    {
      value: 'ticket',
      label: 'Talepler',
      icon: <CustomerServiceOutlined style={{ fontSize: '24px', color: '#6A1B9A' }} />,
      description: 'Destek talepleri ve istekleri içe aktar'
    },
    {
      value: 'contact',
      label: 'Kişiler',
      icon: <UserOutlined style={{ fontSize: '24px', color: '#6A1B9A' }} />,
      description: 'Müşteri iletişim bilgilerini içe aktar'
    },
    {
      value: 'organization',
      label: 'Organizasyonlar',
      icon: <TeamOutlined style={{ fontSize: '24px', color: '#6A1B9A' }} />,
      description: 'Şirket ve organizasyon verilerini içe aktar'
    }
  ];

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.csv,.xlsx,.xls',
    beforeUpload: (file) => {
      const isValidType = file.type === 'text/csv' || 
                         file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                         file.type === 'application/vnd.ms-excel';
      
      if (!isValidType) {
        message.error('Sadece CSV veya Excel dosyaları yükleyebilirsiniz!');
        return false;
      }
      
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('Dosya boyutu 10MB\'dan küçük olmalıdır!');
        return false;
      }
      
      setUploadedFile(file);
      return false; // Prevent auto upload
    },
    onRemove: () => {
      setUploadedFile(null);
    },
  };

  const handleNext = () => {
    if (!uploadedFile) {
      message.error('Lütfen önce bir dosya yükleyin!');
      return;
    }
    
    setLoading(true);
    
    // Simulate file processing
    setTimeout(() => {
      setLoading(false);
      // Pass data to next step
      navigate('/import/preview', { 
        state: { 
          file: uploadedFile, 
          importType: importType 
        } 
      });
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Steps
        current={0}
        items={[
          { title: 'Dosya Yükle' },
          { title: 'Veri Önizleme' },
          { title: 'Alan Eşleştirme' },
          { title: 'Özet' },
          { title: 'Sonuç' }
        ]}
        style={{ marginBottom: '32px' }}
      />

      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
          Veri İçe Aktarma Sihirbazı
        </Title>
        
        <div style={{ marginBottom: '32px' }}>
          <Title level={4}>Adım 1: İçe Aktarma Türünü Seçin</Title>
          <Text type="secondary">İçe aktarmak istediğiniz veri türünü seçin</Text>
          
          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            {importTypes.map((type) => (
              <Col span={8} key={type.value}>
                <Card
                  hoverable
                  className={importType === type.value ? 'selected-card' : ''}
                  onClick={() => setImportType(type.value)}
                  style={{
                    border: importType === type.value ? '2px solid #6A1B9A' : '1px solid #d9d9d9',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    {type.icon}
                    <Title level={5} style={{ margin: '8px 0 4px 0' }}>
                      {type.label}
                    </Title>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {type.description}
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <Divider />

        <div style={{ marginBottom: '32px' }}>
          <Title level={4}>Adım 2: Dosya Yükle</Title>
          <Text type="secondary">CSV veya Excel dosyanızı yükleyin (maksimum 10MB)</Text>
          
          <Dragger {...uploadProps} style={{ marginTop: '16px' }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ color: '#6A1B9A' }} />
            </p>
            <p className="ant-upload-text">
              Dosyayı yüklemek için tıklayın veya bu alana sürükleyin
            </p>
            <p className="ant-upload-hint">
              CSV ve Excel dosyaları desteklenir (.csv, .xlsx, .xls)
            </p>
          </Dragger>
          
          {uploadedFile && (
            <div style={{ marginTop: '16px', padding: '12px', background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '6px' }}>
              <Space>
                {uploadedFile.name.endsWith('.csv') ? <FilePdfOutlined /> : <FileExcelOutlined />}
                <Text strong>{uploadedFile.name}</Text>
                <Text type="secondary">({(uploadedFile.size / 1024).toFixed(1)} KB)</Text>
              </Space>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'right' }}>
          <Button 
            type="primary" 
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={handleNext}
            loading={loading}
            disabled={!uploadedFile}
          >
            Sonraki: Veri Önizleme
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ImportStart;