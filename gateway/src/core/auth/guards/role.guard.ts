import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride("roles", [context.getClass(), context.getHandler()]) || [];

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user.roleType === roles[0];
  }
}
