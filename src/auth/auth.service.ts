import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(dto: AuthDto) {
    try {
      // generate the password hash
      const hash = await argon.hash(dto.password)
      
      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
        }
      })

      delete user.hash

      // return the new user
      return user
    } catch (err) {
      if(err instanceof PrismaClientKnownRequestError) {
        if(err.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken')
        }
      }

      throw err
    }
  }

  async signup(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException(
        'Credentials Incorret'
      )
    }

    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password
    )

    // if password incorrect throw exception
    if(!pwMatches) {
      throw new ForbiddenException(
        'Credentials Incorrect'
      )
    }

    // send back the user
    delete user.hash
    return user
  }
}
