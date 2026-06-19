-- Sample seed data INSERT statements
INSERT INTO DataRetentionPolicy (policy_name, applies_to_entity, applies_to_role, retention_days, purge_strategy, is_active, legal_basis) VALUES
('Default Policy', 'all', NULL, 365, 'delete', TRUE, 'Compliance');

INSERT INTO AuditLog (user_id, session_id, event_type, event_category, resource_type, resource_id, event_metadata, ip_address, outcome) VALUES
(1, 'sess123', 'Login', 'Authentication', 'User', '1', '{}', '192.168.1.1', 'Success');

INSERT INTO ApiKey (user_id, key_name, key_prefix, key_hash, scopes, rate_limit_per_minute, is_active) VALUES
(1, 'MyAPIKey', 'API_KEY_PREFIX', 'HASHED_VALUE', '{}', 60, TRUE);

INSERT INTO ExportJob (user_id, export_format, filter_criteria, total_records, status, file_url, file_size_bytes) VALUES
(1, 'CSV', '{}', 100, 'Pending', NULL, NULL);

INSERT INTO UserPreference (user_id, default_calculator_type, default_precision, thousands_separator, currency_symbol, angle_unit, history_retention_days, theme, export_default_format) VALUES
(1, 'Standard', 2, TRUE, '$', 'Degrees', 30, 'Light', 'CSV');

INSERT INTO CalculationCache (cache_key, normalized_expression, calculator_type, precision, cached_result_value, hit_count, last_hit_at) VALUES
('key_1', '3+2', 'Standard', 2, '5', 1, NOW());

INSERT INTO CalculationError (request_id, error_code, error_category, error_message, error_details, user_facing_message, is_recoverable) VALUES
(1, 'ERR001', 'SyntaxError', 'Invalid expression', '{}', 'There was an error in your calculation', TRUE);

INSERT INTO CalculationHistory (user_id, session_id, request_id, expression_snapshot, result_snapshot, calculator_type, is_starred, label) VALUES
(1, 'sess123', 1, '3+2', '5', 'Standard', FALSE, 'First Calculation');

INSERT INTO CalculationResult (request_id, result_value, result_numeric, precision_applied, result_type, formatted_result, computation_time_ms, engine_version, is_cached) VALUES
(1, '5', 5, 2, 'Numeric', '5.00', 100, 'v1.0', FALSE);

INSERT INTO CalculationRequest (session_id, user_id, raw_expression, normalized_expression, calculator_type, requested_precision) VALUES
('sess123', 1, '3 + 2', '3 + 2', 'Standard', 2);