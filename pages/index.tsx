import Link from "next/link";
import { useTweets } from "@/components/TweetContext";

export default function Home() {
  const { tweets } = useTweets();

  return (
    <div>
      <h1>Tweet List</h1>

      <Link href="/create">Create a new tweet</Link>

      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>
            <Link href={`/detail/${tweet.id}`}>
              {tweet.text}
            </Link>
            <Link href={`/edit/${tweet.id}`}>
              Edit
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}
