import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserInterface } from './models';
import { Repository } from 'typeorm';
import * as argon from 'argon2';

@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    delete user.password;
    return user;
  }

  async getByPhoneNumber(phoneNumber: string) {
    const user = await this.userRepository.findOne({
      where: {
        phone: phoneNumber,
      },
    });

    if (!user)
      throw new NotFoundException('User with such phone number not found');

    delete user.password;
    return user;
  }

  async update(id: number, user: UserInterface) {
    const targetUser = await this.userRepository.findOne({ where: { id } });
    if (!targetUser) throw new NotFoundException('User not found.');

    console.log(user);

    if (user.oldPassword && user.newPassword) {
      if (await argon.verify(targetUser.password, user.oldPassword)) {
        targetUser.password = await argon.hash(user.newPassword);
      } else {
        throw new ForbiddenException("Password doesn't match");
      }
    } else {
      console.log('no password provided');
    }

    await Object.assign(targetUser, { ...user });

    return this.userRepository.save(targetUser);
  }

  async withdrawBonuses(id: number, amountOfBonuses: number) {
    const targetUser = await this.userRepository.findOne({ where: { id: id } });
    if (!targetUser) throw new NotFoundException('User not found.');

    if (targetUser.bonuses < amountOfBonuses)
      throw new BadRequestException(
        'Insufficient amount of bonuses on user`s account.',
      );

    targetUser.bonuses -= amountOfBonuses;
    return this.userRepository.save(targetUser);
  }

  async addBonuses(id: number, amountOfBonuses: number) {
    const targetUser = await this.userRepository.findOne({ where: { id } });
    if (!targetUser) throw new NotFoundException('User not found.');

    targetUser.bonuses = targetUser.bonuses + amountOfBonuses;
    return this.userRepository.save(targetUser);
  }
}
