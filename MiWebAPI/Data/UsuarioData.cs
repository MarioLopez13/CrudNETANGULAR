using MiWebAPI.Models;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Identity;

namespace MiWebAPI.Data
{
    public class UsuarioData
    {
        private readonly string _conexion;

        public UsuarioData(IConfiguration configuration)
        {
            _conexion = configuration.GetConnectionString("CadenaSQL")!;
        }

        public async Task<Usuario?> ObtenerPorNombreUsuario(string nombreUsuario)
        {
            using (var con = new SqlConnection(_conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_obtenerUsuarioPorNombre", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@NombreUsuario", nombreUsuario);

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        return new Usuario
                        {
                            IdUsuario = Convert.ToInt32(reader["IdUsuario"]),
                            NombreUsuario = reader["NombreUsuario"].ToString(),
                            Contrasena = reader["Contrasena"].ToString()
                        };
                    }
                    return null;
                }
            }
        }

        public async Task<int> Crear(Usuario usuario)
        {
            using (var con = new SqlConnection(_conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_crearUsuario", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@NombreUsuario", usuario.NombreUsuario);

                // Hash de la contraseña antes de guardar
                var passwordHasher = new PasswordHasher<Usuario>();
                string hashedPassword = passwordHasher.HashPassword(usuario, usuario.Contrasena!);
                cmd.Parameters.AddWithValue("@Contrasena", hashedPassword);

                return await cmd.ExecuteNonQueryAsync();
            }
        }
    }
}