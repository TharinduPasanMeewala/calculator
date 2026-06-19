-- Sample seed data INSERT statements

INSERT INTO DataRetentionPolicy (policy_name, applies_to_entity, applies_to_role, retention_days, purge_strategy, is_active, legal_basis) VALUES
('Default User Retention', 'User', 'User', 30, 'Schedule', TRUE, 'GDPR'),
('System Logs', 'System', NULL, 90, 'Immediate', TRUE, NULL);

INSERT INTO AuditLog (user_id, session_id, event_type, event_category, resource_type, resource_id, event_metadata, ip_address, outcome) VALUES
(1, 'session_123', 'Create', 'User Action', 'Account', 'acc_001', '{}', '192.168.1.1', 'Success');

INSERT INTO ApiKey (user_id, key_name, key_prefix, key_hash, scopes, rate_limit_per_minute, is_active, created_at) VALUES
(1, 'MainAPIKey', 'prefix_', 'hashed_value', '{}', 100, TRUE, NOW());

INSERT INTO ExportJob (user_id, export_format, filter_criteria, total_records, status, file_url, file_size_bytes, requested_at) VALUES
(1, 'CSV', '{}', 100, 'Pending', NULL, NULL, NOW());

INSERT INTO UserPreference (user_id, default_calculator_type, default_precision, thousands_separator, history_retention_days, theme) VALUES
(1, 'Basic', 2, TRUE, 30, 'Light');

INSERT INTO CalculationCache (cache_key, normalized_expression, calculator_type, precision, cached_result_value, expires_at) VALUES
('key_1', '2+2', 'Basic', 2, '4', NOW() + INTERVAL '1 hour');

INSERT INTO CalculationError (request_id, error_code, error_category, error_message, user_facing_message, is_recoverable) VALUES
(1, 'E001', 'Syntax', 'Invalid expression', 'The expression you entered is not valid.', FALSE);

INSERT INTO CalculationHistory (user_id, session_id, request_id, expression_snapshot, result_snapshot, calculator_type, calculated_at) VALUES
(1, 'session_123', 1, '2 + 2', '4', 'Basic', NOW());

INSERT INTO CalculationResult (request_id, result_value, result_numeric, precision_applied, result_type, created_at) VALUES
(1, '4', 4.00, 2, 'Numeric', NOW());

INSERT INTO CalculationRequest (session_id, user_id, raw_expression, calculator_type, requested_precision, validation_status, status) VALUES
('session_123', 1, '2 + 2', 'Basic', 2, 'Valid', 'Completed');