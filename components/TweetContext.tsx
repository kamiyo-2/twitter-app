// context/TweetContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { Tweet } from "@/types";

type TweetContextType = {
  tweets: Tweet[];
  setTweets: (tweets: Tweet[]) => void;
};

const TweetContext = createContext<TweetContextType>({} as TweetContextType);

export const useTweets = () => {
  return useContext(TweetContext);
};

interface TweetProviderProps {
  children: ReactNode;
}

export function TweetProvider({ children }: TweetProviderProps) {
  const [tweets, setTweets] = useState<Tweet[]>([
    {
      id: 1,
      text: "Hello, world!",
      created_at: "2023-04-01T00:00:00.000Z",
      updated_at: "2023-04-01T00:00:00.000Z",
    },
    {
      id: 2,
      text: "This is my second tweet!",
      created_at: "2023-04-02T00:00:00.000Z",
      updated_at: "2023-04-02T00:00:00.000Z",
    },
  ]);

  return (
    <TweetContext.Provider value={{ tweets, setTweets }}>
      {children}
    </TweetContext.Provider>
  );
}
