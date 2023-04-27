import { useRouter } from "next/router";
import { Tweet } from "@/types";
import TweetForm from "@/components/TweetForm";
import { useTweets } from "@/components/TweetContext";

export default function Create() {
  const { tweets, setTweets } = useTweets();
  const router = useRouter();

  const onCreate = (newTweet: Tweet) => {
    setTweets([...tweets, newTweet]);
    router.push("/");
  }

  return (
    <div>
      <h1>Create a new tweet</h1>
      <TweetForm onSubmit={onCreate} />
    </div>
  )
}