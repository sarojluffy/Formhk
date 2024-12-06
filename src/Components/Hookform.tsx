import { FieldErrors, get, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { useFieldArray } from "react-hook-form"; //1 impoprt
import "../style.css";
import { useEffect } from "react";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    // nested object
    facebook: string;
    twitter: string;
  };
  phoneN: Array<string>;
  phonenum: Array<{
    number: string;
  }>; //2  Array <{}> , this is array of object where each object will have number attribute which is string
  age: number;
  // array of objects instead of array of strings because  works on objects
  DOB: Date;
};
const Hookform = () => {
  const form = useForm<FormValues>({
    //default values are passed
    defaultValues: {
      username: "saroj",
      email: "",
      channel: "",
      social: {
        facebook: "",
        twitter: "",
      },

      phoneN: ["", ""],
      phonenum: [{ number: "" }], //3 , initially one object at the beginning, have to specifu tis as an array
      age: 0,
      DOB: new Date(),
    },
    mode: "onBlur",
  }); //form here is an object now
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = form; // we are destructuring here  and register is one of the methods of the form object that assist in managing form state
  console.log("saroj");
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState; //component rerenders in change of any of these
  //   console.log(isDirty, isValid);
  //   console.log(isSubmitting, isSubmitted, isSubmitSuccessful, submitCount);

  //   const submt = (dtaa: FormValues) => {
  //     console.log("submitted", dtaa);
  //     alert("submitted");
  //   };

  const submt = (dtaa: FormValues) => {
    console.log("submitted", dtaa); // the dtaa here returns an object of submitted data that was monitored by the register in the jsx below
    alert("submitted");
  };

  const { fields, append, remove } = useFieldArray({
    name: "phonenum", // the array of object phonenum will be recognized as field array now
    control, // this control comes frm the destructuring of form we have done before
  });

  //   useEffect(() => {
  //     const { unsubscribe } = watch((value) => {
  //       // susbscribe refers to monitoring the changes while unsubscribe is vice versa
  //       // the watch is notified abou the change and receives the data  ,  destructuring we get the unsubscribe here

  //       // watch(value )  function execute vairako bujhnu
  //       console.log(value);
  //     });

  //     return () => unsubscribe();
  //   }, [watch]);
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const getFieldValues = () => {
    console.log(getValues(["username", "email"]));
  };
  const setFielVal = () => {
    setValue("username", "ok", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    // console.log("form errors", errors);
  };
  return (
    <>
      <div>
        <form
          className="flex flex-col font-bold"
          onSubmit={handleSubmit(submt, onError)}
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

              //   disabled: true,
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
                    : true; // notadmin ko validation is true vanna khojeko
                },
                // validation nai enable disable chai vanya haina

                baddomain: (fieldval) => {
                  return fieldval.endsWith("baddomain.com")
                    ? "domain not av"
                    : true; // validated vanna khopjeko
                },

                apibata: async (FieldKoval) => {
                  const apival = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${FieldKoval}`,
                    { method: "get" }
                  );
                  const Jsonformatted = await apival.json();

                  return Jsonformatted.length === 0 ? true : "email exists";
                }, // true returns the validation is true
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

          <label htmlFor="phone1">phone1</label>
          <input type="text" id="phone1" {...register("phoneN.0")}></input>
          <label htmlFor="phone1">phone2</label>
          <input type="text" id="phone2" {...register("phoneN.1")}></input>

          <label htmlFor="phone1">numbers list</label>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <input
                  className="qw"
                  type="text"
                  {...register(`phonenum.${index}.number`)}
                />
                {index > 0 && (
                  <button
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    delete num
                  </button>
                )}
              </div>
            );
          })}
          <button
            onClick={() => {
              append({ number: "" });
            }}
          >
            add more num
          </button>

          <label htmlFor="age">age</label>
          <input
            type="text"
            id="age"
            {...register("age", {
              required: {
                value: true,
                message: "age is required",
              },
              valueAsNumber: true,
            })}
          ></input>
          <p>{errors.age?.message}</p>

          <label htmlFor="dob">date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("DOB", {
              required: {
                value: true,
                message: "DOB is required",
              },
              valueAsDate: true,
            })}
          ></input>
          <p>{errors.DOB?.message}</p>

          <button onClick={getFieldValues}> get field values </button>
          <button onClick={setFielVal}> set field values </button>

          <button
            type="submit"

            //   disabled
          >
            submit
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
            }}
          >
            reset
          </button>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
};
export default Hookform;
