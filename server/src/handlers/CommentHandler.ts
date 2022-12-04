interface LoadObject {
  username: string;
}

const CommentHandler: BaseHandler = {
  path(): string {
    return "/comment";
  },
  handle(data: Object): LoadObject {
    console.log("!!!");
    return {
      username: "gooby",
    };
  },
};

export { CommentHandler };
