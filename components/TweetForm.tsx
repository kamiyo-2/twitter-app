import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tweet } from "@/types";

interface TweetFormProps {
  onSubmit: (tweet: Tweet) => void;
  editingTweet?: Tweet | null;
  onEditCancel?: () => void;
}

type TweetFormData = Omit<Tweet, "id">;

const TweetForm = ({ onSubmit, editingTweet, onEditCancel }: TweetFormProps) => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<TweetFormData>();

  useEffect(() => {
    if (editingTweet) {
      setValue("text", editingTweet.text);
    } else {
      reset();
    }
  }, [editingTweet, setValue, reset]);

  const onSubmitHandler: SubmitHandler<TweetFormData> = (data) => {
    const timestamp = new Date().toISOString();

    const tweet: Tweet = {
      id: editingTweet ? editingTweet.id : Date.now(),
      ...data,
      created_at: editingTweet ? editingTweet.created_at : timestamp,
      updated_at: timestamp,
    };

    onSubmit(tweet);
    setValue("text", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <input
        {...register("text", { required: true, maxLength: 280 })}
        placeholder="What's happening?"
      />
      {errors.text && errors.text.type === "required" && <span>このフィールドは必須です</span>}
      {errors.text && errors.text.type === "maxLength" && <span>最大文字数は280文字です</span>}
      <button type="submit">{editingTweet ? "Update" : "Tweet"}</button>
      {editingTweet && onEditCancel && (
        <button type="button" onClick={onEditCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TweetForm;
