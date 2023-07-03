import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { SCHEDULE_MODULE_CONFIG_PROVIDER } from '../schedule.constants';
import { ModuleConfig } from '../interfaces/module.interface';

@Injectable()
export class RedisService implements OnModuleInit {
  client: RedisClientType;
  constructor(
    @Inject(SCHEDULE_MODULE_CONFIG_PROVIDER) private config: ModuleConfig,
  ) {
    this.client = createClient({
      url: this.config.redis,
    });
  }

  onModuleInit() {
    return this.client.connect();
  }

  lock(key: string) {
    return this.client.set(key, 'true');
  }

  isLocked(key: string) {
    return this.client.get(key);
  }

  unlock(key: string) {
    return this.client.del(key);
  }
}
