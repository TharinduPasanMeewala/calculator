-- Complete SQL schema with CREATE TABLE statements

CREATE TABLE DataRetentionPolicy (
    id SERIAL PRIMARY KEY,
    policy_name VARCHAR NOT NULL,
    applies_to_entity VARCHAR NOT NULL,
    applies_to_role VARCHAR,
    retention_days INTEGER NOT NULL,
    purge_strategy VARCHAR NOT NULL,
    is_active BOOLEAN NOT NULL,
    legal_basis VARCHAR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE AuditLog (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    session_id VARCHAR,
    event_type VARCHAR NOT NULL,
    event_category VARCHAR NOT NULL,
    resource_type VARCHAR,
    resource_id VARCHAR,
    event_metadata JSON,
    ip_address VARCHAR,
    outcome VARCHAR NOT NULL,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ApiKey (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    key_name VARCHAR NOT NULL,
    key_prefix VARCHAR NOT NULL,
    key_hash VARCHAR NOT NULL,
    scopes JSON NOT NULL,
    rate_limit_per_minute INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL,
    last_used_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ
);

CREATE TABLE ExportJob (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    export_format VARCHAR NOT NULL,
    filter_criteria JSON,
    total_records INTEGER,
    status VARCHAR NOT NULL,
    file_url VARCHAR,
    file_size_bytes INTEGER,
    error_message TEXT,
    file_expires_at TIMESTAMPTZ,
    requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE TABLE UserPreference (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    default_calculator_type VARCHAR NOT NULL,
    default_precision INTEGER NOT NULL,
    thousands_separator BOOLEAN NOT NULL,
    currency_symbol VARCHAR,
    angle_unit VARCHAR,
    history_retention_days INTEGER NOT NULL,
    theme VARCHAR NOT NULL,
    export_default_format VARCHAR,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE CalculationCache (
    id SERIAL PRIMARY KEY,
    cache_key VARCHAR NOT NULL,
    normalized_expression TEXT NOT NULL,
    calculator_type VARCHAR NOT NULL,
    precision INTEGER NOT NULL,
    cached_result_value VARCHAR NOT NULL,
    hit_count INTEGER NOT NULL,
    last_hit_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE CalculationError (
    id SERIAL PRIMARY KEY,
    request_id INTEGER NOT NULL,
    error_code VARCHAR NOT NULL,
    error_category VARCHAR NOT NULL,
    error_message TEXT NOT NULL,
    error_details JSON,
    user_facing_message VARCHAR NOT NULL,
    is_recoverable BOOLEAN NOT NULL,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE CalculationHistory (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    session_id VARCHAR NOT NULL,
    request_id INTEGER NOT NULL,
    result_id INTEGER,
    expression_snapshot TEXT NOT NULL,
    result_snapshot VARCHAR,
    calculator_type VARCHAR NOT NULL,
    is_starred BOOLEAN NOT NULL,
    label VARCHAR,
    is_deleted BOOLEAN NOT NULL,
    retention_expires_at DATE,
    calculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE CalculationResult (
    id SERIAL PRIMARY KEY,
    request_id INTEGER NOT NULL,
    result_value VARCHAR NOT NULL,
    result_numeric NUMERIC NOT NULL,
    precision_applied INTEGER NOT NULL,
    result_type VARCHAR NOT NULL,
    formatted_result VARCHAR,
    intermediate_steps JSON,
    computation_time_ms INTEGER NOT NULL,
    engine_version VARCHAR NOT NULL,
    is_cached BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE CalculationRequest (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR NOT NULL,
    user_id INTEGER,
    raw_expression TEXT NOT NULL,
    normalized_expression TEXT,
    calculator_type VARCHAR NOT NULL,
    operands JSON,
    operators JSON,
    requested_precision INTEGER,
    validation_status VARCHAR NOT NULL,
    validation_errors JSON,
    status VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);