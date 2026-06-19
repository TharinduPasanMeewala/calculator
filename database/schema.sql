-- Complete SQL schema with CREATE TABLE statements

CREATE TYPE applies_to_entity AS ENUM ('User', 'System', 'Role');
CREATE TYPE applies_to_role AS ENUM ('Admin', 'User', 'Guest');
CREATE TYPE purge_strategy AS ENUM ('Immediate', 'Schedule', 'Manual');
CREATE TYPE event_type AS ENUM ('Create', 'Update', 'Delete');
CREATE TYPE event_category AS ENUM ('User Action', 'System Action');
CREATE TYPE outcome AS ENUM ('Success', 'Failure');
CREATE TYPE export_format AS ENUM ('CSV', 'JSON', 'XML');
CREATE TYPE job_status AS ENUM ('Pending', 'In Progress', 'Completed', 'Failed');
CREATE TYPE default_calculator_type AS ENUM ('Basic', 'Scientific', 'Graphing');
CREATE TYPE angle_unit AS ENUM ('Degrees', 'Radians');
CREATE TYPE theme AS ENUM ('Light', 'Dark');
CREATE TYPE result_type AS ENUM ('Numeric', 'String');
CREATE TYPE validation_status AS ENUM ('Valid', 'Invalid');
CREATE TABLE DataRetentionPolicy (
    id SERIAL PRIMARY KEY,
    policy_name VARCHAR(255) NOT NULL,
    applies_to_entity applies_to_entity NOT NULL,
    applies_to_role applies_to_role,
    retention_days INT NOT NULL,
    purge_strategy purge_strategy NOT NULL,
    is_active BOOLEAN NOT NULL,
    legal_basis VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE AuditLog (
    id SERIAL PRIMARY KEY,
    user_id INT,
    session_id VARCHAR(255),
    event_type event_type NOT NULL,
    event_category event_category NOT NULL,
    resource_type VARCHAR(255),
    resource_id VARCHAR(255),
    event_metadata JSON,
    ip_address VARCHAR(45),
    outcome outcome NOT NULL,
    occurred_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ApiKey (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    key_name VARCHAR(255) NOT NULL,
    key_prefix VARCHAR(255) NOT NULL,
    key_hash VARCHAR(255) NOT NULL,
    scopes JSON NOT NULL,
    rate_limit_per_minute INT NOT NULL,
    is_active BOOLEAN NOT NULL,
    last_used_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    revoked_at TIMESTAMP
);

CREATE TABLE ExportJob (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    export_format export_format NOT NULL,
    filter_criteria JSON,
    total_records INT,
    status job_status NOT NULL,
    file_url VARCHAR(512),
    file_size_bytes INT,
    error_message TEXT,
    file_expires_at TIMESTAMP,
    requested_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE TABLE UserPreference (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    default_calculator_type default_calculator_type NOT NULL,
    default_precision INT NOT NULL,
    thousands_separator BOOLEAN NOT NULL,
    currency_symbol VARCHAR(10),
    angle_unit angle_unit,
    history_retention_days INT NOT NULL,
    theme theme NOT NULL,
    export_default_format export_format,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CalculationCache (
    id SERIAL PRIMARY KEY,
    cache_key VARCHAR(255) NOT NULL,
    normalized_expression TEXT NOT NULL,
    calculator_type default_calculator_type NOT NULL,
    precision INT NOT NULL,
    cached_result_value VARCHAR(255) NOT NULL,
    hit_count INT NOT NULL DEFAULT 0,
    last_hit_at TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CalculationError (
    id SERIAL PRIMARY KEY,
    request_id INT NOT NULL,
    error_code VARCHAR(50) NOT NULL,
    error_category VARCHAR(50) NOT NULL,
    error_message TEXT NOT NULL,
    error_details JSON,
    user_facing_message VARCHAR(255) NOT NULL,
    is_recoverable BOOLEAN NOT NULL,
    occurred_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CalculationHistory (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    session_id VARCHAR(255) NOT NULL,
    request_id INT NOT NULL,
    result_id INT,
    expression_snapshot TEXT NOT NULL,
    result_snapshot VARCHAR(255),
    calculator_type default_calculator_type NOT NULL,
    is_starred BOOLEAN NOT NULL DEFAULT FALSE,
    label VARCHAR(255),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    retention_expires_at DATE,
    calculated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CalculationResult (
    id SERIAL PRIMARY KEY,
    request_id INT NOT NULL,
    result_value VARCHAR(255) NOT NULL,
    result_numeric NUMERIC NOT NULL,
    precision_applied INT NOT NULL,
    result_type result_type NOT NULL,
    formatted_result VARCHAR(255),
    intermediate_steps JSON,
    computation_time_ms INT NOT NULL,
    engine_version VARCHAR(50) NOT NULL,
    is_cached BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CalculationRequest (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    user_id INT,
    raw_expression TEXT NOT NULL,
    normalized_expression TEXT,
    calculator_type default_calculator_type NOT NULL,
    operands JSON,
    operators JSON,
    requested_precision INT,
    validation_status validation_status NOT NULL,
    validation_errors JSON,
    status job_status NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);