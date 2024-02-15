-- Users table seeds here (Example)
INSERT INTO orders (user_id, order_placed, order_ready, active) VALUES (1, NOW(), CURRENT_DATE + INTERVAL '40 MINUTE', true);
INSERT INTO orders (user_id, order_placed, order_ready, active) VALUES (2, NOW(), CURRENT_DATE + INTERVAL '60 MINUTE', true);
INSERT INTO orders (user_id, order_placed, order_ready, active) VALUES (2, NOW(), CURRENT_DATE + INTERVAL '60 MINUTE', true);
