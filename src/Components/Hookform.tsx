import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const Hookform = (props: Props) => {
  const form = useForm(); //form here is an object now
  const { register, control } = form; // we are destructuring here  and register is one of the methods of the form object that assist in managing form state

  const submt = (dtaa) => {
    alert("submitted", dtaa);
  };

  return (
    <div>
      <form className="flex flex-col font-bold" onSubmit={submt}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")}></input>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" {...register("email")}></input>
        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")}></input>

        <button>submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
export default Hookform;
