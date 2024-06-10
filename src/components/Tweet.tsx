import { useState } from "react";
import styles from "./tweet.module.css";

export interface TwitterUser {
  name: string;
  avatar: string;
  tweets: number;
  followers: number;
  id: string;
}

export const Tweet = ({ twitter }: { twitter: TwitterUser }) => {
  const [follow, setFollow] = useState<boolean>(() => {
    try {
      const data = localStorage.getItem("myFollowings");
      if (data) {
        const parsedData = JSON.parse(data);
        return parsedData[twitter.id] || false;
      }
      return false;
    } catch (e) {
      console.error("Error updating local storage:", e);
      return false;
    }
  });
  const [followers, setFollowers] = useState(twitter);

  const handleClick = () => {
    setFollow((prev) => !prev);
    setFollowers((prev) => ({
      ...prev,
      followers: prev.followers + (follow ? -1 : 1),
    }));
    try {
      const myFollowings = localStorage.getItem("myFollowings");
      const parsedData = myFollowings ? JSON.parse(myFollowings) : {};
      localStorage.setItem(
        "myFollowings",
        JSON.stringify({ ...parsedData, [twitter.id]: !follow })
      );
    } catch (e) {
      console.error("Error updating local storage:", e);
    }
  };

  return (
    <div className={styles.tweet_body}>
      <div className={styles.tweet_bg_img} />
      <div className={styles.border_wrapper}>
        <div className={styles.border_decor} />
        <div className={styles.border_avatar}>
          <img
            src={twitter.avatar}
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
        {follow ? "unfollow" : "follow"}
      </button>
    </div>
  );
};
