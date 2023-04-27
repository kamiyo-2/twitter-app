import { useState } from "react";
import { Tweet } from "@/types";
import TweetForm from "@/components/TweetForm";

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [editingTweet, setEditingTweet] = useState<Tweet | null>(null);

  const deleteTweet = (id: number) => {
    setTweets(tweets.filter((tweet) => tweet.id !== id));
  };

  const startEditing = (id: number) => {
    const tweetToEdit = tweets.find((tweet) => tweet.id === id);
    if (tweetToEdit) {
      setEditingTweet(tweetToEdit);
    }
  };

  const cancelEditing = () => {
    setEditingTweet(null);
  };

  return (
    <div>
      <TweetForm
      tweets={tweets}
      setTweets={setTweets}
      editingTweet={editingTweet}
      setEditingTweet={setEditingTweet}
      onEditCancel={cancelEditing}
      />
      {tweets.map((tweet) => (
        <div key={tweet.id}>
        <p>{tweet.text}</p>
        <button onClick={() => deleteTweet(tweet.id)}>Delete</button>
        <button onClick={() => startEditing(tweet.id)}>Edit</button>
      </div>
      ))}
    </div>
  );
};