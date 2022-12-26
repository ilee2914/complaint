import GUN from "gun";

interface LoadObject {
  username: string;
}

const CommentHandler: BaseHandler = {
  path(): string {
    return "/comment";
  },
  handle(data: Object): LoadObject {
    let gun = GUN();

    console.log("!!!");
    return {
      username: "gooby",
    };
  },
};

export { CommentHandler };
