import { Controller, Get, HttpService, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "../../../core/auth/guards/role.guard";
import { HasRole } from "../../../core/security";
import { RolesTypeEnum } from "../../../data/models";
import { catchApiResponse } from "../../../shared/utils/api.util";

@ApiTags("Payment")
@Controller("payment")
export class PaymentController {
  private baseUrl = "http://payment:8031";

  constructor(private httpClient: HttpService) {}

  @Get("")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @HasRole(RolesTypeEnum.ADMIN)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Get all payment" })
  @ApiResponse({ status: 200 })
  public async getAllOrders() {
    return this.httpClient
      .get(`${this.baseUrl}/payment`)
      .pipe(catchApiResponse())
      .toPromise();
  }
}
