import { pipe } from "rxjs";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { catchError, map } from "rxjs/operators";
import { HttpException } from "@nestjs/common";

export const catchApiResponse = () =>
  pipe(
    catchError(e => {
      throw new HttpException(e.response.data, e.response.status);
    }),
    map((response: AxiosResponse<any>) => {
      return response.data;
    })
  );
