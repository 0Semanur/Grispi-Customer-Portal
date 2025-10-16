# CSV/Excel Veri İçe Aktarma Sistemi

## Proje Açıklaması
Bu proje, CSV ve Excel dosyalarından kişi ve organizasyon verilerini sisteme aktarmak için geliştirilmiş bir React uygulamasıdır.

## Özellikler
- ✅ CSV ve Excel dosya desteği
- ✅ Veri önizleme ve düzenleme
- ✅ Esnek alan eşleştirme
- ✅ Telefon numarası format doğrulama
- ✅ E-posta format doğrulama
- ✅ Hata raporlama ve düzeltme
- ✅ Toplu veri işleme

## Kurulum
```bash
npm install
npm run dev
```

## Kullanım Adımları
1. **Dosya Yükleme**: CSV/Excel dosyanızı seçin
2. **Veri Önizleme**: Verilerinizi kontrol edin
3. **Alan Eşleştirme**: Sütunları sistem alanlarıyla eşleştirin
4. **Doğrulama**: Hataları kontrol edin ve düzeltin
5. **İçe Aktarma**: Verileri sisteme aktarın

## Desteklenen Formatlar
- **CSV**: UTF-8 kodlamalı, virgül ayraçlı
- **Excel**: .xlsx formatı

## Veri Gereksinimleri
### Kişiler için:
- E-posta VEYA telefon (en az biri zorunlu)
- Ad ve soyad önerilir

### Organizasyonlar için:
- Adres ve telefon zorunlu
- Organizasyon adı zorunlu

## Teknolojiler
- React 18
- Ant Design
- XLSX (Excel işleme)
- React Router