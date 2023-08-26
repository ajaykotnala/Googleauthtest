import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from './prisma/prisma.service';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}
  async googleLogin(req) {
    try {
      if (!req.user) {
        return 'No user from google';
      }
      const { email, name, picture, email_verified } = req.user;

      let user = await this.prismaService.user.findFirst({
        where: {
          email,
        },
      });

      if (!user)
        user = await this.prismaService.user.create({
          data: {
            email,
            name,
            picture,
            email_verified,
            provider: 'google',
          },
        });

      return user;
    } catch (error) {
      return error;
    }
  }

  async login(token: string) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const googlePayload = ticket.getPayload();

      const { email, name, picture, email_verified } = googlePayload;

      let user = await this.prismaService.user.findFirst({
        where: {
          email,
        },
      });

      if (!user)
        user = await this.prismaService.user.create({
          data: {
            email,
            name,
            picture,
            email_verified,
            provider: 'google',
          },
        });

      return user;
    } catch (error) {
      return error;
    }
  }
}
