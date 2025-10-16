import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Table, 
  Button, 
  Steps, 
  Checkbox, 
  Space,
  Alert,
  Spin,
  message,
  Popconfirm,
  Tooltip
} from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, FileTextOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { parseFile } from '../utils/fileParser';
import '../assets/css/import.css';

const { Title, Text } = Typography;

const ImportPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [hasHeader, setHasHeader] = useState(true);
  const [previewData, setPreviewData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [originalPreviewData, setOriginalPreviewData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [headerRow, setHeaderRow] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { file, importType } = location.state || {};

  useEffect(() => {
    if (!file) {
      navigate('/import');
      return;
    }

    // Parse the actual uploaded file
    parseFile(file)
      .then((result) => {
        setOriginalPreviewData(result.data);
        setAllData(result.allData);
        setColumns(result.columns);
        setHeaderRow(result.headerRow);
        setTotalRows(result.totalRows);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Dosya ayrıştırma hatası:', error);
        message.error('Dosya ayrıştırılırken bir hata oluştu');
        navigate('/import');
      });
  }, [file, importType, navigate]);

  // Update columns and preview data based on hasHeader checkbox
  useEffect(() => {
    if (headerRow.length > 0 && originalPreviewData.length > 0) {
      // Update columns - İşlemler sütunu kaldırıldı
      const updatedColumns = [
        ...headerRow.map((header, index) => ({
          title: hasHeader ? header : `Kolon ${index + 1}`,
          dataIndex: `col_${index}`,
          key: `col_${index}`,
          width: 150,
          ellipsis: true
        }))
        // İşlemler sütunu kaldırıldı
      ];
      setColumns(updatedColumns);

      // Update preview data - skip header row if hasHeader is true
      const updatedPreviewData = hasHeader 
        ? originalPreviewData.slice(1) // Skip first row (header)
        : originalPreviewData; // Show all rows including first row as data
      
      setPreviewData(updatedPreviewData);
    }
  }, [hasHeader, headerRow, originalPreviewData]);

  const DISPLAY_ROW_COUNT = 6;
  
  const handleDeleteRow = (key) => {
    // Remove from preview data first
    const newPreviewData = previewData.filter(item => item.key !== key);
    
    // Remove from all data
    const newAllData = allData.filter(item => item.key !== key);
    
    // Find remaining data that's not currently in preview
    const remainingData = newAllData.filter(item => 
      !newPreviewData.some(preview => preview.key === item.key)
    );
    
    // Header kontrolü - hasHeader true ise header satırını atla
    const dataToAdd = hasHeader ? 
      remainingData.filter(item => item.key !== 1) : // key=1 genellikle header satırı
      remainingData;
    
    // Add new row from remaining data to maintain 6 rows
    if (dataToAdd.length > 0 && newPreviewData.length < DISPLAY_ROW_COUNT) {
      const nextRow = dataToAdd[0];
      newPreviewData.push(nextRow);
    }
    
    // Update states
    setAllData(newAllData);
    setPreviewData(newPreviewData);
    setTotalRows(newAllData.length);
    setOriginalPreviewData(prev => prev.filter(item => item.key !== key));
    
    message.success('Satır silindi, yeni veri eklendi');
  };

  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) {
      message.info('Lütfen silmek için en az bir satır seçin');
      return;
    }
    
    // Remove selected rows from all data first
    const newAllData = allData.filter(item => !selectedRowKeys.includes(item.key));
    
    // Remove selected rows from preview data
    const newPreviewData = previewData.filter(item => !selectedRowKeys.includes(item.key));
    
    // Find remaining data not currently in preview
    const remainingData = newAllData.filter(item => 
      !newPreviewData.some(preview => preview.key === item.key)
    );
    
    // Header satırını atla ve sadece veri satırlarını ekle
    const dataToAdd = hasHeader ? 
      remainingData.filter(item => item.key !== 1) : // key=1 header satırı
      remainingData;
    
    // Add new rows from remaining data to maintain 6 rows display
    const rowsToAdd = Math.min(dataToAdd.length, DISPLAY_ROW_COUNT - newPreviewData.length);
    for (let i = 0; i < rowsToAdd; i++) {
      newPreviewData.push(dataToAdd[i]);
    }
    
    // Update states
    setAllData(newAllData);
    setPreviewData(newPreviewData);
    setTotalRows(newAllData.length);
    setSelectedRowKeys([]);
    
    message.success(`${selectedRowKeys.length} satır silindi`);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  const handleNext = () => {
    navigate('/import/mapping', { 
      state: { 
        file, 
        importType, 
        hasHeader,
        columns: columns.slice(0, -1).map(col => col.title), // Remove action column
        headerRow,
        previewData,
        allData,
        // Değişiklik burada: allData yerine güncellenmiş veriyi kullan
        actualFileData: allData // Silinen satırlar çıkarılmış veri
      } 
    });
  };

  const handleBack = () => {
    navigate('/import');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <Spin size="large" />
        <div style={{ marginTop: '16px' }}>
          <Text>Dosyanız işleniyor...</Text>
        </div>
      </div>
    );
  }

  // Calculate actual data rows for display
  const actualDataRows = hasHeader ? totalRows - 1 : totalRows;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Steps
        current={1}
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
          Veri Önizleme
        </Title>
        
        <Alert
          message="Dosya Önizlemesi"
          description={`Yüklediğiniz dosyadan ${hasHeader ? 'başlık satırı hariç ' : ''}veriler gösteriliyor. Verilerinizin doğru göründüğünü kontrol edin. İstemediğiniz satırları silebilirsiniz.`}
          type="info"
          showIcon
          style={{ marginBottom: '24px' }}
        />

        <div style={{ marginBottom: '24px' }}>
          <Space>
            <Text strong>Dosya:</Text>
            <Text>{file?.name}</Text>
            <Text type="secondary">|</Text>
            <Text strong>İçe Aktarma Tipi:</Text>
            <Text style={{ textTransform: 'capitalize' }}>
              {importType === 'contact' ? 'Kişi' : 
               importType === 'ticket' ? 'Talep' : 
               importType === 'organization' ? 'Organizasyon' : importType}
            </Text>
            <Text type="secondary">|</Text>
            <Text strong>Toplam Veri Satırı:</Text>
            <Text>{actualDataRows}</Text>
            <Text type="secondary">|</Text>
            <Text strong>Kolon Sayısı:</Text>
            <Text>{columns.length - 1}</Text> {/* Subtract action column */}
          </Space>
        </div>

        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Checkbox 
            checked={hasHeader} 
            onChange={(e) => setHasHeader(e.target.checked)}
          >
            İlk satır başlık bilgilerini içeriyor
          </Checkbox>
          
          {selectedRowKeys.length > 0 && (
            <Popconfirm
              title={`${selectedRowKeys.length} satırı silmek istediğinize emin misiniz?`}
              onConfirm={handleDeleteSelected}
              okText="Evet"
              cancelText="Hayır"
            >
              <Button 
                danger 
                icon={<DeleteOutlined />}
              >
                Seçili Satırları Sil ({selectedRowKeys.length})
              </Button>
            </Popconfirm>
          )}
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={previewData}
          pagination={false}
          scroll={{ x: 800 }}
          size="small"
          bordered
          style={{ marginBottom: '32px' }}
          title={() => (
            <Text strong>
              {hasHeader ? 'Veri Örnekleri (Başlık Satırı Hariç)' : 'Dosya Verileri'}
            </Text>
          )}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
          >
            Geri
          </Button>
          
          <Button 
            type="primary" 
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={handleNext}
          >
            Devam Et
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ImportPreview;