import { ZodError } from "zod";
import { ApiResponse } from "./src/utils/apiResponse";
import { AppError } from "./src/utils/apiError";
export async function middleware() {}
export async function authMiddlewate() {
  // const authHeader = request.headers.get("Authorization");
  // try {
  // 	const decode = jwt.verify(authHeader as string, process.env.JWT_SECRET as string);
  // 	if (typeof decode !== "string" && (decode as jwt.JwtPayload).userId) {
  // 		request.userId = (decode as jwt.JwtPayload).userId;
  //         return request;
  // 	} else {
  //         return ApiResponse.error("Invalid token, Please logged In", 401);
  //     }
  // } catch (error : unknown) {
  //     return errorHandler(error as Error);
  // }
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export function errorHandler(error: AppError | ZodError | Error) {
  if (error instanceof AppError) {
    return ApiResponse.error(error.message, error.statusCode);
  }

  if (error instanceof ZodError) {
    return ApiResponse.error(`Validation error${error}`, 400);
  }

  console.error("Unhandled error:", error);
  return ApiResponse.error(`An unexpected error occurred ${error}`, 500);
}
