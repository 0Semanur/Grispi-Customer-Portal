import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider, message, Checkbox, Radio } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState('email');
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);
    console.log('Login bilgileri:', values);
    
    // Basit doğrulama - gerçek uygulamada API çağrısı yapılacak
    const isValidLogin = (values.email || values.phone) && values.password;
    
    // API çağrısı simülasyonu
    setTimeout(() => {
      setLoading(false);
      
      if (isValidLogin) {
      
        localStorage.setItem('isAuthenticated', 'true');
        
        if (loginType === 'email') {
          localStorage.setItem('userEmail', values.email);
          localStorage.removeItem('userPhone');
        } else {
          localStorage.setItem('userPhone', values.phone);
          localStorage.removeItem('userEmail');
        }
        
        message.success('Giriş başarılı!');
        navigate('/');
      } else {
        message.error('Geçersiz giriş bilgileri!');
      }
    }, 1500);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Form validation failed:', errorInfo);
    message.error('Lütfen tüm alanları doğru şekilde doldurun!');
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>Grispi Müşteri Portalı</Title>
        </div>
        
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Giriş Türü" style={{ marginBottom: 16 }}>
            <Radio.Group 
              value={loginType} 
              onChange={(e) => {
                setLoginType(e.target.value);
                form.resetFields(['email', 'phone']);
              }}
              buttonStyle="solid"
            >
              <Radio.Button value="email">
                <MailOutlined /> E-posta
              </Radio.Button>
              <Radio.Button value="phone">
                <PhoneOutlined /> Telefon
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          {loginType === 'email' ? (
            <Form.Item
              name="email"
              label="E-posta"
              rules={[
                { required: true, message: 'Lütfen e-posta adresinizi girin!' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="E-posta adresiniz" 
                size="large"
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="phone"
              label="Telefon"
              rules={[
                { required: true, message: 'Lütfen telefon numaranızı girin!' }
              ]}
            >
              <Input 
                prefix={<PhoneOutlined />} 
                placeholder="Telefon numaranız" 
                size="large"
              />
            </Form.Item>
          )}

          <Form.Item
            name="password"
            label="Şifre"
            rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Şifreniz" 
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Beni hatırla</Checkbox>
              </Form.Item>
              <a href="/forgot-password">Şifremi unuttum</a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<LoginOutlined />} 
              loading={loading}
              size="large"
              block
              style={{ backgroundColor: '#6A1B9A' }}
            >
              Giriş Yap
            </Button>
          </Form.Item>

          <Divider plain>veya</Divider>

          <div style={{ textAlign: 'center' }}>
            <Text>Hesabınız yok mu? </Text>
            <a href="/register">Kayıt Ol</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;