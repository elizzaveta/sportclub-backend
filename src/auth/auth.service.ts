import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto, SignupDto } from './models';
import * as argon from 'argon2';
import { UserEntity } from '../user/models';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDTO: SignupDto) {
    let user: UserEntity;
    if (!signupDTO.password) {
      user = this.userRepository.create({
        ...signupDTO,
        password: null,
      });
    } else {
      const hash = await argon.hash(signupDTO.password);
      user = this.userRepository.create({
        ...signupDTO,
        password: hash,
      });
    }
    return this.userRepository.save(user);
  }
  async login(loginDTO: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: Equal(loginDTO.email) },
    });
    if (!user) throw new ForbiddenException('No user with such email.');

    if (!user.password) {
      console.log('no password');
      console.log(loginDTO.password);
      user.password = await argon.hash(loginDTO.password);
    } else {
      console.log(user.password);
      const pwMatches = await argon.verify(user.password, loginDTO.password);
      if (!pwMatches) throw new ForbiddenException('Incorrect password.');
    }

    const payload = { email: user.email, sub: user.id, roleId: user.roleId };
    return {
      id: user.id,
      role: user.roleId,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
