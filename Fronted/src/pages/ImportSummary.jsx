import React from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Steps, 
  Descriptions,
  Table,
  Tag,
  Space,
  Alert,
  Row,
  Col
} from 'antd';
import { ArrowLeftOutlined, CheckOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/import.css';

const { Title, Text } = Typography;

const ImportSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { file, importType, hasHeader, columns, headerRow, previewData, allData, mappings, grispiFields } = location.state || {};

  if (!file) {
    navigate('/import');
    return null;
  }

  const getMappedFields = () => {
    return Object.entries(mappings)
      .filter(([_, grispiField]) => grispiField)
      .map(([columnName, grispiField]) => {
        const fieldInfo = grispiFields.find(f => f.value === grispiField);
        return {
          key: columnName,
          columnName,
          grispiField: fieldInfo?.label || grispiField,
          required: fieldInfo?.required || false
        };
      });
  };

  const mappedFields = getMappedFields();
  const unmappedColumns = columns?.filter(col => !mappings[col]) || [];
  
  // Calculate actual data rows (excluding header if hasHeader is true)
  const actualDataRows = hasHeader ? (allData?.length - 1 || 0) : (allData?.length || 0);

  const summaryColumns = [
    {
      title: 'Excel Kolonu',
      dataIndex: 'columnName',
      key: 'columnName',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Grispi Alanı',
      dataIndex: 'grispiField',
      key: 'grispiField',
      render: (text, record) => (
        <Space>
          <Text>{text}</Text>
          {record.required && <Tag color="red">Zorunlu</Tag>}
        </Space>
      )
    }
  ];

  const handleImport = () => {
    navigate('/import/result', { 
      state: { 
        file, 
        importType, 
        hasHeader,
        columns,
        headerRow,
        previewData,
        allData,
        mappings,
        grispiFields,
        mappedFields
      } 
    });
  };

  const handleBack = () => {
    navigate('/import/mapping', { 
      state: { 
        file, 
        importType, 
        hasHeader, 
        columns,
        headerRow,
        previewData,
        allData
      } 
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Steps
        current={3}
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
        <Title level={2} style={{ marginBottom: '24px' }}>
          <FileTextOutlined style={{ marginRight: '8px', color: '#6A1B9A' }} />
          İçe Aktarma Özeti
        </Title>
        
        <Alert
          message="İçe Aktarmaya Hazır"
          description="Lütfen aşağıdaki içe aktarma ayarlarını gözden geçirin. İçe aktarmayı başlattığınızda, veriler işlenecek ve Grispi hesabınıza eklenecektir."
          type="success"
          showIcon
          style={{ marginBottom: '24px' }}
        />

        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col span={12}>
            <Card title="Dosya Bilgileri" size="small">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Dosya Adı">{file?.name}</Descriptions.Item>
                <Descriptions.Item label="Dosya Boyutu">{(file?.size / 1024).toFixed(1)} KB</Descriptions.Item>
                <Descriptions.Item label="İçe Aktarma Tipi">
                  {importType === 'contact' ? 'Kişi' : 
                   importType === 'ticket' ? 'Talep' : 
                   importType === 'organization' ? 'Organizasyon' : importType}
                </Descriptions.Item>
                <Descriptions.Item label="İlk Satır Başlık">
                  {hasHeader ? 'Evet' : 'Hayır'}
                </Descriptions.Item>
                <Descriptions.Item label="Toplam Veri Satırı">{actualDataRows}</Descriptions.Item>
                <Descriptions.Item label="Toplam Kolon">{columns?.length || 0}</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          
          <Col span={12}>
            <Card title="Eşleştirme İstatistikleri" size="small">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Eşleştirilen Alanlar">{mappedFields.length}</Descriptions.Item>
                <Descriptions.Item label="Eşleştirilmeyen Kolonlar">{unmappedColumns.length}</Descriptions.Item>
                <Descriptions.Item label="Zorunlu Alanlar">
                  {mappedFields.filter(f => f.required).length} / {grispiFields.filter(f => f.required).length}
                </Descriptions.Item>
              </Descriptions>
              
              {unmappedColumns.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  <Text type="secondary">Eşleştirilmeyen kolonlar göz ardı edilecek:</Text>
                  <div style={{ marginTop: '4px' }}>
                    {unmappedColumns.map(col => (
                      <Tag key={col} color="orange">{col}</Tag>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </Col>
        </Row>

        <Card title="Alan Eşleştirmesi" size="small" style={{ marginBottom: '24px' }}>
          <Table
            columns={summaryColumns}
            dataSource={mappedFields}
            pagination={false}
            size="small"
            bordered
          />
        </Card>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
          >
            Eşleştirmeye Geri Dön
          </Button>
          
          <Button 
            type="primary" 
            size="large"
            icon={<CheckOutlined />}
            onClick={handleImport}
          >
            İçe Aktarmayı Başlat
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ImportSummary;