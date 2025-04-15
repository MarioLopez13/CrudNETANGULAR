using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiWebAPI.Data;
using MiWebAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace MiWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UsuarioData _usuarioData;
        private readonly IConfiguration _config;

        public AuthController(UsuarioData usuarioData, IConfiguration config)
        {
            _usuarioData = usuarioData;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLogin usuarioLogin)
        {
            var usuario = await _usuarioData.ObtenerPorNombreUsuario(usuarioLogin.NombreUsuario!);

            if (usuario == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = "Usuario no encontrado." });
            }

            var passwordHasher = new PasswordHasher<Usuario>();
            var verificationResult = passwordHasher.VerifyHashedPassword(usuario, usuario.Contrasena!, usuarioLogin.Contrasena!);

            if (verificationResult == PasswordVerificationResult.Success)
            {
                // Generar el Token JWT
                var token = GenerarTokenJWT(usuario);
                return StatusCode(StatusCodes.Status200OK, new { token });
            }
            else
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new { mensaje = "Credenciales incorrectas." });
            }
        }

        private string GenerarTokenJWT(Usuario usuario)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString()),
                new Claim(ClaimTypes.Name, usuario.NombreUsuario!)
                // Puedes agregar más claims si es necesario (roles, etc.)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:SecretKey"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(2), // Tiempo de expiración del token
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Usuario usuario)
        {
            // Validaciones adicionales (ej. contraseña segura)
            var existingUser = await _usuarioData.ObtenerPorNombreUsuario(usuario.NombreUsuario!);
            if (existingUser != null)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { mensaje = "El nombre de usuario ya existe." });
            }

            int resultado = await _usuarioData.Crear(usuario);
            if (resultado > 0)
            {
                return StatusCode(StatusCodes.Status201Created, new { mensaje = "Usuario registrado exitosamente." });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = "Error al registrar el usuario." });
            }
        }
    }
}