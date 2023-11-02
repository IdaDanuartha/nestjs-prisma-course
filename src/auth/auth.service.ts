import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
@Injectable()
export class AuthService {
  login() {
    return {
      msg: "I have logged in"
    }
  }

  signup() {
    return {
      msg: "I have signed up"
    }
  }
}
