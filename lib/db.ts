import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "lia.db");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

db.exec(`
CREATE TABLE IF NOT EXISTS companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  website TEXT,
  location TEXT,
  tags TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (date('now'))
);

CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  status TEXT DEFAULT 'not_contacted',
  last_contact_at TEXT,
  next_followup_at TEXT,
  priority INTEGER DEFAULT 1,
  match_score INTEGER DEFAULT 0,
  contact_channel TEXT,
  contact_person TEXT,
  updated_at TEXT DEFAULT (date('now')),
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);
`);
