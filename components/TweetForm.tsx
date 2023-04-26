import { useForm, SubmitHandler } from "react-hook-form";
import { Tweet } from "@/types";

interface TweetFormProps {
  tweets: Tweet[];
  setTweets: (tweets: Tweet[]) => void;
}

type TweetFormData = Omit<Tweet, "id">;

const TweetForm = ({ tweets, setTweets }: TweetFormProps) => {
  const { register, handleSubmit, setValue , formState: { errors } } = useForm<TweetFormData>();

  const onSubmit: SubmitHandler<TweetFormData> = (data) => {
    const timestamp = new Date().toISOString();

    const newTweet: Tweet = {
      id: Date.now(),
      ...data,
      created_at: timestamp,
      updated_at: timestamp,
    };

    setTweets([...tweets, newTweet]);
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
      <button type="submit">Tweet</button>
    </form>
  );
};

export default TweetForm;
