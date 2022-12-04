interface BaseHandler {
  path(): string;
  handle(data: Object): Object;
}
