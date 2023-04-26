import {useState } from "react";
import { Tweet } from "@/types";
import TweetForm from "@/components/TweetForm";
import TweetItem from "@/components/Tweet";


export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const deleteTweet = (id: number) => {
    setTweets(tweets.filter((tweet) => tweet.id !== id));
  };

  const updateTweet = (updatedTweet: Tweet) => {
    setTweets(tweets.map((tweet) => (tweet.id === updatedTweet.id ? updatedTweet : tweet)));
  };

  return (
    <div>
      <TweetForm tweets={tweets} setTweets={setTweets} />
      {tweets.map((tweet) => (
        <TweetItem
        key={tweet.id}
        tweet={tweet}
        onDelete={deleteTweet}
        onUpdate={updateTweet}
      />
      ))}
    </div>
  );

};