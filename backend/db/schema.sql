-- Users, Roles, and Permissions tables might already exist from auth, but we will ensure they exist
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS states (
    id SERIAL PRIMARY KEY,
    state_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS districts (
    id SERIAL PRIMARY KEY,
    district_name VARCHAR(100) NOT NULL,
    state_id INTEGER REFERENCES states(id)
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    state_id INTEGER REFERENCES states(id),
    district_id INTEGER REFERENCES districts(id),
    last_login TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID REFERENCES users(id),
    role_id INTEGER REFERENCES roles(id),
    PRIMARY KEY (user_id, role_id)
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    agency_id UUID REFERENCES users(id),
    state_id INTEGER REFERENCES states(id),
    district_id INTEGER REFERENCES districts(id),
    status VARCHAR(50) NOT NULL DEFAULT 'Draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Land Parcels Table
CREATE TABLE IF NOT EXISTS land_parcels (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    owner_id UUID REFERENCES users(id),
    survey_number VARCHAR(100) NOT NULL,
    area_sqm DECIMAL(10, 2) NOT NULL,
    compensation_amount DECIMAL(15, 2),
    compensation_status VARCHAR(50) DEFAULT 'Pending',
    possession_status VARCHAR(50) DEFAULT 'Not Acquired',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Workflow History (Audit Logs)
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    action_by UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    previous_status VARCHAR(50),
    new_status VARCHAR(50),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
