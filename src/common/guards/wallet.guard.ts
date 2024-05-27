import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WalletsService } from 'src/main/wallets/wallets.service';

@Injectable()
export class WalletCheckGuard implements CanActivate {
  constructor(
    private readonly walletService: WalletsService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (!req.headers || !req.headers.authorization) {
      throw new HttpException(
        'No Authorization header',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new HttpException('No Auth', HttpStatus.UNAUTHORIZED);
    }

      const decoded = this.jwtService.verify(token);
      req.user = decoded;

      const hasWallet = await this.walletService.checkWallet(req.user.id);

      if (!hasWallet) {
        throw new BadRequestException('No wallet, Please create wallet');
      }

      return true;
  }
}
