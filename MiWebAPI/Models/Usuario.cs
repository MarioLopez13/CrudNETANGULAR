namespace MiWebAPI.Models
{
    public class Usuario
    {
        public int IdUsuario { get; set; }
        public string? NombreUsuario { get; set; }
        public string? Contrasena { get; set; } // No se usará para recibir, solo para lógica interna
    }

    public class UsuarioLogin
    {
        public string? NombreUsuario { get; set; }
        public string? Contrasena { get; set; }
    }
}
