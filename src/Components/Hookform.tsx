import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
};
const Hookform = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "saroj",
      email: "sarojreus10@gmail.com",
      channel: "",
      social: {
        facebook: "",
        twitter: "",
      },
    },
  }); //form here is an object now
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
              validate: {
                notadmin: (fieldValue) => {
                  return fieldValue === "admin@example.com"
                    ? "enter different gmail"
                    : true; // fieldvalue bata aune value validate is true vanna khojeko
                },

                baddomain: (fieldval) => {
                  return fieldval.endsWith("baddomain.com")
                    ? "domain not av"
                    : true; // validated vanna khopjeko
                },
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

          <label htmlFor="facebook">facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook")}
          ></input>
          <label htmlFor="twitter">twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter")}
          ></input>

          <button>submit</button>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
};
export default Hookform;
