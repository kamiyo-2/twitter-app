// pages/edit/[id].tsx

import { useRouter } from "next/router";
import { Tweet } from "@/types";
import TweetForm from "@/components/TweetForm";
import { useTweets } from "@/components/TweetContext";

export default function Edit() {
  // const [tweets, setTweets] = useState<Tweet[]>([]);
  const { tweets, setTweets } = useTweets();

  const router = useRouter();
  const { id } = router.query;
  const tweetId = parseInt(id as string);

  const tweet = tweets.find((t) => t.id === tweetId);

  const onUpdate = (updatedTweet: Tweet) => {
    setTweets(tweets.map((t) => (t.id === updatedTweet.id ? updatedTweet : t)));
    router.push(`/detail/${updatedTweet.id}`);
  };

  const onCancel = () => {
    router.back();
  };

  if (!tweet) {
    return <div>Tweet not found</div>;
  }

  return (
    <div>
      <h1>Edit Tweet</h1>
      <TweetForm onSubmit={onUpdate} editingTweet={tweet} onEditCancel={onCancel} />
    </div>
  );
}
