import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RefreshToken } from './refresh-token.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor(private dataSource: DataSource) {
    super(RefreshToken, dataSource.createEntityManager());
  }

  // Create a new refresh token
  async createRefreshToken(tokenId: string, user: User): Promise<RefreshToken> {
    try {
      let refreshToken = await this.findOneBy({ user });

      if (!refreshToken) {
        refreshToken = this.create({ tokenId, user });
      } else {
        refreshToken.tokenId = tokenId;
      }

      return await this.save(refreshToken);
    } catch (error) {
      throw new Error('Unable to create/update refresh token');
    }
  }

  async deleteRefreshToken(tokenId: string): Promise<void> {
    const refreshToken = await this.findOneBy({ tokenId });
    if (refreshToken) {
      await this.remove(refreshToken);
    }
  }
}
