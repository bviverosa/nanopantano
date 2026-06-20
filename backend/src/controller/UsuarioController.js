class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req, res, next) {
    try {
      const { usuario_name, usuario_password } = req.body;
      const result = await this.usuarioService.login(usuario_name, usuario_password);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const { usuario_name, usuario_password, usuario_type } = req.body;
      const newUser = await this.usuarioService.register({
        usuario_name,
        usuario_password,
        usuario_type: usuario_type || "usuario",
      });
      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsuarioController;
