CREATE TABLE Usuarios (
    IdUsuario INT PRIMARY KEY IDENTITY(1,1),
    NombreUsuario VARCHAR(50) NOT NULL UNIQUE,
    Contrasena VARCHAR(255) NOT NULL -- Guardaremos el hash de la contraseña por seguridad
);

select * from Empleado

-- sp_obtenerUsuarioPorNombre
CREATE PROCEDURE sp_obtenerUsuarioPorNombre
    @NombreUsuario VARCHAR(50)
AS
BEGIN
    SELECT IdUsuario, NombreUsuario, Contrasena
    FROM Usuarios
    WHERE NombreUsuario = @NombreUsuario;
END;

-- sp_crearUsuario
CREATE PROCEDURE sp_crearUsuario
    @NombreUsuario VARCHAR(50),
    @Contrasena VARCHAR(255)
AS
BEGIN
    INSERT INTO Usuarios (NombreUsuario, Contrasena)
    VALUES (@NombreUsuario, @Contrasena);
    SELECT SCOPE_IDENTITY(); -- Opcional: devuelve el ID del usuario creado
END;