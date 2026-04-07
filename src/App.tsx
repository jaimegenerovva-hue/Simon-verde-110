import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Waves, 
  Palmtree, 
  Car, 
  Mountain, 
  ArrowUpFromLine, 
  Sparkles, 
  Mail, 
  Layout, 
  PlayCircle, 
  MapPin, 
  Phone, 
  Globe,
  Plus,
  Minus,
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Bed,
  Menu,
  Box
} from "lucide-react";
import { VILLA_DE_CLASE_ALTA, PROPERTY_GALLERY } from "./constants";
import { AnimatePresence } from "motion/react";

const iconMap: Record<string, any> = {
  Waves,
  Palmtree,
  Car,
  Mountain,
  ArrowUpFromLine,
  Sparkles,
  Sun,
  Layout,
  Bed
};

export default function App() {
  const property = VILLA_DE_CLASE_ALTA;
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeCategory, setActiveCategory] = useState("Todas las fotos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxSource, setLightboxSource] = useState<"gallery" | "hero">("gallery");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 1));

  const categories = [
    { id: "Todas las fotos", title: "Todas las fotos", image: "https://fotos15.apinmo.com/3503/28245230/41-1.jpg" },
    { id: "exterior", title: "Exterior", image: "https://fotos15.apinmo.com/3503/28245230/41-4s.jpg" },
    { id: "salon", title: "Salón", image: "https://fotos15.apinmo.com/3503/28245230/41-16s.jpg" },
    { id: "cocina", title: "Cocina", image: "https://fotos15.apinmo.com/3503/28245230/41-27s.jpg" },
    { id: "dormitorios", title: "Dormitorios", image: "https://fotos15.apinmo.com/3503/28245230/41-31s.jpg" },
    { id: "banos", title: "Baños", image: "https://fotos15.apinmo.com/3503/28245230/41-43s.jpg" },
    { id: "planos", title: "Planos", image: "https://fotos15.apinmo.com/3503/28245230/41-52s.jpg" },
  ];

  const getGalleryImages = () => {
    if (activeCategory === "Todas las fotos") {
      const allImages = Object.values(PROPERTY_GALLERY).flat();
      return Array.from(new Set(allImages));
    }
    return PROPERTY_GALLERY[activeCategory as keyof typeof PROPERTY_GALLERY] || [];
  };

  const galleryImages = getGalleryImages();

  const openLightbox = (index: number, source: "gallery" | "hero" = "gallery") => {
    setLightboxIndex(index);
    setLightboxSource(source);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "auto";
  };

  const currentImages = lightboxSource === "hero" ? [property.images[0], property.images[1], property.images[2]] : galleryImages;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % currentImages.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + currentImages.length) % currentImages.length);
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <nav className="flex justify-between items-center w-full px-6 py-3 max-w-screen-2xl mx-auto">
          <a href="https://www.comprarcasasevilla.com/" className="flex items-center">
            <img 
              src="https://i.ibb.co/L2nz0C4/logo-comprarcasa-2023-11-16-081921.png" 
              alt="Comprarcasa Sevilla" 
              className="h-12 md:h-14 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10 items-center">
            <a href="https://www.comprarcasasevilla.com/" className="text-gray-700 hover:text-primary font-medium transition-colors">Inicio</a>
            <a href="https://www.comprarcasa.com/inmuebles" className="text-gray-700 hover:text-primary font-medium transition-colors">Inmuebles</a>
            <a href="https://www.comprarcasasevilla.com/" className="text-gray-700 hover:text-primary font-medium transition-colors">Contacto</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white border-b border-gray-100 md:hidden shadow-xl"
            >
              <div className="flex flex-col p-6 gap-4">
                <a 
                  href="https://www.comprarcasasevilla.com/" 
                  className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </a>
                <a 
                  href="https://www.comprarcasa.com/inmuebles" 
                  className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inmuebles
                </a>
                <a 
                  href="https://www.comprarcasasevilla.com/" 
                  className="text-lg font-medium text-gray-800 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-24">
        {/* Hero Gallery */}
        <section className="max-w-screen-2xl mx-auto px-4 md:px-8 mb-12">
          {/* Mobile Carousel (Visible only on mobile) */}
          <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-3 no-scrollbar -mx-4 px-4">
            {[property.images[0], property.images[1], property.images[2]].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => openLightbox(i, "hero")}
                className="min-w-[85vw] aspect-[4/3] snap-center overflow-hidden rounded-sm shadow-lg cursor-pointer"
              >
                <img 
                  className="w-full h-full object-cover" 
                  src={img} 
                  alt={`Hero ${i}`}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
            {/* Spacer for better scroll ending */}
            <div className="min-w-[1px] h-full"></div>
          </div>

          {/* Desktop Grid (Visible only on desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-2 h-[716px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              onClick={() => openLightbox(0, "hero")}
              className="col-span-8 overflow-hidden group relative cursor-pointer"
            >
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                src={property.images[0]} 
                alt={property.name}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Plus className="text-white w-12 h-12" />
              </div>
            </motion.div>
            <div className="col-span-4 flex flex-col gap-2">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onClick={() => openLightbox(1, "hero")}
                className="h-1/2 overflow-hidden group relative cursor-pointer"
              >
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  src={property.images[1]} 
                  alt="Interior"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Plus className="text-white w-8 h-8" />
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                onClick={() => openLightbox(2, "hero")}
                className="h-1/2 overflow-hidden group relative cursor-pointer"
              >
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  src={property.images[2]} 
                  alt="Bedroom"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Plus className="text-white w-8 h-8" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Property Summary & Primary Info */}
        <section className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-16 pb-12 border-b border-outline-variant/20">
          <div className="md:col-span-8">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <nav className="flex gap-2 text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                <span>{property.location.country}</span> 
                <span>/</span> 
                <span>{property.location.city}</span> 
                <span>/</span> 
                <span className="text-primary font-semibold">{property.location.area}</span>
              </nav>
              <h1 className="text-5xl md:text-6xl text-on-surface leading-tight mb-4">{property.name}</h1>
              <p className="text-xl text-on-surface-variant font-light max-w-2xl">
                Una excepcional oportunidad residencial situada en la prestigiosa zona de Simón Verde, Mairena del Aljarafe.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-8 border-y border-outline-variant/20">
              <div>
                <span className="block text-xs uppercase tracking-widest text-on-surface-variant mb-1">Precio</span>
                <span className="text-2xl font-medium">€{property.price.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-on-surface-variant mb-1">Habitaciones</span>
                <span className="text-2xl font-medium">{property.bedrooms}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-on-surface-variant mb-1">Baños</span>
                <span className="text-2xl font-medium">{property.bathrooms}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-on-surface-variant mb-1">Superficie</span>
                <span className="text-2xl font-medium">{property.interiorArea} m²</span>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-2xl mb-6 font-serif">Descripción de la vivienda</h3>
              <div className="text-on-surface-variant leading-relaxed space-y-6 text-lg font-light">
                {property.narrative.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="md:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Contact Card */}
              <div className="bg-surface-container-lowest p-8 ambient-shadow border border-outline-variant/10">
                <div className="flex flex-col gap-4">
                  <a 
                    href="mailto:magdalena@suhogarsevilla.com"
                    className="w-full bg-primary text-on-primary py-4 font-semibold tracking-wide hover:bg-primary-container transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" /> Contactar por email
                  </a>
                  <a 
                    href="https://wa.me/34955725200"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border border-primary text-primary py-4 font-semibold tracking-wide hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" /> Contactar por WhatsApp
                  </a>
                  <a 
                    href="tel:+34955725200"
                    className="w-full border border-primary text-primary py-4 font-semibold tracking-wide hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" /> Llamar por teléfono
                  </a>
                </div>
                <div className="mt-8 pt-8 border-t border-outline-variant/20 flex items-center gap-4">
                  <img 
                    className="w-16 h-16 rounded-full object-cover" 
                    src={property.agent.image} 
                    alt={property.agent.name}
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="block font-semibold">{property.agent.name}</span>
                    <span className="text-sm text-on-surface-variant">{property.agent.role}</span>
                  </div>
                </div>
              </div>

              {/* 3D Tour Card */}
              <div className="bg-gray-900 text-white p-8 ambient-shadow border border-gray-800 rounded-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-600/20 rounded-full">
                    <Box className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">Visita virtual 360</h3>
                    <p className="text-gray-400 text-sm">Recorre la vivienda como si estuvieras dentro</p>
                  </div>
                </div>
                <a 
                  href="https://my.matterport.com/show/?m=XgCbuRpGpAp&ts=5&lang=es&lp=1&hl=0&tourcta=2&play=2&mls=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#E30613] hover:bg-[#C40510] text-white py-4 font-bold tracking-widest uppercase text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
                >
                  <Sparkles className="w-4 h-4" /> Abrir tour
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="bg-surface-container-low pt-12 pb-24">
          <div className="max-w-screen-2xl mx-auto px-8">
            <h2 className="text-3xl mb-12 font-serif">Explorar Galería</h2>
            
            {/* Category Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-16">
              {categories.map((category, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ y: -5 }}
                  className={`group relative h-48 w-full overflow-hidden bg-surface-container-highest border transition-all duration-300 ambient-shadow ${
                    activeCategory === category.id ? "border-primary ring-1 ring-primary" : "border-outline-variant/10"
                  }`}
                >
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
                    activeCategory === category.id ? "opacity-90" : "opacity-60 group-hover:opacity-80"
                  }`}></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 text-left">
                    <span className="text-white text-[10px] uppercase tracking-[0.2em] font-bold">{category.title}</span>
                  </div>
                  {activeCategory === category.id && (
                    <motion.div 
                      layoutId="activeCategory"
                      className="absolute top-0 left-0 w-full h-1 bg-primary"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Image Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {galleryImages.map((img, i) => (
                <motion.div
                  key={`${activeCategory}-${i}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.02 }}
                  layout
                  onClick={() => openLightbox(i)}
                  className="aspect-[4/3] overflow-hidden bg-surface-container-highest group relative cursor-pointer"
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${activeCategory} ${i}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Plus className="text-white w-8 h-8" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            >
              <button 
                onClick={closeLightbox}
                className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors z-[110]"
              >
                <X size={32} />
              </button>

              <button 
                onClick={prevImage}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-[110] p-2"
              >
                <ChevronLeft size={48} />
              </button>

              <button 
                onClick={nextImage}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-[110] p-2"
              >
                <ChevronRight size={48} />
              </button>

              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-full max-h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={currentImages[lightboxIndex]} 
                  alt="Lightbox"
                  className="max-w-full max-h-[85vh] object-contain shadow-2xl select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-12 left-0 w-full text-center">
                  <span className="text-white/60 text-xs uppercase tracking-[0.3em] font-medium">
                    {lightboxIndex + 1} / {currentImages.length} — {lightboxSource === "hero" ? "Galería Principal" : activeCategory}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Amenities & Features */}
        <section className="py-24 max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <h2 className="text-4xl leading-tight font-serif">Comodidad, espacio y calidad de vida en cada rincón</h2>
              <p className="mt-6 text-on-surface-variant leading-relaxed font-light">
                Chalet adosado en Simón Verde diseñado para disfrutar del día a día con amplitud, luz natural y zonas exteriores privadas.
                Una vivienda ideal para familias que buscan tranquilidad, cercanía a Sevilla y un entorno residencial consolidado.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {property.amenities.map((amenity, i) => {
                  const Icon = iconMap[amenity.icon];
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="p-2 bg-primary/5 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <span className="block font-semibold mb-1">{amenity.label}</span>
                        <span className="text-sm text-on-surface-variant font-light leading-relaxed">
                          {amenity.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="bg-surface-container py-32">
          <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold block mb-6">UBICACIÓN Y ENTORNO</span>
              <h2 className="text-5xl mb-10 font-serif leading-tight">Tranquilidad residencial <br/>a un paso de Sevilla</h2>
              <div className="space-y-10">
                <div className="max-w-md">
                  <h4 className="font-semibold text-lg mb-3">Simón Verde, Mairena del Aljarafe</h4>
                  <p className="text-on-surface-variant leading-relaxed font-light text-lg">
                    Ubicada en Simón Verde, Mairena del Aljarafe, esta zona destaca por su entorno tranquilo y su excelente conexión con Sevilla, además de contar con todos los servicios necesarios a pocos minutos.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-12 pt-4">
                  {property.proximity.map((item, i) => (
                    <div key={i} className="group">
                      <span className="block text-primary font-bold text-3xl mb-2 group-hover:translate-x-1 transition-transform duration-300">{item.time}</span>
                      <span className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="h-[650px] w-full bg-surface-container-highest overflow-hidden relative group border border-outline-variant/20 ambient-shadow"
            >
              <motion.img 
                animate={{ scale: zoomLevel }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full object-cover origin-center" 
                src="https://i.ibb.co/DHHvGj7g/map-bn-green-highlight-no-menu.png" 
                alt="Location Map"
                referrerPolicy="no-referrer"
              />

              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

              {/* Submarine Radar Location Indicator */}
              <motion.div 
                animate={{ scale: zoomLevel }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute top-[52.5%] left-[49.8%] -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center origin-center"
              >
                {/* Refined Mask to completely hide any residue from the original marker */}
                <div className="absolute w-9 h-9 bg-[#e9e9e9] rounded-full blur-[2px] opacity-95"></div>
                <div className="absolute w-6 h-6 bg-[#e9e9e9] rounded-full"></div>

                {/* Central Core Point */}
                <div className="w-3.5 h-3.5 bg-primary rounded-full relative z-10 shadow-[0_0_10px_rgba(0,82,89,0.4)] border-2 border-white/40"></div>
                
                {/* Expanding Radar Rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3.5 h-3.5 border border-primary/40 rounded-full"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ 
                      scale: [1, 8], 
                      opacity: [0.7, 0] 
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: i * 1.3,
                      ease: "easeOut" 
                    }}
                  />
                ))}
              </motion.div>

              {/* Manual Zoom Controls */}
              <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
                <button 
                  onClick={handleZoomIn}
                  className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-white transition-all active:scale-95 border border-outline-variant/10"
                  aria-label="Zoom In"
                >
                  <Plus size={20} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={handleZoomOut}
                  className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-white transition-all active:scale-95 border border-outline-variant/10"
                  aria-label="Zoom Out"
                >
                  <Minus size={20} strokeWidth={2.5} />
                </button>
              </div>

              {/* Zoom Level Indicator */}
              <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold text-primary shadow-sm">
                Scale: {zoomLevel.toFixed(1)}x
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-24 max-w-screen-xl mx-auto px-8 text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl mb-6 font-serif tracking-tight">Descubre la vivienda en detalle</h2>
            <p className="text-on-surface-variant leading-relaxed font-light text-lg">
              Acompaña a nuestra compañera en este recorrido completo por la vivienda y conoce cada espacio, distribución y posibilidades de forma realista y cercana.
            </p>
          </div>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-outline-variant/10">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/ztYYvH4opXg"
              title="Recorrido por la vivienda"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-100 bg-white">
        <div className="flex flex-col lg:flex-row justify-between items-center px-8 py-12 w-full mx-auto max-w-screen-2xl gap-8">
          {/* Section 1: Logo & Tagline */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xs">
            <img 
              src="https://i.ibb.co/L2nz0C4/logo-comprarcasa-2023-11-16-081921.png" 
              alt="Comprarcasa" 
              className="h-10 w-auto mb-4 object-contain"
              referrerPolicy="no-referrer"
            />
            <p className="text-gray-500 text-xs font-medium leading-relaxed">
              Curating the world's most exceptional real estate for the discerning few.
            </p>
          </div>

          {/* Section 2: Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {["Privacy Policy", "Terms of Service", "Accessibility", "Contact"].map((link) => (
              <a 
                key={link} 
                className="text-gray-700 hover:text-primary transition-colors text-xs font-sans font-bold uppercase tracking-widest" 
                href="#"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Section 3: Copyright */}
          <div className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center lg:text-right">
            © 2024 COMPRARCASA DIGITAL CURATOR. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
