interface TwitterUser {
  name: string;
  avatar: string;
  tweets: number;
  followers: number;
  id: string;
}

// interface InfoToUpdate {
//   id: TwitterUser["id"];
//   followers: TwitterUser["followers"];
// }

type InfoToUpdate = Partial<TwitterUser>;

type TwitterUserResponse = TwitterUser;
