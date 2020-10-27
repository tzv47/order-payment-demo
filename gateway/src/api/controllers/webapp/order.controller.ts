import { Controller, Get, HttpService, UseGuards, Request, HttpException, Post, Bind, Body, Param, Patch } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

import { RolesGuard } from "../../../core/auth/guards/role.guard";
import { HasRole } from "../../../core/security";
import { RolesTypeEnum } from "../../../data/models";
import { catchApiResponse } from "../../../shared/utils/api.util";
import { CreateOrderDto } from "../../dtos/order.dto";

@ApiTags("Order")
@Controller("order")
export class OrderController {
  private baseUrl = "http://order:8012";

  constructor(private httpClient: HttpService) {}

  @Get("")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @HasRole(RolesTypeEnum.ADMIN)
  @ApiOperation({ summary: "Get all orders" })
  @ApiBearerAuth("access-token")
  @ApiResponse({ status: 200 })
  public async getAllOrders() {
    return this.httpClient
      .get(`${this.baseUrl}/orders`)
      .pipe(catchApiResponse())
      .toPromise();
  }

  @Get("me")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "Get all my orders" })
  @ApiBearerAuth("access-token")
  @ApiResponse({ status: 200 })
  public async getMyOrders(@Request() req: any) {
    const query = { params: { clientId: req.user._id.toString() } };
    return this.httpClient
      .get(`${this.baseUrl}/orders`, query)
      .pipe(catchApiResponse())
      .toPromise();
  }

  @Post("me")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "Create my order" })
  @ApiBearerAuth("access-token")
  @ApiResponse({ status: 200 })
  public async createMyOrder(@Request() req: any, @Body() body: CreateOrderDto) {
    return this.httpClient
      .post(`${this.baseUrl}/orders/client/${req.user._id.toString()}`, body)
      .pipe(catchApiResponse())
      .toPromise();
  }

  @Get("me/:id")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "Get my order by id" })
  @ApiResponse({ status: 200 })
  public async getOneOrders(@Request() req: any, @Param("id") id: string) {
    const query = { params: { clientId: req.user._id.toString() } };
    return this.httpClient
      .get(`${this.baseUrl}/orders/${id}`, query)
      .pipe(catchApiResponse())
      .toPromise();
  }

  @Patch("me/:id/cancel")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "Cancel my order by id" })
  @ApiResponse({ status: 200 })
  public async cancelMyOrder(@Request() req: any, @Param("id") id: string) {
    return this.httpClient
      .patch(`${this.baseUrl}/orders/${id}/cancel`)
      .pipe(catchApiResponse())
      .toPromise();
  }
}
