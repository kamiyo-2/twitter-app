import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tweet } from "@/types";

interface TweetProps {
  tweet: Tweet;
  onDelete: (id: number) => void;
  onUpdate: (updatesTweet: Tweet) => void;
}

type UpdateTweetFormData = Omit<Tweet, "id" | "created_at">;

const TweetItem = ({ tweet, onDelete, onUpdate }: TweetProps) => {
  const [editing, setEditing] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateTweetFormData>({ defaultValues: { text: tweet.text } });

  const handleUpdate: SubmitHandler<UpdateTweetFormData> = (updateData) => {
    console.log(updateData)
    const updatedTweet: Tweet = {
      ...tweet,
      ...updateData,
      updated_at: new Date().toISOString(),
    };
    onUpdate(updatedTweet);
    setValue("text", tweet.text);
    setEditing(false);
  };

  return (
    <div key={tweet.id}>
      {!editing ? (
        <>
          <p>{tweet.text}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onDelete(tweet.id)}>Delete</button>
        </>
      ) : (
        <form onSubmit={handleSubmit(handleUpdate)}>
          <input
            {...register("text", { required: true, maxLength: 280 })}
            defaultValue={tweet.text}
          />
          {errors.text && errors.text.type === "required" && <span>このフィールドは必須です</span>}
          {errors.text && errors.text.type === "maxLength" && <span>最大文字数は280文字です</span>}
          <button type="submit">Update</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default TweetItem;
