import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy(
  { usernameField: 'nombre' },
  (nombre, contraseña, done) => {
  }
));

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser((id, done) => {
});

export default passport;
