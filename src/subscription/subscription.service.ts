import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionEntity, SubscriptionInterface } from './models';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  createMultiple(subscription: SubscriptionInterface[]) {
    return this.subscriptionRepository.save(subscription);
  }

  getAll() {
    return this.subscriptionRepository.find();
  }

  async getById(id: number) {
    return await this.subscriptionRepository.findOne({ where: { id: id } });
  }

  async modify(id: number, subscription: SubscriptionInterface) {
    const targetSubscription = await this.subscriptionRepository.findOne({
      where: { id },
    });
    if (!targetSubscription)
      throw new NotFoundException('Subscription not found.');
    Object.assign(targetSubscription, subscription);

    return this.subscriptionRepository.save(targetSubscription);
  }
}
