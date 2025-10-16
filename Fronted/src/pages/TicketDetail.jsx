import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Card, 
  Tag, 
  Descriptions, 
  Timeline, 
  Divider, 
  Button, 
  Input, 
  Upload, 
  message,
  Space,
  Avatar,
  Layout,
  Select
} from 'antd';
import { 
  UploadOutlined, 
  SendOutlined, 
  ArrowLeftOutlined,
  PaperClipOutlined,
  UserOutlined,
  CommentOutlined,
  CloseOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  LinkOutlined,
  UnorderedListOutlined,
  OrderedListOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Sider, Content } = Layout;
const { Option } = Select;

// Mock veri
const mockTickets = [
  {
    id: '1',
    subject: 'Uygulama açılmıyor',
    category: 'Teknik Sorun',
    status: 'open',
    createdAt: '2023-07-15T14:30:00',
    lastUpdated: '2023-07-16T10:45:00',
    description: 'Uygulamayı açmaya çalıştığımda hata veriyor. Ekran görüntüsünü ekte paylaştım.',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Hello, I\'m unable to log into my account. Every time I enter my credentials, I get an "invalid username or password" error. Could you please help me resolve this?',
        timestamp: '2023-07-15T14:30:00',
        attachments: [{ name: 'hata_ekrani.png', url: '#' }]
      },
      {
        id: 2,
        sender: 'agent',
        content: 'Merhaba, sorununuzu inceledik. Lütfen uygulamayı güncelleyip tekrar deneyin.',
        timestamp: '2023-07-16T09:15:00',
        attachments: []
      },
      {
        id: 3,
        sender: 'user',
        content: 'Güncellemeyi yaptım ama hala aynı hatayı alıyorum.',
        timestamp: '2023-07-16T10:45:00',
        attachments: []
      },
    ],
    statusHistory: [
      { status: 'open', timestamp: '2023-07-15T14:30:00', comment: 'Talep oluşturuldu' },
      { status: 'pending', timestamp: '2023-07-16T09:15:00', comment: 'Destek ekibi yanıt verdi' },
      { status: 'open', timestamp: '2023-07-16T10:45:00', comment: 'Müşteri yanıt verdi' },
    ]
  },
  {
    id: '2',
    subject: 'Fatura bilgilerimi güncellemek istiyorum',
    category: 'Fatura',
    status: 'pending',
    createdAt: '2023-07-10T11:20:00',
    lastUpdated: '2023-07-12T14:05:00',
    description: 'Fatura adresimi değiştirmek istiyorum. Yeni adresim: İstanbul, Kadıköy...',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Fatura adresimi değiştirmek istiyorum. Yeni adresim: İstanbul, Kadıköy...',
        timestamp: '2023-07-10T11:20:00',
        attachments: []
      },
      {
        id: 2,
        sender: 'agent',
        content: 'Merhaba, fatura bilgilerinizi güncellemek için lütfen vergi numaranızı da paylaşır mısınız?',
        timestamp: '2023-07-12T14:05:00',
        attachments: []
      },
    ],
    statusHistory: [
      { status: 'open', timestamp: '2023-07-10T11:20:00', comment: 'Talep oluşturuldu' },
      { status: 'pending', timestamp: '2023-07-12T14:05:00', comment: 'Destek ekibi yanıt verdi' },
    ]
  },
  {
    id: '3',
    subject: 'Hesap bilgilerimi nasıl değiştirebilirim?',
    category: 'Hesap',
    status: 'closed',
    createdAt: '2023-06-28T16:45:00',
    lastUpdated: '2023-07-05T09:15:00',
    description: 'Hesabımdaki e-posta adresini değiştirmek istiyorum. Nasıl yapabilirim?',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Hesabımdaki e-posta adresini değiştirmek istiyorum. Nasıl yapabilirim?',
        timestamp: '2023-06-28T16:45:00',
        attachments: []
      },
      {
        id: 2,
        sender: 'agent',
        content: 'Merhaba, hesap ayarları > profil bölümünden e-posta adresinizi güncelleyebilirsiniz.',
        timestamp: '2023-06-29T10:30:00',
        attachments: [{ name: 'email_degistirme.pdf', url: '#' }]
      },
      {
        id: 3,
        sender: 'user',
        content: 'Teşekkür ederim, başarıyla değiştirdim.',
        timestamp: '2023-07-05T09:15:00',
        attachments: []
      },
    ],
    statusHistory: [
      { status: 'open', timestamp: '2023-06-28T16:45:00', comment: 'Talep oluşturuldu' },
      { status: 'pending', timestamp: '2023-06-29T10:30:00', comment: 'Destek ekibi yanıt verdi' },
      { status: 'closed', timestamp: '2023-07-05T09:15:00', comment: 'Talep çözüldü' },
    ]
  },
  {
    id: '4',
    subject: 'Premium paket hakkında bilgi almak istiyorum',
    category: 'Bilgi Talebi',
    status: 'open',
    createdAt: '2023-07-18T13:20:00',
    lastUpdated: '2023-07-18T13:20:00',
    description: 'Premium paketinizin özellikleri ve fiyatlandırması hakkında bilgi alabilir miyim?',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Premium paketinizin özellikleri ve fiyatlandırması hakkında bilgi alabilir miyim?',
        timestamp: '2023-07-18T13:20:00',
        attachments: []
      },
    ],
    statusHistory: [
      { status: 'open', timestamp: '2023-07-18T13:20:00', comment: 'Talep oluşturuldu' },
    ]
  },
  {
    id: '5',
    subject: 'Ödeme yöntemimi değiştirmek istiyorum',
    category: 'Ödeme',
    status: 'pending',
    createdAt: '2023-07-05T15:10:00',
    lastUpdated: '2023-07-08T11:25:00',
    description: 'Mevcut kredi kartımı değiştirmek istiyorum. Nasıl yapabilirim?',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Mevcut kredi kartımı değiştirmek istiyorum. Nasıl yapabilirim?',
        timestamp: '2023-07-05T15:10:00',
        attachments: []
      },
      {
        id: 2,
        sender: 'agent',
        content: 'Merhaba, ödeme ayarları bölümünden kredi kartı bilgilerinizi güncelleyebilirsiniz. Detaylı adımlar için ekteki kılavuzu inceleyebilirsiniz.',
        timestamp: '2023-07-08T11:25:00',
        attachments: [{ name: 'odeme_yontemi_degistirme.pdf', url: '#' }]
      },
    ],
    statusHistory: [
      { status: 'open', timestamp: '2023-07-05T15:10:00', comment: 'Talep oluşturuldu' },
      { status: 'pending', timestamp: '2023-07-08T11:25:00', comment: 'Destek ekibi yanıt verdi' },
    ]
  },
];

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [emailTo, setEmailTo] = useState('');
  const [emailCc, setEmailCc] = useState([]);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  // Tüm talepleri birleştir
  const allTickets = [
    ...mockTickets,
    // CC'lendiklerim
    {
      id: '6',
      subject: 'Sistem bakım bildirimi',
      category: 'Sistem',
      status: 'open',
      priority: 'high',
      type: 'cc',
      createdAt: '2023-07-20T10:00:00',
      lastUpdated: '2023-07-20T10:00:00',
      description: 'Sistem bakımı 25 Temmuz 2023 tarihinde gerçekleştirilecektir.',
      assignedTo: 'System Admin',
      requester: 'System Team',
      messages: [
        {
          id: 1,
          sender: 'agent',
          senderName: 'System Admin',
          content: 'Merhaba, sistem bakımı 25 Temmuz 2023 tarihinde 02:00-04:00 saatleri arasında gerçekleştirilecektir. Bu süre zarfında sistem erişiminde kesinti yaşanabilir.',
          timestamp: '2023-07-20T10:00:00',
          attachments: [
            { name: 'bakim_planlama.pdf', url: '#' }
          ]
        }
      ],
      statusHistory: [
        { status: 'open', timestamp: '2023-07-20T10:00:00', comment: 'Bakım bildirimi gönderildi' }
      ]
    },
    {
      id: '7',
      subject: 'Yeni özellik duyurusu',
      category: 'Duyuru',
      status: 'closed',
      priority: 'normal',
      type: 'cc',
      createdAt: '2023-07-14T14:30:00',
      lastUpdated: '2023-07-15T09:15:00',
      description: 'Yeni özellikler hakkında bilgilendirme.',
      assignedTo: 'Product Team',
      requester: 'Product Manager',
      messages: [
        {
          id: 1,
          sender: 'agent',
          senderName: 'Product Manager',
          content: 'Merhaba, yeni özelliklerimiz hakkında sizleri bilgilendirmek istiyoruz. Detaylar ekteki dokümanda yer almaktadır.',
          timestamp: '2023-07-14T14:30:00',
          attachments: [
            { name: 'yeni_ozellikler.pdf', url: '#' }
          ]
        },
        {
          id: 2,
          sender: 'agent',
          senderName: 'Product Manager',
          content: 'Yeni özellikler başarıyla yayınlandı. Herhangi bir sorunuz olursa bizimle iletişime geçebilirsiniz.',
          timestamp: '2023-07-15T09:15:00',
          attachments: []
        }
      ],
      statusHistory: [
        { status: 'open', timestamp: '2023-07-14T14:30:00', comment: 'Duyuru gönderildi' },
        { status: 'closed', timestamp: '2023-07-15T09:15:00', comment: 'Özellik yayınlandı' }
      ]
    },
    {
      id: '10',
      subject: 'API güvenlik güncellemesi',
      category: 'Güvenlik',
      status: 'open',
      priority: 'high',
      type: 'cc',
      createdAt: '2023-07-22T08:00:00',
      lastUpdated: '2023-07-22T08:00:00',
      description: 'API güvenlik güncellemesi hakkında bilgilendirme.',
      assignedTo: 'Security Team',
      requester: 'Security Manager',
      messages: [
        {
          id: 1,
          sender: 'agent',
          senderName: 'Security Manager',
          content: 'Merhaba, API güvenlik güncellemesi yapılmıştır. Lütfen sistemlerinizi güncelleyiniz.',
          timestamp: '2023-07-22T08:00:00',
          attachments: [
            { name: 'guvenlik_guncelleme.pdf', url: '#' }
          ]
        }
      ],
      statusHistory: [
        { status: 'open', timestamp: '2023-07-22T08:00:00', comment: 'Güvenlik güncellemesi duyuruldu' }
      ]
    },
    {
      id: '11',
      subject: 'Sunucu performans raporu',
      category: 'Teknik',
      status: 'pending',
      priority: 'normal',
      type: 'cc',
      createdAt: '2023-07-21T16:30:00',
      lastUpdated: '2023-07-21T16:30:00',
      description: 'Sunucu performans raporu ve öneriler.',
      assignedTo: 'DevOps Team',
      requester: 'DevOps Manager',
      messages: [
        {
          id: 1,
          sender: 'agent',
          senderName: 'DevOps Manager',
          content: 'Merhaba, sunucu performans raporu hazırlanmıştır. Ekte raporu inceleyebilirsiniz.',
          timestamp: '2023-07-21T16:30:00',
          attachments: [
            { name: 'performans_raporu.pdf', url: '#' }
          ]
        }
      ],
      statusHistory: [
        { status: 'open', timestamp: '2023-07-21T16:30:00', comment: 'Performans raporu gönderildi' },
        { status: 'pending', timestamp: '2023-07-21T16:30:00', comment: 'İnceleme bekleniyor' }
      ]
    },
    // Takip ettiklerim
    {
      id: '8',
      subject: 'API güncelleme planları',
      category: 'Geliştirme',
      status: 'pending',
      priority: 'high',
      type: 'follower',
      createdAt: '2023-07-19T11:00:00',
      lastUpdated: '2023-07-19T11:00:00',
      description: 'API güncelleme planları ve zaman çizelgesi.',
      assignedTo: 'Development Team',
      requester: 'Lead Developer',
      messages: [
        {
          id: 1,
          sender: 'agent',
          senderName: 'Lead Developer',
          content: 'Merhaba, API güncelleme planları hazırlanmıştır. Geri bildirimlerinizi bekliyoruz.',
          timestamp: '2023-07-19T11:00:00',
          attachments: [
            { name: 'api_planlama.pdf', url: '#' }
          ]
        }
      ],
      statusHistory: [
        { status: 'open', timestamp: '2023-07-19T11:00:00', comment: 'Planlama paylaşıldı' },
        { status: 'pending', timestamp: '2023-07-19T11:00:00', comment: 'Geri bildirim bekleniyor' }
      ]
    },
    {
      id: '9',
      subject: 'Güvenlik güncellemesi',
      category: 'Güvenlik',
      status: 'open',
      priority: 'high',
      type: 'follower',
      createdAt: '2023-07-17T09:30:00',
      lastUpdated: '2023-07-17T09:30:00',
      description: 'Güvenlik güncellemesi ve etkilenen sistemler.',
      assignedTo: 'Security Team',
      requester: 'Security Analyst',
      messages: [
        {
          id: 1,
          sender: 'agent',
          senderName: 'Security Analyst',
          content: 'Merhaba, kritik güvenlik güncellemesi yapılmıştır. Lütfen sistemlerinizi güncelleyiniz.',
          timestamp: '2023-07-17T09:30:00',
          attachments: [
            { name: 'guvenlik_patch.pdf', url: '#' }
          ]
        }
      ],
      statusHistory: [
        { status: 'open', timestamp: '2023-07-17T09:30:00', comment: 'Güvenlik güncellemesi duyuruldu' }
      ]
    },
    {
      id: '12',
      subject: 'Yeni mobil uygulama lansmanı',
      category: 'Duyuru',
      status: 'open',
      priority: 'normal',
      type: 'follower',
      createdAt: '2023-07-23T13:45:00',
      lastUpdated: '2023-07-23T13:45:00',
      description: 'Yeni mobil uygulama lansmanı ve özellikler.',
      assignedTo: 'Mobile Team',
      requester: 'Mobile Product Manager',
      messages: [
        {
          id: 1,
          sender: 'agent',
          senderName: 'Mobile Product Manager',
          content: 'Merhaba, yeni mobil uygulamamız yayınlanmıştır! Yeni özellikler için ekteki dokümanı inceleyebilirsiniz.',
          timestamp: '2023-07-23T13:45:00',
          attachments: [
            { name: 'mobil_uygulama.pdf', url: '#' }
          ]
        }
      ],
      statusHistory: [
        { status: 'open', timestamp: '2023-07-23T13:45:00', comment: 'Mobil uygulama lansmanı duyuruldu' }
      ]
    },
    {
      id: '13',
      subject: 'Veritabanı optimizasyonu',
      category: 'Teknik',
      status: 'pending',
      priority: 'high',
      type: 'follower',
      createdAt: '2023-07-24T10:15:00',
      lastUpdated: '2023-07-24T10:15:00',
      description: 'Veritabanı optimizasyonu ve performans iyileştirmeleri.',
      assignedTo: 'Database Team',
      requester: 'Database Administrator',
      messages: [
        {
          id: 1,
          sender: 'agent',
          senderName: 'Database Administrator',
          content: 'Merhaba, veritabanı optimizasyonu planları hazırlanmıştır. İnceleme ve onayınızı bekliyoruz.',
          timestamp: '2023-07-24T10:15:00',
          attachments: [
            { name: 'db_optimizasyon.pdf', url: '#' }
          ]
        }
      ],
      statusHistory: [
        { status: 'open', timestamp: '2023-07-24T10:15:00', comment: 'Optimizasyon planı hazırlandı' },
        { status: 'pending', timestamp: '2023-07-24T10:15:00', comment: 'Onay bekleniyor' }
      ]
    }
  ];

  // ID'ye göre talep bul
  const ticket = allTickets.find(t => t.id === id) || {
    id: 'not-found',
    subject: 'Talep bulunamadı',
    category: '-',
    status: 'closed',
    createdAt: '-',
    lastUpdated: '-',
    description: 'Bu talep bulunamadı veya erişim izniniz yok.',
    messages: [],
    statusHistory: []
  };

  // Zaman farkını hesaplama fonksiyonu
  const getTimeAgo = (timestamp) => {
    try {
      const messageDate = new Date(timestamp);
      const now = new Date();
      const diffInMinutes = Math.floor((now - messageDate) / (1000 * 60));
      
      if (diffInMinutes < 1) {
        return 'şimdi';
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes} dakika önce`;
      } else if (diffInMinutes < 1440) {
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours} saat önce`;
      } else {
        const days = Math.floor(diffInMinutes / 1440);
        return `${days} gün önce`;
      }
    } catch (error) {
      return '1 saat önce';
    }
  };

  // Customer numarası belirleme
  const getCustomerNumber = (ticketId) => {
    const num = parseInt(ticketId) || 1;
    return num;
  };

  // Durum etiketi için renk belirleme
  const getStatusTag = (status) => {
    let color = '';
    let text = '';

    switch (status) {
      case 'open':
        color = 'green';
        text = 'Açık';
        break;
      case 'pending':
        color = 'orange';
        text = 'Beklemede';
        break;
      case 'closed':
        color = 'red';
        text = 'Kapalı';
        break;
      default:
        color = 'default';
        text = status;
    }

    return <Tag color={color}>{text}</Tag>;
  };

  // Dosya yükleme ayarları
  const uploadProps = {
    multiple: true,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList(prev => [...prev, file]);
      message.success(`${file.name} dosyası eklendi`);
      return false;
    },
    fileList,
    accept: '*/*',
    showUploadList: false
  };

  // Ticket kapatma
  const handleCloseTicket = () => {
    message.success('Ticket kapatıldı');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  // Yeni mesaj gönderme
  const handleSendMessage = () => {
    if (newMessage.trim() === '' && fileList.length === 0) {
      message.warning('Lütfen bir mesaj yazın veya dosya ekleyin');
      return;
    }

    message.success('Mesajınız gönderildi');
    setNewMessage('');
    setFileList([]);
    setEmailTo('');
    setEmailCc([]);
  };

  const handleRemoveFile = (index) => {
    const newList = fileList.filter((_, i) => i !== index);
    setFileList(newList);
    message.info('Dosya kaldırıldı');
  };

  // Text formatting fonksiyonları
  const insertTextAtCursor = (before, after = '') => {
    const textarea = window.textAreaRef?.resizableTextArea?.textArea;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = newMessage.substring(start, end);
    
    const newText = newMessage.substring(0, start) + 
                    before + selectedText + after + 
                    newMessage.substring(end);
    
    setNewMessage(newText);
    
    // Cursor pozisyonunu ayarla
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleBold = () => {
    const boldTag = '**';
    insertTextAtCursor(boldTag, boldTag);
    setIsBold(!isBold);
  };

  const handleItalic = () => {
    const italicTag = '*';
    insertTextAtCursor(italicTag, italicTag);
    setIsItalic(!isItalic);
  };

  const handleUnderline = () => {
    insertTextAtCursor('<u>', '</u>');
    setIsUnderline(!isUnderline);
  };

  const handleLink = () => {
    const url = prompt('Link URL\'sini girin:');
    if (url) {
      insertTextAtCursor('[', `](${url})`);
    }
  };

  const handleUnorderedList = () => {
    insertTextAtCursor('\n- ', '');
  };

  const handleOrderedList = () => {
    insertTextAtCursor('\n1. ', '');
  };

  return (
    <Layout style={{ height: '100vh', background: '#f5f5f5' }}>
      {/* Sol Panel - Chat Alanı */}
      <Content style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}>
        {/* Üst Bar */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#fff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button 
              type="text"
              icon={<ArrowLeftOutlined />} 
              onClick={handleCloseTicket}
              style={{ cursor: 'pointer' }}
            />
            <Avatar 
              style={{ backgroundColor: '#1677ff' }}
              icon={<UserOutlined />}
            />
            <div>
              <div style={{ fontWeight: 600, fontSize: '16px' }}>Customer {getCustomerNumber(ticket.id)}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{getTimeAgo(ticket.lastUpdated)}</div>
            </div>
          </div>
          <Button 
            type="text" 
            icon={<CloseOutlined />} 
            onClick={handleCloseTicket}
            style={{ cursor: 'pointer' }}
          />
        </div>

        {/* Mesaj Alanı */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {ticket.messages.map((msg, index) => (
            <div key={msg.id}>
              {/* İlk mesaj ise bilgilendirme paneli göster */}
              {index === 0 && (
                <div style={{
                  background: '#fff7e6',
                  border: '1px solid #ffd666',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Avatar size="small" style={{ backgroundColor: '#1677ff' }} icon={<UserOutlined />} />
                    <Text strong>Customer {getCustomerNumber(ticket.id)}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{getTimeAgo(msg.timestamp)}</Text>
                  </div>
                  <Text>{msg.content}</Text>
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      {msg.attachments.map((attachment, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                          <PaperClipOutlined />
                          <a href={attachment.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px' }}>
                            {attachment.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Diğer mesajlar */}
              {index > 0 && (
                <div style={{
                  background: msg.sender === 'agent' ? '#fff2e8' : '#f6ffed',
                  borderRadius: '12px',
                  padding: '16px',
                  maxWidth: '80%',
                  alignSelf: msg.sender === 'user' ? 'flex-start' : 'flex-end',
                  marginLeft: msg.sender === 'user' ? '0' : 'auto',
                  marginRight: msg.sender === 'user' ? 'auto' : '0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Avatar 
                      size="small" 
                      style={{ backgroundColor: msg.sender === 'agent' ? '#ff7a45' : '#52c41a' }} 
                      icon={msg.sender === 'agent' ? <CommentOutlined /> : <UserOutlined />} 
                    />
                    <Text strong>{msg.sender === 'user' ? `Customer ${getCustomerNumber(ticket.id)}` : 'AI'}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{getTimeAgo(msg.timestamp)}</Text>
                  </div>
                  <Text>{msg.content}</Text>
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      {msg.attachments.map((attachment, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                          <PaperClipOutlined />
                          <a href={attachment.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px' }}>
                            {attachment.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Beklemede durumu */}
              {index === ticket.messages.length - 1 && ticket.status === 'pending' && (
                <div style={{
                  background: '#fff7e6',
                  border: '1px solid #ffd666',
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center',
                  marginTop: '12px'
                }}>
                  <Text type="secondary" style={{ fontSize: '14px' }}>Request is pending</Text>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Alt Input Alanı */}
        {ticket.status !== 'closed' && (
          <div style={{
            padding: '20px',
            borderTop: '1px solid #f0f0f0',
            background: '#fff'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>To:</Text>
              <Input 
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                placeholder="Email adresini girin"
                style={{ marginBottom: '8px', fontSize: '14px' }}
              />
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Email CCz:</Text>
              <Select
                mode="tags"
                style={{ width: '100%', fontSize: '14px' }}
                placeholder="CC email adresleri"
                value={emailCc}
                onChange={(value) => setEmailCc(value)}
                tokenSeparators={[',']}
              >
                <Option value="support@example.com">support@example.com</Option>
                <Option value="admin@example.com">admin@example.com</Option>
              </Select>
            </div>
            
            {/* Text Formatting Toolbar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '8px',
              borderBottom: '1px solid #f0f0f0',
              marginBottom: '8px'
            }}>
              <Button 
                type={isBold ? "primary" : "text"} 
                size="small" 
                icon={<BoldOutlined />} 
                onClick={handleBold}
                style={{ cursor: 'pointer' }}
              />
              <Button 
                type={isItalic ? "primary" : "text"} 
                size="small" 
                icon={<ItalicOutlined />} 
                onClick={handleItalic}
                style={{ cursor: 'pointer' }}
              />
              <Button 
                type={isUnderline ? "primary" : "text"} 
                size="small" 
                icon={<UnderlineOutlined />} 
                onClick={handleUnderline}
                style={{ cursor: 'pointer' }}
              />
              <Button 
                type="text" 
                size="small" 
                icon={<LinkOutlined />} 
                onClick={handleLink}
                style={{ cursor: 'pointer' }}
              />
              <Button 
                type="text" 
                size="small" 
                icon={<UnorderedListOutlined />} 
                onClick={handleUnorderedList}
                style={{ cursor: 'pointer' }}
              />
              <Button 
                type="text" 
                size="small" 
                icon={<OrderedListOutlined />} 
                onClick={handleOrderedList}
                style={{ cursor: 'pointer' }}
              />
              <Upload {...uploadProps}>
                <Button 
                  type="text" 
                  size="small" 
                  icon={<PaperClipOutlined />} 
                  style={{ cursor: 'pointer' }}
                />
              </Upload>
            </div>
            
            <div style={{ position: 'relative' }}>
              {/* Yüklenen dosyalar listesi */}
              {fileList.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <Text strong style={{ fontSize: '12px' }}>Yüklenen Dosyalar:</Text>
                  {fileList.map((file, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      gap: '8px', 
                      padding: '4px 8px',
                      background: '#f5f5f5',
                      borderRadius: '4px',
                      marginTop: '4px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <PaperClipOutlined />
                        <Text style={{ fontSize: '12px' }}>{file.name}</Text>
                      </div>
                      <Button 
                        type="text" 
                        size="small"
                        onClick={() => handleRemoveFile(index)}
                        style={{ cursor: 'pointer', padding: '0 4px' }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <TextArea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write a response..."
                autoSize={{ minRows: 3, maxRows: 6 }}
                style={{
                  border: '1px solid #d9d9d9',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                ref={(textarea) => {
                  if (textarea) {
                    // TextArea ref'ini global olarak erişilebilir hale getir
                    window.textAreaRef = textarea;
                  }
                }}
              />
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '12px'
              }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Upload {...uploadProps}>
                    <Button type="text" icon={<PaperClipOutlined />} size="small">
                      Dosya Ekle
                    </Button>
                  </Upload>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button onClick={handleCloseTicket} style={{ cursor: 'pointer' }}>
                    Close Ticket
                  </Button>
                  <Button 
                    type="primary" 
                    onClick={handleSendMessage}
                    style={{ 
                      background: '#722ed1', 
                      borderColor: '#722ed1',
                      cursor: 'pointer'
                    }}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Content>

      {/* Sağ Panel - Ticket Bilgileri */}
      <Sider 
        width={280} 
        style={{ 
          background: '#fafafa',
          borderLeft: '1px solid #f0f0f0',
          padding: '20px'
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <Text type="secondary" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            REQUESTER
          </Text>
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar size="small" style={{ backgroundColor: '#1677ff' }} icon={<UserOutlined />} />
            <Text strong>Test Customer {getCustomerNumber(ticket.id)}</Text>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              Created
            </Text>
            <Text style={{ fontSize: '14px' }}>{getTimeAgo(ticket.createdAt)}</Text>
          </div>

          <div>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              Last Activity
            </Text>
            <Text style={{ fontSize: '14px' }}>{getTimeAgo(ticket.lastUpdated)}</Text>
          </div>

          <div>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              Assigned to
            </Text>
            <Text style={{ fontSize: '14px' }}>AI</Text>
          </div>

          <div>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              ID
            </Text>
            <Text style={{ fontSize: '14px' }}>#{ticket.id}12</Text>
          </div>

          <div>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              Status
            </Text>
            <Tag 
              color="green" 
              style={{ 
                borderRadius: '12px',
                fontSize: '12px',
                padding: '2px 8px'
              }}
            >
              Awaiting your reply
            </Tag>
          </div>

          <div>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              Priority
            </Text>
            <Text style={{ fontSize: '14px' }}>low</Text>
          </div>

          <div>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              Issue Type
            </Text>
            <Text style={{ fontSize: '14px' }}>category1</Text>
          </div>
        </div>
      </Sider>
    </Layout>
  );
};

export default TicketDetail;