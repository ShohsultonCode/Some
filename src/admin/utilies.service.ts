

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/common/entity/user.entity';

@Injectable()
export class UtilsService {
  constructor(
    @InjectModel('Categories') private readonly Categories: Model<Category>,
  ) { }
  async findCategory(id:string) {
    const category = await this.Categories.findOne({
      category_isactive:true
    });
    return category
}
}



