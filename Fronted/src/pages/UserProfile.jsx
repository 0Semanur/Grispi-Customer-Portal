import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Divider, 
  Row, 
  Col, 
  Select,
  Space,
  Avatar,
  message
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone,
  SaveOutlined,
  PlusOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const UserProfile = () => {
  const [personalForm] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [phoneNumbers, setPhoneNumbers] = useState([{ code: '+90', number: '588 765 43 21' }]);
  const [emails, setEmails] = useState(['customer@grispi.com.tr']);

  // localStorage'dan kullanıcı bilgilerini al
  const userEmail = localStorage.getItem('userEmail') || localStorage.getItem('userPhone') || 'customer@grispi.com.tr';
  const userName = 'Customer Name';

  // Ülke kodları
  const countryCodes = [
    { code: '+90', country: 'TR' },
    { code: '+1', country: 'US' },
    { code: '+44', country: 'GB' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
  ];

  // Kişisel bilgileri kaydetme
  const handleSavePersonal = () => {
    personalForm.validateFields().then(values => {
      console.log('Kişisel bilgiler:', values);
      message.success('Kişisel bilgiler kaydedildi');
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };

  // Adres bilgilerini kaydetme
  const handleSaveAddress = () => {
    addressForm.validateFields().then(values => {
      console.log('Adres bilgileri:', values);
      message.success('Adres bilgileri kaydedildi');
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };

  // Şifre değiştirme
  const handleChangePassword = () => {
    passwordForm.validateFields().then(values => {
      console.log('Şifre değiştirildi');
      message.success('Şifre başarıyla değiştirildi');
      passwordForm.resetFields();
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };

  // Telefon numarası ekleme
  const handleAddPhone = () => {
    setPhoneNumbers([...phoneNumbers, { code: '+90', number: '' }]);
  };

  // E-posta ekleme
  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: '#632d91',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
          border: '3px solid #fff',
          boxShadow: '0 2px 8px rgba(99, 45, 145, 0.2)'
        }}>
          <img 
            src="/cropped-Grispi-Favicon-PNG.png" 
            alt="Grispi Logo"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "contain",
              filter: 'brightness(0) invert(1)'
            }}
          />
        </div>
        <div>
          <Title level={3} style={{ margin: 0, color: '#333' }}>{userName}</Title>
          <Text type="secondary">Role: Admin</Text>
        </div>
      </div>

      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Personal Information</span>
          </div>
        }
        extra={<EditOutlined style={{ color: '#632d91' }} />}
        style={{ 
          marginBottom: 24,
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
        className="profile-card"
      >
        <Form
          form={personalForm}
          layout="vertical"
          initialValues={{
            firstName: '',
            lastName: '',
            website: '',
          }}
        >
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Lütfen adınızı girin!' }]}
              >
                <Input placeholder="Your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Lütfen soyadınızı girin!' }]}
              >
                <Input placeholder="Your last name" />
              </Form.Item>
            </Col>
          </Row>

          <div>
            <Text strong style={{ marginBottom: 8, display: 'block' }}>Preliminary Phone</Text>
            {phoneNumbers.map((phone, index) => (
              <Row gutter={8} key={index} style={{ marginBottom: 8 }}>
                <Col xs={6} sm={4}>
                  <Select 
                    value={phone.code} 
                    style={{ width: '100%' }}
                    onChange={(value) => {
                      const newPhones = [...phoneNumbers];
                      newPhones[index].code = value;
                      setPhoneNumbers(newPhones);
                    }}
                  >
                    {countryCodes.map(country => (
                      <Option key={country.code} value={country.code}>
                        <span>{country.country}</span>
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col xs={18} sm={20}>
                  <Input 
                    value={phone.number}
                    placeholder="Phone number" 
                    onChange={(e) => {
                      const newPhones = [...phoneNumbers];
                      newPhones[index].number = e.target.value;
                      setPhoneNumbers(newPhones);
                    }}
                  />
                </Col>
              </Row>
            ))}
            <Button 
              type="dashed" 
              onClick={handleAddPhone} 
              icon={<PlusOutlined />}
              style={{ 
                marginBottom: 16,
                borderColor: '#632d91',
                color: '#632d91'
              }}
            >
              + Add Phone
            </Button>
          </div>

          <div>
            <Text strong style={{ marginBottom: 8, display: 'block' }}>Preliminary Email</Text>
            {emails.map((email, index) => (
              <Row gutter={8} key={index} style={{ marginBottom: 8 }}>
                <Col span={24}>
                  <Input 
                    value={email}
                    placeholder="Email address" 
                    onChange={(e) => {
                      const newEmails = [...emails];
                      newEmails[index] = e.target.value;
                      setEmails(newEmails);
                    }}
                  />
                </Col>
              </Row>
            ))}
            <Button 
              type="dashed" 
              onClick={handleAddEmail} 
              icon={<PlusOutlined />}
              style={{ 
                marginBottom: 16,
                borderColor: '#632d91',
                color: '#632d91'
              }}
            >
              + Add Email
            </Button>
          </div>

          <Form.Item
            name="website"
            label="Website (Optional)"
          >
            <Input placeholder="https://example.com" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              onClick={handleSavePersonal}
              icon={<SaveOutlined />}
              style={{ 
                backgroundColor: '#632d91',
                borderColor: '#632d91',
                borderRadius: '6px',
                fontWeight: '500'
              }}
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Address</span>
          </div>
        }
        extra={<EditOutlined style={{ color: '#632d91' }} />}
        style={{ 
          marginBottom: 24,
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
        className="profile-card"
      >
        <Form
          form={addressForm}
          layout="vertical"
        >
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="country"
                label="Country"
              >
                <Input placeholder="Country" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="city"
                label="City"
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="addressLine"
                label="Address Line"
              >
                <Input placeholder="Address" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="postalCode"
                label="Postal Code"
              >
                <Input placeholder="Postal code" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button 
              type="primary" 
              onClick={handleSaveAddress}
              icon={<SaveOutlined />}
              style={{ 
                backgroundColor: '#632d91',
                borderColor: '#632d91',
                borderRadius: '6px',
                fontWeight: '500'
              }}
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Password</span>
          </div>
        }
        extra={<EditOutlined style={{ color: '#632d91' }} />}
        style={{
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
        className="profile-card"
      >
        <Form
          form={passwordForm}
          layout="vertical"
        >
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[{ required: true, message: 'Lütfen mevcut şifrenizi girin!' }]}
              >
                <Input.Password
                  placeholder="Current password"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  { required: true, message: 'Lütfen yeni şifrenizi girin!' },
                  { min: 8, message: 'Şifre en az 8 karakter olmalıdır!' }
                ]}
              >
                <Input.Password
                  placeholder="New password"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button 
              type="primary" 
              onClick={handleChangePassword}
              icon={<SaveOutlined />}
              style={{ 
                backgroundColor: '#632d91',
                borderColor: '#632d91',
                borderRadius: '6px',
                fontWeight: '500'
              }}
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserProfile;