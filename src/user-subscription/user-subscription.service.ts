import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSubscriptionEntity } from './models';
import { MoreThan, Repository } from 'typeorm';
import { UserEntity } from '../user/models';
import { SubscriptionEntity } from '../subscription/models';

@Injectable()
export class UserSubscriptionService {
  constructor(
    @InjectRepository(UserSubscriptionEntity)
    private userSubscriptionRepository: Repository<UserSubscriptionEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  async addSubscriptionToUser(userId: number, subscriptionId: number) {
    const targetUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    const targetSubscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
    });

    if (!targetUser || !targetSubscription)
      throw new NotFoundException('Requested user or subscription not found.');

    const activeSubscription = await this.userSubscriptionRepository.find({
      where: {
        user: targetUser,
        endDate: MoreThan(new Date()),
      },
    });

    if (activeSubscription.length > 0)
      throw new BadRequestException('User already has active subscription.');

    const subscriptionEndDate = new Date();
    subscriptionEndDate.setMonth(
      subscriptionEndDate.getMonth() + targetSubscription.duration,
    );
    subscriptionEndDate.setDate(subscriptionEndDate.getDate() - 1);

    const userSubscription = this.userSubscriptionRepository.create({
      user: targetUser,
      subscription: targetSubscription,
      startDate: new Date(),
      endDate: subscriptionEndDate,
    });

    return this.userSubscriptionRepository.save(userSubscription);
  }

  async getUserSubscriptionHistory(userId: number) {
    const targetUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!targetUser) throw new NotFoundException('User not found.');

    return await this.userSubscriptionRepository.find({
      where: { user: targetUser },
      relations: ['subscription'],
    });
  }

  async getUserActiveSubscription(userId: number) {
    const targetUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!targetUser) throw new NotFoundException('User not found.');

    return await this.userSubscriptionRepository.findOne({
      where: {
        user: targetUser,
        endDate: MoreThan(new Date()),
      },
      relations: ['subscription'],
    });
  }

  async deleteUserSubscription(userSubscriptionId: number) {
    const targetUserSubscription =
      await this.userSubscriptionRepository.findOne({
        where: { id: userSubscriptionId },
      });
    if (!targetUserSubscription)
      throw new NotFoundException('User Subscription not found.');

    return await this.userSubscriptionRepository.delete(targetUserSubscription);
  }
}
