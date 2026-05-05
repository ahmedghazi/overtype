import { client } from "@/app/sanity-api/sanity-client";
import { User } from "@/app/types/schema";

export async function findUserByEmail(email: string): Promise<User | null> {
  const users = await client.fetch<User[]>(
    `*[_type == "user" && email == $email]`,
    { email },
  );
  return users.length > 0 ? users[0] : null;
}
