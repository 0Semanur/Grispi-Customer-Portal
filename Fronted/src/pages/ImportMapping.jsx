import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Table, 
  Button, 
  Steps, 
  Select, 
  Space,
  Alert,
  Tag,
  Row,
  Col,
  Tooltip,
  Progress,
  Divider
} from 'antd';
import { 
  ArrowLeftOutlined, 
  ArrowRightOutlined, 
  LinkOutlined, 
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/import.css';

const { Title, Text } = Typography;
const { Option } = Select;

const ImportMapping = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mappings, setMappings] = useState({});
  const [grispiFields, setGrispiFields] = useState([]);

  const { file, importType, hasHeader, columns, headerRow, previewData, allData, actualFileData } = location.state || {};

  useEffect(() => {
    if (!file) {
      navigate('/import');
      return;
    }

    // Set Grispi fields based on import type
    let fields = [];
    if (importType === 'contact') {
      fields = [
        { value: 'firstName', label: 'Ad', required: true },
        { value: 'lastName', label: 'Soyad', required: true },
        { value: 'email', label: 'E-posta Adresi', required: false, conditionalRequired: true },
        { value: 'phone', label: 'Telefon Numarası', required: false, conditionalRequired: true },
        { value: 'company', label: 'Şirket', required: false },
        { value: 'jobTitle', label: 'İş Unvanı', required: false },
        { value: 'address', label: 'Adres', required: false },
        { value: 'city', label: 'Şehir', required: false },
        { value: 'country', label: 'Ülke', required: false },
        { value: 'notes', label: 'Notlar', required: false }
      ];
    } else if (importType === 'ticket') {
      fields = [
        { value: 'subject', label: 'Konu', required: true },
        { value: 'description', label: 'Açıklama', required: true },
        { value: 'priority', label: 'Öncelik', required: false },
        { value: 'status', label: 'Durum', required: false },
        { value: 'category', label: 'Kategori', required: false },
        { value: 'customerEmail', label: 'Müşteri E-postası', required: true },
        { value: 'assignedTo', label: 'Atanan Kişi', required: false },
        { value: 'tags', label: 'Etiketler', required: false },
        { value: 'dueDate', label: 'Bitiş Tarihi', required: false }
      ];
    } else {
      fields = [
        { value: 'name', label: 'Organizasyon Adı', required: true },
        { value: 'domain', label: 'Domain', required: false },
        { value: 'industry', label: 'Sektör', required: false },
        { value: 'size', label: 'Şirket Büyüklüğü', required: false },
        { value: 'country', label: 'Ülke', required: false },
        { value: 'address', label: 'Adres', required: true },
        { value: 'phone', label: 'Telefon', required: true },
        { value: 'website', label: 'Web Sitesi', required: false }
      ];
    }
    setGrispiFields(fields);
  }, [file, importType, navigate]);

  const handleMappingChange = (columnKey, grispiField) => {
    setMappings(prev => ({
      ...prev,
      [columnKey]: grispiField
    }));
  };

  const getSampleData = (columnKey) => {
    if (!allData || allData.length === 0) return [];
    
    const samples = [];
    const startIndex = hasHeader ? 1 : 0;
    const endIndex = Math.min(startIndex + 3, allData.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      const row = allData[i];
      if (row[columnKey] !== undefined && row[columnKey] !== '') {
        samples.push(String(row[columnKey]));
      }
    }
    return samples;
  };

  const mappingColumns = [
    {
      title: (
        <Space>
          <Text strong>Excel Kolonu</Text>
          <Tooltip title="Dosyanızdaki kolon başlıkları">
            <InfoCircleOutlined style={{ color: '#6A1B9A' }} />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'columnName',
      key: 'columnName',
      width: 200,
      render: (text) => (
        <Tag color="blue" style={{ fontSize: '13px', padding: '4px 8px' }}>
          {text}
        </Tag>
      )
    },
    {
      title: (
        <Space>
          <Text strong>Örnek Veriler</Text>
          <Tooltip title="Dosyanızdan alınan örnek veriler">
            <InfoCircleOutlined style={{ color: '#6A1B9A' }} />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'sampleData',
      key: 'sampleData',
      width: 280,
      render: (samples) => (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          {samples.length > 0 ? samples.map((sample, index) => (
            <div key={index} style={{ 
              background: '#f6f8fa', 
              padding: '4px 8px', 
              borderRadius: '4px',
              fontSize: '12px',
              maxWidth: '250px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {sample}
            </div>
          )) : (
            <Text type="secondary" style={{ fontStyle: 'italic' }}>
              Veri bulunamadı
            </Text>
          )}
        </Space>
      )
    },
    {
      title: (
        <Space>
          <Text strong>Grispi Alanına Eşleştir</Text>
          <Tooltip title="Bu kolonu hangi Grispi alanıyla eşleştirmek istiyorsunuz?">
            <InfoCircleOutlined style={{ color: '#6A1B9A' }} />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'mapping',
      key: 'mapping',
      render: (_, record) => {
        const selectedField = grispiFields.find(f => f.value === mappings[record.columnKey]);
        return (
          <Select
            style={{ width: '100%' }}
            placeholder="Bir alan seçin..."
            value={mappings[record.columnKey]}
            onChange={(value) => handleMappingChange(record.columnKey, value)}
            allowClear
            size="large"
          >
            <Option value="">
              <Text type="secondary">Bu kolonu içe aktarma</Text>
            </Option>
            {grispiFields.map(field => (
              <Option key={field.value} value={field.value}>
                <Space>
                  <Text>{field.label}</Text>
                  {field.required && (
                    <Tag color="red" size="small">Zorunlu</Tag>
                  )}
                </Space>
              </Option>
            ))}
          </Select>
        );
      }
    },
    {
      title: 'Durum',
      key: 'status',
      width: 80,
      render: (_, record) => {
        const selectedField = grispiFields.find(f => f.value === mappings[record.columnKey]);
        if (mappings[record.columnKey]) {
          return (
            <Tooltip title={selectedField?.required ? 'Zorunlu alan eşleştirildi' : 'Alan eşleştirildi'}>
              <CheckCircleOutlined style={{ 
                color: selectedField?.required ? '#52c41a' : '#1890ff',
                fontSize: '16px'
              }} />
            </Tooltip>
          );
        }
        return (
          <Tooltip title="Eşleştirme yapılmadı">
            <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: '16px' }} />
          </Tooltip>
        );
      }
    }
  ];

  const mappingData = headerRow?.map((columnName, index) => {
    const columnKey = `col_${index}`;
    return {
      key: index,
      columnName: hasHeader ? columnName : `Kolon ${index + 1}`,
      columnKey: columnKey,
      sampleData: getSampleData(columnKey),
      mapping: mappings[columnKey]
    };
  }) || [];

  const getRequiredFieldsStatus = () => {
    const requiredFields = grispiFields.filter(field => field.required);
    const mappedRequiredFields = requiredFields.filter(field => 
      Object.values(mappings).includes(field.value)
    );
    
    // Özel koşul: Kişiler için e-posta veya telefon alanlarından en az biri eşleştirilmiş olmalı
    let conditionalRequirementMet = true;
    if (importType === 'contact') {
      const hasEmail = Object.values(mappings).includes('email');
      const hasPhone = Object.values(mappings).includes('phone');
      conditionalRequirementMet = hasEmail || hasPhone;
    }
    
    return {
      total: requiredFields.length,
      mapped: mappedRequiredFields.length,
      missing: requiredFields.filter(field => 
        !Object.values(mappings).includes(field.value)
      ),
      conditionalRequirementMet
    };
  };

  const requiredStatus = getRequiredFieldsStatus();
  const canProceed = requiredStatus.mapped === requiredStatus.total && 
                  (importType !== 'contact' || requiredStatus.conditionalRequirementMet);
  const progressPercent = requiredStatus.total > 0 ? Math.round((requiredStatus.mapped / requiredStatus.total) * 100) : 100;

  const handleNext = () => {
    if (!canProceed) return;
    
    navigate('/import/summary', { 
      state: { 
        file, 
        importType, 
        hasHeader,
        columns,
        headerRow,
        previewData,
        allData,
        actualFileData: allData,
        mappings,
        grispiFields
      } 
    });
  };

  const handleBack = () => {
    navigate('/import/preview', { state: { file, importType } });
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <Steps
        current={2}
        items={[
          { title: 'Dosya Yükle' },
          { title: 'Veri Önizleme' },
          { title: 'Alan Eşleştirme' },
          { title: 'Özet' },
          { title: 'Sonuç' }
        ]}
        style={{ marginBottom: '32px' }}
      />

      <Card style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ marginBottom: '8px' }}>
            <LinkOutlined style={{ marginRight: '8px', color: '#6A1B9A' }} />
            Alan Eşleştirme
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Excel dosyanızdaki kolonları Grispi alanlarıyla eşleştirin
          </Text>
        </div>
        
        <Alert
          message="Eşleştirme Talimatları"
          description="Aşağıdaki tabloda dosyanızdaki her kolon için uygun Grispi alanını seçin. Zorunlu alanlar kırmızı etiketle işaretlenmiştir ve mutlaka eşleştirilmelidir."
          type="info"
          showIcon
          style={{ marginBottom: '24px' }}
        />

        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col span={8}>
            <Card size="small" style={{ background: '#f6f8fa', border: '1px solid #e1e4e8' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong style={{ color: '#6A1B9A' }}>Dosya Bilgileri</Text>
                <Text><strong>Dosya:</strong> {file?.name}</Text>
                <Text><strong>Tip:</strong> {
                  importType === 'contact' ? 'Kişi' : 
                  importType === 'ticket' ? 'Talep' : 
                  importType === 'organization' ? 'Organizasyon' : importType
                }</Text>
                <Text><strong>Toplam Satır:</strong> {hasHeader ? allData?.length - 1 : allData?.length}</Text>
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" style={{ background: '#f6f8fa', border: '1px solid #e1e4e8' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong style={{ color: '#6A1B9A' }}>Eşleştirme Durumu</Text>
                <Text><strong>Toplam Kolon:</strong> {mappingData.length}</Text>
                <Text><strong>Eşleştirilen:</strong> {Object.keys(mappings).filter(key => mappings[key]).length}</Text>
                <Text><strong>Kalan:</strong> {mappingData.length - Object.keys(mappings).filter(key => mappings[key]).length}</Text>
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" style={{ background: '#f6f8fa', border: '1px solid #e1e4e8' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong style={{ color: '#6A1B9A' }}>Zorunlu Alanlar</Text>
                <Progress 
                  percent={progressPercent} 
                  size="small" 
                  strokeColor="#6A1B9A"
                  format={() => `${requiredStatus.mapped}/${requiredStatus.total}`}
                />
                <Text style={{ fontSize: '12px' }}>
                  {canProceed ? 'Tüm zorunlu alanlar tamamlandı!' : 'Eksik zorunlu alanlar var'}
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>

        {requiredStatus.total > 0 && (
          <Alert
            message={`Zorunlu Alan Kontrolü`}
            description={
              <div>
                {requiredStatus.missing.length > 0 ? (
                  <div>
                    <Text>Aşağıdaki zorunlu alanlar henüz eşleştirilmedi: </Text>
                    <div style={{ marginTop: '8px' }}>
                      {requiredStatus.missing.map((field, index) => (
                        <Tag key={field.value} color="red" style={{ marginBottom: '4px' }}>
                          {field.label}
                        </Tag>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Text>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                    Tüm zorunlu alanlar başarıyla eşleştirildi!
                  </Text>
                )}
                
                {importType === 'contact' && !requiredStatus.conditionalRequirementMet && (
                  <div style={{ marginTop: '8px' }}>
                    <Text type="danger">
                      <ExclamationCircleOutlined style={{ marginRight: '8px' }} />
                      Kişiler için e-posta veya telefon alanlarından en az birini eşleştirmelisiniz!
                    </Text>
                  </div>
                )}
              </div>
            }
            type={canProceed ? "success" : "warning"}
            showIcon
            style={{ marginBottom: '24px' }}
          />
        )}

        <Table
          columns={mappingColumns}
          dataSource={mappingData}
          pagination={false}
          scroll={{ x: 1000 }}
          size="middle"
          bordered
          style={{ marginBottom: '32px' }}
          rowClassName={(record, index) => {
            const selectedField = grispiFields.find(f => f.value === mappings[record.columnKey]);
            if (selectedField?.required && mappings[record.columnKey]) {
              return 'required-field-mapped';
            }
            return '';
          }}
        />

        <Divider />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button 
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
          >
            Geri
          </Button>
          
          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
              {canProceed ? 'Devam etmeye hazır!' : 'Lütfen tüm zorunlu alanları eşleştirin'}
            </Text>
            <Button 
              type="primary" 
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={handleNext}
              disabled={!canProceed}
              style={{ 
                backgroundColor: canProceed ? '#6A1B9A' : undefined,
                borderColor: canProceed ? '#6A1B9A' : undefined
              }}
            >
              Devam Et
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ImportMapping;