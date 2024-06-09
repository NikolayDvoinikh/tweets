import { Tweet } from "./components/Tweet.js";
import styles from "./app.module.css";
import tweeters from "./data/tweeters.json";

function App() {
  return (
    <section>
      <div className={styles.container}>
        {tweeters.map((tweeter) => (
          <Tweet key={tweeter.id} tweeter={tweeter} />
        ))}
      </div>
    </section>
  );
}

export default App;
