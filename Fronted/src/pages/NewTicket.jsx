import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Button, 
  Select, 
  Upload, 
  Typography, 
  Card, 
  message, 
  Divider,
  Space
} from 'antd';
import { 
  UploadOutlined, 
  SaveOutlined, 
  ArrowLeftOutlined 
} from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const NewTicket = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Kategori seçenekleri
  const categories = [
    { value: 'technical', label: 'Teknik Sorun' },
    { value: 'billing', label: 'Fatura' },
    { value: 'account', label: 'Hesap' },
    { value: 'info', label: 'Bilgi Talebi' },
    { value: 'payment', label: 'Ödeme' },
    { value: 'other', label: 'Diğer' },
  ];

  // Dosya yükleme ayarları
  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  // Form gönderme
  const onFinish = (values) => {
    setLoading(true);
    
    // Form verilerini ve dosyaları birleştirme
    const formData = {
      ...values,
      attachments: fileList,
    };
    
    console.log('Form verileri:', formData);
    
    // API çağrısı simülasyonu
    setTimeout(() => {
      setLoading(false);
      message.success('Talebiniz başarıyla oluşturuldu!');
      navigate('/');
    }, 1500);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/')}
        >
          Talep Listesine Dön
        </Button>
      </div>

      <Card>
        <Title level={2}>Yeni Destek Talebi</Title>
        <Divider />

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ category: 'technical' }}
        >
          <Form.Item
            name="subject"
            label="Konu"
            rules={[{ required: true, message: 'Lütfen bir konu başlığı girin!' }]}
          >
            <Input placeholder="Talebinizin konusunu girin" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Kategori"
            rules={[{ required: true, message: 'Lütfen bir kategori seçin!' }]}
          >
            <Select placeholder="Kategori seçin">
              {categories.map(category => (
                <Option key={category.value} value={category.value}>
                  {category.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Açıklama"
            rules={[{ required: true, message: 'Lütfen talebinizi açıklayın!' }]}
          >
            <TextArea 
              rows={6} 
              placeholder="Talebinizi detaylı bir şekilde açıklayın..."
            />
          </Form.Item>

          <Form.Item label="Dosya Ekle">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Dosya Seç</Button>
            </Upload>
            <div style={{ marginTop: 8, color: '#888' }}>
              Desteklenen dosya türleri: .jpg, .jpeg, .png, .pdf, .doc, .docx, .xls, .xlsx
            </div>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<SaveOutlined />}
                loading={loading}
              >
                Talebi Oluştur
              </Button>
              <Button onClick={() => form.resetFields()}>Formu Temizle</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default NewTicket;