import { Tweet, TwitterUser } from "./components/Tweet.js";
import styles from "./app.module.css";
import { getUsers, apiLayout } from "./services/api.ts";
import { useEffect, useState } from "react";

function App() {
  const [twittersList, setTwittersList] = useState<TwitterUser[]>([]);

  useEffect(() => {
    const getTwittersList = async () => {
      const list = await apiLayout(getUsers);
      if (list) setTwittersList(list);
    };
    getTwittersList();
  }, []);

  return (
    <section>
      <div className={styles.container}>
        {twittersList?.map((twitter) => (
          <Tweet key={twitter.id} user={twitter} />
        ))}
      </div>
    </section>
  );
}

export default App;
