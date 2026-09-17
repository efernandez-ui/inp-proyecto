# INP Filtros V9

Aplicacion web de catalogo para Intercap/INP, construida con React, Vite y Tailwind CSS. Incluye vistas de inicio, catalogo de productos, detalle de producto y pantallas orientadas a perfiles de administracion y vendedor.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Radix UI
- Lucide React
- Wouter para rutas

## Requisitos

- Node.js 20 o superior
- npm

## Instalacion

```bash
npm install
```

En Windows, si PowerShell bloquea `npm.ps1`, usar:

```bash
npm.cmd install
```

## Desarrollo

```bash
npm run dev
```

La app queda disponible en:

```text
http://localhost:5173
```

Si PowerShell bloquea scripts:

```bash
npm.cmd run dev
```

## Feed de Instagram

La subsolapa **Información útil → Redes Sociales y videos** muestra el widget de Instagram Feed de Elfsight proporcionado para `@intercap_srl`. Para usar otro widget, crear un archivo `.env.local` en la raíz del proyecto con:

```text
VITE_ELFSIGHT_INSTAGRAM_WIDGET_ID=ID_DEL_WIDGET
```

Reiniciar el servidor de desarrollo o volver a generar el build para aplicar el cambio de ID.

## Scripts

- `npm run dev`: inicia Vite en modo desarrollo.
- `npm run dev:client`: alias del servidor de desarrollo.
- `npm run check`: ejecuta el chequeo de TypeScript.
- `npm run build`: genera el build de produccion en `dist/public`.
- `npm run start`: sirve el build con `vite preview`.

## Rutas Principales

- `/`: landing inicial.
- `/home`: inicio principal.
- `/admin`: panel inicial de administracion.
- `/vendedor`: panel inicial de vendedor.
- `/catalogo`: catalogo de productos con filtros, vistas de grilla, lista y lista editable.
- `/producto/:id`: detalle de producto.

## Estructura

```text
client/
  index.html
  src/
    App.tsx
    main.tsx
    index.css
    assets/
    components/
      home/
      layout/
      product/
      ui/
    hooks/
    lib/
    pages/
attached_assets/
scripts/
dist/
```

## Catalogo

La vista de catalogo permite:

- Filtrar productos por marca, categoria y atributos.
- Ordenar resultados.
- Cambiar entre vista de grilla, lista y lista editable tipo planilla.
- Mostrar u ocultar columnas de precios.
- Calcular precio al publico con un porcentaje de markup.
- Cargar cantidades en la vista editable con navegacion por teclado.

## Build y Despliegue

Para generar archivos estaticos:

```bash
npm run build
```

El resultado se publica en:

```text
dist/public
```

El proyecto calcula automaticamente el `base` de Vite usando `GITHUB_REPOSITORY` cuando se despliega en GitHub Pages. Tambien se puede forzar con:

```bash
VITE_BASE_PATH=/ruta-base/ npm run build
```

En Windows:

```powershell
$env:VITE_BASE_PATH="/ruta-base/"
npm.cmd run build
```

## Validacion

Antes de entregar cambios, ejecutar:

```bash
npm run check
npm run build
```

Nota: Vite puede advertir que algunos chunks superan 500 kB. Es una advertencia de optimizacion de bundle, no necesariamente un error de compilacion.
