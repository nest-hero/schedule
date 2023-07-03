<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

# What NestJS default Schedule module miss?

## Horizontal Scale (multiple Nest instance)
When we scale Nest in K8s or node cluster, `@Cron()` decorator will run many times since each Nest instance is isolated. 
A Nest instance can not know did cron run in others instance or not? 

## Retry Mechanism
If "every day cronjob" fails, we must wait a day for next cron. We better config `maxRetries` and `turnOffWhenMaxRetries`

## Logging and Metric
Save cronjob history to show metric, how long does it take? how many times it retries and view history result to debug

## Notification Alert
Some important cronjob need to alert when fails but we can't check console log every times

# Roadmap
- [x] Horizontal Scale
- [ ] Retry Mechanism
- [ ] Logging and Metric
- [ ] Notification Alert

# Usage
## Horizontal Scale (multiple Nest instance)
We use a Redis key to mark a cronjob is running by a Nest instance. Redis atomic action behavior will make sure only 1 (random) instance can run a cronjob
```typescript
@Cron(CronExpression.EVERY_HOUR, {
    name: 'redis_key',
})
handleCronEveryHour() {
}
```
