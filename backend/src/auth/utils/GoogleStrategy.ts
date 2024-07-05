import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

const envProcess = process.env;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: envProcess?.OAUTH_GOOGLE_CLIENT_ID || '',
      clientSecret: envProcess?.OAUTH_GOOGLE_CLIENT_SECRET || '',
      callbackURL: envProcess?.OAUTH_GOOGLE_CALLBACK_URL || '',
      scope: ['profile', 'email'],
    });
  }

  async validate(acessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validadeUser({
      email: profile.emails[0].value,
      displayName: profile.displayName,
      picture: profile.photos[0].value,
    });
    return user || null;
  }
}
