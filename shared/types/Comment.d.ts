import { User } from "./User";
import { Domain } from "./Domain";

interface Comment {
  id: string;
  author: User;
  domain: Domain;
  comment: string;
  reaction: Set<Reaction>;
}
