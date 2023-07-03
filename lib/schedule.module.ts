import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { SchedulerMetadataAccessor } from './schedule-metadata.accessor';
import { ScheduleExplorer } from './schedule.explorer';
import { SchedulerOrchestrator } from './scheduler.orchestrator';
import { SchedulerRegistry } from './scheduler.registry';
import { ModuleConfig } from './interfaces/module.interface';
import { RedisService } from './services/redis.service';
import { SCHEDULE_MODULE_CONFIG_PROVIDER } from './schedule.constants';

@Module({
  imports: [DiscoveryModule],
  providers: [SchedulerMetadataAccessor, SchedulerOrchestrator, RedisService],
})
export class ScheduleModule {
  static forRoot(config?: ModuleConfig): DynamicModule {
    const ScheduleModuleConfigProvider: Provider = {
      provide: SCHEDULE_MODULE_CONFIG_PROVIDER,
      useValue: config,
    };

    return {
      global: true,
      module: ScheduleModule,
      providers: [
        ScheduleExplorer,
        SchedulerRegistry,
        ScheduleModuleConfigProvider,
      ],
      exports: [SchedulerRegistry],
    };
  }
}
