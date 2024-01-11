import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/entities/user.repository';
import { RefreshTokenRepository } from './entities/refresh-token.repository';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  private async createTokens(user: User): Promise<any> {
    const payload = { sub: user.id, username: user.email };
    const tokenId = uuidv4();

    // Create a new refresh token and store it in the database
    const refreshToken = await this.refreshTokenRepository.createRefreshToken(
      tokenId,
      user,
    );

    const accessTokenJwt = await this.jwtService.signAsync(payload);
    const refreshTokenJwt = await this.jwtService.signAsync(
      {
        ...payload,
        tokenId: refreshToken.tokenId,
      },
      { secret: process.env.JWT_REFRESH_TOKEN_SECRET }, // Use a different secret for refresh tokens
    );

    return {
      access_token: accessTokenJwt,
      refresh_token: refreshTokenJwt,
    };
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    // Compare hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return this.createTokens(user);
  }

  async refreshTokens(refreshToken: string): Promise<any> {
    try {
      // Verify and decode the refresh token
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET, // Use a separate secret for refresh tokens
      });

      // Check if the refresh token exists in the database
      const existingToken = await this.refreshTokenRepository.findOne({
        where: { tokenId: payload.tokenId },
      });

      if (!existingToken) {
        Logger.log('This token does not exist in the database');
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Get the user details (e.g., from the database)
      const user = await this.userRepository.findOneById(payload.sub);

      // Generate a new access and refresh token
      return this.createTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
