-- USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
role VARCHAR(20) CHECK (role IN ('agent', 'admin')) NOT NULL,
  token_version INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PROPERTIES
CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  agent_id INT REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR(200) NOT NULL,
  price NUMERIC(12,2),
  location TEXT,
  status VARCHAR(20) CHECK (status IN ('available', 'sold', 'rented')),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LEADS
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  agent_id INT REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(100),
  email VARCHAR(150),
  phone VARCHAR(20),
  status VARCHAR(20) CHECK (
    status IN ('new', 'contacted', 'qualified', 'closed')
  ) DEFAULT 'new',
  property_id INT REFERENCES properties(id) ON DELETE SET NULL
);

-- APPOINTMENTS (PARTITIONED)
CREATE TABLE appointments (
  id SERIAL,
  agent_id INT REFERENCES users(id),
  lead_id INT REFERENCES leads(id),
  property_id INT REFERENCES properties(id),
  scheduled_at TIMESTAMP NOT NULL,
  status VARCHAR(20),
  notes TEXT,
  PRIMARY KEY (id, scheduled_at)
) PARTITION BY RANGE (scheduled_at);

-- PARTITION EXAMPLE
CREATE TABLE appointments_2026_04
PARTITION OF appointments
FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');

-- DOCUMENTS
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  property_id INT REFERENCES properties(id) ON DELETE CASCADE,
  file_name TEXT,
  s3_key TEXT,
  file_size INT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PAYMENTS
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  agent_id INT REFERENCES users(id),
  amount NUMERIC(10,2),
  status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'failed')),
  stripe_payment_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);