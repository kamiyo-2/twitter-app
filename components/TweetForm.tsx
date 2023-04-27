import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tweet } from "@/types";

interface TweetFormProps {
  tweets: Tweet[];
  setTweets: (tweets: Tweet[]) => void;
  editingTweet?: Tweet | null;setEditingTweet
  : (tweet: Tweet | null) => void;
  onEditCancel: () => void;
}

type TweetFormData = Omit<Tweet, "id">;

const TweetForm = ({ tweets, setTweets, editingTweet, setEditingTweet, onEditCancel }: TweetFormProps) => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<TweetFormData>();

  useEffect(() => {
    if (editingTweet) {
      setValue("text", editingTweet.text);
    } else {
      reset();
    }
  }, [editingTweet, setValue, reset]);

  const onSubmit: SubmitHandler<TweetFormData> = (data) => {
    const timestamp = new Date().toISOString();

    if (editingTweet) {
      const updatedTweet: Tweet = {
        ...editingTweet,
        ...data,
        updated_at: timestamp,
      };
      setTweets(tweets.map((tweet) => (tweet.id === updatedTweet.id ? updatedTweet : tweet)));
      setEditingTweet(null);
    } else {
      const newTweet: Tweet = {
        id: Date.now(),
        ...data,
        created_at: timestamp,
        updated_at: timestamp,
      };
      setTweets([...tweets, newTweet]);
    }
    setValue("text", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("text", { required: true, maxLength: 280 })}
        placeholder="What's happening?"
      />
      {errors.text && errors.text.type === "required" && <span>このフィールドは必須です</span>}
      {errors.text && errors.text.type === "maxLength" && <span>最大文字数は280文字です</span>}
      <button type="submit">{editingTweet ? "Update" : "Tweet"}</button>
      {editingTweet && <button type="button" onClick={onEditCancel}>Cancel</button>}
    </form>
  );
};

export default TweetForm;
