interface BaseHandler {
  path(): string;
  action(data: Object): Object;
}
