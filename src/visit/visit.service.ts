import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitEntity } from './models';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/models';
import { bonusesPerSingleVisit } from '../../consts';
import { UserService } from '../user/user.service';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(VisitEntity)
    private visitRepository: Repository<VisitEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UserService,
  ) {}

  async addVisit(userId: number, visitDate: { date: string }) {
    const targetUser: UserEntity = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!targetUser) throw new NotFoundException('User not found.');

    const userVisits: VisitEntity[] = await this.visitRepository.find({
      where: { user: targetUser },
    });

    const visitDateArray: Date[] = userVisits.map((visit) => visit.date);
    let today: Date = new Date();
    let shouldContinue = true;
    let numOfContinuousWeeks = 0;
    while (shouldContinue) {
      const prevWeekDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7,
      );
      const userVisit: Date = visitDateArray.find(
        (visit) => prevWeekDate <= visit && visit < today,
      );
      if (userVisit) {
        numOfContinuousWeeks++;
      } else {
        shouldContinue = false;
      }
      if (numOfContinuousWeeks >= 20) {
        shouldContinue = false;
      }
      today = prevWeekDate;
    }

    const numOfAdditionalBonuses: number = Math.trunc(numOfContinuousWeeks / 4);

    const newVisit = new VisitEntity();
    Object.assign(newVisit, {
      user: targetUser,
      date: new Date(visitDate.date),
      accumulatedBonuses: bonusesPerSingleVisit + numOfAdditionalBonuses,
    });

    await this.userService.addBonuses(
      userId,
      bonusesPerSingleVisit + numOfAdditionalBonuses,
    );

    return this.visitRepository.save(newVisit);
  }

  async deleteVisit(userId: number, visitDate: { date: string }) {
    const targetUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!targetUser) throw new NotFoundException('User not found.');

    const targetVisit = await this.visitRepository.findOne({
      where: { date: new Date(visitDate.date) },
    });

    if (!targetVisit) throw new NotFoundException('Visit record not found.');

    await this.userService.withdrawBonuses(
      userId,
      targetVisit.accumulatedBonuses,
    );

    return await this.visitRepository.delete(targetVisit);
  }

  async getUserVisits(userId: number) {
    const targetUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!targetUser) throw new NotFoundException('User not found');

    return this.visitRepository.find({ where: { user: targetUser } });
  }
}
