DROP DATABASE IF EXISTS nanopantano;

CREATE DATABASE nanopantano;

use nanopantano;

show tables;

desc usuario;

INSERT INTO
    usuario (
        usuario_id,
        usuario_name,
        usuario_password,
        usuario_type
    )
VALUES
    (UUID (), 'admin', '1234', 'administrador');

INSERT INTO
    tablajson (columnajson)
VALUES
    (
        '{"id" : "1","pregunta" : "Una simple pregunta de prueba1","respuesta" : "una simple respuesta de prueba1","drags" : [{"imagen" : "https://via.placeholder.com/150","valor" : "Fidel Castro"},{"imagen" : "https://via.placeholder.com/150","valor" : "George W. Bush"},{"imagen" : "https://via.placeholder.com/150","valor" : "Vidente Fox"},{"imagen" : "https://via.placeholder.com/150","valor" : "Ricardo Lagos"}],"targets" : [{"imagen" : "https://via.placeholder.com/150","valor" : "Mexico"},{"imagen" : "https://via.placeholder.com/150","valor" : "Chile"},{"imagen" : "https://via.placeholder.com/150","valor" : "Cuba"},{"imagen" : "https://via.placeholder.com/150","valor" : "Estados Unidos"}]}'
    );

INSERT INTO
    tablajson (columnajson)
VALUES
    (
        '{"id" : "2","pregunta" : "Una simple pregunta de prueba2","respuesta" : "una simple respuesta de prueba2","drags" : [{"imagen" : "https://via.placeholder.com/150","valor" : "Fidel Castro"},{"imagen" : "https://via.placeholder.com/150","valor" : "George W. Bush"},{"imagen" : "https://via.placeholder.com/150","valor" : "Vidente Fox"},{"imagen" : "https://via.placeholder.com/150","valor" : "Ricardo Lagos"}],"targets" : [{"imagen" : "https://via.placeholder.com/150","valor" : "Mexico"},{"imagen" : "https://via.placeholder.com/150","valor" : "Chile"},{"imagen" : "https://via.placeholder.com/150","valor" : "Cuba"},{"imagen" : "https://via.placeholder.com/150","valor" : "Estados Unidos"}]}'
    );

INSERT INTO
    tablajson (columnajson)
VALUES
    (
        '{"id" : "3","pregunta" : "Una simple pregunta de prueba3","respuesta" : "una simple respuesta de prueba3","drags" : [{"imagen" : "https://via.placeholder.com/150","valor" : "Fidel Castro"},{"imagen" : "https://via.placeholder.com/150","valor" : "George W. Bush"},{"imagen" : "https://via.placeholder.com/150","valor" : "Vidente Fox"},{"imagen" : "https://via.placeholder.com/150","valor" : "Ricardo Lagos"}],"targets" : [{"imagen" : "https://via.placeholder.com/150","valor" : "Mexico"},{"imagen" : "https://via.placeholder.com/150","valor" : "Chile"},{"imagen" : "https://via.placeholder.com/150","valor" : "Cuba"},{"imagen" : "https://via.placeholder.com/150","valor" : "Estados Unidos"}]}'
    );
