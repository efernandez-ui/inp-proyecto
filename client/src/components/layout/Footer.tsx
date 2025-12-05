import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-300 pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-2 bg-brand-blue rounded-sm" />
              <span className="font-display text-2xl tracking-wide italic text-white">
                INTERCAP
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Líder en distribución de repuestos y accesorios para motocicletas. Calidad y compromiso en cada envío.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Navegación</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-brand-blue transition-colors">Inicio</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Catálogo Completo</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Ofertas Especiales</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Nuestras Sucursales</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-blue shrink-0" />
                <span>Av. Principal 1234,<br />Ciudad Autónoma de Buenos Aires</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-blue shrink-0" />
                <span>0800-555-MOTO (6686)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-blue shrink-0" />
                <span>ventas@intercap.com.ar</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Suscríbete para recibir las últimas novedades y ofertas exclusivas.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-blue"
              />
              <button className="bg-brand-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2025 Intercap S.A. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300">Términos y Condiciones</a>
            <a href="#" className="hover:text-gray-300">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
