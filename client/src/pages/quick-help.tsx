import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { useEffect, useState } from "react";
import { Check, Copy, Facebook, Instagram, Play, Send, Smile, UserRound, Youtube } from "lucide-react";
import { branches } from "@/pages/landing";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLocation } from "wouter";

type HelpSection = "help" | "useful-info" | "branches" | "banks" | "jobs" | "client" | "about";

const helpMenuItems: { label: string; section: HelpSection }[] = [
  { label: "Sobre Nosotros", section: "about" },
  { label: "Bancos", section: "banks" },
  { label: "Información útil", section: "useful-info" },
  { label: "Sucursales", section: "branches" },
  { label: "Forma parte", section: "jobs" },
  { label: "Quiero ser cliente", section: "client" },
  { label: "Preguntas frecuentes", section: "help" },
];

const panelClass = "mx-auto w-full max-w-[1200px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm";
const panelPaddingClass = "px-5 py-7 sm:px-8 sm:py-9 lg:px-10";
const pageTitleClass = "text-2xl font-black tracking-tight text-intercap-blue-dark sm:text-3xl";
const sectionTitleClass = "text-lg font-bold text-intercap-blue-dark sm:text-xl";
const supportingTextClass = "mt-2 text-sm leading-6 text-slate-600 sm:text-base";
const fieldClass = "h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-intercap-blue-dark outline-none transition placeholder:text-slate-400 focus:border-intercap-blue-main focus:ring-2 focus:ring-intercap-blue-main/15";

const bankAccounts = [
  { name: "Mercado Pago", accountType: "Billetera Virtual", account: "", cbu: "0000003100078331726474", alias: "intercapsrl.mp", branch: "", brandClass: "bg-[#079bd3]", logo: "mercado pago" },
  { name: "Banco Credicoop", accountType: "Cta.Cte. Pesos ($)", account: "388 8948/0", cbu: "19103888 55038800894800", alias: "INTERCAP.CREDI.CC", branch: "388", brandClass: "bg-[#777974]", logo: "BANCO\nCREDICOOP" },
  { name: "Galicia", accountType: "Cta.Cte. Pesos ($)", account: "2215-2-345-9", cbu: "00703459 20000002215293", alias: "INTERCAP.GALICIA.CC", branch: "345", brandClass: "bg-[#fa5a00]", logo: "Galicia" },
  { name: "Macro", accountType: "Cta.Cte. Pesos ($)", account: "3-364-0000613672-7", cbu: "28503644 3000006136727-3", alias: "INTERCAP.MACRO.CC", branch: "787", brandClass: "bg-[#252d59]", logo: "Macro" },
  { name: "Banco Nación", accountType: "Cta.Cte. Pesos ($)", account: "428 00156/60", cbu: "01104282 20042800156606", alias: "INTERCAP.NACION.CC", branch: "2900", brandClass: "bg-[#087b91]", logo: "Banco Nación" },
];

const faqItems = [
  {
    question: "¿Cómo hago para comprar?",
    answer: "Para comenzar a comprar en nuestra tienda online, debes darte de alta como cliente. Ingresa al apartado “Ingresar o Registrarse” y haz clic en “QUIERO SER CLIENTE”.\n\nCompleta los datos que requiere la Solicitud de Alta de Cliente y haz clic en “Enviar”. El comercial asignado a tu cuenta se comunicará contigo para presentarse y acompañarte en el proceso de registro. Una vez aprobada el alta, deberás generar clave y usuario para el ingreso a la tienda virtual.",
  },
  { question: "¿Hay un monto mínimo para realizar mi compra?", answer: "No tenemos un monto mínimo para realizar una compra." },
  { question: "¿Los precios publicados incluyen IVA?", answer: "Los precios publicados incluyen IVA y son finales." },
  {
    question: "¿Cobran percepciones?",
    answer: "Sí, somos agentes de percepción de Ingresos Brutos en las provincias de Formosa, San Juan, Misiones, Buenos Aires, Santa Fe y Catamarca. Esto significa que, al realizar una compra con nosotros, debemos adicionar un porcentaje sobre el neto facturado correspondiente a estas jurisdicciones y remitirlo a las autoridades fiscales de dichas provincias. Es importante que mantengas actualizada la información fiscal de tu cuenta para que calculemos correctamente tus percepciones.",
  },
  { question: "¿Realizan envíos?", answer: "Sí, realizamos envíos a todo el país. Tenemos acuerdos con numerosos transportes que nos permiten llegar a todas las localidades en forma rápida y para todo tipo de carga." },
  {
    question: "¿Cuáles son los costos de envío?",
    answer: "En las localidades donde están situados nuestros depósitos los envíos no tienen cargo. Para el resto del país, los envíos están bonificados al 50% a partir de un volumen de 20 kg y al 100% a partir de los 50 kg. En el caso de los envíos que no están bonificados, nuestros acuerdos con transportistas nos permiten ofrecer las tarifas más competitivas del mercado.",
  },
  { question: "¿Dónde están localizados los depósitos de Intercap?", answer: "Tenemos depósitos en Buenos Aires, Resistencia, Tucumán y Mendoza. Podés consultar su ubicación en la sección Sucursales." },
  { question: "¿Qué demora tienen los envíos?", answer: "El tiempo de entrega depende de la localidad de destino. Normalmente, nuestros envíos tardan entre 1 y 3 días hábiles." },
  { question: "¿Quién puede recibir el producto?", answer: "Cualquier persona mayor de 18 años con DNI puede recibir el producto. Es importante verificar el estado de los bultos antes de firmar el remito al momento de la entrega.\n\nLa firma, aclaración y DNI al momento de la entrega será muestra de tu conformidad." },
  {
    question: "¿Qué debo tener en cuenta al recibir un pedido por transporte?",
    answer: "Paso 1 - Revisar el estado del embalaje\nAntes de firmar el remito, asegúrate de que el embalaje esté en buen estado.\n\nPaso 2 - Verificar la etiqueta del bulto\nCada bulto debe tener su etiqueta de envío correspondiente con tus datos.\n\nPaso 3 - Confirmar el contenido de los bultos\nComprueba que cada bulto contenga la cantidad de productos que figura en el remito. Si la mercadería viene en pallets, recomendamos desarmarlos para verificar todo el contenido.\n\nPaso 4 - Registrar diferencias o irregularidades\nSi detectas alguna diferencia entre lo que recibiste y lo que figura en el remito, o cualquier otra irregularidad, anótala en el comprobante del transporte antes de firmar.\n\nPaso 5 - Tomar fotos como evidencia\nEs esencial tomar fotografías de los bultos, sus etiquetas y cualquier observación que realices, para tener respaldo en caso de reclamos.\n\nPaso 6 - Completar el formulario de reclamo\nEn caso de necesitar hacer un reclamo, completa el formulario en nuestra tienda virtual en la sección de Consultas y Reclamos.",
  },
  {
    question: "¿Cómo realizo el pago de mis pedidos?",
    answer: "Puedes pagar tus pedidos mediante Echeq, transferencia bancaria, depósito o Mercado Pago. Podés consultar los números de cuenta en la sección Bancos.\n\nSi tenés una terminal de cobros Posnet o Mercado Pago provista por Intercap, podés acreditar tus cobros en tu cuenta corriente y aplicarlos a compras. Al mismo tiempo estarás ofreciendo más medios de pago a tus clientes con las tasas más bajas del mercado y disminuyendo tu carga de trabajo administrativo y trámites con las tarjetas.\n\nPara solicitar tu terminal de cobros, completá el formulario de solicitud de terminal.",
  },
  { question: "¿Dónde puedo ver mi factura?", answer: "El comprobante de factura será enviado al correo electrónico vinculado a la cuenta." },
  { question: "¿Cómo devolver o cambiar un producto?", answer: "Tienes hasta 30 (treinta) días corridos desde la recepción del producto para realizar cambios o devoluciones. La mercadería debe estar sin usar y en su embalaje original. El costo del envío de la devolución es a cargo del cliente, salvo que haya sido causada por un error de Intercap o del transporte." },
  {
    question: "¿Cómo hacer un reclamo o sugerencia?",
    answer: "Paso 1 - Acceder a la solapa de Autogestión.\n\nPaso 2 - Seleccionar la opción de Consultas y Reclamos.\n\nPaso 3 - Elegir el tipo de incidente\nSelecciona la categoría que mejor describa tu situación.\n\nPaso 4 - Completar el campo de Observaciones\nDeja un breve resumen de tu reclamo o sugerencia. Es importante ser claro y conciso para que tu mensaje sea entendido correctamente.\n\nPaso 5 - Adjuntar imágenes (opcional)\nSi es necesario, puedes adjuntar imágenes relacionadas con tu caso. Esto puede ayudar a ilustrar mejor tu situación y facilitar una respuesta más rápida y precisa.",
  },
];

const socialVideoGroups = [
  {
    title: "Bikeservice por Gustavo Morea",
    videos: [
      "https://www.youtube.com/embed/GxLFr9hIN14",
      "https://www.youtube.com/embed/0WWyYxDz_CY",
      "https://www.youtube.com/embed/90Dhs6FBuq0",
      "https://www.youtube.com/embed/R3Y-dZ6yHgo",
      "https://www.youtube.com/embed/dBlhWLn3cP8",
      "https://www.youtube.com/embed/b4EtZq2J360",
      "https://www.youtube.com/embed/Zce-tFo6l1k",
    ],
  },
  {
    title: "Kenda por Darío Arco",
    videos: [
      "https://www.youtube.com/embed/PwCoU-UDKT0",
      "https://www.youtube.com/embed/FwQKnOo0CFk",
    ],
  },
  {
    title: "Kingtyre",
    videos: ["https://www.youtube.com/embed/rWYjd-efh9k"],
  },
];

const instructionalVideos = [
  { title: "Bienvenido, barra de herramientas y cliente", id: "B1CEwwVaLwc" },
  { title: "Buscador general", id: "-Czxduk9hrI" },
  { title: "Filtros", id: "s2ZWzLLH23w" },
  { title: "Ventas especiales", id: "Et8lztaVMS8" },
  { title: "Productos en foco", id: "-mo0tBfLnq0" },
  { title: "Catálogo y ficha de producto", id: "iLv2uOOjp1Q" },
];

const additionalTutorialVideos = [
  { title: "Tutorial sobre carga de productos desde Excel", id: "_TrFT1zsDqc" },
  { title: "Tutorial sobre terminal Smart", id: "eZ3LyDmFZsY" },
];

export default function QuickHelp() {
  const [location, setLocation] = useLocation();
  const sectionPaths: Record<HelpSection, string> = {
    help: "/info/ayuda-rapida",
    "useful-info": "/info/ayuda-rapida/informacion-util",
    branches: "/info/ayuda-rapida/sucursales",
    banks: "/info/ayuda-rapida/bancos",
    jobs: "/info/ayuda-rapida/forma-parte",
    client: "/info/ayuda-rapida/solicitud-de-cliente",
    about: "/info/ayuda-rapida/sobre-nosotros",
  };
  const activeSection = (Object.keys(sectionPaths) as HelpSection[]).find(
    (section) => sectionPaths[section] === location,
  ) ?? "help";

  return (
    <div className="flex min-h-screen flex-col bg-intercap-bg pt-24 font-sans text-intercap-blue-dark">
      <Header />

      <nav aria-label="Secciones de ayuda" className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1200px] items-center gap-2 overflow-x-auto px-4 py-4 sm:px-6 lg:px-0">
          {helpMenuItems.map((item) => (
            <button
              key={item.section}
              type="button"
              onClick={() => setLocation(sectionPaths[item.section])}
              aria-pressed={activeSection === item.section}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-intercap-blue-main ${activeSection === item.section
                ? "bg-intercap-blue-main text-white shadow-sm"
                : "text-intercap-blue-dark hover:bg-intercap-bg hover:text-intercap-blue-main"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {activeSection === "about" ? <AboutSection /> : activeSection === "client" ? <ClientRequestSection /> : activeSection === "jobs" ? <JobsSection /> : activeSection === "banks" ? <BanksSection /> : activeSection === "useful-info" ? <UsefulInfoSection /> : activeSection === "branches" ? <BranchesSection /> : <FaqSection />}
      </main>

      <Footer />
    </div>
  );
}

function AboutSection() {
  return (
    <section className={`${panelClass} ${panelPaddingClass}`}>
      <header className="border-b border-slate-200 pb-5">
        <h1 className={pageTitleClass}>Sobre Nosotros</h1>
      </header>
      <div className="space-y-6 pt-7 text-sm leading-7 text-slate-700 sm:text-base">
        <p><strong className="text-intercap-blue-dark">“Escuchar al cliente para mejorar continuamente”.</strong> En esto se basa nuestra receta, tan simple como infalible. Por esto más de 1.500 casas de repuestos de motos de todo el país nos eligen habitualmente hace más de 30 años.</p>

        <div>
          <h2 className={sectionTitleClass}>Cómo trabajamos</h2>
          <p className="mt-2">Nos impulsa estar adelante en tecnología para agilizar procesos comerciales y logísticos:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong>Portal web</strong> con el catálogo más completo del mercado, herramientas de autogestión para agilizar los negocios y una experiencia de compra profesional.</li>
            <li>Soluciones de pagos y envíos para nuestros clientes. Brindamos un servicio completo para que puedan realizar cobros con tarjetas en sus mostradores bajando cargas financieras y administrativas.</li>
            <li>Atención personal a cargo de una fuerza de ventas especializada.</li>
            <li>Cuatro sucursales localizadas estratégicamente para llegar rápidamente a cualquier punto del país.</li>
            <li>Centro de distribución central de 5000 m2 con avanzados sistemas de almacenaje.</li>
            <li>Software CRM para sistematizar y mejorar la atención a los clientes.</li>
          </ul>
        </div>

        <div className="space-y-4 border-t border-slate-200 pt-6">
          <h2 className={sectionTitleClass}>Nuestra historia</h2>
          <p>Los argentinos amamos las motos y éstas no pueden funcionar sin repuestos de calidad en el momento y el lugar indicado. Decididos a ser protagonistas de un mercado en expansión, desde 1991 nos dedicamos a la distribución mayorista de motopartes. Primero, como distribuidores de lubricantes AMA en la región noreste del país desde nuestro depósito en la ciudad de Resistencia. Más adelante fuimos sumando líneas de productos que hasta el día de hoy nos identifican, como en 1996 cuando sumamos a Pirelli a nuestra cartera de productos, a partir de lo cual nos fuimos erigiendo en líderes del mercado de neumáticos. En 1998 abrimos una segunda sucursal en Tucumán continuando con nuestra expansión allí donde se respira moto.</p>
          <p>En el año 2000 la apertura de un depósito en Buenos Aires fue la llave de acceso a todo el país, tanto para llegar rápidamente a los clientes como para apoyar a las sucursales del interior. Inicialmente nos instalamos en CABA, pero el crecimiento fue rápido y nos mudamos a Lanús en 2002 y en 2022 a Esteban Echeverría ampliando la superficie y mejorando los sistemas de almacenaje.</p>
          <p>En 2005 abrimos una sucursal en la ciudad de Mendoza, siguiendo nuestra premisa de estar cerca de nuestros clientes.</p>
          <p>A lo largo de este tiempo hemos adquirido la experiencia y el talento para brindar el servicio que nuestros clientes esperan para un crecimiento conjunto de los negocios. También forjamos alianzas sustentables con proveedores locales y extranjeros.</p>
          <p>Nada hubiera sido posible sin el excepcional grupo humano que conforma a Intercap desde sus inicios y que progresivamente se amplía. Aprendiendo de los errores y escuchando a quienes más saben, nuestros clientes, nos entusiasma saber que esta historia sigue escribiéndose.</p>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className={`${panelClass} ${panelPaddingClass}`}>
      <header className="border-b border-slate-200 pb-5">
        <h1 className={pageTitleClass}>Preguntas frecuentes</h1>
        <p className={supportingTextClass}>Encontrá respuestas a las consultas más habituales.</p>
      </header>
      <Accordion type="single" collapsible className="mt-3 w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-base font-bold text-intercap-blue-dark hover:text-intercap-blue-main hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pr-5 text-sm leading-6 text-slate-600 sm:text-base">
              <FaqAnswer answer={item.answer} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function FaqAnswer({ answer }: { answer: string }) {
  return (
    <div className="space-y-3">
      {answer.split("\n").map((line, index) => {
        if (!line) return <div key={index} className="h-1" aria-hidden="true" />;

        const step = line.match(/^Paso (\d+) -\s*(.*)$/);
        if (step) {
          return (
            <p key={index}>
              <strong className="font-bold text-intercap-blue-dark">Paso {step[1]}:</strong>{" "}
              {step[2]}
            </p>
          );
        }

        return <p key={index}>{line}</p>;
      })}
    </div>
  );
}

function UsefulInfoSection() {
  const [activeTab, setActiveTab] = useState<"tutoriales" | "redes" | "cheques">("tutoriales");
  const tabs = [
    { id: "tutoriales", label: "Tutoriales" },
    { id: "redes", label: "Redes Sociales y videos" },
    { id: "cheques", label: "Cheques electrónicos" },
  ] as const;

  return (
    <section className={`${panelClass} ${panelPaddingClass} text-left`}>
      <header className="border-b border-slate-200 pb-5">
        <h1 className={pageTitleClass}>Información útil</h1>
        <p className={supportingTextClass}>Guías, videos y recursos para acompañarte en tus operaciones.</p>
      </header>

      <div role="tablist" aria-label="Temas de información útil" className="mt-6 flex flex-wrap gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`info-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`info-panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`-mb-px rounded-t-lg border px-4 py-2.5 text-sm font-bold transition sm:text-base ${activeTab === tab.id
              ? "border-slate-200 border-b-2 border-b-intercap-blue-main bg-white text-intercap-blue-main"
              : "border-transparent text-slate-600 hover:bg-intercap-bg hover:text-intercap-blue-main"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "tutoriales" && (
        <div id="info-panel-tutoriales" role="tabpanel" aria-labelledby="info-tab-tutoriales" className="space-y-5 pt-7">
          <h2 className={sectionTitleClass}>Instructivos tienda virtual</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {instructionalVideos.map((video) => <TutorialVideo key={video.id} video={video} />)}
          </div>
          <div className="space-y-5 border-t border-slate-200 pt-6">
            <h2 className={sectionTitleClass}>Novedades</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {additionalTutorialVideos.map((video) => <TutorialVideo key={video.id} video={video} />)}
            </div>
          </div>
        </div>
      )}

      {activeTab === "redes" && (
        <div id="info-panel-redes" role="tabpanel" aria-labelledby="info-tab-redes" className="space-y-6 pt-7">
          <div>
            <h2 className={sectionTitleClass}>Publicaciones de Instagram</h2>
            <p className={supportingTextClass}>Seguinos en <a href="https://www.instagram.com/intercap_srl/" target="_blank" rel="noreferrer" className="font-semibold text-intercap-blue-main underline underline-offset-2">@intercap_srl</a> para ver nuestras novedades.</p>
          </div>
          <InstagramFeed />
          <div className="space-y-8 border-t border-slate-200 pt-6">
            <h2 className={sectionTitleClass}>Más videos de Intercap</h2>
            {socialVideoGroups.map((group) => (
              <section key={group.title} aria-label={group.title} className="space-y-4">
                <h3 className="text-base font-bold text-intercap-blue-dark sm:text-lg">{group.title}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.videos.map((src, index) => (
                    <SocialVideoCard key={src} src={src} title={`${group.title} - video ${index + 1}`} />
                  ))}
                </div>
              </section>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Instagram", href: "https://www.instagram.com/intercap_srl/", icon: Instagram },
              { label: "Facebook", href: "https://www.facebook.com/intercapsrl/", icon: Facebook },
              { label: "YouTube", href: "https://www.youtube.com/@intercapsrl", icon: Youtube },
            ].map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-intercap-blue-main/20 px-4 py-2 text-sm font-bold text-intercap-blue-main transition hover:bg-intercap-blue-main hover:text-white">
                <Icon className="h-4 w-4" />{label}
              </a>
            ))}
          </div>
        </div>
      )}

      {activeTab === "cheques" && <div id="info-panel-cheques" role="tabpanel" aria-labelledby="info-tab-cheques" className="space-y-8 pt-7 text-sm leading-7 text-slate-700 sm:text-base">
        <div>
          <h2 className={sectionTitleClass}>¿Qué es un cheque electrónico?</h2>
          <p className="mt-2">Es un cheque emitido y gestionado mediante la banca electrónica.</p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className={sectionTitleClass}>¿Quién puede usarlo?</h2>
            <p className="mt-2">Pueden utilizarlo personas físicas y jurídicas. Para emitirlo se necesita una cuenta corriente; para depositarlo, una cuenta corriente o una caja de ahorro.</p>
          </div>
          <div>
            <h2 className={sectionTitleClass}>Ventajas</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Es 100 % digital: evita filas en el banco y traslados físicos de valores.</li>
              <li>Permite endosos ilimitados y puede ahorrar costos de transferencias.</li>
              <li>Reduce el riesgo de robo, extravío y rechazos por defectos formales.</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className={sectionTitleClass}>¿Cómo se usa?</h2>
          <p className="mt-2">Primero, solicitá a tu banco que habilite la operatoria de cheques electrónicos. En algunos bancos se puede hacer desde la banca electrónica. Una vez habilitada:</p>
          <ol className="mt-3 list-decimal space-y-1 pl-5">
            <li>En el menú de cuentas corrientes del home banking, elegí “Emitir ECHEQ”.</li>
            <li>Completá la fecha de pago, el monto y el CUIT del destinatario.</li>
            <li>Confirmá la operación. Desde ese momento el destinatario puede ver el ECHEQ.</li>
          </ol>
        </div>

        <div>
          <h2 className={sectionTitleClass}>¿Qué puede hacer el destinatario?</h2>
          <p className="mt-2">Su banco le avisará que se emitió un ECHEQ a su favor. Puede aceptarlo o rechazarlo. Si lo acepta, puede:</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Depositarlo en una de sus cuentas, cuando esté dentro de las fechas habilitadas para el depósito.</li>
            <li>Endosarlo a un nuevo beneficiario.</li>
            <li>Enviarlo a custodia.</li>
          </ul>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className={sectionTitleClass}>¿Se puede negociar?</h2>
            <p className="mt-2">Sí. Se puede adelantar el cobro de un ECHEQ negociándolo mediante la plataforma de banca electrónica.</p>
          </div>
          <div>
            <h2 className={sectionTitleClass}>¿Qué pasa si es rechazado?</h2>
            <p className="mt-2">El beneficiario puede solicitar a su banco un Certificado de Acciones Civiles (CAC) impreso, equivalente a la devolución de un cheque tradicional con el motivo de rechazo.</p>
          </div>
        </div>

        <div>
          <h2 className={sectionTitleClass}>¿Se puede devolver?</h2>
          <p className="mt-2">El librador y el último endosante pueden solicitar al beneficiario la devolución de un ECHEQ vigente o rechazado. El beneficiario decide si la acepta. Si las partes llegan a un acuerdo, se impide la generación futura del CAC.</p>
        </div>

        <p className="border-t border-slate-200 pt-5 text-slate-600">El ECHEQ permite gestionar pagos a distancia y agilizar las operaciones a crédito, sin trasladar cheques físicos. Si necesitás más información, consultanos.</p>
      </div>}
    </section>
  );
}

function TutorialVideo({ video }: { video: { title: string; id: string } }) {
  return (
    <article className="aspect-video overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
      <iframe
        src={`https://www.youtube.com/embed/${video.id}`}
        title={video.title}
        className="h-full w-full border-0"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </article>
  );
}

function InstagramFeed() {
  const widgetId = import.meta.env.VITE_ELFSIGHT_INSTAGRAM_WIDGET_ID?.trim() || "86fbc18a-1ff4-4ff4-a1b0-3a2ef3c99b66";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
    return () => script.remove();
  }, [widgetId]);

  return <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy />;
}

function SocialVideoCard({ src, title }: { src: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const videoId = src.match(/\/embed\/([^?]+)/)?.[1];
  const isPlaylist = videoId === "videoseries";
  const thumbnailSizes = ["maxresdefault", "sddefault", "hqdefault"];
  const thumbnail = videoId && !isPlaylist
    ? `https://i.ytimg.com/vi/${videoId}/${thumbnailSizes[thumbnailIndex]}.jpg`
    : null;
  const useNextThumbnail = () => setThumbnailIndex((index) => Math.min(index + 1, thumbnailSizes.length - 1));

  return (
    <div className="aspect-video overflow-hidden rounded-lg bg-intercap-blue-dark shadow-sm">
      {playing ? (
        <iframe
          src={`${src}${src.includes("?") ? "&" : "?"}autoplay=1`}
          title={title}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Reproducir ${title}`} className="group relative flex h-full w-full items-center justify-center overflow-hidden text-white">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={useNextThumbnail}
              onLoad={(event) => {
                if (event.currentTarget.naturalWidth < 320) useNextThumbnail();
              }}
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-intercap-blue-dark via-brand-blue-800 to-intercap-blue-main p-6 text-center text-lg font-bold">Bikeservice por Gustavo Morea</span>
          )}
          <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />
          <span className="relative flex h-14 w-20 items-center justify-center rounded-xl bg-red-600 shadow-lg transition group-hover:bg-red-500 group-hover:scale-105">
            <Play className="h-8 w-8 fill-white" />
          </span>
        </button>
      )}
    </div>
  );
}

function ClientRequestSection() {
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <section className={`${panelClass} ${panelPaddingClass}`}>
      <header className="flex items-start gap-3 border-b border-slate-200 pb-5">
        <UserRound className="mt-1 h-7 w-7 shrink-0 text-intercap-blue-main" />
        <div>
          <h1 className={pageTitleClass}>Solicitud de cliente</h1>
          <p className={supportingTextClass}>Envianos tus datos y nos pondremos en contacto a la brevedad.</p>
        </div>
      </header>

      <form
        className="mx-auto mt-8 max-w-[760px]"
        onSubmit={(event) => {
          event.preventDefault();
          if (step === 1) setStep(2);
        }}
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-slate-200 border-r-intercap-blue-main text-sm font-bold text-intercap-blue-dark">{step}/2</span>
          <h2 className={sectionTitleClass}>{step === 1 ? "Datos de Contacto" : "Datos del Comercio"}</h2>
        </div>

        {step === 1 ? (
          <div className="space-y-3">
            <input className={fieldClass} name="firstName" placeholder="Nombre *" required />
            <input className={fieldClass} name="lastName" placeholder="Apellido *" required />
            <select className={fieldClass} name="province" defaultValue="" required>
              <option value="" disabled>Provincia *</option>
              <option>Buenos Aires</option><option>Catamarca</option><option>Chaco</option><option>Chubut</option>
              <option>Córdoba</option><option>Corrientes</option><option>Entre Ríos</option><option>Formosa</option>
              <option>Jujuy</option><option>La Pampa</option><option>La Rioja</option><option>Mendoza</option>
              <option>Misiones</option><option>Neuquén</option><option>Río Negro</option><option>Salta</option>
              <option>San Juan</option><option>San Luis</option><option>Santa Cruz</option><option>Santa Fe</option>
              <option>Santiago del Estero</option><option>Tierra del Fuego</option><option>Tucumán</option>
            </select>
            <input className={fieldClass} name="city" placeholder="Ciudad *" required />
            <input className={fieldClass} name="address" placeholder="Dirección" />
            <div>
              <input className={fieldClass} name="phone" type="tel" placeholder="Teléfono +54" />
              <button type="button" className="mt-1 text-sm text-slate-600 hover:text-intercap-blue-main">+ Agregar más</button>
            </div>
            <div>
              <input className={fieldClass} name="email" type="email" placeholder="E-mail" />
              <button type="button" className="mt-1 text-sm text-slate-600 hover:text-intercap-blue-main">+ Agregar más</button>
            </div>
            <div>
              <input className={fieldClass} name="whatsapp" type="tel" placeholder="Whatsapp *  +549" required />
              <p className="mt-1 text-xs text-slate-600">Ej: +5493482440801</p>
            </div>
            <input className={fieldClass} name="role" placeholder="Cargo *" required />
          </div>
        ) : (
          <div className="space-y-3">
            <input className={fieldClass} name="businessName" placeholder="Nombre del comercio *" required />
            <input className={fieldClass} name="taxId" placeholder="CUIT *" required />
            <input className={fieldClass} name="businessAddress" placeholder="Dirección comercial *" required />
            <textarea className="min-h-32 w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-intercap-blue-main focus:ring-2 focus:ring-intercap-blue-main/15" name="comments" placeholder="Comentarios" />
          </div>
        )}

        <div className="mt-5 flex gap-3">
          {step === 2 && <button type="button" onClick={() => setStep(1)} className="h-12 rounded-lg border border-intercap-blue-main px-6 font-bold text-intercap-blue-main transition hover:bg-blue-50">Anterior</button>}
          <button type="submit" className="h-12 flex-1 rounded-lg bg-intercap-blue-main font-bold text-white transition hover:bg-intercap-blue-dark">
            {step === 1 ? "Siguiente" : "Enviar solicitud"}
          </button>
        </div>
      </form>
    </section>
  );
}

function JobsSection() {
  const [sent, setSent] = useState(false);

  return (
    <section className={`${panelClass} ${panelPaddingClass}`}>
      <header className="flex items-start gap-3 border-b border-slate-200 pb-5">
        <Smile className="mt-1 h-7 w-7 shrink-0 text-intercap-blue-main" />
        <div>
          <h1 className={pageTitleClass}>Jugá en nuestro equipo</h1>
          <p className={supportingTextClass}>Envianos tus datos y CV.</p>
        </div>
      </header>

      <form
        className="mt-8"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input className={fieldClass} name="fullName" placeholder="Nombre y Apellido *" required />
          <input className={fieldClass} name="phone" type="tel" placeholder="Teléfono fijo" />
          <input className={fieldClass} name="document" inputMode="numeric" placeholder="DNI/CUIL * (sin guiones, puntos o espacios)" required />
          <input className={fieldClass} name="mobile" type="tel" placeholder="Teléfono celular *" required />
          <input className={fieldClass} name="province" placeholder="Provincia *" required />
          <input className={fieldClass} name="email" type="email" placeholder="E-mail *" required />
          <input className={fieldClass} name="city" placeholder="Ciudad *" required />
          <input className={fieldClass} name="address" placeholder="Dirección" />
        </div>

        <label className="mt-4 flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 text-sm text-slate-600 transition hover:border-intercap-blue-main/50 hover:bg-slate-100">
          <span className="rounded-md bg-intercap-blue-main px-3 py-1.5 font-bold text-white">Buscar C.V.</span>
          <span>Adjuntá tu currículum</span>
          <input className="sr-only" name="resume" type="file" accept=".pdf,.doc,.docx" required />
        </label>

        <textarea
          className="mt-4 min-h-[185px] w-full resize-y rounded-lg border border-slate-300 bg-white p-3 text-sm text-intercap-blue-dark outline-none transition placeholder:text-slate-400 focus:border-intercap-blue-main focus:ring-2 focus:ring-intercap-blue-main/15"
          name="coverLetter"
          placeholder="Nota de presentación *"
          required
        />
        <p className="mt-4 border-b border-slate-200 px-2 pb-2 text-sm text-slate-600">Los campos marcados con un asterisco (*) son necesarios.</p>
        <div className="mt-5 flex items-center gap-4">
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-intercap-blue-main px-5 py-2.5 text-sm font-bold text-white transition hover:bg-intercap-blue-dark">
            <Send className="h-4 w-4" />
            Enviar datos
          </button>
          {sent && <p role="status" className="text-sm font-medium text-emerald-700">Datos preparados correctamente.</p>}
        </div>
      </form>
    </section>
  );
}

function BanksSection() {
  return (
    <section className={`${panelClass} ${panelPaddingClass}`}>
      <header className="border-b border-slate-200 pb-5">
        <h1 className={pageTitleClass}>Bancos</h1>
        <p className={supportingTextClass}>Entidades a su servicio.</p>
      </header>
      <div className="grid gap-5 pt-7 sm:grid-cols-2 lg:grid-cols-3">
        {bankAccounts.map((bank) => (
          <article key={bank.name} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className={`flex h-[120px] items-center justify-center px-5 text-center text-3xl font-black leading-7 whitespace-pre-line text-white ${bank.brandClass}`}>
              {bank.logo}
            </div>
            <dl className="space-y-2 p-5 text-sm leading-6 text-intercap-blue-dark">
              <div><dt className="inline font-bold">Tipo de cuenta: </dt><dd className="inline">{bank.accountType}</dd></div>
              {bank.account && <div><dt className="inline font-bold">Nro de cuenta: </dt><dd className="inline">{bank.account}</dd></div>}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0"><dt className="inline font-bold">C.B.U.: </dt><dd className="inline break-all">{bank.cbu}</dd></div>
                <CopyButton value={bank.cbu} label="CBU" />
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0"><dt className="inline font-bold">Alias: </dt><dd className="inline break-all">{bank.alias}</dd></div>
                <CopyButton value={bank.alias} label="alias" />
              </div>
              {bank.branch && <div><dt className="inline font-bold">Suc: </dt><dd className="inline">{bank.branch}</dd></div>}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copyValue = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={copyValue}
      aria-label={`Copiar ${label}`}
      title={`Copiar ${label}`}
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition ${
        copied
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-white text-intercap-blue-main hover:border-intercap-blue-main/40 hover:bg-intercap-bg"
      }`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function BranchesSection() {
  return (
    <section className={`${panelClass} ${panelPaddingClass}`}>
      <header className="border-b border-slate-200 pb-5">
        <h1 className={pageTitleClass}>Sucursales</h1>
        <p className={supportingTextClass}>
          Almacenes ubicados en zonas estratégicas para llegar a todo el país.
        </p>
      </header>
        <div className="space-y-5 pt-7">
          <div className="grid gap-5 lg:grid-cols-2">
            {branches.slice(0, 2).map((branch) => (
              <BranchCard key={branch.name} branch={branch} featured />
            ))}
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {branches.slice(2).map((branch) => (
              <BranchCard key={branch.name} branch={branch} />
            ))}
          </div>
        </div>
    </section>
  );
}

function BranchCard({
  branch,
  featured = false,
}: {
  branch: (typeof branches)[number];
  featured?: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className={`${featured ? "h-[180px]" : "h-[150px]"} bg-slate-100`}>
        <iframe
          src={branch.mapSrc}
          title={`Mapa de ${branch.name}`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="flex items-end justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-intercap-blue-main">{branch.type}</p>
          <h3 className={`mt-1 font-black text-intercap-blue-dark ${featured ? "text-xl" : "text-lg"}`}>
            {branch.name}
          </h3>
          <p className={`${featured ? "text-sm" : "text-xs"} mt-2 font-semibold leading-5 text-slate-700`}>
            {branch.address}
          </p>
          <p className={`${featured ? "text-sm" : "text-xs"} mt-2 font-bold text-slate-900`}>
            Tel.: {branch.phone}
          </p>
        </div>
        <a
          href={branch.directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-intercap-blue-main px-4 text-[11px] font-black uppercase text-white transition hover:bg-intercap-blue-dark"
        >
          ¿Cómo llegar?
        </a>
      </div>
    </article>
  );
}
