import { LoadHandler } from "./LoadHandler";

let handlers = new Map<string, BaseHandler>();

export default {
  async init(): Promise<void> {
    handlers.set(LoadHandler.path(), LoadHandler);
  },

  async route(path: string, data: Object): Promise<Object> {
    const handler = handlers.get(path);

    if (handler) {
      return handler.action(data);
    }

    return {};
  },
};
