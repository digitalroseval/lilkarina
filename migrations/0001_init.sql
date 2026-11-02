CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'folder',
  password_key TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  content_format TEXT NOT NULL DEFAULT 'markdown',
  reading_minutes INTEGER NOT NULL DEFAULT 1,
  is_published INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_articles_category
ON articles(category_id, is_published, sort_order);

INSERT OR IGNORE INTO categories (id, name, description, icon, password_key, sort_order) VALUES
  ('chatting', 'Chatting', 'SOP, techniques de vente et bonnes pratiques pour les chatters.', 'messages-square', 'CHATTING_PASSWORD', 1),
  ('instagram', 'Instagram', 'Gestion des comptes, warmup, publication et croissance.', 'instagram', 'INSTAGRAM_PASSWORD', 2),
  ('management', 'Management', 'Organisation de l’équipe, procédures et suivi opérationnel.', 'users', 'MANAGEMENT_PASSWORD', 3),
  ('training', 'Formations', 'Formations et ressources internes de l’agence.', 'graduation-cap', 'TRAINING_PASSWORD', 4);
