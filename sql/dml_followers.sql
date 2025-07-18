-- USERS
INSERT INTO users (id, username, role, created_at) VALUES
(1, 'juancho', 'user', CURRENT_TIMESTAMP),
(2, 'lula_dev', 'admin', CURRENT_TIMESTAMP),
(3, 'marce87', 'user', CURRENT_TIMESTAMP),
(4, 'sofi_code', 'moderator', CURRENT_TIMESTAMP),
(5, 'elprogramador', 'user', CURRENT_TIMESTAMP);

-- FOLLOWS
INSERT INTO follows (following_user_id, followed_user_id, created_at) VALUES
(1, 2, CURRENT_TIMESTAMP),
(3, 1, CURRENT_TIMESTAMP),
(4, 2, CURRENT_TIMESTAMP),
(5, 3, CURRENT_TIMESTAMP),
(2, 5, CURRENT_TIMESTAMP);

-- POSTS
INSERT INTO posts (id, title, body, user_id, status, created_at) VALUES
(1, 'Mi primer post', '¡Hola mundo! Este es mi primer post.', 1, 'publicado', CURRENT_TIMESTAMP),
(2, 'Tips de programación', 'Te tiro 5 tips para codear mejor...', 2, 'publicado', CURRENT_TIMESTAMP),
(3, 'Reflexiones dev', 'Hoy pensaba en lo difícil que es nombrar variables...', 3, 'borrador', CURRENT_TIMESTAMP),
(4, 'Angular FTW', 'Te muestro por qué Angular la rompe.', 4, 'publicado', CURRENT_TIMESTAMP),
(5, '¡Nos hackearon!', 'Crónica de un bug anunciado.', 5, 'archivado', CURRENT_TIMESTAMP);