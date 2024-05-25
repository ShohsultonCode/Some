import { HttpException, HttpStatus } from "@nestjs/common";
import mongoose from "mongoose";

export async function checkId(id: string): Promise<string> {  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new HttpException('ID is not valid', HttpStatus.BAD_REQUEST);
    }
    return id;
}
