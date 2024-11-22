import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
const Hookform = () => {
  type FormValues = {
    username: string;
    email: string;
    channel: string;
  };
  const form = useForm<FormValues>(); //form here is an object now
  const { register, control, handleSubmit, formState } = form; // we are destructuring here  and register is one of the methods of the form object that assist in managing form state

  const { errors } = formState;
  //   console.log(formState.errors);

  const submt = (dtaa: FormValues) => {
    console.log("submitted", dtaa);
  };

  return (
    <>
      <div>
        <form
          className="flex flex-col font-bold"
          onSubmit={handleSubmit(submt)}
          noValidate //add this attribute validation ko lagi , once validate is mentioned , the fields cannot be empty else it wont be submitted
          // also prevents the browser validation and enables the react hook validation
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "username is required",
              },
            })}
          ></input>

          <p>{errors.username?.message}</p>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "invalid format",
              },
            })}
          ></input>
          <p>{errors.email?.message}</p>
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", { required: "channel is required" })}
          ></input>
          <p>{errors.channel?.message}</p>
          <button>submit</button>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
};
export default Hookform;
