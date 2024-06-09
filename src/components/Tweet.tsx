import { useState } from "react";
import styles from "./tweet.module.css";

interface TwitterUser {
  name: string;
  avatar: string;
  tweets: number;
  followers: number;
  id: string;
}

export const Tweet = ({ tweeter }: { tweeter: TwitterUser }) => {
  const [follow, setFollow] = useState(() => {
    const data = localStorage.getItem("myFollowings");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (parsedData[tweeter.id]) return parsedData[tweeter.id] || false;
      } catch {
        console.log("Oops no data");
        return false;
      }
    } else {
      return false;
    }
  });
  const [followers, setFollowers] = useState(tweeter);

  const handleClick = () => {
    setFollow((prev) => !prev);
    setFollowers((prev) => ({
      ...prev,
      followers: prev.followers + (!follow ? 1 : -1),
    }));
    try {
      const myFollowings = localStorage.getItem("myFollowings");
      const parsedData = myFollowings ? JSON.parse(myFollowings) : {};
      localStorage.setItem(
        "myFollowings",
        JSON.stringify({ ...parsedData, [tweeter.id]: !follow })
      );
    } catch {
      console.log("oops !!! Error!!!");
    }
  };

  return (
    <div className={styles.tweet_body}>
      <div className={styles.tweet_bg_img} />
      <div className={styles.border_wrapper}>
        <div className={styles.border_decor} />
        <div className={styles.border_avatar}>
          <img
            src={tweeter.avatar}
            alt="tweeter avatar"
            width={80}
            height={80}
          />
        </div>
      </div>
      <h2 className={styles.tweet_title}>
        {followers?.tweets.toLocaleString("en")} tweets
      </h2>
      <h3 className={styles.tweet_counter}>
        {followers?.followers.toLocaleString("en")} followers
      </h3>
      <button
        type="button"
        className={`${styles.tweet_btn} ${follow && styles.active_btn}`}
        onClick={handleClick}
      >
        {follow ? "following" : "follow"}
      </button>
    </div>
  );
};
