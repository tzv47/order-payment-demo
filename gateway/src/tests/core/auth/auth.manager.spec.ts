import { createMock } from "@golevelup/ts-jest";

import { BadRequestException, ConflictException, UnauthorizedException } from "@nestjs/common";
import { AuthManager } from "../../../core/auth";
import { RolesTypeEnum, User } from "../../../data/models";
import { UserRepository } from "../../../data/repositories/user.repository";
import * as users from "../../../../seed/data/0-users/users";
import { JwtService } from "@nestjs/jwt";

describe("[Gateway] Core/AuthManager", () => {
  let authManager: AuthManager;

  const mockUsers = users;

  beforeEach(() => {
    const mockUserRepository = createMock<UserRepository>({
      create: async (user: User) => {
        return user;
      },
      findByEmail: async (email: string) => {
        return mockUsers.find(user => user.email === email) as User;
      }
    });

    const mockJwtService = createMock<JwtService>({
      sign: (data: { user: string }) => {
        return "randomWords";
      }
    });

    authManager = new AuthManager(mockUserRepository, mockJwtService);
  });

  describe("* Login with correct credential", () => {
    it("should return user with token", async () => {
      const data = { email: "admin@demo.com", password: "password" };
      const userWithToken = await authManager.login(data);
      expect(userWithToken).toHaveProperty("accessToken");
      expect(userWithToken.accessToken).toEqual("randomWords");
      expect(userWithToken.user).toEqual(data.email);
    });
  });

  describe("* Login with incorrect credential", () => {
    it("should have UnauthorizedException error", async () => {
      const data = { email: "admin@demo.com", password: "password123" };
      try {
        const userWithToken = await authManager.login(data);
      } catch (error) {
        expect(error).toEqual(new UnauthorizedException());
      }
    });
  });

  describe("* Create with new user", () => {
    it("should return new user", async () => {
      const data = { email: "admin4@demo.com", password: "password123", roleType: RolesTypeEnum.ADMIN };
      const newUser = await authManager.createUser(data);
      expect(newUser.email).toEqual(data.email);
      expect(newUser.roleType).toEqual(RolesTypeEnum.ADMIN);
    });
  });

  describe("* Create with existing user", () => {
    it("should has ConflictException error", async () => {
      const data = { email: "admin@demo.com", password: "password123", roleType: RolesTypeEnum.ADMIN };
      try {
        const newUser = await authManager.createUser(data);
      } catch (error) {
        expect(error).toEqual(new ConflictException("This user already exists"));
      }
    });
  });
});
