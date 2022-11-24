import { Comment } from "./Comment";

interface Domain {
  id: string;
  domain_name: string;
  comments: Set<Comment>;
}
