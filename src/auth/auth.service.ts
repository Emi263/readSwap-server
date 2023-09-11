import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { formatDateToPostgresTimestamp } from 'src/helpers/format';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUpUser(email:string, password:string) {
    const now = new Date();
    const updatedAtTimestamp = formatDateToPostgresTimestamp(now);    
    try {
      const result = await this.prisma.$queryRaw`INSERT INTO users (email, password, updated_at) VALUES (${email}, ${password}, TO_TIMESTAMP(${updatedAtTimestamp}, 'YYYY-MM-DD HH24:MI:SS')) RETURNING * ;`
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

}

