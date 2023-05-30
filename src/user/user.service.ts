import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserInterface } from './models';
import { Repository } from 'typeorm';

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

    await Object.assign(targetUser, { ...user });
    console.log(targetUser);

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
