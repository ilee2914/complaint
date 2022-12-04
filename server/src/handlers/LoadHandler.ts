interface LoadObject {
  username: string;
}

const LoadHandler: BaseHandler = {
  path(): string {
    return "/load";
  },
  handle(data: Object): LoadObject {
    console.log("@@@@");
    return {
      username: "gooby",
    };
  },
};

export { LoadHandler };
