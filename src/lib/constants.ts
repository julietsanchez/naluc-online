/**
 * Rangos, tasas mock y textos legales para la solicitud de préstamo.
 */

export const LOAN_AMOUNT_MIN = 50_000;
export const LOAN_AMOUNT_MAX = 500_000;
export const LOAN_AMOUNT_STEP = 50_000;

export const INSTALLMENTS_MIN = 1;
export const INSTALLMENTS_MAX = 6;

/** CFT anual (200%) convertido a tasa mensual equivalente para cálculo UI. */
export const CFT_ANNUAL_PERCENT = 200;
export const MOCK_MONTHLY_RATE = Math.pow(1 + CFT_ANNUAL_PERCENT / 100, 1 / 12) - 1;

export const TERMS_AND_CONDITIONS_TEXT = `TÉRMINOS Y CONDICIONES GENERALES — NALUC ONLINE

Última actualización: 1 de febrero de 2026

1. INTRODUCCIÓN
Al utilizar los servicios de NALUC ONLINE (en adelante, "la Plataforma"), usted acepta los presentes Términos y Condiciones Generales. La Plataforma es operada por NALUC S.A., CUIT 30-71XXXXXX-X, con domicilio legal en la Ciudad Autónoma de Buenos Aires, República Argentina.

2. DEFINICIONES
"Usuario": Toda persona humana mayor de 18 años que se registre en la Plataforma.
"Préstamo Personal": Crédito otorgado al Usuario conforme las condiciones particulares que se establezcan en el contrato individual.
"Solicitud": Petición formal del Usuario para obtener un Préstamo Personal.

3. REQUISITOS PARA SOLICITAR UN PRÉSTAMO
Para solicitar un préstamo a través de la Plataforma, el Usuario deberá:
a) Ser mayor de 18 años.
b) Poseer DNI argentino vigente.
c) Contar con una cuenta bancaria a su nombre en una entidad financiera habilitada por el BCRA.
d) Proporcionar información veraz y completa.

4. PROCESO DE SOLICITUD
La solicitud de préstamo no garantiza su otorgamiento. NALUC S.A. se reserva el derecho de aprobar o rechazar cualquier solicitud según sus políticas de crédito y riesgo. La evaluación crediticia se realizará conforme a la normativa vigente del Banco Central de la República Argentina.

5. TASAS Y COSTOS
Las tasas de interés, el Costo Financiero Total (CFT) con IVA, y demás condiciones económicas se informarán de manera clara y previa a la aceptación del préstamo por parte del Usuario, conforme lo establecido por las normas del BCRA.

6. DERECHO DE ARREPENTIMIENTO
El Usuario tendrá derecho a revocar la aceptación del préstamo dentro de los 10 (diez) días hábiles posteriores a la acreditación de los fondos, conforme lo dispuesto por la Ley de Defensa del Consumidor N° 24.240 y sus modificatorias.

7. PROTECCIÓN DE DATOS PERSONALES
El tratamiento de datos personales se realizará conforme a la Ley N° 25.326 de Protección de los Datos Personales y su reglamentación. Para más información, consulte nuestra Política de Privacidad.

8. JURISDICCIÓN
Para cualquier controversia derivada de los presentes Términos, las partes se someten a la jurisdicción de los Tribunales Ordinarios en lo Comercial de la Ciudad Autónoma de Buenos Aires.

9. CONTACTO
Atención al Cliente: atencionalcliente@naluc.com.ar
WhatsApp: +54 9 11 XXXX-XXXX
Horario: Lunes a Viernes de 9:00 a 18:00 hs.`;

export const PRIVACY_POLICY_TEXT = `POLÍTICA DE PRIVACIDAD — NALUC ONLINE

Última actualización: 1 de febrero de 2026

1. RESPONSABLE DEL TRATAMIENTO
NALUC S.A., CUIT 30-71XXXXXX-X, con domicilio en la Ciudad Autónoma de Buenos Aires, es responsable del tratamiento de sus datos personales conforme la Ley N° 25.326 y su Decreto Reglamentario N° 1558/2001.

2. DATOS QUE RECOPILAMOS
Recopilamos los siguientes datos personales:
- Datos identificatorios: nombre completo, DNI, fecha de nacimiento.
- Datos de contacto: teléfono celular, correo electrónico, domicilio.
- Datos financieros: situación laboral, ingresos declarados, datos bancarios (CBU/Alias).
- Documentación: imágenes de DNI (frente y dorso), recibos de haberes.
- Datos de uso: información sobre su interacción con la Plataforma.

3. FINALIDAD DEL TRATAMIENTO
Sus datos serán utilizados exclusivamente para:
a) Evaluar y gestionar solicitudes de préstamos personales.
b) Verificar su identidad y solvencia crediticia.
c) Cumplir con las obligaciones legales y regulatorias vigentes.
d) Comunicarnos con usted respecto al estado de su solicitud y/o préstamo.
e) Mejorar nuestros servicios y la experiencia del usuario.

4. CONSENTIMIENTO
Al aceptar los Términos y Condiciones y la presente Política de Privacidad, usted brinda su consentimiento libre, expreso e informado para el tratamiento de sus datos personales conforme las finalidades aquí descritas.

5. SEGURIDAD
Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos contra acceso no autorizado, alteración, divulgación o destrucción, conforme a los estándares de la industria y la normativa vigente.

6. DERECHOS DEL TITULAR
Usted tiene derecho a:
a) Acceder a sus datos personales.
b) Solicitar la rectificación de datos inexactos o incompletos.
c) Solicitar la supresión de sus datos cuando corresponda.
d) Oponerse al tratamiento de sus datos.
Estos derechos podrán ejercerse mediante comunicación escrita a privacidad@naluc.com.ar.

7. CONSERVACIÓN DE DATOS
Sus datos serán conservados durante el plazo necesario para cumplir las finalidades descritas y las obligaciones legales aplicables.

8. TRANSFERENCIA DE DATOS
Sus datos podrán ser compartidos con:
- Entidades financieras para la acreditación de fondos.
- Organismos regulatorios (BCRA, UIF) conforme obligaciones legales.
- Proveedores de servicios de verificación de identidad.
No compartiremos sus datos con terceros para fines comerciales ajenos al servicio.

9. MODIFICACIONES
Nos reservamos el derecho de modificar la presente Política. Cualquier cambio será notificado a través de la Plataforma.

10. CONTACTO
Para consultas sobre privacidad: privacidad@naluc.com.ar
Dirección Nacional de Protección de Datos Personales (órgano de control): www.argentina.gob.ar/aaip`;

export const CONTRACT_TEMPLATE_TEXT = `CONTRATO DE PRÉSTAMO PERSONAL

Entre NALUC S.A., CUIT 30-71XXXXXX-X, con domicilio legal en Av. Corrientes 1234, Piso 8, Ciudad Autónoma de Buenos Aires (en adelante, "EL PRESTAMISTA"), y el/la titular identificado/a en la solicitud digital que forma parte integrante del presente (en adelante, "EL PRESTATARIO"), se celebra el presente Contrato de Préstamo Personal, sujeto a las siguientes cláusulas y condiciones:

CLÁUSULA PRIMERA — OBJETO
EL PRESTAMISTA otorga al PRESTATARIO un préstamo personal en pesos argentinos por el monto, plazo y condiciones que se detallan en el Anexo de Condiciones Particulares adjunto, el cual forma parte integrante e indivisible del presente contrato.

CLÁUSULA SEGUNDA — MONTO Y DESEMBOLSO
El monto del préstamo será acreditado en la cuenta bancaria informada por EL PRESTATARIO dentro de las 24 (veinticuatro) horas hábiles siguientes a la firma del presente contrato y la verificación de la documentación requerida.

CLÁUSULA TERCERA — PLAZO Y CUOTAS
EL PRESTATARIO se obliga a restituir el capital prestado más los intereses correspondientes mediante el pago de cuotas mensuales, iguales y consecutivas, cuyo monto, cantidad y fechas de vencimiento se detallan en el Anexo de Condiciones Particulares.

CLÁUSULA CUARTA — TASA DE INTERÉS Y CFT
La tasa de interés aplicable y el Costo Financiero Total (CFT) con IVA se informan en el Anexo de Condiciones Particulares, conforme lo establecido por las normas del Banco Central de la República Argentina.

CLÁUSULA QUINTA — MORA
En caso de falta de pago en término de cualquiera de las cuotas, EL PRESTATARIO incurrirá en mora de pleno derecho, sin necesidad de interpelación judicial o extrajudicial alguna. Se aplicará un interés moratorio equivalente al 50% de la tasa compensatoria vigente al momento del incumplimiento.

CLÁUSULA SEXTA — PAGO ANTICIPADO
EL PRESTATARIO podrá cancelar anticipadamente el préstamo en forma total o parcial, con la reducción proporcional de los intereses, conforme lo dispuesto por el artículo 36 de la Ley de Defensa del Consumidor N° 24.240.

CLÁUSULA SÉPTIMA — DERECHO DE ARREPENTIMIENTO
EL PRESTATARIO podrá revocar la aceptación del presente contrato dentro de los 10 (diez) días hábiles contados desde su celebración, restituyendo el capital recibido y los intereses devengados hasta la fecha de devolución.

CLÁUSULA OCTAVA — DATOS PERSONALES
Las partes se obligan a cumplir con la Ley N° 25.326 de Protección de Datos Personales. EL PRESTATARIO autoriza a EL PRESTAMISTA a consultar y reportar información ante las centrales de riesgo crediticio conforme la normativa vigente.

CLÁUSULA NOVENA — DOMICILIO
Las partes constituyen domicilio en los indicados en la solicitud, donde serán válidas todas las notificaciones y comunicaciones.

CLÁUSULA DÉCIMA — JURISDICCIÓN
Para cualquier divergencia derivada del presente contrato, las partes se someten a la jurisdicción de los Tribunales Ordinarios en lo Comercial de la Ciudad Autónoma de Buenos Aires, renunciando a cualquier otro fuero o jurisdicción que pudiere corresponderles.

Se firman dos ejemplares de un mismo tenor y a un solo efecto, en la fecha indicada en la firma digital.`;

export const PROVINCES_AR = [
  "Buenos Aires",
  "Ciudad Autónoma de Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

export const MARITAL_STATUS_OPTIONS = [
  { value: "single", label: "Soltero/a" },
  { value: "married", label: "Casado/a" },
  { value: "divorced", label: "Divorciado/a" },
  { value: "widowed", label: "Viudo/a" },
  { value: "other", label: "Otro" },
] as const;

export const EMPLOYMENT_STATUS_OPTIONS = [
  { value: "employed", label: "Empleado en relación de dependencia" },
  { value: "self_employed", label: "Autónomo / Monotributista" },
  { value: "retired", label: "Jubilado / Pensionado" },
  { value: "other", label: "Otro" },
] as const;

export const BANKS_AR = [
  "Banco Nación",
  "Banco Provincia",
  "Banco Galicia",
  "Banco Santander",
  "BBVA",
  "ICBC",
  "Macro",
  "HSBC",
  "Otro",
];
