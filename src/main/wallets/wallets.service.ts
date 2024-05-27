import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, Wallets } from 'src/common/entity/user.entity';
import { updateWalletDto } from './dto/update.wallet.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel('Wallets') private readonly Wallets: Model<Wallets>,
    @InjectModel('Users') private readonly Users: Model<User>,
  ) { }


  async getWallet(req:any):Promise<Object>{
    const myWallet = await this.Wallets.findOne({
        wallet_user_id:req.user.id
    })
    if (!myWallet) {
      throw new BadRequestException("You do not have wallet")
    }

    return {message:"Success", statusCode:200, data:myWallet}
  }
  
  async createWallet(req: any): Promise<Object> {
    const findUser = await this.Users.findById(req.user.id)
    if (!findUser) {
      throw new NotFoundException("User not found")
    }
    const checkIdOfUser = await this.Wallets.findOne({
      wallet_user_id: req.user.id
    })
    if (checkIdOfUser) {
      throw new BadRequestException("You have already wallet")
    }
    const newWallet = await this.Wallets.create({
      wallet_amount: 5000,
      wallet_isactive: true,
      wallet_user_id: req.user.id
    })
   
    return {message:"Success", statusCode:200}
  }

  async updateWallet(req: any, updateData: updateWalletDto): Promise<Object> {
    const findUser = await this.Users.findById(req.user.id);
    if (!findUser) {
      throw new NotFoundException("User not found");
    }
  
    const userWallet = await this.Wallets.findOne({ wallet_user_id: req.user.id });
    if (!userWallet) {
      throw new NotFoundException("Wallet not found");
    }
  
    if (updateData.wallet_amount !== undefined) {
      userWallet.wallet_amount = updateData.wallet_amount;
    }
    if (updateData.wallet_isactive !== undefined) {
      userWallet.wallet_isactive = updateData.wallet_isactive;
    }
  
    await userWallet.save();
  
    return { message: "Wallet updated successfully", statusCode: 200 };
  }

  async deleteWallet(req: any): Promise<Object> {
    const findUser = await this.Users.findById(req.user.id);
    if (!findUser) {
      throw new NotFoundException("User not found");
    }

    const userWallet = await this.Wallets.findOneAndDelete({ wallet_user_id: req.user.id });
    if (!userWallet) {
      throw new NotFoundException("Wallet not found");
    }

    return { message: "Wallet deleted successfully", statusCode: 200 };
  }
  

}
