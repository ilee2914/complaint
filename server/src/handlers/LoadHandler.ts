import { Comment } from "../ogm-types.js";
import { User, Domain } from "../connection.js";
import { generateRandomUserName } from "../utils.js";

interface LoadRequest {
  email: string;
  tabUrl: string;
}

interface LoadResponse {
  username: string;
  comments: any;
}

const LoadHandler: BaseHandler = {
  path(): string {
    return "/load";
  },
  async handle(data: LoadRequest): Promise<LoadResponse> {
    let response: LoadResponse = {
      username: await getUsername(data.email),
      comments: await getComments(data.tabUrl),
    };

    return response;
  },
};

async function getUsername(email: string): Promise<string> {
  const result = await User.find({
    where: { email: email },
  });

  if (!result.length) {
    const randomUsername = await generateRandomUserName();
    await User.create({
      input: [
        {
          email: email,
        },
      ],
    });
    return randomUsername;
  } else {
    return result[0].username ? result[0].username : "";
  }
}

async function getComments(url: string): Promise<Comment[] | null> {
  let domain = await Domain.find({ where: { name: url } });
  if (!domain.length) {
    let x = domain[0]?.commentsAggregate?.node?.comment;
    console.log(x);
  } else {
    Domain.create({ input: [{ name: url }] });
  }
  return null;
}

export { LoadHandler };
