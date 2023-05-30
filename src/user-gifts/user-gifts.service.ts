import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGiftsEntity } from './models';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/models';
import { GiftEntity } from '../gift/models';
import { UserService } from '../user/user.service';

@Injectable()
export class UserGiftsService {
  constructor(
    @InjectRepository(UserGiftsEntity)
    private userGiftsRepository: Repository<UserGiftsEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(GiftEntity)
    private giftRepository: Repository<GiftEntity>,
    private userService: UserService,
  ) {}

  async addBonusToUser(userId: number, bonusId: number) {
    const targetUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    const targetGift = await this.giftRepository.findOne({
      where: { id: bonusId },
    });

    if (!targetGift || !targetUser)
      throw new NotFoundException('Requested user of bonus not found.');

    await this.userService.withdrawBonuses(
      userId,
      targetGift.requiredAmountOfBonuses,
    );

    const userBonus = this.userGiftsRepository.create({
      user: targetUser,
      gift: targetGift,
    });

    await this.userGiftsRepository.save(userBonus);
    delete userBonus.user;
    return userBonus;
  }

  async getUserGifts(userId: number, isUsed?: boolean) {
    const targetUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!targetUser) throw new NotFoundException('User not found.');

    const where = { user: targetUser };
    if (isUsed !== undefined) {
      where['isUsed'] = isUsed;
    }
    return this.userGiftsRepository.find({
      where,
      relations: ['gift'],
    });
  }

  async markGiftUsed(userBonusId: number) {
    const userGift = await this.userGiftsRepository.findOne({
      where: {
        id: userBonusId,
      },
    });

    if (!userGift) throw new NotFoundException('User gift not found.');

    userGift.isUsed = true;
    userGift.usedDate = new Date();

    return this.userGiftsRepository.save(userGift);
  }

  async deleteUserGift(userId: number, userGiftId: number) {
    const userGift = await this.userGiftsRepository.findOne({
      where: {
        id: userGiftId,
      },
      relations: ['user', 'gift'],
    });

    if (!userGift) throw new NotFoundException('User gift not found.');

    await this.userService.addBonuses(
      userGift.user.id,
      userGift.gift.requiredAmountOfBonuses,
    );

    return await this.userGiftsRepository.remove(userGift);
  }
}
