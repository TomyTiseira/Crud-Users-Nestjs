import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SimulateUserMiddleware } from './common/middlewares/simulate-user.middleware';

@Module({
  imports: [UsersModule],
})
// utilizar un middleware para simular un usuario autenticado
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SimulateUserMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.ALL },
        { path: 'users/*id', method: RequestMethod.ALL },
      );
  }
}
