import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '@app/shared/config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeTransactionalModule } from 'sequelize-transactional-decorator';
import { MetadataScanner } from '@nestjs/core';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env'],
    }),
    SequelizeModule.forRoot(configuration().database),
    SequelizeTransactionalModule.register(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<ThrottlerModuleOptions> => ({
        throttlers: [
          {
            ttl: configService.get<number>('THROTTLE_TTL'),
            limit: configService.get<number>('THROTTLE_LIMIT'),
          },
        ],
      }),
    }),
  ],
  providers: [MetadataScanner],
})
export class GlobalModule {}
