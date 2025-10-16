<img width="700" height="699" alt="image" src="https://github.com/user-attachments/assets/b716436e-cac0-47f7-ac91-4b737ea0d423" />
<img width="1920" height="939" alt="image" src="https://github.com/user-attachments/assets/cdc28995-d946-4ce8-abbb-a735b7ed3c95" />
<img width="1900" height="940" alt="image" src="https://github.com/user-attachments/assets/326bc28b-2830-4fad-92f9-5989a8f5f2f8" />
<img width="1920" height="900" alt="image" src="https://github.com/user-attachments/assets/40e5ef15-2b7b-48d3-a17c-60debbdbb0b5" />
<img width="1876" height="904" alt="image" src="https://github.com/user-attachments/assets/e00dace3-b208-42e8-b8b5-f608abb6941e" />

# Grispi Müşteri Portalı (Frontend)

Müşterilerin taleplerini görüntüleyip yanıtlayabildiği, CSV/Excel içe aktarma akışını da barındıran React tabanlı demo portalı. Tamamen frontend (mock veriler), giriş/doğrulama ve yönlendirmeler localStorage ve React Router ile simüle edilir.

## Özellikler
- Talepler
  - My Requests, Requests I’m CC’d On, Requests I’m Followers On sekmeleri
  - Listeleme, arama, sıralama (status/priority/date)
  - Talep detayında müşteri/agent diyalogu, ek dosyalar, durum/öncelik bilgisi
  - Mesaj yazma alanında kalın ve italik biçimlendirme (markdown benzeri)
- İçe Aktarma (CSV/Excel)
  - Dosya yükleme, önizleme, alan eşleştirme, özet ve sonuç adımları
- UI/UX
  - Ant Design bileşenleri, duyarlı yerleşim
  - Basit mock login akışı (localStorage)

## Hızlı Başlangıç
Önkoşullar: Node 18+

```bash
npm install
npm run dev
# http://localhost:5173
```

Giriş (mock): E-posta veya telefon + herhangi bir şifre.
- Başarılı girişte localStorage.isAuthenticated = 'true' ayarlanır.

Çıkış: Sağ üst kullanıcı menüsünden “Log Out”.

## Script’ler
- `npm run dev`: Geliştirme sunucusu (Vite)
- `npm run build`: Üretim derlemesi
- `npm run preview`: Üretim derlemesini yerelde önizleme

## Proje Yapısı (özet)
```
src/
  pages/
    TicketList.jsx        # Talepler listesi + sekmeler
    TicketDetail.jsx      # Talep detayları, mesajlaşma, ekler
    Login.jsx             # Mock login
    ImportStart.jsx       # İçe aktarma başlangıç
    ImportPreview.jsx     # Önizleme
    ImportMapping.jsx     # Alan eşleştirme
    ImportSummary.jsx     # Özet
    ImportResult.jsx      # Sonuç
  layouts/
    MainLayout.jsx        # Header/Sider + içerik
  utils/
    fileParser.js         # CSV/Excel okuma yardımcıları
  main.jsx, App.jsx, styles...
```

## Yönlendirmeler (Routes)
- `/login`: Giriş sayfası (mock)
- `/`: Yetkili kullanıcılar için ana layout
  - `/` (index): TicketList (sekmeler: My Requests, CC, Followers)
  - `/tickets/:id`: TicketDetail (müşteri/agent konuşmaları)
  - `/tickets/new`: Yeni talep (placeholder)
  - `/profile`: Profil (placeholder)
  - `/import`, `/import/preview`, `/import/mapping`, `/import/summary`, `/import/result`

Notlar:
- Giriş yapılmadıysa `/login`’a yönlendirilir (localStorage.isAuthenticated kontrolü).
- Sekmelerde Subject’e tıkladığınızda ilgili id ile `/tickets/:id` açılır.
- CC ve Followers sekmeleri için 6–9 id’leri; My Requests için 1–5 id’leri mock olarak mevcuttur.

## Metin Biçimlendirme (TicketDetail)
- “B” (Bold) => seçili metni `**metin**` ile sarar
- “I” (Italic) => seçili metni `*metin*` ile sarar
- Bağlantı ve liste kısayolları da (link, unordered/ordered) mevcuttur

## CSV/Excel İçe Aktarma
- Desteklenen formatlar: CSV (UTF‑8), XLSX
- Akış: Dosya yükle → Önizleme → Eşleştirme → Özet → Sonuç

## Geliştirme İpuçları
- Mock veri `TicketDetail.jsx`’te `allTickets` içinde tanımlıdır (id 1–9+).
- Yeni id eklerken `TicketList.jsx` ve `TicketDetail.jsx` mock verilerinin uyumlu olduğundan emin olun.
- Giriş akışı gerçek API içermez; `isAuthenticated` anahtarıyla simüle edilir.

## Bilinen Sınırlamalar
- Backend yoktur; tüm veriler mock’tur.
- Biçimlendirme editörü markdown benzeri basit ekleme yapar; render markdown değildir.
- Dosya yükleme sadece listeye ekler, gerçek upload yoktur.

## Teknolojiler
- React 18, Vite
- Ant Design
- React Router
- XLSX (Excel işleme)

