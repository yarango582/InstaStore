# InstaStore API

## Descripción
Esta API proporciona servicios para encontrar tiendas cercanas y gestionar logs de operaciones.

## Endpoints
- **GET /api/logs**: Obtener todos los logs con paginación.
- **GET /api/stores/closest**: Obtener la tienda más cercana basado en coordenadas.
- **GET /api/stores**: Obtener todas las tiendas con paginación.

## Documentación de la API
La documentación completa de la API está disponible en [Swagger](https://instastore.zeabur.app/api-docs/).

## Instalación
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Configurar las variables de entorno en un archivo `.env`.
4. Ejecutar `npm run dev` para iniciar el servidor en modo desarrollo.

## Preguntas

1. ¿Qué criterios específicos se deben usar para determinar la tienda más cercana?
2. ¿Cómo se determina si una tienda está abierta?
3. ¿Qué información específica necesita registrarse en cada llamada al endpoint?
4. ¿Existe un sistema de logging o base de datos preferido para almacenar esta información?
5. ¿Cuál es el formato y la fuente de datos de las tiendas (e.g., base de datos, API)?
6. ¿Con qué frecuencia se actualizan estos datos?
7. ¿Existe un formato o estándar preferido para la documentación de los endpoints?
8. ¿Qué tipos de errores deben manejarse específicamente y cómo deben reportarse?
9. ¿Hay requisitos específicos de seguridad para el endpoint, como autenticación o limitación de tasa?
10. ¿Hay algún entorno específico donde el microservicio será desplegado (e.g., AWS, Azure)?
11. ¿Debo incluir scripts de despliegue o configuración adicional?

### Respuestas

1. y 2. El ideal de la prueba es que definas el comportamiento de estos bajo la solución que propongas, puedes escoger la que te parezca la más adecuada. A modo de apoyo, te redirijo a los campos de "coordinates" y "isOpen" que refiere el challenge para la respuesta.

2. y 4. A nivel de logging, la idea es que definas la información que consideres absolutamente necesaria y te permita el "debug" exitoso de los distintos casos que puedan surgir en la ejecución de tu solución. No hay herramientas predefinidas más que las mencionadas en el challenge, lo demás queda a tu criterio.

3. y 6. El modelo de datos es propuesto por ti, puedes definir el que consideres más apropiado para resolver el challenge de la mejor manera. La actividad de actualización queda a decisión tuya.

4. Puedes usar el formato que desees

5. Aquí quisiera referirme al challenge: "... responder a códigos de error que tienen sentido para el caso". Implicando esto que los defines tú de acuerdo al comportamiento de tu solución.

6. No hay requisitos específicos, puedes definir los que mejor te parezca. Adicionalmente , ten en cuenta qué tanto beneficio vs costo tiene cada opción y considera la más apropiada teniendo en cuenta el valor que tu solución ofrece al challenge.

7.  No es un requisito, pero siempre es bienvenido.

8.  Por favor, inclúyelos.

---

## Diseño de la Arquitectura del Servicio

### Descripción General
InstaStore es un microservicio diseñado para seleccionar la tienda de conveniencia más cercana para entregar pedidos de comestibles a clientes B2B. Este servicio se desarrollará utilizando Node.js y Express.js, garantizando un tiempo de respuesta rápido y manejo adecuado de errores.

### Componentes Principales

1. **Microservicio InstaStore**:
    - Implementado en Node.js con Express.js.
    - Proporciona un endpoint para obtener la tienda más cercana.
    - Lógica para calcular la tienda más cercana y verificar si está abierta.
    - Registro de cada llamada al endpoint.

2. **Base de Datos**:
    - Almacena los datos de las tiendas (ID, nombre, estado, coordenadas).
    - Almacena los logs de las llamadas al endpoint.
    - Se selecciono MongoDB como motor de base de datos por su rendimiento.

3. **Módulo de Logging**:
    - Registra todas las solicitudes y respuestas del endpoint.
    - Puede estar integrado en el microservicio o ser un servicio separado.

### Diagrama de Arquitectura

```plaintext
+-----------------+     +---------------------+     +----------------------+
|                 |     |                     |     |                      |
|     Clients     +----->    InstaStore       +----->    Database          |
|                 |     |  Microservice       |     |   ( MongoDB )        |
|                 |     |  (Node.js/Express)  |     |                      |
+-----------------+     +---------------------+     +----------------------+
```
