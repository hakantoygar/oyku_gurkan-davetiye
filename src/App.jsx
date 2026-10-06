import { useState, useEffect } from 'react';
import WeddingUpload from './WeddingUpload.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MapPin, Calendar, Clock, Utensils, Heart, CheckCircle, XCircle, Send, Image as ImageIcon, Sparkles, MessageCircle } from 'lucide-react';

function StoneCarvedCorner({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5 H95 V25 H30 V95 H5 Z" fill="#C5A059" fillOpacity="0.2" />
      <path d="M10 10 H90 V18 H24 V90 H10 Z" fill="#8B6F39" fillOpacity="0.3" />
      <circle cx="20" cy="20" r="4" fill="#C5A059" />
    </svg>
  );
}

function LuxuryCountdown({ targetDate, title }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const distance = new Date(targetDate).getTime() - new Date().getTime();
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="my-10 text-center"
    >
      <h3 className="font-cinzel text-sm sm:text-base text-[#8B6F39] tracking-[0.2em] mb-4 font-bold uppercase">{title}</h3>
      <div className="flex justify-center gap-2.5 sm:gap-4">
        {[
          { label: 'GÜN', value: timeLeft.days },
          { label: 'SAAT', value: timeLeft.hours },
          { label: 'DAKİKA', value: timeLeft.minutes },
          { label: 'SANİYE', value: timeLeft.seconds }
        ].map((item, idx) => (
          <div key={idx} className="bg-white/85 border border-[#C5A059]/35 rounded-xl p-3 w-18 sm:w-22 shadow-md backdrop-blur-sm">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-[#8B6F39] block">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 tracking-widest font-semibold block mt-1">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function PhotoGallery() {
  const photos = [
    { url: "/foto4.jpeg", caption: "Mutluluğa Doğru" },
    { url: "/foto2.jpeg", caption: "Birlikte Bir Ömür" },
    { url: "/foto1.jpeg", caption: "En Özel Günümüz" },
    { url: "/foto3.jpeg", caption: "Aşkımız" },
  ];

  const doubledPhotos = [...photos, ...photos];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12 text-center overflow-hidden"
    >
      <h3 className="font-cinzel text-base sm:text-lg text-[#8B6F39] tracking-[0.2em] mb-6 font-bold uppercase flex items-center justify-center gap-2">
        <ImageIcon className="w-5 h-5 text-[#C5A059]" /> Fotoğraf Galerisi
      </h3>

      <div className="relative w-full overflow-hidden">
        <motion.div 
          className="flex gap-4 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {doubledPhotos.map((photo, index) => (
            <div 
              key={index}
              className="bg-white p-2.5 rounded-2xl border border-[#C5A059]/30 shadow-md w-52 sm:w-64 shrink-0"
            >
              <div className="overflow-hidden rounded-xl aspect-[4/5] relative">
                <img 
                  src={photo.url} 
                  alt={photo.caption}
                  className="w-full h-full object-cover" 
                />
              </div>
              <p className="font-serif italic text-xs text-[#8B6F39] mt-2.5">{photo.caption}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function RsvpForm() {
  const [status, setStatus] = useState('accept');
  const [fullName, setFullName] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    setSubmitted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-14 bg-white/85 border border-[#C5A059]/35 rounded-2xl p-6 sm:p-10 text-center shadow-lg backdrop-blur-md"
    >
      <Heart className="w-8 h-8 text-[#C5A059] mx-auto mb-3 fill-[#C5A059]/20" />
      <h3 className="font-cinzel text-xl sm:text-2xl text-[#8B6F39] mb-2 font-bold tracking-wider">LÜTFEN CEVAP VERİNİZ</h3>
      <p className="font-serif text-sm text-gray-600 max-w-md mx-auto mb-6">
        Katılım durumunuzu lütfen <strong>1 Eylül 2026</strong> tarihine kadar bildiriniz.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto text-left">
          <div>
            <label className="block text-xs font-semibold text-[#8B6F39] uppercase tracking-wider mb-2">
              Katılım Durumunuz
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus('accept')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${status === 'accept' ? 'bg-[#8B6F39] text-white border-[#8B6F39] shadow-md' : 'border-[#C5A059]/40 text-[#8B6F39] bg-white'}`}
              >
                <CheckCircle className="w-4 h-4" /> Geleceğim
              </button>

              <button
                type="button"
                onClick={() => setStatus('decline')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${status === 'decline' ? 'bg-[#8B6F39]/20 text-[#8B6F39] border-[#8B6F39]' : 'border-[#C5A059]/40 text-[#8B6F39] bg-white'}`}
              >
                <XCircle className="w-4 h-4" /> Gelemiyorum
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8B6F39] uppercase tracking-wider mb-1.5">
              Adınız ve Soyadınız *
            </label>
            <input 
              type="text" 
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Örn: Ahmet Yılmaz" 
              className="w-full p-3.5 border border-[#C5A059]/35 rounded-xl text-sm bg-white outline-none focus:border-[#8B6F39]" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8B6F39] uppercase tracking-wider mb-1.5">
              Açıklama / Mesajınız (Opsiyonel)
            </label>
            <textarea 
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Çifte iletmek istediğiniz not veya kişi sayısı..." 
              className="w-full p-3.5 border border-[#C5A059]/35 rounded-xl text-sm bg-white outline-none focus:border-[#8B6F39] resize-none"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#8B6F39] hover:bg-[#70582B] text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <Send className="w-4 h-4" /> Yanıtı Gönder
          </button>
        </form>
      ) : (
        <div className="text-[#8B6F39] font-serif text-lg font-semibold py-4">
          ✨ Yanıtınız başarıyla iletildi. Teşekkür ederiz!
        </div>
      )}
    </motion.div>
  );
}

function InvitationApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpening(true);

    setTimeout(() => {
      setIsOpen(true);
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#E8D5B5', '#8B6F39', '#FFFFFF']
      });
    }, 850);
  };

  return (
    <div className="min-h-screen bg-[#F5EFDF] flex justify-center items-center p-0 sm:p-6 relative">
      
      {/* 1. MÜHÜRLÜ ZARF KAPLAMA EKRANI */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.85 } }}
            className="fixed inset-0 z-50 bg-[#EAE2D2] flex flex-col items-center justify-center p-3 sm:p-6 envelope-container"
          >
            <div className="relative w-full max-w-lg h-[90vh] max-h-[720px] bg-[#FAF6ED] border border-[#E2D8C6] rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center justify-center">
              
              <div className="absolute inset-0 border-t border-[#E2D8C6] pointer-events-none" style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0)' }} />
              <div className="absolute inset-0 border-b border-[#E2D8C6] pointer-events-none" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }} />

              <div 
                className={`absolute top-0 left-0 w-full h-1/2 bg-[#EDE4D3] border-b border-[#DBCFB9] envelope-flap ${isOpening ? 'envelope-flap-open' : ''}`}
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />

              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
                onClick={handleOpenEnvelope}
                className="relative z-30 w-28 h-28 sm:w-34 sm:h-34 rounded-full wax-seal-3d flex items-center justify-center cursor-pointer shadow-2xl"
              >
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#FFF8E7] gold-emboss-text tracking-widest">
                  ÖG
                </div>
              </motion.button>

              <div className="absolute bottom-12 text-center z-20 px-4">
                <p className="font-cursive text-2xl sm:text-3xl text-[#8B6F39]">Davetiyeyi açmak için</p>
                <p className="font-cinzel text-xs text-[#8B6F39]/80 tracking-[0.25em] uppercase mt-2 font-semibold">
                  mühüre tıklayınız
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. TAŞ / ALÇI KABARTMALI 3D DAVETİYE KARTI */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full max-w-xl real-stone-frame p-6 sm:p-12 relative my-4 sm:my-8 overflow-hidden"
        >
          <div className="stone-carved-border" />

          <StoneCarvedCorner className="absolute top-6 left-6 w-10 h-10 pointer-events-none" />
          <StoneCarvedCorner className="absolute top-6 right-6 w-10 h-10 transform rotate-90 pointer-events-none" />
          <StoneCarvedCorner className="absolute bottom-6 left-6 w-10 h-10 transform -rotate-90 pointer-events-none" />
          <StoneCarvedCorner className="absolute bottom-6 right-6 w-10 h-10 transform rotate-180 pointer-events-none" />

          <div className="relative z-10 text-center">
            
            {/* BAŞLIK & İSİMLER */}
            <div className="py-6 mb-8 border-b border-[#C5A059]/30">
              <p className="font-cinzel text-xs text-[#8B6F39] tracking-[0.3em] uppercase mb-4 font-bold">Düğün Davetiyesi</p>
              <h1 className="font-serif text-5xl sm:text-7xl font-bold text-[#8B6F39] tracking-wider my-2 gold-emboss-text">ÖYKÜ</h1>
              <span className="font-cursive text-4xl sm:text-6xl text-[#C5A059] block my-1">&</span>
              <h1 className="font-serif text-5xl sm:text-7xl font-bold text-[#8B6F39] tracking-wider my-2 gold-emboss-text">GÜRKAN</h1>
              <p className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.35em] text-gray-600 mt-6 font-semibold">
                Evleniyoruz
              </p>
            </div>

            {/* GERİ SAYIMLAR */}
            <LuxuryCountdown targetDate="2026-09-17T20:00:00" title="Kına Gecesi Geri Sayımı" />
            <LuxuryCountdown targetDate="2026-09-20T20:00:00" title="Düğün Töreni Geri Sayımı" />

            {/* KENDİLİĞİNDEN YANA AKAN FOTOĞRAF GALERİSİ */}
            <PhotoGallery />

            {/* KINA VE DÜĞÜN KARTLARI */}
            <div className="space-y-6 my-10 text-left">
              
              {/* Kına */}
              <div className="bg-white/90 border border-[#C5A059]/35 rounded-2xl p-6 shadow-sm backdrop-blur-md">
                <span className="bg-[#C5A059] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3">
                  Kına Gecesi
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#8B6F39] mb-2">LİVİA DÜĞÜN SALONU</h3>
                <div className="text-xs sm:text-sm space-y-2 text-gray-700">
                  <p className="flex items-center gap-2.5"><Calendar className="w-4 h-4 text-[#C5A059]"/> 17 Eylül 2026 Perşembe</p>
                  <p className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-[#C5A059]"/> Saat: 20:00</p>
                  <p className="flex items-start gap-2.5 text-gray-500 pt-1.5 border-t border-gray-100">
                    <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5"/>
                    75. Yıl, 5307. Sk. No:146/A, 45030 Yunusemre / Manisa
                  </p>
                </div>
                <a
                  href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjQ9tWogt-WAxUAAAAAHQAAAAAQCA..i&rlz=1C1GCEA_enTR1153TR1153&sca_esv=2a2a17d2b67c4fec&pvq=Cg0vZy8xMXdtd2Q2aGx0IgsKBWxpdmlhEAIYAw&lqi=CgVsaXZpYUjZ_Iy2z7uAgAhaERAAGAAiBWxpdmlhKgQIAhAAkgENd2VkZGluZ192ZW51ZQ&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=tr&sa=X&ftid=0x14b99d9df5fed185:0xa7bdaf54fb05cec8"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 w-full bg-[#8B6F39] hover:bg-[#70582B] text-white font-semibold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md"
                >
                  <MapPin className="w-4 h-4" /> Haritada Aç ve Yol Tarifi Al
                </a>
              </div>

              {/* Düğün */}
              <div className="bg-white/90 border border-[#C5A059]/35 rounded-2xl p-6 shadow-sm backdrop-blur-md">
                <span className="bg-[#8B6F39] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3">
                  Düğün Töreni
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#8B6F39] mb-2">BEYOĞLU WEDDING HALL</h3>
                <div className="text-xs sm:text-sm space-y-2 text-gray-700">
                  <p className="flex items-center gap-2.5"><Calendar className="w-4 h-4 text-[#C5A059]"/> 20 Eylül 2026 Pazar</p>
                  <p className="flex items-center gap-2.5"><Utensils className="w-4 h-4 text-[#C5A059]"/> Yemek Servisi: 17:00 - 20:00</p>
                  <p className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-[#C5A059]"/> Düğün Başlangıcı: 20:00</p>
                  <p className="flex items-start gap-2.5 text-gray-500 pt-1.5 border-t border-gray-100">
                    <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5"/>
                    Barış, İzmir Uşak Yolu No:57, 45300 Salihli / Manisa
                  </p>
                </div>
                <a
                  href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwj45LGlgd-WAxUAAAAAHQAAAAAQDw..i&rlz=1C1GCEA_enTR1153TR1153&pvq=Cg0vZy8xMXhkOTg2OW1kIiYKIHNhbGlobGkgYmV5b8SfbHUgZMO8xJ_DvG4gc2Fsb251EAIYAw&lqi=CiBzYWxpaGxpIGJleW_En2x1IGTDvMSfw7xuIHNhbG9udUjszIyUsbyAgAhaOhAAEAEQAhADGAAYASIgc2FsaWhsaSBiZXlvxJ9sdSBkw7zEn8O8biBzYWxvbnUqCggCEAAQARACEAOSAQ13ZWRkaW5nX3ZlbnVl&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=tr&sa=X&ftid=0x14b9a79d88d8b703:0x61da5433f240c603"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 w-full bg-[#8B6F39] hover:bg-[#70582B] text-white font-semibold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md"
                >
                  <MapPin className="w-4 h-4" /> Haritada Aç ve Yol Tarifi Al
                </a>
              </div>

            </div>

            {/* GELİN ALMA MERASİMİ */}
            <div className="bg-[#FAF6EE] border border-dashed border-[#C5A059]/50 rounded-2xl p-5 my-8 text-center shadow-inner">
              <h5 className="font-cinzel text-sm text-[#8B6F39] font-bold tracking-wider mb-1">📌 GELİN ALMA MERASİMİ</h5>
              <p className="text-xs sm:text-sm text-gray-700 font-medium mt-1">
               20/09/2026 Pazar günü 10:00'da gelin alma merasimi için oğlan evinden çıkılacaktır.
              </p>
            </div>

            {/* RSVP FORMU */}
            <RsvpForm />

            {/* TEŞEKKÜR VE HAKAN TOYGAR ŞIK REKLAM / İMZA ALANI (FOOTER) */}
            <div className="mt-12 pt-8 border-t border-[#C5A059]/25 text-center">
              <p className="font-cursive text-4xl text-[#8B6F39] flex items-center justify-center gap-3 mb-6">
                Teşekkür Ederiz <Heart className="w-6 h-6 text-[#C5A059] fill-[#C5A059] inline" />
              </p>

              {/* REKLAM & İLETİŞİM KUTUSU */}
              <div className="bg-[#FAF6EE]/80 border border-[#C5A059]/30 rounded-2xl p-5 text-center shadow-inner max-w-md mx-auto">
                <p className="font-serif italic text-xs sm:text-sm text-gray-600 mb-2 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  Siz de özel günlerinize şıklık katmak ister misiniz?
                </p>
                <p className="font-cinzel text-xs font-bold text-[#8B6F39] tracking-wider uppercase mb-3">
                  Hakan Toygar • Dijital Davetiye
                </p>
                <a
                  href="https://wa.me/905454189302?text=Merhaba,%20ben%20de%20%C3%B6zel%20g%C3%BCn%C3%BCm%20i%C3%A7in%20dijital%20davetiye%20tasarlatmak%20istiyorum."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#8B6F39] hover:bg-[#70582B] text-white font-medium px-4 py-2.5 rounded-xl text-xs transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" /> Özel Davetiye Tasarlat
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      )}

    </div>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  if (path === '/fotograf' || path === '/fotoğraf') {
    return <WeddingUpload />;
  }

  return <InvitationApp />;
}
