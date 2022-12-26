import { Comment } from "./Comment";

interface Domain {
  id: string;
  name: string;
  comments: Set<Comment>;
}
