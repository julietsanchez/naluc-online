# NALUC Online - Solicitud de préstamo personal

Web app responsive (mobile-first) para simular y solicitar un préstamo personal. Flujo por pasos listo para conectar a backend.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- lucide-react, react-hook-form, zod, zustand

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Build y lint

```bash
npm run build
npm run lint
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home: simulador (monto + cuotas) + CTA Continuar |
| `/solicitud/inicio` | Cuenta: DNI, email, teléfono |
| `/solicitud/datos` | Datos personales |
| `/solicitud/ingresos` | Ingresos y datos bancarios (CBU/Alias) |
| `/solicitud/resumen` | Resumen + términos + Enviar solicitud |
| `/solicitud/confirmacion` | Confirmación y número de solicitud |
| `/estado` | Consultar estado por DNI + ID solicitud |

## Conectar backend

1. Definir `NEXT_PUBLIC_API_BASE_URL` en `.env.local`.
2. En `src/features/loan/loan.api.ts` reemplazar los mocks por llamadas usando `request()` de `src/lib/http.ts`:
   - `simulateLoan` → POST `/api/simulate` (o equivalente)
   - `startApplication` → POST `/api/applications`
   - `updateApplication` → PATCH `/api/applications/:id`
   - `submitApplication` → POST `/api/applications/:id/submit`
   - `getApplicationStatus` → GET `/api/applications/status?dni=&applicationId=`

Los tipos en `loan.types.ts` y los schemas en `loan.schemas.ts` están listos para alinear con el contrato del backend.
