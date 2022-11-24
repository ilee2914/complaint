import { Comment } from "./Comment";

interface User {
  id: string;
  email: string;
  comments: Set<Comment>;
}
