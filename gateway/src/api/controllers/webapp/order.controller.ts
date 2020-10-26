import { Controller, Get, HttpService, UseGuards, Request, HttpException, Post, Bind, Body, Param, Patch } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { pipe } from "rxjs";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { catchError, map } from "rxjs/operators";

const catchApiResponse = () =>
  pipe(
    catchError(e => {
      throw new HttpException(e.response.data, e.response.status);
    }),
    map((response: AxiosResponse<any>) => {
      return response.data;
    })
  );

@Controller("order")
export class OrderController {
  private baseUrl = "http://order:8012";

  constructor(private httpClient: HttpService) {}

  @Get("")
  @UseGuards(AuthGuard("jwt"))
  public async getAllOrders() {
    return this.httpClient
      .get(`${this.baseUrl}/orders`)
      .pipe(catchApiResponse())
      .toPromise();
  }

  @Get("me")
  @UseGuards(AuthGuard("jwt"))
  public async getMyOrders(@Request() req: any) {
    const query = { params: { clientId: req.user._id.toString() } };
    return this.httpClient
      .get(`${this.baseUrl}/orders`, query)
      .pipe(catchApiResponse())
      .toPromise();
  }

  @Post("me")
  @UseGuards(AuthGuard("jwt"))
  public async createMyOrder(@Request() req: any, @Body() body: any) {
    return this.httpClient
      .post(`${this.baseUrl}/orders/client/${req.user._id.toString()}`, body)
      .pipe(catchApiResponse())
      .toPromise();
  }

  @Get("me/:id")
  @UseGuards(AuthGuard("jwt"))
  public async getOneOrders(@Request() req: any, @Param("id") id: string) {
    const query = { params: { clientId: req.user._id.toString() } };
    return this.httpClient
      .get(`${this.baseUrl}/orders/${id}`, query)
      .pipe(catchApiResponse())
      .toPromise();
  }

  @Patch("me/:id/cancel")
  @UseGuards(AuthGuard("jwt"))
  public async cancelMyOrder(@Request() req: any, @Param("id") id: string) {
    return this.httpClient
      .patch(`${this.baseUrl}/orders/${id}/cancel`)
      .pipe(catchApiResponse())
      .toPromise();
  }
}
