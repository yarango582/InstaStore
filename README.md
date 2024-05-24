# InstaStore

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

1.

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
    - Se recomienda usar una base de datos SQL como PostgreSQL.

3. **Módulo de Logging**:
    - Registra todas las solicitudes y respuestas del endpoint.
    - Puede estar integrado en el microservicio o ser un servicio separado.

### Diagrama de Arquitectura

```plaintext
+-----------------+     +---------------------+     +----------------------+
|                 |     |                     |     |                      |
|     Clients     +----->    InstaStore       +----->    Database          |
|                 |     |  Microservice       |     |  (PostgreSQL)        |
|                 |     |  (Node.js/Express)  |     |                      |
+-----------------+     +---------------------+     +----------------------+
