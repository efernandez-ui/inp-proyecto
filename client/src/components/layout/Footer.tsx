import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="container mx-auto px-4">
        
        {/* About Box */}
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-xl border border-gray-200 p-8 text-center mb-12 shadow-sm">
           <p className="text-lg font-medium text-gray-700 mb-6">
             Desde el año 1991 somos expertos en el negocio de repuestos y accesorios para motos
           </p>
           <Button className="bg-intercap-blue hover:bg-blue-600 text-white font-bold rounded-full px-8">
             Conocé más de Nosotros <ArrowRight className="w-4 h-4 ml-2" />
           </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left border-t border-gray-100 pt-8">
           <div>
             <h4 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wider">Contacto</h4>
             <ul className="space-y-3 text-sm text-gray-600">
               <li className="flex items-center justify-center md:justify-start gap-2">
                 <MapPin className="w-4 h-4 text-intercap-blue" /> Belgrano 777, Reconquista, Santa Fe
               </li>
               <li className="flex items-center justify-center md:justify-start gap-2">
                 <Phone className="w-4 h-4 text-intercap-blue" /> 0810-888-21130
               </li>
               <li className="flex items-center justify-center md:justify-start gap-2">
                 <Mail className="w-4 h-4 text-intercap-blue" /> info@intercap.com.ar
               </li>
             </ul>
           </div>
           
           <div>
             <h4 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wider">Horarios</h4>
             <ul className="space-y-2 text-sm text-gray-600">
               <li>Lunes a Viernes: 8:00 - 12:00 / 16:00 - 20:00</li>
               <li>Sábados: 8:30 - 12:30</li>
             </ul>
           </div>

           <div>
             <h4 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wider">Síguenos</h4>
             <div className="flex justify-center md:justify-start gap-4">
               <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                 <Facebook className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                 <Instagram className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                 <Youtube className="w-5 h-5" />
               </a>
             </div>
           </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          <p>© 2025 Intercap S.A. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
