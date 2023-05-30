import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionModule } from './subscription/subscription.module';
import { RoleModule } from './role/role.module';
import { GiftModule } from './gift/gift.module';
import { VisitModule } from './visit/visit.module';
import { UserSubscriptionModule } from './user-subscription/user-subscription.module';
import { UserGiftsModule } from './user-gifts/user-gifts.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    SubscriptionModule,
    RoleModule,
    GiftModule,
    VisitModule,
    UserSubscriptionModule,
    UserGiftsModule,
    UserModule,
    RoleModule,
    AuthModule,
  ],
})
export class AppModule {}
