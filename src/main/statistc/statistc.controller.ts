import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/checkrole.guard';
import { UpdateStatistcDto } from './dto/update-statistc.dto';
import { StatistcService } from './statistc.service';

@ApiTags('statistc')
@Controller('statistc')
export class StatistcController {
  constructor(private readonly statistcService: StatistcService) {}

  @Get("all/users")
  @UseGuards(AdminGuard)
  async findAllUsers():Promise<Object> {
    return this.statistcService.findAllUsers();
  }


  @Get("all/courses")
  @UseGuards(AdminGuard)
  async findAllCources():Promise<Object> {
    return this.statistcService.findAllCources();
  }


  @Get("all/categories")
  @UseGuards(AdminGuard)
  async findAllCategories():Promise<Object> {
    return this.statistcService.findAllCategories();
  }

  @Get("all/orderpayments")
  @UseGuards(AdminGuard)
  async findAllOrderPayments():Promise<Object> {
    return this.statistcService.findAllOrderPayments();
  }

  @Get("all/wallets")
  @UseGuards(AdminGuard)
  async findAllWallets():Promise<Object> {
    return this.statistcService.findAllWallets();
  }

  @Get("funds")
  @UseGuards(AdminGuard)
  async findFunda():Promise<Object> {
    return this.statistcService.findFunds();
  }

//ss
  @Get("create/org")
  @UseGuards(AdminGuard)
  async createOrg():Promise<Object> {
    return this.statistcService.createOrg();
  }
}
