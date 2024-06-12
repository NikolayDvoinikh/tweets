interface TwitterUser {
  name: string;
  avatar: string;
  tweets: number;
  followers: number;
  id: string;
}

type TwitterUserResponse = TwitterUser;
