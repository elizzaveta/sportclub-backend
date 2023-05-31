import { Injectable, NotFoundException } from '@nestjs/common';
import { GiftEntity, GiftInterface } from './models';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GiftService {
  constructor(
    @InjectRepository(GiftEntity)
    private giftRepository: Repository<GiftEntity>,
  ) {}

  create(bonuses: GiftEntity[]) {
    return this.giftRepository.save(bonuses);
  }

  async update(giftId: number, updateBonus: GiftInterface) {
    const targetGift = await this.giftRepository.findOne({
      where: { id: giftId },
    });

    if (!targetGift) throw new NotFoundException('Gift not found.');

    await Object.assign(targetGift, { ...updateBonus });

    return this.giftRepository.save(targetGift);
  }

  getAll() {
    return this.giftRepository.find();
  }

  getById(id: number) {
    return this.giftRepository.findOne({ where: { id } });
  }
}
