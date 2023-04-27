import { useRouter } from "next/router";
import Link from 'next/link'
import { useTweets } from "@/components/TweetContext";

export default function Detail() {
  const { tweets } = useTweets();

  const router = useRouter();
  const { id } = router.query;
  const tweetId = parseInt(id as string);

  const tweet = tweets.find((tweet) => tweet.id === tweetId)

  if (!tweet) {
    return (
      <div>
        <p>Tweetがありません。</p>
        <Link href="/">戻る</Link>
      </div>
    )
  }
    return (
      <div>
        <h1>Tweet 詳細</h1>
        <p>{tweet.text}</p>
        <p>作成日：{tweet.created_at}</p>
        <p>更新日：{tweet.updated_at}</p>
        <Link href="/">戻る</Link>
      </div>
    );
}