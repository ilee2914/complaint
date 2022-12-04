import { LoadHandler } from "./LoadHandler.js";
import { CommentHandler } from "./CommentHandler.js";

let handlers = new Map<string, Function>();

export default {
  async init(): Promise<void> {
    handlers.set(LoadHandler.path(), LoadHandler.handle);
    handlers.set(CommentHandler.path(), CommentHandler.handle);
  },

  async route(path: string, data: Object): Promise<Object> {
    const handle = handlers.get(path);
    console.log(data);

    if (handle) {
      return handle(data);
    }

    return {};
  },
};
