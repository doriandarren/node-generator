import { safeJson } from "./safeJson.js";


export class BaseController {

  constructor(res) {
    this.res = res;
    this.statusCode = 200;
  }

  // Setter y getter del código HTTP
  setCode(code) {
    this.statusCode = code;
  }

  getCode() {
    return this.statusCode;
  }

  // Método base que devuelve el JSON con el código correcto
  respond(payload) {
    const safePayload = safeJson(payload);
    return this.res.status(this.getCode()).json(safePayload);
  }

  // 200 OK
  respondWithData(message = 'OK', data = null, success = true) {
    this.setCode(200);
    return this.respond({
      data,
      message,
      errors: null,
      success,
      status_code: this.getCode(),
    });
  }

  // 422 o cualquier error
  respondWithError(message = 'KO', errors = null, code = 422) {
    this.setCode(code);
    return this.respond({
      errors: errors ? [errors] : null,
      data: null,
      message,
      success: false,
      status_code: this.getCode(),
    });
  }

  // 400 Bad Request
  respondHttpBadRequest(message = "Bad Request") {
    this.setCode(400);
    return this.respondWithError({ e: message }, message, this.getCode());
  }

  // 401 Unauthorized
  respondHttpUnauthorized(message = "Unauthorized") {
    this.setCode(401);
    return this.respondWithError({ e: message }, message, this.getCode());
  }

  // 403 Forbidden
  respondHttpForbidden(message = "Forbidden") {
    this.setCode(403);
    return this.respondWithError({ e: message }, message, this.getCode());
  }

  // 404 Not Found
  respondHttpNotFound(message = "Resource Not Found") {
    this.setCode(404);
    return this.respondWithError({ e: message }, message, this.getCode());
  }

  // 409 Conflict
  respondHttpConflict(message = "Data Conflict") {
    this.setCode(409);
    return this.respondWithError({ e: message }, message, this.getCode());
  }

  // 422 Unprocessable Entity
  respondUnprocessableEntity(message = "Unprocessable Entity") {
    this.setCode(422);
    return this.respondWithError({ e: message }, message, this.getCode());
  }

  // 500 Internal Server Error
  respondHttpInternalError(message = "Internal Server Error") {
    this.setCode(500);
    return this.respondWithError({ e: message }, message, this.getCode());
  }
}
