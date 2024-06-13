import { useState } from "react";
import { updateFollowStatus, apiLayout } from "../services/api";
import styles from "./tweet.module.css";

export const Tweet = ({ user }: { user: TwitterUser }) => {
  const [follow, setFollow] = useState<boolean>(() => {
    try {
      const data = localStorage.getItem("myFollowings");
      if (data) {
        const parsedData = JSON.parse(data);
        return parsedData[user.id] || false;
      }
      return false;
    } catch (e) {
      console.error("Error updating local storage:", e);
      return false;
    }
  });

  const [twitter, setTwitter] = useState(user);

  const handleClick = async () => {
    const updatedResult = await apiLayout(updateFollowStatus, {
      id: twitter.id,
      followers: twitter.followers + (follow ? -1 : 1),
    });

    if (!updatedResult) return;
    setFollow((prev) => !prev);
    setTwitter(updatedResult as TwitterUser);

    /// add info following in localstorage
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
        {twitter?.tweets.toLocaleString("en")} tweets
      </h2>
      <h3 className={styles.tweet_counter}>
        {twitter?.followers.toLocaleString("en")} followers
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
