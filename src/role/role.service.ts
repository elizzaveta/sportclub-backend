import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity, RoleInterface } from './models';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  create(roles: RoleInterface[]) {
    return this.roleRepository.save(roles);
  }

  async getAll() {
    return await this.roleRepository.find();
  }

  async getById(id: number) {
    return await this.roleRepository.findOne({ where: { id: id } });
  }
}
