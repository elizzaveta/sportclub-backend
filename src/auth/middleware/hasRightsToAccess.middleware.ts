import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// delete me
@Injectable()
export class hasRightsToAccessMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.params['id']);
    console.log(req.user);
    console.log('Request...');
    next();
  }
}
