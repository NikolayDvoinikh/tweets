import { Tweet, TwitterUser } from "./components/Tweet.js";
import styles from "./app.module.css";
import getUsers from "./services/api.ts";
import { useEffect, useState } from "react";

function App() {
  const [twittersList, settTwittersList] = useState<TwitterUser[]>([]);

  useEffect(() => {
    const getTwittersList = async () => {
      const list = await getUsers();
      if (list) settTwittersList(list);
    };
    getTwittersList();
  }, []);

  return (
    <section>
      <div className={styles.container}>
        {twittersList?.map((twitter) => (
          <Tweet key={twitter.id} twitter={twitter} />
        ))}
      </div>
    </section>
  );
}

export default App;
