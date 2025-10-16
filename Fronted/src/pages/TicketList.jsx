import React, { useState } from 'react';
import { Table, Tag, Typography, Input, Space, Button, Tabs, Select } from 'antd';
import { SearchOutlined, EyeOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

// Mock veri - orijinal data korundu
const mockTickets = [
  {
    id: '1',
    subject: 'Uygulama açılmıyor',
    category: 'Teknik Sorun',
    status: 'open',
    priority: 'high',
    createdAt: '2023-07-15',
    lastUpdated: '2023-07-16',
  },
  {
    id: '2',
    subject: 'Fatura bilgilerimi güncellemek istiyorum',
    category: 'Fatura',
    status: 'pending',
    priority: 'normal',
    createdAt: '2023-07-10',
    lastUpdated: '2023-07-12',
  },
  {
    id: '3',
    subject: 'Hesap bilgilerimi nasıl değiştirebilirim?',
    category: 'Hesap',
    status: 'closed',
    priority: 'low',
    createdAt: '2023-06-28',
    lastUpdated: '2023-07-05',
  },
  {
    id: '4',
    subject: 'Premium paket hakkında bilgi almak istiyorum',
    category: 'Bilgi Talebi',
    status: 'open',
    priority: 'high',
    createdAt: '2023-07-18',
    lastUpdated: '2023-07-18',
  },
  {
    id: '5',
    subject: 'Ödeme yöntemimi değiştirmek istiyorum',
    category: 'Ödeme',
    status: 'pending',
    priority: 'normal',
    createdAt: '2023-07-05',
    lastUpdated: '2023-07-08',
  },
];

// CC'lendiklerim mock data
const ccTickets = [
  {
    id: '6',
    subject: 'Sistem bakım bildirimi',
    category: 'Sistem',
    status: 'open',
    priority: 'high',
    createdAt: '2023-07-20',
    lastUpdated: '2023-07-20',
  },
  {
    id: '7',
    subject: 'Yeni özellik duyurusu',
    category: 'Duyuru',
    status: 'closed',
    priority: 'normal',
    createdAt: '2023-07-14',
    lastUpdated: '2023-07-15',
  },
  {
    id: '10',
    subject: 'API güvenlik güncellemesi',
    category: 'Güvenlik',
    status: 'open',
    priority: 'high',
    createdAt: '2023-07-22',
    lastUpdated: '2023-07-22',
  },
  {
    id: '11',
    subject: 'Sunucu performans raporu',
    category: 'Teknik',
    status: 'pending',
    priority: 'normal',
    createdAt: '2023-07-21',
    lastUpdated: '2023-07-21',
  }
];

// Takip ettiklerim mock data
const followingTickets = [
  {
    id: '8',
    subject: 'API güncelleme planları',
    category: 'Geliştirme',
    status: 'pending',
    priority: 'high',
    createdAt: '2023-07-19',
    lastUpdated: '2023-07-19',
  },
  {
    id: '9',
    subject: 'Güvenlik güncellemesi',
    category: 'Güvenlik',
    status: 'open',
    priority: 'high',
    createdAt: '2023-07-17',
    lastUpdated: '2023-07-17',
  },
  {
    id: '12',
    subject: 'Yeni mobil uygulama lansmanı',
    category: 'Duyuru',
    status: 'open',
    priority: 'normal',
    createdAt: '2023-07-23',
    lastUpdated: '2023-07-23',
  },
  {
    id: '13',
    subject: 'Veritabanı optimizasyonu',
    category: 'Teknik',
    status: 'pending',
    priority: 'high',
    createdAt: '2023-07-24',
    lastUpdated: '2023-07-24',
  }
];

const TicketList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const [sortOrder, setSortOrder] = useState('newest');

  // Durum için görsel gösterge
  const getStatusIndicator = (status) => {
    let backgroundColor = '';
    switch (status) {
      case 'open':
        backgroundColor = '#ff4d4f'; // Kırmızı
        break;
      case 'resolved':
      case 'closed':
        backgroundColor = '#52c41a'; // Yeşil
        break;
      case 'pending':
        backgroundColor = '#fa8c16'; // Turuncu
        break;
      default:
        backgroundColor = '#d9d9d9';
    }

    return (
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '2px',
          backgroundColor,
          display: 'inline-block'
        }}
      />
    );
  };

  // Öncelik metni
  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return 'high';
      case 'normal':
        return 'normal';
      case 'low':
        return 'low';
      default:
        return priority;
    }
  };

  // Hangi sekmede hangi data'yı göstereceğini belirle
  const getCurrentTickets = () => {
    switch (activeTab) {
      case '1':
        return mockTickets;
      case '2':
        return ccTickets;
      case '3':
        return followingTickets;
      default:
        return mockTickets;
    }
  };

  // Arama ve sıralama fonksiyonu
  const getFilteredAndSortedTickets = () => {
    const currentTickets = getCurrentTickets();
    
    // Önce filtreleme yap
    let filtered = currentTickets.filter(ticket =>
      ticket.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchText.toLowerCase())
    );

    // Sonra sıralama yap
    switch (sortOrder) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'priority':
        const priorityOrder = { 'high': 3, 'normal': 2, 'low': 1 };
        return filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      case 'status':
        const statusOrder = { 'open': 3, 'pending': 2, 'closed': 1 };
        return filtered.sort((a, b) => statusOrder[b.status] - statusOrder[a.status]);
      default:
        return filtered;
    }
  };

  const filteredAndSortedTickets = getFilteredAndSortedTickets();

  // Sıralama seçenekleri
  const sortOptions = [
    { value: 'newest', label: 'En Yeni' },
    { value: 'oldest', label: 'En Eski' },
    { value: 'priority', label: 'Önceliğe Göre' },
    { value: 'status', label: 'Duruma Göre' }
  ];

  // Tablo sütunları
  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status) => getStatusIndicator(status),
    },
    {
      title: 'Ticket ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (id) => `#${id}`,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text, record) => (
        <a 
          style={{ color: '#1890ff' }} 
          onClick={() => navigate(`/tickets/${record.id}`)}
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority) => getPriorityText(priority),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
    },
    {
      title: 'Update Date',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      width: 120,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
    },
  ];

  const tabItems = [
    {
      key: '1',
      label: 'My Requests',
    },
    {
      key: '2',
      label: "Requests I'm CC'd On",
    },
    {
      key: '3',
      label: "Requests I'm Followers On",
    },
  ];

  return (
    <div>
      {/* Üst kısım - Tabs ve Kullanıcı Menüsü */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 16,
        borderBottom: '1px solid #f0f0f0',
        paddingBottom: 8
      }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          style={{ marginBottom: 0 }}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Input
            placeholder="Search in requests"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
          
          <Select
            value={sortOrder}
            onChange={setSortOrder}
            style={{ width: 120 }}
            suffixIcon={<DownOutlined />}
          >
            {sortOptions.map(option => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Tablo */}
      <Table 
        columns={columns} 
        dataSource={filteredAndSortedTickets} 
        rowKey="id" 
        pagination={{ 
          pageSize: 10,
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: false
        }}
        size="middle"
        style={{
          backgroundColor: '#fff'
        }}
      />
    </div>
  );
};

export default TicketList;