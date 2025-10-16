import React from 'react';
import { Layout, Menu, Typography, Button, Avatar, Dropdown, message, Space } from 'antd';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  PlusOutlined, 
  UnorderedListOutlined, 
  UserOutlined, 
  LogoutOutlined,
  BellOutlined,
  HomeOutlined,
  ImportOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isTicketListPage = location.pathname === '/';
  const userEmail = localStorage.getItem('userEmail') || localStorage.getItem('userPhone') || 'customer@grispi.com.tr';
  const userName = 'Müşteri Adı';

  // Logout işlevi
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    message.success('Çıkış yapıldı');
    navigate('/login');
  };

  // Kullanıcı menüsü için öğeler
  const userMenuItems = [
    {
      key: "user-info",
      label: (
        <div style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "12px" }}>
          <img 
            src="/cropped-Grispi-Favicon-PNG.png" 
            alt="Grispi Logo"
            style={{
              width: "24px",
              height: "24px",
              objectFit: "contain"
            }}
          />
          <div>
            <div style={{ fontWeight: "600", fontSize: "14px", color: "#333" }}>
              Grispi
            </div>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
              {userEmail}
            </div>
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Edit Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Log Out",
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.95)',
        padding: '0 24px',
        borderBottom: '1px solid #e9ecef',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 101,
        backdropFilter: 'blur(10px)',
        marginLeft: 80,
        height: 64
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {isTicketListPage && (
            <Button 
              type="text"
              icon={<PlusOutlined />}
              onClick={() => navigate('/tickets/new')}
              style={{
                background: "transparent",
                color: "#632d91",
                fontWeight: 600,
                fontSize: "16px",
                border: "none",
                borderRadius: 0,
                height: "100%",
                padding: "0 16px 0 0",
                boxShadow: "none",
                cursor: "pointer"
              }}
            >
              Yeni Talep
            </Button>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <BellOutlined style={{ fontSize: "18px", color: "#6c757d" }} />
          
          <Dropdown 
            menu={{ items: userMenuItems }} 
            placement="bottomRight"
            trigger={['click']}
          >
            <div style={{
              cursor: "pointer",
              padding: "8px",
              borderRadius: "50%",
              backgroundColor: "rgba(99, 45, 145, 0.1)",
              border: "1px solid rgba(99, 45, 145, 0.2)",
              transition: "all 0.2s ease",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <img 
                src="/cropped-Grispi-Favicon-PNG.png" 
                alt="Grispi Logo"
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "contain"
                }}
              />
            </div>
          </Dropdown>
        </div>
      </Header>
      
      <Layout style={{ marginTop: 64 }}>
        <Sider
          width={80}
          style={{
            background: "#632d91",
            position: "fixed",
            height: "100vh",
            left: 0,
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ padding: "16px 0", height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Logo */}
            <div 
              onClick={() => navigate('/')}
              style={{ 
                display: "flex", 
                flexDirection: "column",
                justifyContent: "center", 
                alignItems: "center", 
                height: "50px",
                marginBottom: "16px",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <img 
                src="/cropped-Grispi-Favicon-PNG.png" 
                alt="Grispi Logo"
                style={{
                  width: "40px",
                  height: "30px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "2px",
                  filter: 'brightness(0) invert(1)'
                }}
              />
              <div style={{
                color: "white",
                fontSize: "8px",
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: "1.2"
              }}>
                Grispi
              </div>
            </div>

            {/* Menü Öğeleri */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                { key: '/', icon: <HomeOutlined />, label: 'Ana Sayfa' },
                { key: '/profile', icon: <UserOutlined />, label: 'Profil' },
                { key: '/import', icon: <ImportOutlined />, label: 'İçe Aktar' }
              ].map((item) => (
                <div
                  key={item.key}
                  onClick={() => navigate(item.key)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "50px",
                    margin: "0 6px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: (item.key === '/import' ? location.pathname.startsWith('/import') : location.pathname === item.key) ? "rgba(255,255,255,0.2)" : "transparent",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"
                  }}
                  onMouseLeave={(e) => {
                    const isActive = item.key === '/import' ? location.pathname.startsWith('/import') : location.pathname === item.key;
                    e.currentTarget.style.backgroundColor = isActive ? "rgba(255,255,255,0.2)" : "transparent"
                  }}
                >
                  <div style={{ 
                    color: "white", 
                    marginBottom: "2px",
                    fontSize: "16px"
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ 
                    color: "white", 
                    fontSize: "8px", 
                    textAlign: "center",
                    lineHeight: "1.2"
                  }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Sider>
        
        <Content
          style={{
            marginLeft: 80,
            padding: "16px",
            background: "#f8f9fa",
            minHeight: "calc(100vh - 64px)",
            transition: "margin-left 0.2s ease",
          }}
        >
          <div className="site-layout-content" style={{ 
            background: '#fff', 
            padding: 24, 
            minHeight: 280,
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;