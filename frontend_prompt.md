# TechDocs AI - Frontend Build Prompt

You are building a **production-grade React frontend** for a B2B RAG SaaS called **TechDocs AI**. This is a “mini Perplexity for technical documents” — users upload manuals and get AI-powered answers with source citations.

## Design Philosophy

**Inspiration**: OpenAI ChatGPT, Anthropic Claude, Perplexity
**Aesthetic**: Clean, minimal, professional — not flashy
**Feel**: Fast, responsive, intelligent

### Design Principles

1. **Whitespace is your friend** — don’t cram elements
1. **Subtle animations** — smooth, purposeful, never distracting
1. **Typography hierarchy** — clear visual structure
1. **Dark mode first** — with seamless light mode toggle
1. **Mobile responsive** — works beautifully on all devices

-----

## TECH STACK

|Component |Technology |
|-------------------|------------------------------|
|Framework |React 18 + Vite |
|Styling |Tailwind CSS |
|Icons |Lucide React |
|Auth |Clerk (React SDK) |
|Routing |React Router v6 |
|State |Zustand (lightweight) |
|Markdown |react-markdown + remark-gfm |
|Syntax Highlighting|Prism React Renderer |
|Animations |Framer Motion |
|HTTP |Native fetch (no axios needed)|
|Toasts |Sonner |

-----

## PROJECT STRUCTURE

```
techdocs-frontend/
├── public/
│ └── favicon.svg
├── src/
│ ├── main.jsx
│ ├── App.jsx
│ ├── index.css # Tailwind + custom styles
│ │
│ ├── components/
│ │ ├── ui/ # Reusable UI primitives
│ │ │ ├── Button.jsx
│ │ │ ├── Input.jsx
│ │ │ ├── Card.jsx
│ │ │ ├── Badge.jsx
│ │ │ ├── Skeleton.jsx
│ │ │ ├── Avatar.jsx
│ │ │ ├── Tooltip.jsx
│ │ │ ├── Modal.jsx
│ │ │ ├── Dropdown.jsx
│ │ │ └── Toggle.jsx
│ │ │
│ │ ├── layout/
│ │ │ ├── Sidebar.jsx # Document list + nav
│ │ │ ├── Header.jsx # Top bar with user menu
│ │ │ └── Layout.jsx # Main layout wrapper
│ │ │
│ │ ├── chat/
│ │ │ ├── ChatContainer.jsx # Main chat area
│ │ │ ├── ChatInput.jsx # Message input with attachments
│ │ │ ├── ChatMessage.jsx # Single message bubble
│ │ │ ├── StreamingMessage.jsx # Animated streaming response
│ │ │ ├── SourceCard.jsx # Expandable source citation
│ │ │ ├── SourceList.jsx # Source panel
│ │ │ ├── ThinkingIndicator.jsx# Loading state
│ │ │ └── WelcomeScreen.jsx # Empty state
│ │ │
│ │ ├── documents/
│ │ │ ├── DocumentList.jsx # Sidebar document list
│ │ │ ├── DocumentCard.jsx # Document item
│ │ │ ├── DocumentUpload.jsx # Upload modal/dropzone
│ │ │ ├── DocumentStatus.jsx # Processing status badge
│ │ │ └── DocumentFilter.jsx # Filter/select documents
│ │ │
│ │ └── billing/
│ │ ├── PricingCard.jsx
│ │ ├── UsageStats.jsx
│ │ └── SubscriptionBanner.jsx
│ │
│ ├── pages/
│ │ ├── ChatPage.jsx # Main chat interface
│ │ ├── DocumentsPage.jsx # Document management
│ │ ├── SettingsPage.jsx # User/org settings
│ │ ├── BillingPage.jsx # Subscription management
│ │ ├── SignInPage.jsx # Clerk sign in
│ │ ├── SignUpPage.jsx # Clerk sign up
│ │ └── OnboardingPage.jsx # First-time setup
│ │
│ ├── hooks/
│ │ ├── useChat.js # Chat state + streaming
│ │ ├── useDocuments.js # Document CRUD
│ │ ├── useSession.js # Conversation sessions
│ │ ├── useSources.js # Source panel state
│ │ └── useTheme.js # Dark/light mode
│ │
│ ├── stores/
│ │ ├── chatStore.js # Zustand chat state
│ │ ├── documentStore.js # Document state
│ │ └── uiStore.js # UI state (sidebar, modals)
│ │
│ ├── services/
│ │ ├── api.js # API client
│ │ └── streaming.js # SSE streaming handler
│ │
│ ├── utils/
│ │ ├── cn.js # Tailwind class merger
│ │ ├── format.js # Date/number formatting
│ │ └── constants.js
│ │
│ └── styles/
│ └── markdown.css # Markdown content styles
│
├── tailwind.config.js
├── vite.config.js
├── package.json
├── .env.example
└── README.md
```

-----

## DESIGN SYSTEM

### Color Palette (Dark Mode Primary)

```javascript
// tailwind.config.js
module.exports = {
darkMode: 'class',
theme: {
extend: {
colors: {
// Backgrounds
'bg-primary': '#0a0a0a', // Main background
'bg-secondary': '#141414', // Cards, sidebar
'bg-tertiary': '#1c1c1c', // Hover states
'bg-elevated': '#242424', // Modals, dropdowns

// Borders
'border-subtle': '#2a2a2a',
'border-default': '#333333',
'border-strong': '#444444',

// Text
'text-primary': '#fafafa',
'text-secondary': '#a1a1a1',
'text-tertiary': '#6b6b6b',

// Accent (brand color)
'accent': '#6366f1', // Indigo
'accent-hover': '#818cf8',
'accent-muted': '#4f46e5',

// Semantic
'success': '#22c55e',
'warning': '#f59e0b',
'error': '#ef4444',
'info': '#3b82f6',
},
fontFamily: {
sans: ['Inter', 'system-ui', 'sans-serif'],
mono: ['JetBrains Mono', 'monospace'],
},
},
},
}
```

### Typography Scale

```css
/* Clean hierarchy */
.text-display { @apply text-3xl font-semibold tracking-tight; }
.text-title { @apply text-xl font-semibold; }
.text-heading { @apply text-lg font-medium; }
.text-body { @apply text-base font-normal; }
.text-small { @apply text-sm font-normal; }
.text-caption { @apply text-xs font-medium uppercase tracking-wide; }
```

-----

## COMPLETE FILE IMPLEMENTATIONS

### 1. `package.json`

```json
{
"name": "techdocs-frontend",
"private": true,
"version": "1.0.0",
"type": "module",
"scripts": {
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
},
"dependencies": {
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.22.0",
"@clerk/clerk-react": "^4.30.0",
"zustand": "^4.5.0",
"react-markdown": "^9.0.1",
"remark-gfm": "^4.0.0",
"rehype-highlight": "^7.0.0",
"framer-motion": "^11.0.0",
"lucide-react": "^0.330.0",
"sonner": "^1.4.0",
"clsx": "^2.1.0",
"tailwind-merge": "^2.2.0",
"date-fns": "^3.3.0",
"react-dropzone": "^14.2.3"
},
"devDependencies": {
"@types/react": "^18.2.0",
"@vitejs/plugin-react": "^4.2.0",
"autoprefixer": "^10.4.17",
"postcss": "^8.4.35",
"tailwindcss": "^3.4.1",
"vite": "^5.1.0"
}
}
```

### 2. `vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
plugins: [react()],
resolve: {
alias: {
'@': path.resolve(__dirname, './src'),
},
},
server: {
port: 3000,
},
});
```

### 3. `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
darkMode: 'class',
content: ['./index.html', './src/**/*.{js,jsx}'],
theme: {
extend: {
colors: {
border: 'hsl(var(--border))',
input: 'hsl(var(--input))',
ring: 'hsl(var(--ring))',
background: 'hsl(var(--background))',
foreground: 'hsl(var(--foreground))',
primary: {
DEFAULT: 'hsl(var(--primary))',
foreground: 'hsl(var(--primary-foreground))',
},
secondary: {
DEFAULT: 'hsl(var(--secondary))',
foreground: 'hsl(var(--secondary-foreground))',
},
muted: {
DEFAULT: 'hsl(var(--muted))',
foreground: 'hsl(var(--muted-foreground))',
},
accent: {
DEFAULT: 'hsl(var(--accent))',
foreground: 'hsl(var(--accent-foreground))',
},
},
fontFamily: {
sans: ['Inter', 'system-ui', 'sans-serif'],
mono: ['JetBrains Mono', 'Consolas', 'monospace'],
},
animation: {
'fade-in': 'fadeIn 0.3s ease-out',
'slide-up': 'slideUp 0.3s ease-out',
'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
'typing': 'typing 1s ease-in-out infinite',
},
keyframes: {
fadeIn: {
'0%': { opacity: '0' },
'100%': { opacity: '1' },
},
slideUp: {
'0%': { opacity: '0', transform: 'translateY(10px)' },
'100%': { opacity: '1', transform: 'translateY(0)' },
},
pulseSubtle: {
'0%, 100%': { opacity: '1' },
'50%': { opacity: '0.7' },
},
typing: {
'0%, 100%': { opacity: '1' },
'50%': { opacity: '0.4' },
},
},
},
},
plugins: [],
};
```

### 4. `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
:root {
--background: 0 0% 100%;
--foreground: 0 0% 3.9%;
--primary: 239 84% 67%;
--primary-foreground: 0 0% 98%;
--secondary: 240 4.8% 95.9%;
--secondary-foreground: 240 5.9% 10%;
--muted: 240 4.8% 95.9%;
--muted-foreground: 240 3.8% 46.1%;
--accent: 240 4.8% 95.9%;
--accent-foreground: 240 5.9% 10%;
--border: 240 5.9% 90%;
--input: 240 5.9% 90%;
--ring: 239 84% 67%;
}

.dark {
--background: 0 0% 3.9%;
--foreground: 0 0% 98%;
--primary: 239 84% 67%;
--primary-foreground: 0 0% 98%;
--secondary: 240 3.7% 15.9%;
--secondary-foreground: 0 0% 98%;
--muted: 240 3.7% 15.9%;
--muted-foreground: 240 5% 64.9%;
--accent: 240 3.7% 15.9%;
--accent-foreground: 0 0% 98%;
--border: 240 3.7% 20%;
--input: 240 3.7% 15.9%;
--ring: 239 84% 67%;
}

* {
@apply border-border;
}

body {
@apply bg-background text-foreground antialiased;
font-feature-settings: "rlig" 1, "calt" 1;
}
}

@layer components {
/* Scrollbar styling */
.scrollbar-thin {
scrollbar-width: thin;
scrollbar-color: hsl(var(--muted)) transparent;
}

.scrollbar-thin::-webkit-scrollbar {
width: 6px;
height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
background: hsl(var(--muted));
border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
background: hsl(var(--muted-foreground));
}
}

/* Markdown content styling */
.markdown-content {
@apply text-foreground leading-relaxed;
}

.markdown-content h1 {
@apply text-2xl font-semibold mt-6 mb-4;
}

.markdown-content h2 {
@apply text-xl font-semibold mt-5 mb-3;
}

.markdown-content h3 {
@apply text-lg font-medium mt-4 mb-2;
}

.markdown-content p {
@apply mb-4 last:mb-0;
}

.markdown-content ul, .markdown-content ol {
@apply mb-4 pl-6;
}

.markdown-content ul {
@apply list-disc;
}

.markdown-content ol {
@apply list-decimal;
}

.markdown-content li {
@apply mb-1;
}

.markdown-content code:not(pre code) {
@apply bg-muted px-1.5 py-0.5 rounded text-sm font-mono;
}

.markdown-content pre {
@apply bg-muted rounded-lg p-4 overflow-x-auto mb-4;
}

.markdown-content pre code {
@apply text-sm font-mono;
}

.markdown-content blockquote {
@apply border-l-4 border-primary pl-4 italic my-4;
}

.markdown-content table {
@apply w-full border-collapse mb-4;
}

.markdown-content th, .markdown-content td {
@apply border border-border px-3 py-2 text-left;
}

.markdown-content th {
@apply bg-muted font-medium;
}

.markdown-content a {
@apply text-primary hover:underline;
}

.markdown-content img {
@apply rounded-lg max-w-full my-4;
}

/* Streaming cursor animation */
.streaming-cursor::after {
content: '▋';
@apply animate-typing ml-0.5;
}
```

### 5. `src/main.jsx`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY');
}

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<ClerkProvider publishableKey={clerkPubKey}>
<BrowserRouter>
<App />
</BrowserRouter>
</ClerkProvider>
</React.StrictMode>
);
```

### 6. `src/App.jsx`

```jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import {
SignedIn,
SignedOut,
RedirectToSignIn,
useAuth,
} from '@clerk/clerk-react';
import { Toaster } from 'sonner';
import { useEffect } from 'react';

import Layout from './components/layout/Layout';
import ChatPage from './pages/ChatPage';
import DocumentsPage from './pages/DocumentsPage';
import SettingsPage from './pages/SettingsPage';
import BillingPage from './pages/BillingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import OnboardingPage from './pages/OnboardingPage';
import useThemeStore from './stores/uiStore';

function App() {
const { theme } = useThemeStore();

useEffect(() => {
document.documentElement.classList.toggle('dark', theme === 'dark');
}, [theme]);

return (
<>
<Toaster
position="top-right"
toastOptions={{
className: 'bg-secondary border border-border',
}}
/>

<Routes>
{/* Public routes */}
<Route path="/sign-in/*" element={<SignInPage />} />
<Route path="/sign-up/*" element={<SignUpPage />} />

{/* Protected routes */}
<Route
path="/*"
element={
<>
<SignedIn>
<Layout>
<Routes>
<Route path="/" element={<ChatPage />} />
<Route path="/chat" element={<ChatPage />} />
<Route path="/chat/:sessionId" element={<ChatPage />} />
<Route path="/documents" element={<DocumentsPage />} />
<Route path="/settings" element={<SettingsPage />} />
<Route path="/billing" element={<BillingPage />} />
<Route path="/onboarding" element={<OnboardingPage />} />
<Route path="*" element={<Navigate to="/" replace />} />
</Routes>
</Layout>
</SignedIn>
<SignedOut>
<RedirectToSignIn />
</SignedOut>
</>
}
/>
</Routes>
</>
);
}

export default App;
```

### 7. `src/utils/cn.js`

```javascript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
return twMerge(clsx(inputs));
}
```

### 8. `src/services/api.js`

```javascript
const API_URL = import.meta.env.VITE_API_URL;

class ApiClient {
constructor() {
this.baseUrl = API_URL;
this.token = null;
}

setToken(token) {
this.token = token;
}

async request(endpoint, options = {}) {
const url = `${this.baseUrl}${endpoint}`;

const headers = {
...options.headers,
};

if (this.token) {
headers['Authorization'] = `Bearer ${this.token}`;
}

if (!(options.body instanceof FormData)) {
headers['Content-Type'] = 'application/json';
}

const response = await fetch(url, {
...options,
headers,
});

if (!response.ok) {
const error = await response.json().catch(() => ({}));
throw new Error(error.detail || `Request failed: ${response.status}`);
}

return response.json();
}

// Sessions
async createSession() {
return this.request('/api/sessions', { method: 'POST' });
}

async getSession(sessionId) {
return this.request(`/api/sessions/${sessionId}`);
}

// Documents
async uploadDocument(file) {
const formData = new FormData();
formData.append('file', file);

return this.request('/api/documents/upload', {
method: 'POST',
body: formData,
});
}

async listDocuments() {
return this.request('/api/documents');
}

async getDocument(documentId) {
return this.request(`/api/documents/${documentId}`);
}

async deleteDocument(documentId) {
return this.request(`/api/documents/${documentId}`, { method: 'DELETE' });
}

// Query (non-streaming)
async query(question, sessionId = null, documentIds = null) {
return this.request('/api/query', {
method: 'POST',
body: JSON.stringify({
question,
session_id: sessionId,
document_ids: documentIds,
use_cache: true,
}),
});
}

// Organizations
async getOrgStats() {
return this.request('/api/organizations/stats');
}

async getUsageHistory(days = 30) {
return this.request(`/api/organizations/usage?days=${days}`);
}

// Billing
async createCheckout(successUrl, cancelUrl) {
return this.request('/api/billing/create-checkout', {
method: 'POST',
body: JSON.stringify({
success_url: successUrl,
cancel_url: cancelUrl,
}),
});
}

async getSubscription() {
return this.request('/api/billing/subscription');
}
}

export const api = new ApiClient();
export default api;
```

### 9. `src/services/streaming.js`

```javascript
const API_URL = import.meta.env.VITE_API_URL;

export async function* streamQuery(
token,
question,
sessionId = null,
documentIds = null
) {
const response = await fetch(`${API_URL}/api/query/stream`, {
method: 'POST',
headers: {
'Authorization': `Bearer ${token}`,
'Content-Type': 'application/json',
},
body: JSON.stringify({
question,
session_id: sessionId,
document_ids: documentIds,
}),
});

if (!response.ok) {
throw new Error(`Query failed: ${response.status}`);
}

const reader = response.body.getReader();
const decoder = new TextDecoder();
let buffer = '';

while (true) {
const { done, value } = await reader.read();

if (done) break;

buffer += decoder.decode(value, { stream: true });
const lines = buffer.split('\n');

// Keep the last potentially incomplete line in buffer
buffer = lines.pop() || '';

for (const line of lines) {
if (line.startsWith('data: ')) {
try {
const data = JSON.parse(line.slice(6));
yield data;
} catch (e) {
console.error('Failed to parse SSE data:', e);
}
}
}
}

// Process any remaining data
if (buffer.startsWith('data: ')) {
try {
const data = JSON.parse(buffer.slice(6));
yield data;
} catch (e) {
// Ignore incomplete data
}
}
}
```

### 10. `src/stores/chatStore.js`

```javascript
import { create } from 'zustand';

const useChatStore = create((set, get) => ({
// Current session
sessionId: null,

// Messages for current session
messages: [],

// Streaming state
isStreaming: false,
streamingContent: '',

// Sources from last query
sources: [],

// Selected documents to query
selectedDocuments: [], // null = all documents

// Actions
setSessionId: (sessionId) => set({ sessionId }),

addMessage: (message) =>
set((state) => ({
messages: [...state.messages, { ...message, id: Date.now() }],
})),

updateLastMessage: (content) =>
set((state) => {
const messages = [...state.messages];
if (messages.length > 0) {
messages[messages.length - 1] = {
...messages[messages.length - 1],
content,
};
}
return { messages };
}),

setStreaming: (isStreaming, content = '') =>
set({ isStreaming, streamingContent: content }),

appendStreamingContent: (chunk) =>
set((state) => ({
streamingContent: state.streamingContent + chunk,
})),

setSources: (sources) => set({ sources }),

setSelectedDocuments: (documents) => set({ selectedDocuments: documents }),

clearChat: () =>
set({
messages: [],
sources: [],
streamingContent: '',
isStreaming: false,
}),

resetSession: () =>
set({
sessionId: null,
messages: [],
sources: [],
streamingContent: '',
isStreaming: false,
}),
}));

export default useChatStore;
```

### 11. `src/stores/documentStore.js`

```javascript
import { create } from 'zustand';

const useDocumentStore = create((set, get) => ({
documents: [],
isLoading: false,
error: null,

setDocuments: (documents) => set({ documents }),

setLoading: (isLoading) => set({ isLoading }),

setError: (error) => set({ error }),

addDocument: (document) =>
set((state) => ({
documents: [document, ...state.documents],
})),

updateDocument: (documentId, updates) =>
set((state) => ({
documents: state.documents.map((doc) =>
doc.id === documentId ? { ...doc, ...updates } : doc
),
})),

removeDocument: (documentId) =>
set((state) => ({
documents: state.documents.filter((doc) => doc.id !== documentId),
})),

getReadyDocuments: () =>
get().documents.filter((doc) => doc.status === 'ready'),
}));

export default useDocumentStore;
```

### 12. `src/stores/uiStore.js`

```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUIStore = create(
persist(
(set) => ({
// Theme
theme: 'dark',
toggleTheme: () =>
set((state) => ({
theme: state.theme === 'dark' ? 'light' : 'dark',
})),

// Sidebar
sidebarOpen: true,
toggleSidebar: () =>
set((state) => ({ sidebarOpen: !state.sidebarOpen })),
setSidebarOpen: (open) => set({ sidebarOpen: open }),

// Source panel
sourcePanelOpen: false,
setSourcePanelOpen: (open) => set({ sourcePanelOpen: open }),

// Upload modal
uploadModalOpen: false,
setUploadModalOpen: (open) => set({ uploadModalOpen: open }),
}),
{
name: 'techdocs-ui-storage',
partialize: (state) => ({ theme: state.theme }),
}
)
);

export default useUIStore;
```

### 13. `src/hooks/useChat.js`

```javascript
import { useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'sonner';
import useChatStore from '../stores/chatStore';
import { streamQuery } from '../services/streaming';
import api from '../services/api';

export function useChat() {
const { getToken } = useAuth();
const {
sessionId,
messages,
isStreaming,
streamingContent,
sources,
selectedDocuments,
setSessionId,
addMessage,
updateLastMessage,
setStreaming,
appendStreamingContent,
setSources,
clearChat,
resetSession,
} = useChatStore();

const ensureSession = useCallback(async () => {
if (sessionId) return sessionId;

try {
const token = await getToken();
api.setToken(token);
const response = await api.createSession();
setSessionId(response.session_id);
return response.session_id;
} catch (error) {
toast.error('Failed to create session');
throw error;
}
}, [sessionId, getToken, setSessionId]);

const sendMessage = useCallback(
async (question) => {
if (isStreaming) return;

try {
// Add user message
addMessage({
role: 'user',
content: question,
});

// Ensure we have a session
const currentSessionId = await ensureSession();

// Start streaming state
setStreaming(true, '');

// Add placeholder assistant message
addMessage({
role: 'assistant',
content: '',
isStreaming: true,
});

// Get token for streaming
const token = await getToken();

// Get document IDs if selected
const docIds = selectedDocuments.length > 0
? selectedDocuments
: null;

// Stream the response
let fullContent = '';

for await (const chunk of streamQuery(
token,
question,
currentSessionId,
docIds
)) {
if (chunk.type === 'sources') {
setSources(chunk.sources);
} else if (chunk.type === 'chunk') {
fullContent += chunk.content;
appendStreamingContent(chunk.content);
updateLastMessage(fullContent);
} else if (chunk.type === 'done') {
// Streaming complete
} else if (chunk.type === 'error') {
throw new Error(chunk.content || 'Query failed');
}
}

// Finalize
setStreaming(false, '');
updateLastMessage(fullContent);
} catch (error) {
console.error('Chat error:', error);
toast.error(error.message || 'Failed to get response');
setStreaming(false, '');

// Remove the failed assistant message
useChatStore.setState((state) => ({
messages: state.messages.slice(0, -1),
}));
}
},
[
isStreaming,
ensureSession,
getToken,
selectedDocuments,
addMessage,
setStreaming,
appendStreamingContent,
updateLastMessage,
setSources,
]
);

const startNewChat = useCallback(() => {
resetSession();
}, [resetSession]);

return {
messages,
isStreaming,
streamingContent,
sources,
sessionId,
sendMessage,
startNewChat,
clearChat,
};
}

export default useChat;
```

### 14. `src/hooks/useDocuments.js`

```javascript
import { useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'sonner';
import useDocumentStore from '../stores/documentStore';
import api from '../services/api';

export function useDocuments() {
const { getToken } = useAuth();
const {
documents,
isLoading,
error,
setDocuments,
setLoading,
setError,
addDocument,
updateDocument,
removeDocument,
getReadyDocuments,
} = useDocumentStore();

const fetchDocuments = useCallback(async () => {
try {
setLoading(true);
const token = await getToken();
api.setToken(token);
const response = await api.listDocuments();
setDocuments(response.documents);
} catch (error) {
console.error('Failed to fetch documents:', error);
setError(error.message);
toast.error('Failed to load documents');
} finally {
setLoading(false);
}
}, [getToken, setDocuments, setLoading, setError]);

const uploadDocument = useCallback(
async (file) => {
try {
const token = await getToken();
api.setToken(token);
const response = await api.uploadDocument(file);

addDocument({
id: response.document_id,
filename: response.filename,
status: response.status,
created_at: new Date().toISOString(),
});

toast.success('Document uploaded! Processing started.');

// Poll for status updates
pollDocumentStatus(response.document_id);

return response;
} catch (error) {
console.error('Upload failed:', error);
toast.error(error.message || 'Failed to upload document');
throw error;
}
},
[getToken, addDocument]
);

const pollDocumentStatus = useCallback(
async (documentId) => {
const maxAttempts = 60;
let attempts = 0;

const poll = async () => {
try {
const token = await getToken();
api.setToken(token);
const doc = await api.getDocument(documentId);

updateDocument(documentId, {
status: doc.status,
page_count: doc.page_count,
chunk_count: doc.chunk_count,
});

if (doc.status === 'ready') {
toast.success(`"${doc.filename}" is ready!`);
return;
}

if (doc.status === 'failed') {
toast.error(`"${doc.filename}" processing failed`);
return;
}

attempts++;
if (attempts < maxAttempts) {
setTimeout(poll, 3000);
}
} catch (error) {
console.error('Status poll failed:', error);
}
};

setTimeout(poll, 2000);
},
[getToken, updateDocument]
);

const deleteDocument = useCallback(
async (documentId) => {
try {
const token = await getToken();
api.setToken(token);
await api.deleteDocument(documentId);
removeDocument(documentId);
toast.success('Document deleted');
} catch (error) {
console.error('Delete failed:', error);
toast.error('Failed to delete document');
throw error;
}
},
[getToken, removeDocument]
);

// Initial fetch
useEffect(() => {
fetchDocuments();
}, [fetchDocuments]);

return {
documents,
isLoading,
error,
readyDocuments: getReadyDocuments(),
fetchDocuments,
uploadDocument,
deleteDocument,
};
}

export default useDocuments;
```

### 15. `src/components/ui/Button.jsx`

```jsx
import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const variants = {
primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
ghost: 'hover:bg-accent hover:text-accent-foreground',
outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
destructive: 'bg-red-600 text-white hover:bg-red-700',
};

const sizes = {
sm: 'h-8 px-3 text-xs',
md: 'h-10 px-4 text-sm',
lg: 'h-12 px-6 text-base',
icon: 'h-10 w-10',
};

const Button = forwardRef(
({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
return (
<button
ref={ref}
className={cn(
'inline-flex items-center justify-center rounded-lg font-medium',
'transition-colors duration-200',
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
'disabled:pointer-events-none disabled:opacity-50',
variants[variant],
sizes[size],
className
)}
{...props}
>
{children}
</button>
);
}
);

Button.displayName = 'Button';

export default Button;
```

### 16. `src/components/ui/Input.jsx`

```jsx
import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef(({ className, type = 'text', ...props }, ref) => {
return (
<input
type={type}
ref={ref}
className={cn(
'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2',
'text-sm placeholder:text-muted-foreground',
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
'disabled:cursor-not-allowed disabled:opacity-50',
'transition-colors duration-200',
className
)}
{...props}
/>
);
});

Input.displayName = 'Input';

export default Input;
```

### 17. `src/components/ui/Card.jsx`

```jsx
import { cn } from '@/utils/cn';

export function Card({ className, children, ...props }) {
return (
<div
className={cn(
'rounded-xl border border-border bg-secondary/50 p-4',
'transition-colors duration-200',
className
)}
{...props}
>
{children}
</div>
);
}

export function CardHeader({ className, children }) {
return (
<div className={cn('mb-3', className)}>
{children}
</div>
);
}

export function CardTitle({ className, children }) {
return (
<h3 className={cn('text-lg font-semibold', className)}>
{children}
</h3>
);
}

export function CardContent({ className, children }) {
return (
<div className={cn('text-sm text-muted-foreground', className)}>
{children}
</div>
);
}

export default Card;
```

### 18. `src/components/ui/Skeleton.jsx`

```jsx
import { cn } from '@/utils/cn';

export function Skeleton({ className, ...props }) {
return (
<div
className={cn(
'animate-pulse rounded-lg bg-muted',
className
)}
{...props}
/>
);
}

export function SkeletonText({ lines = 3, className }) {
return (
<div className={cn('space-y-2', className)}>
{Array.from({ length: lines }).map((_, i) => (
<Skeleton
key={i}
className={cn('h-4', i === lines - 1 && 'w-3/4')}
/>
))}
</div>
);
}

export default Skeleton;
```

### 19. `src/components/ui/Badge.jsx`

```jsx
import { cn } from '@/utils/cn';

const variants = {
default: 'bg-primary/10 text-primary',
secondary: 'bg-secondary text-secondary-foreground',
success: 'bg-green-500/10 text-green-500',
warning: 'bg-yellow-500/10 text-yellow-500',
error: 'bg-red-500/10 text-red-500',
outline: 'border border-border text-foreground',
};

export function Badge({ className, variant = 'default', children, ...props }) {
return (
<span
className={cn(
'inline-flex items-center rounded-full px-2.5 py-0.5',
'text-xs font-medium',
variants[variant],
className
)}
{...props}
>
{children}
</span>
);
}

export default Badge;
```

### 20. `src/components/layout/Layout.jsx`

```jsx
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import useUIStore from '@/stores/uiStore';
import { cn } from '@/utils/cn';

export default function Layout({ children }) {
const { sidebarOpen } = useUIStore();

return (
<div className="flex h-screen bg-background">
{/* Sidebar */}
<Sidebar />

{/* Main content */}
<div
className={cn(
'flex flex-1 flex-col transition-all duration-300',
sidebarOpen ? 'md:ml-64' : 'md:ml-16'
)}
>
<Header />
<main className="flex-1 overflow-hidden">
{children}
</main>
</div>
</div>
);
}
```

### 21. `src/components/layout/Sidebar.jsx`

```jsx
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
MessageSquare,
FileText,
Settings,
CreditCard,
PanelLeftClose,
PanelLeft,
Plus,
Upload,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/Button';
import useUIStore from '@/stores/uiStore';
import useChatStore from '@/stores/chatStore';

const navItems = [
{ icon: MessageSquare, label: 'Chat', path: '/' },
{ icon: FileText, label: 'Documents', path: '/documents' },
{ icon: Settings, label: 'Settings', path: '/settings' },
{ icon: CreditCard, label: 'Billing', path: '/billing' },
];

export default function Sidebar() {
const location = useLocation();
const { sidebarOpen, toggleSidebar, setUploadModalOpen } = useUIStore();
const { resetSession } = useChatStore();

const handleNewChat = () => {
resetSession();
};

return (
<>
{/* Mobile overlay */}
<AnimatePresence>
{sidebarOpen && (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className="fixed inset-0 z-40 bg-black/50 md:hidden"
onClick={toggleSidebar}
/>
)}
</AnimatePresence>

{/* Sidebar */}
<motion.aside
initial={false}
animate={{ width: sidebarOpen ? 256 : 64 }}
className={cn(
'fixed left-0 top-0 z-50 flex h-full flex-col',
'bg-secondary border-r border-border',
'transition-all duration-300',
!sidebarOpen && 'items-center'
)}
>
{/* Logo */}
<div className="flex h-16 items-center justify-between px-4 border-b border-border">
{sidebarOpen ? (
<Link to="/" className="flex items-center gap-2">
<div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
<FileText className="h-5 w-5 text-primary-foreground" />
</div>
<span className="font-semibold">TechDocs AI</span>
</Link>
) : (
<div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
<FileText className="h-5 w-5 text-primary-foreground" />
</div>
)}

<Button
variant="ghost"
size="icon"
onClick={toggleSidebar}
className={cn('h-8 w-8', !sidebarOpen && 'hidden md:flex')}
>
{sidebarOpen ? (
<PanelLeftClose className="h-4 w-4" />
) : (
<PanelLeft className="h-4 w-4" />
)}
</Button>
</div>

{/* Actions */}
<div className="p-3 space-y-2">
<Button
onClick={handleNewChat}
className={cn(
'w-full justify-start gap-2',
!sidebarOpen && 'justify-center px-0'
)}
>
<Plus className="h-4 w-4" />
{sidebarOpen && 'New Chat'}
</Button>

<Button
variant="outline"
onClick={() => setUploadModalOpen(true)}
className={cn(
'w-full justify-start gap-2',
!sidebarOpen && 'justify-center px-0'
)}
>
<Upload className="h-4 w-4" />
{sidebarOpen && 'Upload'}
</Button>
</div>

{/* Navigation */}
<nav className="flex-1 p-3">
<ul className="space-y-1">
{navItems.map((item) => {
const Icon = item.icon;
const isActive = location.pathname === item.path;

return (
<li key={item.path}>
<Link
to={item.path}
className={cn(
'flex items-center gap-3 rounded-lg px-3 py-2',
'text-sm font-medium transition-colors',
isActive
? 'bg-accent text-accent-foreground'
: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
!sidebarOpen && 'justify-center px-0'
)}
>
<Icon className="h-5 w-5 flex-shrink-0" />
{sidebarOpen && item.label}
</Link>
</li>
);
})}
</ul>
</nav>

{/* Bottom section */}
{sidebarOpen && (
<div className="p-4 border-t border-border">
<p className="text-xs text-muted-foreground">
© 2024 TechDocs AI
</p>
</div>
)}
</motion.aside>
</>
);
}
```

### 22. `src/components/layout/Header.jsx`

```jsx
import { UserButton, useOrganization } from '@clerk/clerk-react';
import { Moon, Sun, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import useUIStore from '@/stores/uiStore';

export default function Header() {
const { theme, toggleTheme } = useUIStore();
const { organization } = useOrganization();

return (
<header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
<div className="flex h-full items-center justify-between px-4">
{/* Left side - Org name */}
<div className="flex items-center gap-4">
{organization && (
<span className="text-sm font-medium text-muted-foreground">
{organization.name}
</span>
)}
</div>

{/* Right side - Actions */}
<div className="flex items-center gap-2">
<Button variant="ghost" size="icon" onClick={toggleTheme}>
{theme === 'dark' ? (
<Sun className="h-5 w-5" />
) : (
<Moon className="h-5 w-5" />
)}
</Button>

<UserButton
appearance={{
elements: {
avatarBox: 'h-9 w-9',
},
}}
/>
</div>
</div>
</header>
);
}
```

### 23. `src/components/chat/ChatContainer.jsx`

```jsx
import { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import WelcomeScreen from './WelcomeScreen';
import SourcePanel from './SourceList';
import ThinkingIndicator from './ThinkingIndicator';
import useChat from '@/hooks/useChat';
import useUIStore from '@/stores/uiStore';
import { cn } from '@/utils/cn';

export default function ChatContainer() {
const { messages, isStreaming, sources, sendMessage } = useChat();
const { sourcePanelOpen, setSourcePanelOpen } = useUIStore();
const messagesEndRef = useRef(null);

// Auto-scroll to bottom
useEffect(() => {
messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages, isStreaming]);

// Show source panel when sources arrive
useEffect(() => {
if (sources.length > 0) {
setSourcePanelOpen(true);
}
}, [sources, setSourcePanelOpen]);

const isEmpty = messages.length === 0;

return (
<div className="flex h-full">
{/* Main chat area */}
<div className="flex flex-1 flex-col">
{/* Messages */}
<div className="flex-1 overflow-y-auto scrollbar-thin">
{isEmpty ? (
<WelcomeScreen onSendMessage={sendMessage} />
) : (
<div className="mx-auto max-w-3xl px-4 py-8">
<AnimatePresence mode="popLayout">
{messages.map((message) => (
<ChatMessage
key={message.id}
message={message}
isStreaming={message.isStreaming && isStreaming}
/>
))}
</AnimatePresence>

{isStreaming && messages[messages.length - 1]?.role === 'user' && (
<ThinkingIndicator />
)}

<div ref={messagesEndRef} />
</div>
)}
</div>

{/* Input */}
<div className="border-t border-border bg-background p-4">
<div className="mx-auto max-w-3xl">
<ChatInput onSendMessage={sendMessage} disabled={isStreaming} />
</div>
</div>
</div>

{/* Source panel */}
<SourcePanel
sources={sources}
isOpen={sourcePanelOpen}
onClose={() => setSourcePanelOpen(false)}
/>
</div>
);
}
```

### 24. `src/components/chat/ChatInput.jsx`

```jsx
import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Sparkles, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import useDocumentStore from '@/stores/documentStore';
import useChatStore from '@/stores/chatStore';
import { cn } from '@/utils/cn';

export default function ChatInput({ onSendMessage, disabled }) {
const [input, setInput] = useState('');
const [showDocFilter, setShowDocFilter] = useState(false);
const textareaRef = useRef(null);

const { documents } = useDocumentStore();
const { selectedDocuments, setSelectedDocuments } = useChatStore();

const readyDocs = documents.filter((d) => d.status === 'ready');

const handleSubmit = (e) => {
e.preventDefault();
if (!input.trim() || disabled) return;

onSendMessage(input.trim());
setInput('');
};

const handleKeyDown = (e) => {
if (e.key === 'Enter' && !e.shiftKey) {
e.preventDefault();
handleSubmit(e);
}
};

// Auto-resize textarea
useEffect(() => {
const textarea = textareaRef.current;
if (textarea) {
textarea.style.height = 'auto';
textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
}
}, [input]);

const toggleDocument = (docId) => {
setSelectedDocuments(
selectedDocuments.includes(docId)
? selectedDocuments.filter((id) => id !== docId)
: [...selectedDocuments, docId]
);
};

return (
<div className="space-y-3">
{/* Document filter */}
{readyDocs.length > 0 && (
<div className="relative">
<button
onClick={() => setShowDocFilter(!showDocFilter)}
className={cn(
'flex items-center gap-2 text-sm',
'text-muted-foreground hover:text-foreground',
'transition-colors'
)}
>
<Sparkles className="h-4 w-4" />
{selectedDocuments.length === 0
? 'Searching all documents'
: `Searching ${selectedDocuments.length} document${selectedDocuments.length > 1 ? 's' : ''}`}
<ChevronDown className={cn('h-4 w-4 transition-transform', showDocFilter && 'rotate-180')} />
</button>

{showDocFilter && (
<div className="absolute bottom-full left-0 mb-2 w-64 rounded-lg border border-border bg-secondary p-2 shadow-lg">
<div className="mb-2 px-2 text-xs font-medium text-muted-foreground">
Filter documents
</div>
<div className="max-h-48 overflow-y-auto">
{readyDocs.map((doc) => (
<label
key={doc.id}
className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer"
>
<input
type="checkbox"
checked={selectedDocuments.includes(doc.id)}
onChange={() => toggleDocument(doc.id)}
className="rounded border-border"
/>
<span className="text-sm truncate">{doc.filename}</span>
</label>
))}
</div>
{selectedDocuments.length > 0 && (
<button
onClick={() => setSelectedDocuments([])}
className="mt-2 w-full text-xs text-muted-foreground hover:text-foreground"
>
Clear selection
</button>
)}
</div>
)}
</div>
)}

{/* Input form */}
<form onSubmit={handleSubmit} className="relative">
<div
className={cn(
'flex items-end gap-2 rounded-2xl border border-border',
'bg-secondary/50 p-2 transition-colors',
'focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20'
)}
>
<textarea
ref={textareaRef}
value={input}
onChange={(e) => setInput(e.target.value)}
onKeyDown={handleKeyDown}
placeholder="Ask a question about your documents..."
disabled={disabled}
rows={1}
className={cn(
'flex-1 resize-none bg-transparent px-2 py-2',
'text-sm placeholder:text-muted-foreground',
'focus:outline-none disabled:opacity-50',
'max-h-[200px]'
)}
/>

<Button
type="submit"
size="icon"
disabled={disabled || !input.trim()}
className="h-10 w-10 rounded-xl flex-shrink-0"
>
<Send className="h-4 w-4" />
</Button>
</div>
</form>

{/* Hint */}
<p className="text-center text-xs text-muted-foreground">
TechDocs AI can make mistakes. Verify important information.
</p>
</div>
);
}
```

### 25. `src/components/chat/ChatMessage.jsx`

```jsx
import { motion } from 'framer-motion';
import { User, Bot, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/Button';

export default function ChatMessage({ message, isStreaming }) {
const [copied, setCopied] = useState(false);
const isUser = message.role === 'user';

const handleCopy = async () => {
await navigator.clipboard.writeText(message.content);
setCopied(true);
setTimeout(() => setCopied(false), 2000);
};

return (
<motion.div
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -10 }}
className={cn('mb-6 flex gap-4', isUser && 'flex-row-reverse')}
>
{/* Avatar */}
<div
className={cn(
'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full',
isUser ? 'bg-primary' : 'bg-secondary border border-border'
)}
>
{isUser ? (
<User className="h-4 w-4 text-primary-foreground" />
) : (
<Bot className="h-4 w-4 text-foreground" />
)}
</div>

{/* Content */}
<div className={cn('flex-1 space-y-2', isUser && 'text-right')}>
<div
className={cn(
'inline-block rounded-2xl px-4 py-3',
isUser
? 'bg-primary text-primary-foreground'
: 'bg-secondary/50 border border-border'
)}
>
{isUser ? (
<p className="text-sm whitespace-pre-wrap">{message.content}</p>
) : (
<div className={cn('markdown-content text-sm', isStreaming && 'streaming-cursor')}>
<ReactMarkdown
remarkPlugins={[remarkGfm]}
components={{
// Custom link rendering
a: ({ node, ...props }) => (
<a
{...props}
target="_blank"
rel="noopener noreferrer"
className="text-primary hover:underline"
/>
),
// Custom code block
code: ({ node, inline, className, children, ...props }) => {
if (inline) {
return (
<code
className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono"
{...props}
>
{children}
</code>
);
}
return (
<pre className="bg-muted rounded-lg p-4 overflow-x-auto my-3">
<code className="text-xs font-mono" {...props}>
{children}
</code>
</pre>
);
},
// Custom table
table: ({ node, ...props }) => (
<div className="overflow-x-auto my-3">
<table className="min-w-full border-collapse text-sm" {...props} />
</div>
),
th: ({ node, ...props }) => (
<th className="border border-border bg-muted px-3 py-2 text-left font-medium" {...props} />
),
td: ({ node, ...props }) => (
<td className="border border-border px-3 py-2" {...props} />
),
}}
>
{message.content || ' '}
</ReactMarkdown>
</div>
)}
</div>

{/* Actions (for assistant messages) */}
{!isUser && !isStreaming && message.content && (
<div className="flex items-center gap-1">
<Button
variant="ghost"
size="sm"
onClick={handleCopy}
className="h-7 px-2 text-xs text-muted-foreground"
>
{copied ? (
<Check className="h-3 w-3 mr-1" />
) : (
<Copy className="h-3 w-3 mr-1" />
)}
{copied ? 'Copied' : 'Copy'}
</Button>
</div>
)}
</div>
</motion.div>
);
}
```

### 26. `src/components/chat/SourceCard.jsx`

```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown, ExternalLink } from 'lucide-react';
import { cn } from '@/utils/cn';
import Badge from '@/components/ui/Badge';

export default function SourceCard({ source, index }) {
const [expanded, setExpanded] = useState(false);

const relevancePercent = Math.round(source.relevance_score * 100);

return (
<motion.div
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.05 }}
className={cn(
'rounded-lg border border-border bg-secondary/30',
'hover:bg-secondary/50 transition-colors'
)}
>
{/* Header */}
<button
onClick={() => setExpanded(!expanded)}
className="flex w-full items-center gap-3 p-3 text-left"
>
<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
<FileText className="h-4 w-4" />
</div>

<div className="flex-1 min-w-0">
<p className="text-sm font-medium truncate">
{source.document_name}
</p>
<p className="text-xs text-muted-foreground">
Page {source.page_number}
</p>
</div>

<Badge
variant={relevancePercent > 80 ? 'success' : relevancePercent > 60 ? 'warning' : 'secondary'}
className="flex-shrink-0"
>
{relevancePercent}%
</Badge>

<ChevronDown
className={cn(
'h-4 w-4 text-muted-foreground transition-transform',
expanded && 'rotate-180'
)}
/>
</button>

{/* Expanded content */}
<AnimatePresence>
{expanded && (
<motion.div
initial={{ height: 0, opacity: 0 }}
animate={{ height: 'auto', opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
className="overflow-hidden"
>
<div className="border-t border-border p-3">
<p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
{source.content}
</p>
</div>
</motion.div>
)}
</AnimatePresence>
</motion.div>
);
}
```

### 27. `src/components/chat/SourceList.jsx`

```jsx
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';
import SourceCard from './SourceCard';
import { cn } from '@/utils/cn';

export default function SourcePanel({ sources, isOpen, onClose }) {
if (!isOpen) return null;

return (
<AnimatePresence>
<motion.div
initial={{ width: 0, opacity: 0 }}
animate={{ width: 384, opacity: 1 }}
exit={{ width: 0, opacity: 0 }}
className={cn(
'h-full border-l border-border bg-background',
'flex flex-col overflow-hidden'
)}
>
{/* Header */}
<div className="flex items-center justify-between border-b border-border px-4 py-3">
<div className="flex items-center gap-2">
<FileText className="h-5 w-5 text-primary" />
<h2 className="font-semibold">Sources</h2>
<span className="text-sm text-muted-foreground">
({sources.length})
</span>
</div>
<Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
<X className="h-4 w-4" />
</Button>
</div>

{/* Sources list */}
<div className="flex-1 overflow-y-auto scrollbar-thin p-4">
{sources.length === 0 ? (
<div className="flex flex-col items-center justify-center h-full text-center">
<FileText className="h-12 w-12 text-muted-foreground/30 mb-3" />
<p className="text-sm text-muted-foreground">
Sources will appear here when you ask a question
</p>
</div>
) : (
<div className="space-y-3">
{sources.map((source, index) => (
<SourceCard
key={`${source.document_id}-${source.page_number}-${index}`}
source={source}
index={index}
/>
))}
</div>
)}
</div>

{/* Footer */}
{sources.length > 0 && (
<div className="border-t border-border p-4">
<p className="text-xs text-muted-foreground text-center">
Click a source to expand and view the relevant excerpt
</p>
</div>
)}
</motion.div>
</AnimatePresence>
);
}
```

### 28. `src/components/chat/ThinkingIndicator.jsx`

```jsx
import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';

export default function ThinkingIndicator() {
return (
<motion.div
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
className="mb-6 flex gap-4"
>
{/* Avatar */}
<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary border border-border">
<Bot className="h-4 w-4 text-foreground" />
</div>

{/* Thinking animation */}
<div className="flex items-center gap-3 rounded-2xl bg-secondary/50 border border-border px-4 py-3">
<Sparkles className="h-4 w-4 text-primary animate-pulse-subtle" />
<div className="flex items-center gap-1">
<span className="text-sm text-muted-foreground">Thinking</span>
<motion.span
animate={{ opacity: [0, 1, 0] }}
transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
className="text-muted-foreground"
>
...
</motion.span>
</div>
</div>
</motion.div>
);
}
```

### 29. `src/components/chat/WelcomeScreen.jsx`

```jsx
import { motion } from 'framer-motion';
import { FileText, Search, Zap, MessageSquare } from 'lucide-react';

const suggestions = [
"How do I replace the brake pads?",
"What's the torque spec for the cylinder head bolts?",
"Explain the fuel injection system",
"What tools do I need for a timing belt replacement?",
];

export default function WelcomeScreen({ onSendMessage }) {
return (
<div className="flex h-full flex-col items-center justify-center px-4">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="max-w-2xl text-center"
>
{/* Logo */}
<div className="mb-6 flex justify-center">
<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
<FileText className="h-8 w-8" />
</div>
</div>

{/* Title */}
<h1 className="mb-2 text-3xl font-semibold tracking-tight">
TechDocs AI
</h1>
<p className="mb-8 text-lg text-muted-foreground">
Your AI assistant for technical documentation
</p>

{/* Features */}
<div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
<FeatureCard
icon={Search}
title="Smart Search"
description="Find answers across all your documents instantly"
/>
<FeatureCard
icon={Zap}
title="Fast & Accurate"
description="Powered by advanced AI for precise results"
/>
<FeatureCard
icon={MessageSquare}
title="Natural Conversation"
description="Ask follow-up questions naturally"
/>
</div>

{/* Suggestions */}
<div className="space-y-3">
<p className="text-sm text-muted-foreground">Try asking:</p>
<div className="flex flex-wrap justify-center gap-2">
{suggestions.map((suggestion, index) => (
<motion.button
key={suggestion}
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.1 * index }}
onClick={() => onSendMessage(suggestion)}
className="rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm
hover:bg-secondary hover:border-primary/50 transition-colors"
>
{suggestion}
</motion.button>
))}
</div>
</div>
</motion.div>
</div>
);
}

function FeatureCard({ icon: Icon, title, description }) {
return (
<div className="rounded-xl border border-border bg-secondary/30 p-4">
<Icon className="mb-2 h-5 w-5 text-primary" />
<h3 className="mb-1 font-medium">{title}</h3>
<p className="text-sm text-muted-foreground">{description}</p>
</div>
);
}
```

### 30. `src/components/documents/DocumentUpload.jsx`

```jsx
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import useUIStore from '@/stores/uiStore';
import useDocuments from '@/hooks/useDocuments';
import { cn } from '@/utils/cn';

export default function DocumentUpload() {
const { uploadModalOpen, setUploadModalOpen } = useUIStore();
const { uploadDocument } = useDocuments();
const [uploading, setUploading] = useState(false);
const [uploadStatus, setUploadStatus] = useState(null); // 'success' | 'error' | null

const onDrop = useCallback(
async (acceptedFiles) => {
const file = acceptedFiles[0];
if (!file) return;

setUploading(true);
setUploadStatus(null);

try {
await uploadDocument(file);
setUploadStatus('success');
setTimeout(() => {
setUploadModalOpen(false);
setUploadStatus(null);
}, 1500);
} catch (error) {
setUploadStatus('error');
} finally {
setUploading(false);
}
},
[uploadDocument, setUploadModalOpen]
);

const { getRootProps, getInputProps, isDragActive } = useDropzone({
onDrop,
accept: {
'application/pdf': ['.pdf'],
},
maxFiles: 1,
maxSize: 50 * 1024 * 1024, // 50MB
disabled: uploading,
});

if (!uploadModalOpen) return null;

return (
<AnimatePresence>
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
onClick={() => !uploading && setUploadModalOpen(false)}
>
<motion.div
initial={{ scale: 0.95, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.95, opacity: 0 }}
onClick={(e) => e.stopPropagation()}
className="w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-xl"
>
{/* Header */}
<div className="mb-6 flex items-center justify-between">
<h2 className="text-xl font-semibold">Upload Document</h2>
<Button
variant="ghost"
size="icon"
onClick={() => setUploadModalOpen(false)}
disabled={uploading}
>
<X className="h-5 w-5" />
</Button>
</div>

{/* Dropzone */}
<div
{...getRootProps()}
className={cn(
'relative flex flex-col items-center justify-center',
'rounded-xl border-2 border-dashed p-12',
'transition-colors cursor-pointer',
isDragActive
? 'border-primary bg-primary/5'
: 'border-border hover:border-primary/50 hover:bg-secondary/30',
uploading && 'pointer-events-none opacity-50'
)}
>
<input {...getInputProps()} />

{uploadStatus === 'success' ? (
<motion.div
initial={{ scale: 0 }}
animate={{ scale: 1 }}
className="flex flex-col items-center"
>
<CheckCircle className="h-12 w-12 text-green-500 mb-3" />
<p className="text-sm font-medium">Upload successful!</p>
</motion.div>
) : uploadStatus === 'error' ? (
<motion.div
initial={{ scale: 0 }}
animate={{ scale: 1 }}
className="flex flex-col items-center"
>
<AlertCircle className="h-12 w-12 text-red-500 mb-3" />
<p className="text-sm font-medium">Upload failed</p>
<p className="text-xs text-muted-foreground mt-1">Please try again</p>
</motion.div>
) : uploading ? (
<div className="flex flex-col items-center">
<Loader2 className="h-12 w-12 text-primary animate-spin mb-3" />
<p className="text-sm font-medium">Uploading...</p>
</div>
) : (
<>
<div className="mb-4 rounded-full bg-primary/10 p-4">
{isDragActive ? (
<FileText className="h-8 w-8 text-primary" />
) : (
<Upload className="h-8 w-8 text-primary" />
)}
</div>
<p className="mb-1 text-sm font-medium">
{isDragActive ? 'Drop your file here' : 'Drop your PDF here'}
</p>
<p className="text-xs text-muted-foreground">
or click to browse (max 50MB)
</p>
</>
)}
</div>

{/* Footer */}
<div className="mt-4 flex justify-end gap-2">
<Button
variant="ghost"
onClick={() => setUploadModalOpen(false)}
disabled={uploading}
>
Cancel
</Button>
</div>
</motion.div>
</motion.div>
</AnimatePresence>
);
}
```

### 31. `src/pages/ChatPage.jsx`

```jsx
import ChatContainer from '@/components/chat/ChatContainer';
import DocumentUpload from '@/components/documents/DocumentUpload';

export default function ChatPage() {
return (
<>
<ChatContainer />
<DocumentUpload />
</>
);
}
```

### 32. `src/pages/SignInPage.jsx`

```jsx
import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
return (
<div className="flex min-h-screen items-center justify-center bg-background">
<SignIn
routing="path"
path="/sign-in"
signUpUrl="/sign-up"
appearance={{
elements: {
rootBox: 'mx-auto',
card: 'bg-secondary border border-border shadow-xl',
},
}}
/>
</div>
);
}
```

### 33. `src/pages/SignUpPage.jsx`

```jsx
import { SignUp } from '@clerk/clerk-react';

export default function SignUpPage() {
return (
<div className="flex min-h-screen items-center justify-center bg-background">
<SignUp
routing="path"
path="/sign-up"
signInUrl="/sign-in"
appearance={{
elements: {
rootBox: 'mx-auto',
card: 'bg-secondary border border-border shadow-xl',
},
}}
/>
</div>
);
}
```

### 34. `.env.example`

```env
VITE_API_URL=http://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```

-----

## FINAL CHECKLIST

After generating all files:

1. ✅ All components use `cn()` for Tailwind class merging
1. ✅ Framer Motion for smooth animations
1. ✅ Dark mode as default with proper CSS variables
1. ✅ Streaming responses with cursor animation
1. ✅ Source citations with expandable cards
1. ✅ Document filtering in chat input
1. ✅ Responsive sidebar with collapse
1. ✅ Proper loading and error states
1. ✅ Clerk auth integrated throughout
1. ✅ Toast notifications with Sonner
1. ✅ Markdown rendering with tables and code blocks
1. ✅ Clean, minimal Anthropic/OpenAI aesthetic

Generate all files completely. Do not skip any component or use placeholders.
