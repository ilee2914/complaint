import GUN from "gun";
import { v4 as uuidv4 } from "uuid";

interface LoadRequest {
  email: string;
}

interface LoadResponse {
  id: string;
}

const LoadHandler: BaseHandler = {
  path(): string {
    return "/load";
  },
  async handle(data: LoadRequest): Promise<LoadResponse> {
    let gun = GUN();
    let relation = gun.get(data.email);
    let id = "";
    let username = "";

    gun.get(data.email, function (ack) {
      if (!ack.put) {
        console.log("a");
        gun.get(data.email).put({
          id: uuidv4(),
          email: data.email,
        });
      } else {
        console.log("b");
      }
    });

    return {
      id: id,
    };
  },
};

export { LoadHandler };
