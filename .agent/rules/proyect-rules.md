---
trigger: always_on
---

# 🧑‍💻 Developer Portfolio + AI Assistant (Next.js)

Debes actuar siempre como senior y pensar en la escalabilidad y legibilidad, no crear código espagueti
Portafolio profesional de desarrollador construido con **Next.js (App Router)**, **TypeScript** y **Tailwind CSS**, siguiendo principios de **Clean Architecture**, **Single Responsibility Principle (SRP)** y **Test-Driven Development (TDD)**.

El proyecto incluye un **asistente IA conversacional** que responde preguntas sobre el desarrollador usando:

* Datos estructurados desde un archivo JSON
* Historial de conversación como contexto
* API Routes de Next.js (sin exponer claves)

---

## 🎯 Objetivos del proyecto

* Mostrar habilidades técnicas reales (no demos artificiales)
* Mantener el código:

  * Simple
  * Escalable
  * Testeable
  * Fácil de mantener
* Usar Next.js de forma **correcta**, no sobreingenierizada, lo mas simple y entendible posible
* Demostrar criterio técnico (muy valorado en entrevistas)

---

## 🧱 Stack tecnológico

* **Framework**: Next.js (App Router)
* **Lenguaje**: TypeScript (`strict`)
* **Estilos**: Tailwind CSS
* **Testing**:
  * Unit tests: Vitest / Jest
  * Component tests: Testing Library
* **IA**:
  * Gemini API (vía API Route) guardad en .env
* **Persistencia de conversación**:
  * `supabase o sesionStorage` //el usuario define que usar encaso de supabase poner el api key en .env
* **Deploy**:
  * Vercel

---

## 📂 Estructura del proyecto (comentada) no teien que ser esa es solo una guia inicial, puede cambiar como la parte de supabase

```txt
src/
├─ app/                         # App Router (Next.js)
│  ├─ layout.tsx                # Layout raíz (HTML, body, providers)
│  ├─ page.tsx                  # Home del portafolio (composición)
│  │
│  └─ api/                      # Backend interno (Next.js)
│     └─ chat/
│        └─ route.ts            # Endpoint del chat IA
│
├─ components/                  # UI (React puro)
│  ├─ ui/                       # Componentes atómicos reutilizables
│  │  ├─ Button.tsx
│  │  ├─ Input.tsx
│  │  └─ Card.tsx
│  │
│  ├─ layout/                   # Estructura visual
│  │  ├─ Navbar.tsx
│  │  └─ Footer.tsx
│  │
│  ├─ sections/                 # Secciones del portafolio
│  │  ├─ Hero.tsx
│  │  ├─ Projects.tsx
│  │  ├─ Skills.tsx
│  │  └─ Contact.tsx
│  │
│  └─ chat/                     # UI del chat IA
│     ├─ Chat.tsx               # Orquestador visual
│     ├─ ChatMessage.tsx        # Mensaje individual
│     └─ ChatInput.tsx          # Input del usuario
│
├─ data/                        # Fuente de verdad (estática)
│  └─ profile.json              # Datos del desarrollador
│
├─ domain/                      # Contratos del dominio
│  ├─ chat.types.ts
│  └─ profile.types.ts
│
├─ hooks/                       # Lógica reutilizable
│  ├─ useChat.ts                # Estado y flujo del chat
│  └─ useChatStorage.ts         # Persistencia del historial
│
├─ services/                    # Infraestructura
│  ├─ ai.service.ts             # Comunicación con Gemini
│  └─ profile.service.ts        # Carga y validación del perfil
│
├─ utils/                       # Funciones puras
│  └─ promptBuilder.ts          # Construcción del prompt
│
├─ tests/                       # Tests
│  └─ unit/                     # Tests unitarios (hooks, utils, services)
│
└─ styles/
   └─ globals.css               # Tailwind + estilos globales
```

---

## 🧠 Principios de arquitectura

### 1️⃣ Single Responsibility Principle (SRP)

Cada archivo **tiene una única razón para cambiar**:

* Componentes → renderizan UI
* Hooks → manejan lógica
* Services → infraestructura externa
* Utils → funciones puras
* API Routes → frontera servidor/cliente

❌ Un componente nunca hace fetch directo a Gemini
❌ Un hook nunca renderiza JSX

---

### 2️⃣ DRY (Don’t Repeat Yourself)

* UI repetida → `components/ui`
* Lógica compartida → `hooks`
* Datos estáticos → `data/`
* Tipos → `domain/`

---

## 📄 Datos del desarrollador (`data/profile.json`)

El asistente IA **NO tiene datos hardcodeados**.

```json
{
  "name": "Juan Pérez",
  "role": "Frontend Developer",
  "stack": ["TypeScript", "React", "Next.js", "Tailwind"],
  "experience": "Desarrollador enfocado en interfaces escalables.",
  "contact": {
    "email": "juan@email.com",
    "linkedin": "https://linkedin.com/in/juan"
  }
}
```

### Reglas

* Fuente única de verdad
* Fácil de modificar
* Totalmente testeable

---

## 🤖 Chat IA con memoria de conversación

### Qué incluye

* Historial limitado (últimos N mensajes)
* Contexto del perfil
* Pregunta actual del usuario

### Qué NO incluye
* Usuarios
* Autenticación

---

## 🧩 Flujo del chat (Next.js)

```txt
Usuario (UI)
 ↓
useChat (hook)
 ↓
API Route (/api/chat)
 ↓
ai.service (Gemini)
 ↓
Respuesta
```

---

## 🧠 Construcción del prompt (`promptBuilder.ts`)

Función **pura y testeable**:

```txt
Sistema:
Eres un asistente que representa a {name}, {role}.
Stack: {stack}.
Experiencia: {experience}.

Historial:
{últimos mensajes}

Usuario:
{mensaje actual}
```

---

## 🧪 Testing (TDD)

### Se testea

* Hooks (`useChat`, `useChatStorage`)
* Utils (`promptBuilder`)
* Services (`profile.service`)

### No se testea

* Gemini real
* Estilos Tailwind

Mocks:

* `fetch`
* `localStorage`
* IA

---

## 🔐 Seguridad (Next.js)

* ❌ API Key en el cliente
* ✅ `.env.local`
* ✅ Uso exclusivo en API Routes

```env
GEMINI_API_KEY=your_key_here
```

---

## 🎨 Tailwind CSS – Buenas prácticas

* Componentes pequeños
* Variantes con props
* Nada de CSS innecesario
* `clsx` para estados

---

## 🚀 Filosofía del proyecto

> Este proyecto demuestra **criterio**, no complejidad.
> Next.js se usa donde aporta valor, no por moda.

---

## 👤 Autor

Desarrollado por **[Tu Nombre]**
📧 Email: [tu email]
💼 LinkedIn: [tu linkedin]
🐙 GitHub: [tu github]

---

### 🔥 Siguiente paso recomendado

Si quieres, lo siguiente ideal es:

1. Definir los **types del dominio**
2. Escribir el **primer test del `promptBuilder`**
3. Implementar `useChatStorage`
4. Crear la API Route paso a paso