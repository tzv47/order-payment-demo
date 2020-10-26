import { SetMetadata } from "@nestjs/common";

export const HasRole = (...roles: any) => SetMetadata("roles", roles);
