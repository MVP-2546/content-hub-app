import React, { useState, useEffect } from 'react';
import {
  Lightbulb,
  Calendar,
  Sparkles,
  Home,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Video,
  Hash,
  Heart,
  MessageCircle,
  Bookmark,
  Trash2,
  Edit3,
  Clock,
  TrendingUp,
  Target,
  Zap,
  Copy,
  RefreshCw,
  Filter,
  Search,
  Image,
  Link,
  FileText,
  Tag,
  Star,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const CATEGORIES = ['Todos', 'Reels', 'Carrusel', 'Stories', 'Post', 'TikTok'];
const PLATFORMS = ['Instagram', 'TikTok'];
const COLORS = [
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#ea580c',
  '#16a34a',
  '#0891b2',
];
const DAYS = ['Lun', 'Mar', 'Mi\u00e9', 'Jue', 'Vie', 'S\u00e1b', 'Dom'];
const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const CONTENT_TEMPLATES = {
  Reels: [
    {
      hook: '\u00bfSab\u00edas que...?',
      structure: 'Hook \u2192 Dato sorprendente \u2192 CTA',
      duration: '15-30s',
    },
    {
      hook: 'POV: Cuando...',
      structure: 'POV \u2192 Situaci\u00f3n relatable \u2192 Giro',
      duration: '15-60s',
    },
    {
      hook: '3 errores que cometes al...',
      structure: 'Lista \u2192 Error + Soluci\u00f3n \u2192 CTA',
      duration: '30-60s',
    },
    {
      hook: 'Esto cambi\u00f3 mi...',
      structure: 'Antes \u2192 Proceso \u2192 Despu\u00e9s',
      duration: '15-30s',
    },
  ],
  Carrusel: [
    {
      hook: 'Gu\u00eda completa de...',
      structure: 'Portada \u2192 5-8 slides \u2192 CTA final',
      slides: '7-10',
    },
    {
      hook: 'X cosas que nadie te dice sobre...',
      structure: 'Hook \u2192 Lista numerada \u2192 Conclusi\u00f3n',
      slides: '5-8',
    },
    {
      hook: 'Paso a paso para...',
      structure: 'Intro \u2192 Pasos detallados \u2192 Resultado',
      slides: '6-10',
    },
  ],
  Stories: [
    {
      hook: 'Encuesta: \u00bfT\u00fa qu\u00e9 prefieres?',
      structure: 'Pregunta \u2192 Opciones \u2192 Resultado',
      slides: '3-5',
    },
    {
      hook: 'Detr\u00e1s de c\u00e1maras',
      structure: 'Intro \u2192 Proceso \u2192 Resultado final',
      slides: '4-6',
    },
  ],
  TikTok: [
    {
      hook: 'El truco que nadie conoce...',
      structure: 'Hook \u2192 Demostraci\u00f3n \u2192 Resultado',
      duration: '15-60s',
    },
    {
      hook: 'Storytime:...',
      structure: 'Intro \u2192 Historia \u2192 Moraleja',
      duration: '30-90s',
    },
    {
      hook: 'Respondiendo a @...',
      structure: 'Pregunta \u2192 Respuesta \u2192 CTA',
      duration: '15-30s',
    },
  ],
  Post: [
    {
      hook: 'Micro-blog educativo',
      structure: 'Imagen + Caption largo con valor',
      format: 'Cuadrado',
    },
    {
      hook: 'Frase motivacional',
      structure: 'Dise\u00f1o limpio + Reflexi\u00f3n en caption',
      format: 'Cuadrado',
    },
  ],
};

const HASHTAG_SETS = {
  Instagram: {
    general: [
      '#contenido',
      '#marketing',
      '#emprendedor',
      '#crecimiento',
      '#marca',
      '#negocios',
      '#creadordecontenido',
      '#marketingdigital',
      '#redessociales',
      '#estrategia',
    ],
    reels: [
      '#reels',
      '#reelsinstagram',
      '#reelsviral',
      '#trending',
      '#viral',
      '#explorepage',
    ],
    carrusel: [
      '#infografia',
      '#tips',
      '#aprende',
      '#educacion',
      '#guia',
      '#pasoapaso',
    ],
  },
  TikTok: {
    general: [
      '#fyp',
      '#parati',
      '#viral',
      '#tendencia',
      '#contenido',
      '#emprendimiento',
    ],
    video: ['#tiktokviral', '#trend', '#xyzbca', '#foryou', '#viralvideo'],
  },
};

const CAPTION_STARTERS = [
  '\ud83d\udd25 Esto es lo que nadie te cuenta sobre',
  '\ud83d\udca1 Tip del d\u00eda:',
  '\u26a1 Si est\u00e1s empezando en',
  '\ud83c\udfaf El error #1 que cometen al',
  '\u2728 Descubr\u00ed algo que cambi\u00f3 mi forma de',
  '\ud83d\udccc Guarda esto para despu\u00e9s:',
  '\ud83d\ude80 En 30 d\u00edas logr\u00e9',
  '\ud83d\udcaa No necesitas ser experto para',
  '\ud83e\udde0 Dato que te va a volar la cabeza:',
  '\u274c Deja de hacer esto si quieres',
];

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getStoredData(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
}

function storeData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {}
}

function NavBar({ active, setActive }) {
  const items = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'ideas', icon: Lightbulb, label: 'Ideas' },
    { id: 'calendar', icon: Calendar, label: 'Calendario' },
    { id: 'ai', icon: Sparkles, label: 'IA' },
  ];
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0 env(safe-area-inset-bottom, 8px)',
        zIndex: 50,
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 12px',
            color: active === item.id ? '#2563eb' : '#9ca3af',
            transition: 'color 0.2s',
          }}
        >
          <item.icon size={22} strokeWidth={active === item.id ? 2.5 : 1.5} />
          <span
            style={{ fontSize: 11, fontWeight: active === item.id ? 600 : 400 }}
          >
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

function HomePage({ ideas, events, setActive }) {
  const today = new Date();
  const todayEvents = events.filter(
    (e) => e.date === today.toISOString().split('T')[0]
  );
  const weekEvents = events.filter((e) => {
    const d = new Date(e.date);
    const diff = (d - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff < 7;
  });

  return (
    <div style={{ padding: '20px 16px 100px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{ fontSize: 26, fontWeight: 700, color: '#111827', margin: 0 }}
        >
          Mi Content Hub
        </h1>
        <p style={{ color: '#6b7280', margin: '4px 0 0', fontSize: 14 }}>
          {today.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 12,
          marginBottom: 24,
        }}
      >
        {[
          {
            n: ideas.length,
            label: 'Ideas',
            icon: Lightbulb,
            color: '#f59e0b',
          },
          {
            n: todayEvents.length,
            label: 'Hoy',
            icon: Target,
            color: '#2563eb',
          },
          {
            n: weekEvents.length,
            label: 'Esta semana',
            icon: TrendingUp,
            color: '#16a34a',
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 16,
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              border: '1px solid #f3f4f6',
            }}
          >
            <s.icon size={20} color={s.color} style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 24, fontWeight: 700, color: '#111827' }}>
              {s.n}
            </div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
            Publicar hoy
          </h2>
          <button
            onClick={() => setActive('calendar')}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            Ver todo <ArrowRight size={14} />
          </button>
        </div>
        {todayEvents.length === 0 ? (
          <div
            style={{
              background: '#f9fafb',
              borderRadius: 12,
              padding: 32,
              textAlign: 'center',
              color: '#9ca3af',
            }}
          >
            <Calendar size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
            <p style={{ margin: 0, fontSize: 14 }}>Nada programado para hoy</p>
          </div>
        ) : (
          todayEvents.map((ev) => (
            <div
              key={ev.id}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 14,
                marginBottom: 8,
                borderLeft: `4px solid ${ev.color || '#2563eb'}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>
                {ev.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: '#6b7280',
                  marginTop: 4,
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                }}
              >
                {ev.platform && (
                  <span
                    style={{ display: 'flex', alignItems: 'center', gap: 3 }}
                  >
                    {ev.platform === 'Instagram' ? (
                      <Instagram size={12} />
                    ) : (
                      <Video size={12} />
                    )}
                    {ev.platform}
                  </span>
                )}
                {ev.type && (
                  <span
                    style={{
                      background: '#f3f4f6',
                      padding: '2px 8px',
                      borderRadius: 99,
                      fontSize: 11,
                    }}
                  >
                    {ev.type}
                  </span>
                )}
                {ev.time && (
                  <span>
                    <Clock size={11} /> {ev.time}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
            Ideas recientes
          </h2>
          <button
            onClick={() => setActive('ideas')}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            Ver todas <ArrowRight size={14} />
          </button>
        </div>
        {ideas.slice(0, 3).map((idea) => (
          <div
            key={idea.id}
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 14,
              marginBottom: 8,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              border: '1px solid #f3f4f6',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>
                {idea.title}
              </div>
              {idea.starred && (
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
              )}
            </div>
            {idea.description && (
              <p
                style={{
                  fontSize: 13,
                  color: '#6b7280',
                  margin: '6px 0 0',
                  lineHeight: 1.4,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {idea.description}
              </p>
            )}
            <div
              style={{
                display: 'flex',
                gap: 6,
                marginTop: 8,
                flexWrap: 'wrap',
              }}
            >
              {idea.category && (
                <span
                  style={{
                    background: '#eff6ff',
                    color: '#2563eb',
                    padding: '2px 8px',
                    borderRadius: 99,
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  {idea.category}
                </span>
              )}
              {idea.platform && (
                <span
                  style={{
                    background: '#fdf4ff',
                    color: '#9333ea',
                    padding: '2px 8px',
                    borderRadius: 99,
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  {idea.platform}
                </span>
              )}
            </div>
          </div>
        ))}
        {ideas.length === 0 && (
          <div
            style={{
              background: '#f9fafb',
              borderRadius: 12,
              padding: 32,
              textAlign: 'center',
              color: '#9ca3af',
            }}
          >
            <Lightbulb size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
            <p style={{ margin: 0, fontSize: 14 }}>
              A\u00fan no tienes ideas guardadas
            </p>
            <button
              onClick={() => setActive('ideas')}
              style={{
                marginTop: 12,
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '8px 20px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Agregar primera idea
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function IdeasPage({ ideas, setIdeas }) {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Reels',
    platform: 'Instagram',
    link: '',
    starred: false,
  });

  const filtered = ideas.filter(
    (i) =>
      (filter === 'Todos' || i.category === filter) &&
      (search === '' ||
        i.title.toLowerCase().includes(search.toLowerCase()) ||
        (i.description || '').toLowerCase().includes(search.toLowerCase()))
  );

  function save() {
    if (!form.title.trim()) return;
    if (editingId) {
      setIdeas((prev) =>
        prev.map((i) => (i.id === editingId ? { ...i, ...form } : i))
      );
    } else {
      setIdeas((prev) => [
        { ...form, id: generateId(), createdAt: new Date().toISOString() },
        ...prev,
      ]);
    }
    setForm({
      title: '',
      description: '',
      category: 'Reels',
      platform: 'Instagram',
      link: '',
      starred: false,
    });
    setShowForm(false);
    setEditingId(null);
  }

  function startEdit(idea) {
    setForm({
      title: idea.title,
      description: idea.description || '',
      category: idea.category || 'Reels',
      platform: idea.platform || 'Instagram',
      link: idea.link || '',
      starred: idea.starred || false,
    });
    setEditingId(idea.id);
    setShowForm(true);
  }

  function remove(id) {
    setIdeas((prev) => prev.filter((i) => i.id !== id));
  }
  function toggleStar(id) {
    setIdeas((prev) =>
      prev.map((i) => (i.id === id ? { ...i, starred: !i.starred } : i))
    );
  }

  return (
    <div style={{ padding: '20px 16px 100px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Mis Ideas</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm({
              title: '',
              description: '',
              category: 'Reels',
              platform: 'Instagram',
              link: '',
              starred: false,
            });
          }}
          style={{
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '8px 16px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Plus size={16} /> Nueva
        </button>
      </div>
      <div style={{ position: 'relative', marginBottom: 12 }}>
        <Search
          size={16}
          style={{ position: 'absolute', left: 12, top: 10, color: '#9ca3af' }}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar ideas..."
          style={{
            width: '100%',
            padding: '10px 12px 10px 36px',
            borderRadius: 10,
            border: '1px solid #e5e7eb',
            fontSize: 14,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          marginBottom: 16,
          paddingBottom: 4,
        }}
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              padding: '6px 14px',
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              background: filter === c ? '#2563eb' : '#f3f4f6',
              color: filter === c ? '#fff' : '#6b7280',
              border: 'none',
            }}
          >
            {c}
          </button>
        ))}
      </div>
      {filtered.map((idea) => (
        <div
          key={idea.id}
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: 14,
            marginBottom: 10,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #f3f4f6',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: '#111827' }}>
                {idea.title}
              </div>
              {idea.description && (
                <p
                  style={{
                    fontSize: 13,
                    color: '#6b7280',
                    margin: '6px 0 0',
                    lineHeight: 1.5,
                  }}
                >
                  {idea.description}
                </p>
              )}
            </div>
            <button
              onClick={() => toggleStar(idea.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
              }}
            >
              <Star
                size={16}
                fill={idea.starred ? '#f59e0b' : 'none'}
                color={idea.starred ? '#f59e0b' : '#d1d5db'}
              />
            </button>
          </div>
          {idea.link && (
            <div
              style={{
                fontSize: 12,
                color: '#2563eb',
                marginTop: 6,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Link size={12} /> {idea.link}
            </div>
          )}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <div style={{ display: 'flex', gap: 6 }}>
              {idea.category && (
                <span
                  style={{
                    background: '#eff6ff',
                    color: '#2563eb',
                    padding: '2px 8px',
                    borderRadius: 99,
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  {idea.category}
                </span>
              )}
              {idea.platform && (
                <span
                  style={{
                    background: '#fdf4ff',
                    color: '#9333ea',
                    padding: '2px 8px',
                    borderRadius: 99,
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  {idea.platform}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button
                onClick={() => startEdit(idea)}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: 6,
                  padding: 6,
                  cursor: 'pointer',
                }}
              >
                <Edit3 size={14} color="#6b7280" />
              </button>
              <button
                onClick={() => remove(idea.id)}
                style={{
                  background: '#fef2f2',
                  border: 'none',
                  borderRadius: 6,
                  padding: 6,
                  cursor: 'pointer',
                }}
              >
                <Trash2 size={14} color="#ef4444" />
              </button>
            </div>
          </div>
        </div>
      ))}
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>
          <Lightbulb size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
          <p style={{ fontSize: 14 }}>
            {search || filter !== 'Todos'
              ? 'No se encontraron ideas'
              : 'Agrega tu primera idea'}
          </p>
        </div>
      )}
      {showForm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '20px 20px 0 0',
              padding: 24,
              width: '100%',
              maxWidth: 480,
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
                {editingId ? 'Editar idea' : 'Nueva idea'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: 99,
                  padding: 8,
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#374151',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  T\u00edtulo *
                </label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="Ej: Tutorial de edici\u00f3n en Capcut"
                  style={{
                    width: '100%',
                    padding: 10,
                    borderRadius: 10,
                    border: '1px solid #e5e7eb',
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#374151',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  Descripci\u00f3n
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Describe tu idea..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: 10,
                    borderRadius: 10,
                    border: '1px solid #e5e7eb',
                    fontSize: 14,
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: '#374151',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Formato
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                    style={{
                      width: '100%',
                      padding: 10,
                      borderRadius: 10,
                      border: '1px solid #e5e7eb',
                      fontSize: 14,
                      background: '#fff',
                    }}
                  >
                    {CATEGORIES.filter((c) => c !== 'Todos').map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: '#374151',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Plataforma
                  </label>
                  <select
                    value={form.platform}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, platform: e.target.value }))
                    }
                    style={{
                      width: '100%',
                      padding: 10,
                      borderRadius: 10,
                      border: '1px solid #e5e7eb',
                      fontSize: 14,
                      background: '#fff',
                    }}
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#374151',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  Link de referencia
                </label>
                <input
                  value={form.link}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, link: e.target.value }))
                  }
                  placeholder="https://..."
                  style={{
                    width: '100%',
                    padding: 10,
                    borderRadius: 10,
                    border: '1px solid #e5e7eb',
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <button
                onClick={save}
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 0',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: 4,
                }}
              >
                {editingId ? 'Guardar cambios' : 'Guardar idea'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarPage({ events, setEvents }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    platform: 'Instagram',
    type: 'Reels',
    time: '10:00',
    color: '#2563eb',
    notes: '',
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();

  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const dateStr = (d) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(
      2,
      '0'
    )}`;
  const todayStr = new Date().toISOString().split('T')[0];

  function addEvent() {
    if (!form.title.trim() || !selectedDate) return;
    setEvents((prev) => [
      ...prev,
      { ...form, id: generateId(), date: dateStr(selectedDate) },
    ]);
    setForm({
      title: '',
      platform: 'Instagram',
      type: 'Reels',
      time: '10:00',
      color: '#2563eb',
      notes: '',
    });
    setShowForm(false);
  }

  function removeEvent(id) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }
  const selectedEvents = selectedDate
    ? events.filter((e) => e.date === dateStr(selectedDate))
    : [];

  return (
    <div style={{ padding: '20px 16px 100px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 16px' }}>
        Calendario
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          background: '#fff',
          borderRadius: 12,
          padding: '10px 16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <button
          onClick={() => setCurrentDate(new Date(year, month - 1))}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
          }}
        >
          <ChevronLeft size={20} color="#6b7280" />
        </button>
        <span style={{ fontWeight: 600, fontSize: 16 }}>
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={() => setCurrentDate(new Date(year, month + 1))}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
          }}
        >
          <ChevronRight size={20} color="#6b7280" />
        </button>
      </div>
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 2,
            marginBottom: 4,
          }}
        >
          {DAYS.map((d) => (
            <div
              key={d}
              style={{
                textAlign: 'center',
                fontSize: 11,
                color: '#9ca3af',
                fontWeight: 500,
                padding: 4,
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 2,
          }}
        >
          {days.map((d, i) => {
            if (!d) return <div key={i} />;
            const ds = dateStr(d);
            const hasEvents = events.some((e) => e.date === ds);
            const isToday = ds === todayStr;
            const isSelected = d === selectedDate;
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(d)}
                style={{
                  padding: '8px 4px',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: isSelected
                    ? '#2563eb'
                    : isToday
                    ? '#eff6ff'
                    : 'transparent',
                  color: isSelected ? '#fff' : isToday ? '#2563eb' : '#374151',
                  fontWeight: isToday || isSelected ? 600 : 400,
                  fontSize: 13,
                  position: 'relative',
                }}
              >
                {d}
                {hasEvents && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 3,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 4,
                      borderRadius: 99,
                      background: isSelected ? '#fff' : '#2563eb',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
      {selectedDate && (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
              {selectedDate} de {MONTHS[month]}
            </h2>
            <button
              onClick={() => setShowForm(true)}
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Plus size={14} /> Agregar
            </button>
          </div>
          {selectedEvents.map((ev) => (
            <div
              key={ev.id}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 14,
                marginBottom: 8,
                borderLeft: `4px solid ${ev.color || '#2563eb'}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>
                    {ev.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#6b7280',
                      marginTop: 4,
                      display: 'flex',
                      gap: 8,
                    }}
                  >
                    <span
                      style={{ display: 'flex', alignItems: 'center', gap: 3 }}
                    >
                      {ev.platform === 'Instagram' ? (
                        <Instagram size={12} />
                      ) : (
                        <Video size={12} />
                      )}{' '}
                      {ev.platform}
                    </span>
                    <span
                      style={{
                        background: '#f3f4f6',
                        padding: '1px 8px',
                        borderRadius: 99,
                        fontSize: 11,
                      }}
                    >
                      {ev.type}
                    </span>
                    <span
                      style={{ display: 'flex', alignItems: 'center', gap: 3 }}
                    >
                      <Clock size={11} /> {ev.time}
                    </span>
                  </div>
                  {ev.notes && (
                    <p style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>
                      {ev.notes}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeEvent(ev.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 4,
                  }}
                >
                  <Trash2 size={14} color="#ef4444" />
                </button>
              </div>
            </div>
          ))}
          {selectedEvents.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: 24,
                color: '#9ca3af',
                background: '#f9fafb',
                borderRadius: 12,
              }}
            >
              <p style={{ margin: 0, fontSize: 13 }}>
                Sin publicaciones programadas
              </p>
            </div>
          )}
        </div>
      )}
      {showForm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '20px 20px 0 0',
              padding: 24,
              width: '100%',
              maxWidth: 480,
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
                Nueva publicaci\u00f3n
              </h2>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: 99,
                  padding: 8,
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  T\u00edtulo *
                </label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="Ej: Reel de tips"
                  style={{
                    width: '100%',
                    padding: 10,
                    borderRadius: 10,
                    border: '1px solid #e5e7eb',
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 12,
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Plataforma
                  </label>
                  <select
                    value={form.platform}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, platform: e.target.value }))
                    }
                    style={{
                      width: '100%',
                      padding: 10,
                      borderRadius: 10,
                      border: '1px solid #e5e7eb',
                      fontSize: 13,
                      background: '#fff',
                    }}
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Formato
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, type: e.target.value }))
                    }
                    style={{
                      width: '100%',
                      padding: 10,
                      borderRadius: 10,
                      border: '1px solid #e5e7eb',
                      fontSize: 13,
                      background: '#fff',
                    }}
                  >
                    {CATEGORIES.filter((c) => c !== 'Todos').map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Hora
                  </label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, time: e.target.value }))
                    }
                    style={{
                      width: '100%',
                      padding: 10,
                      borderRadius: 10,
                      border: '1px solid #e5e7eb',
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  Color
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setForm((f) => ({ ...f, color: c }))}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 99,
                        background: c,
                        border:
                          form.color === c
                            ? '3px solid #111'
                            : '2px solid transparent',
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  Notas
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  placeholder="Notas adicionales..."
                  rows={2}
                  style={{
                    width: '100%',
                    padding: 10,
                    borderRadius: 10,
                    border: '1px solid #e5e7eb',
                    fontSize: 14,
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <button
                onClick={addEvent}
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 0',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Programar publicaci\u00f3n
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AIPage() {
  const [format, setFormat] = useState('Reels');
  const [platform, setPlatform] = useState('Instagram');
  const [topic, setTopic] = useState('');
  const [generated, setGenerated] = useState(null);
  const [copied, setCopied] = useState('');

  function generate() {
    const templates = CONTENT_TEMPLATES[format] || CONTENT_TEMPLATES['Reels'];
    const template = templates[Math.floor(Math.random() * templates.length)];
    const starter =
      CAPTION_STARTERS[Math.floor(Math.random() * CAPTION_STARTERS.length)];
    const hashtags =
      platform === 'Instagram'
        ? [
            ...HASHTAG_SETS.Instagram.general
              .sort(() => Math.random() - 0.5)
              .slice(0, 5),
            ...HASHTAG_SETS.Instagram.reels
              .sort(() => Math.random() - 0.5)
              .slice(0, 3),
          ]
        : [
            ...HASHTAG_SETS.TikTok.general
              .sort(() => Math.random() - 0.5)
              .slice(0, 4),
            ...HASHTAG_SETS.TikTok.video
              .sort(() => Math.random() - 0.5)
              .slice(0, 3),
          ];
    const topicText = topic.trim() || 'tu nicho';
    const caption = `${starter} ${topicText}.\n\nAqu\u00ed van 3 claves que necesitas saber:\n\n1\ufe0f\u20e3 Investiga tu audiencia antes de crear\n2\ufe0f\u20e3 Usa hooks que atrapen en los primeros 3 segundos\n3\ufe0f\u20e3 S\u00e9 consistente, no perfecto\n\n\u00bfCu\u00e1l de estos tips ya aplicas? D\u00e9jamelo en comentarios \ud83d\udc47\n\n.\n.\n.\n${hashtags.join(
      ' '
    )}`;
    setGenerated({ template, caption, hashtags, topicText });
  }

  function copyText(text, key) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(''), 2000);
    });
  }

  return (
    <div style={{ padding: '20px 16px 100px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>
        Asistente IA
      </h1>
      <p style={{ color: '#6b7280', fontSize: 13, margin: '0 0 20px' }}>
        Genera ideas, estructuras y captions para tu contenido
      </p>
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div>
            <label
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: '#6b7280',
                display: 'block',
                marginBottom: 6,
              }}
            >
              Plataforma
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 10,
                border: '1px solid #e5e7eb',
                fontSize: 13,
                background: '#fff',
              }}
            >
              {PLATFORMS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: '#6b7280',
                display: 'block',
                marginBottom: 6,
              }}
            >
              Formato
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 10,
                border: '1px solid #e5e7eb',
                fontSize: 13,
                background: '#fff',
              }}
            >
              {CATEGORIES.filter((c) => c !== 'Todos').map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: '#6b7280',
              display: 'block',
              marginBottom: 6,
            }}
          >
            Tema (opcional)
          </label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ej: marketing digital, fitness, cocina..."
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          onClick={generate}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '12px 0',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Sparkles size={18} /> Generar contenido
        </button>
      </div>
      {generated && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 16,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Zap size={16} color="#f59e0b" /> Estructura sugerida
              </h3>
              <button
                onClick={() => generate()}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: 8,
                  padding: '4px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 12,
                }}
              >
                <RefreshCw size={12} /> Otra
              </button>
            </div>
            <div
              style={{ background: '#f9fafb', borderRadius: 10, padding: 14 }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#111827',
                  marginBottom: 8,
                }}
              >
                "{generated.template.hook}"
              </div>
              <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
                <div>
                  <strong>Estructura:</strong> {generated.template.structure}
                </div>
                {generated.template.duration && (
                  <div>
                    <strong>Duraci\u00f3n:</strong>{' '}
                    {generated.template.duration}
                  </div>
                )}
                {generated.template.slides && (
                  <div>
                    <strong>Slides:</strong> {generated.template.slides}
                  </div>
                )}
                {generated.template.format && (
                  <div>
                    <strong>Formato:</strong> {generated.template.format}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 16,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <FileText size={16} color="#2563eb" /> Caption sugerido
              </h3>
              <button
                onClick={() => copyText(generated.caption, 'caption')}
                style={{
                  background: copied === 'caption' ? '#dcfce7' : '#f3f4f6',
                  border: 'none',
                  borderRadius: 8,
                  padding: '4px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 12,
                  color: copied === 'caption' ? '#16a34a' : '#374151',
                }}
              >
                {copied === 'caption' ? (
                  <>
                    <CheckCircle size={12} /> Copiado
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Copiar
                  </>
                )}
              </button>
            </div>
            <div
              style={{
                background: '#f9fafb',
                borderRadius: 10,
                padding: 14,
                fontSize: 13,
                color: '#374151',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
              }}
            >
              {generated.caption}
            </div>
          </div>
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 16,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Hash size={16} color="#7c3aed" /> Hashtags
              </h3>
              <button
                onClick={() => copyText(generated.hashtags.join(' '), 'hash')}
                style={{
                  background: copied === 'hash' ? '#dcfce7' : '#f3f4f6',
                  border: 'none',
                  borderRadius: 8,
                  padding: '4px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 12,
                  color: copied === 'hash' ? '#16a34a' : '#374151',
                }}
              >
                {copied === 'hash' ? (
                  <>
                    <CheckCircle size={12} /> Copiado
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Copiar
                  </>
                )}
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {generated.hashtags.map((h, i) => (
                <span
                  key={i}
                  style={{
                    background: '#f3f4f6',
                    color: '#7c3aed',
                    padding: '4px 10px',
                    borderRadius: 99,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [ideas, setIdeas] = useState(() => getStoredData('ch_ideas', []));
  const [events, setEvents] = useState(() => getStoredData('ch_events', []));

  useEffect(() => {
    storeData('ch_ideas', ideas);
  }, [ideas]);
  useEffect(() => {
    storeData('ch_events', events);
  }, [events]);

  return (
    <div
      style={{
        maxWidth: 480,
        margin: '0 auto',
        background: '#f9fafb',
        minHeight: '100vh',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {page === 'home' && (
        <HomePage ideas={ideas} events={events} setActive={setPage} />
      )}
      {page === 'ideas' && <IdeasPage ideas={ideas} setIdeas={setIdeas} />}
      {page === 'calendar' && (
        <CalendarPage events={events} setEvents={setEvents} />
      )}
      {page === 'ai' && <AIPage />}
      <NavBar active={page} setActive={setPage} />
    </div>
  );
}
