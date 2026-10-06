import React, { useState } from 'react';

const WaxSealHeart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const CameraIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

const GalleryIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="3" ry="3"/>
    <circle cx="9" cy="9" r="2"/>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function WeddingUpload() {
  const [guestName, setGuestName] = useState('');
  const [wishes, setWishes] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePhotoSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newPhotoItems = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      previewUrl: URL.createObjectURL(file)
    }));

    setPhotos((prev) => [...prev, ...newPhotoItems]);
  };

  const handleRemovePhoto = (id) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (photos.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center p-4 text-[#3A332C]">
        <div className="bg-[#FFFDF9] border border-[#EBE4D8] rounded-[2rem] p-8 max-w-sm w-full shadow-lg shadow-[#E4D9C7]/40 text-center space-y-4">
          <div className="w-16 h-16 bg-[#F4EFE6] text-[#B89255] border border-[#E5D7C3] rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckIcon />
          </div>
          <h2 className="font-serif text-2xl tracking-wide text-[#2D2620]">Kareleriniz Eklendi!</h2>
          <p className="text-[#6E645A] text-xs leading-relaxed">
            Bu özel anları bizimle paylaştığınız ve anı defterimizi güzelleştirdiğiniz için kalpten teşekkür ederiz.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setPhotos([]);
              setWishes('');
            }}
            className="w-full py-3 bg-[#B89255] hover:bg-[#A68045] text-white font-medium rounded-xl text-xs uppercase tracking-widest transition shadow-md shadow-[#B89255]/20 active:scale-[0.98]"
          >
            Yeni Fotoğraf Paylaş
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col justify-center items-center px-4 py-10 font-sans text-[#3A332C]">
      
      {/* Ana Davetiye Kartı */}
      <div className="relative bg-[#FFFDF9] border border-[#EBE4D8] rounded-[2rem] shadow-xl shadow-[#E3D8C6]/30 max-w-md w-full p-7 sm:p-9 space-y-6">
        
        {/* Üst Zarif Kenarlık Detayı */}
        <div className="absolute top-3 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#D9CBB7] to-transparent" />

        {/* Başlık & Mühür */}
        <div className="text-center space-y-2 pt-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F5EFE6] text-[#B89255] border border-[#E6D9C5] shadow-sm mb-1">
            <WaxSealHeart />
          </div>
          <h1 className="font-serif text-3xl tracking-wide text-[#2D2620]">
            Anı Albümü
          </h1>
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#B89255] font-semibold">
            Sizin Gözünüzden
          </p>
          <p className="text-xs text-[#7A6F64] max-w-xs mx-auto pt-1 leading-relaxed">
            Bu mutlu günde kameranıza takılan tüm güzel anları bizimle paylaşabilirsiniz.
          </p>
        </div>

        {/* Form Alanı */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Ad Soyad */}
          <div>
            <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#6B6156] mb-1.5">
              Adınız & Soyadınız
            </label>
            <input
              type="text"
              placeholder="Örn: Ayşe & Burak"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5DCD0] rounded-xl text-sm text-[#3A332C] placeholder-[#A69B8F] focus:outline-none focus:border-[#B89255] focus:bg-white focus:ring-1 focus:ring-[#B89255]/40 transition"
            />
          </div>

          {/* Not / Mesaj */}
          <div>
            <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#6B6156] mb-1.5">
              Tebrik Mesajınız
            </label>
            <textarea
              rows={2}
              placeholder="Bir ömür boyu mutluluklar dileriz..."
              value={wishes}
              onChange={(e) => setWishes(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5DCD0] rounded-xl text-sm text-[#3A332C] placeholder-[#A69B8F] focus:outline-none focus:border-[#B89255] focus:bg-white focus:ring-1 focus:ring-[#B89255]/40 transition resize-none"
            />
          </div>

          {/* Fotoğraf Seçim Butonları */}
          <div>
            <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#6B6156] mb-2">
              Fotoğraflar
            </label>

            <div className="grid grid-cols-2 gap-3">
              {/* Kamera Aç */}
              <label className="flex flex-col items-center justify-center p-4 border border-dashed border-[#D6C7B2] rounded-2xl cursor-pointer hover:border-[#B89255] hover:bg-[#F7F3EB] active:scale-[0.98] transition group text-center bg-[#FAF7F2]">
                <div className="w-10 h-10 rounded-full bg-[#EFE8DD] flex items-center justify-center mb-1.5 text-[#8C7654] group-hover:text-[#B89255] transition">
                  <CameraIcon />
                </div>
                <span className="text-xs font-medium text-[#4D443B]">Fotoğraf Çek</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoSelect}
                  disabled={isSubmitting}
                  className="hidden"
                />
              </label>

              {/* Galeriden Seç */}
              <label className="flex flex-col items-center justify-center p-4 border border-dashed border-[#D6C7B2] rounded-2xl cursor-pointer hover:border-[#B89255] hover:bg-[#F7F3EB] active:scale-[0.98] transition group text-center bg-[#FAF7F2]">
                <div className="w-10 h-10 rounded-full bg-[#EFE8DD] flex items-center justify-center mb-1.5 text-[#8C7654] group-hover:text-[#B89255] transition">
                  <GalleryIcon />
                </div>
                <span className="text-xs font-medium text-[#4D443B]">Galeriden Seç</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  disabled={isSubmitting}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Seçilen Fotoğraf Önizlemeleri */}
          {photos.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center text-xs font-medium text-[#7A6F64]">
                <span>Seçilenler</span>
                <span className="text-[#B89255] font-semibold">{photos.length} Kare</span>
              </div>

              <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-2 bg-[#F6F1E9] rounded-2xl border border-[#E3D7C5]">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden border border-[#D9CCBB]">
                    <img src={photo.previewUrl} alt="Önizleme" className="w-full h-full object-cover" />
                    {!isSubmitting && (
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-[#B89255] transition"
                      >
                        <CloseIcon />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gönder Butonu */}
          <button
            type="submit"
            disabled={isSubmitting || photos.length === 0}
            className="w-full py-3.5 bg-[#B89255] hover:bg-[#A68045] active:scale-[0.99] text-white font-medium uppercase tracking-widest rounded-xl shadow-md shadow-[#B89255]/25 transition disabled:opacity-40 disabled:cursor-not-allowed text-xs"
          >
            {isSubmitting ? (
              <span>Albüm Güncelleniyor...</span>
            ) : (
              <span>Fotoğrafları Paylaş {photos.length > 0 && `(${photos.length})`}</span>
            )}
          </button>
        </form>
      </div>

      <p className="text-[11px] text-[#A3988C] mt-6 tracking-wider">
        Çektiğiniz kareler doğrudan anı defterine eklenecektir.
      </p>
    </div>
  );
}