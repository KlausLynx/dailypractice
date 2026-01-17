import React from "react"
import { useForm } from "react-hook-form";
import { CheckCircleIcon } from "lucide-react";


export default function MainComponent() {

    return(
        <div className="grid gap-2 grid-cols-3">
            <UserRegForm />
            <SurveyForm />
        </div>
    )
}

const UserRegForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
  } = useForm();

  // get the live password data to validate confirmPassword
  const password = watch("password");
  const [submitted, setSubmitted] = React.useState(false)
  const [data, setData] = React.useState(null);

  const onSubmit = (formData) => {
    setData(formData);
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-green-500 p-3 flex flex-col max-w-2xl">
        <CheckCircleIcon className="mx-auto" />
        <h2>Form Submitted Successfully</h2>

        <pre>{JSON.stringify(data, null, 2)}</pre>
z
        <button
          onClick={() => {
            reset();
            setSubmitted(false);
          }}
        >
          Fill Form Again
        </button>
      </div>
    );
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-3">
          <label htmlFor="">Email: </label>
          <input type="email" placeholder="Email"{...register("email",{
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            }
          })} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" >Password</label>
          <input type="password" {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Minimum 8 Characters",
            },
          })}id="" />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div>
          <label htmlFor="">Confirm Password</label>
          <input type="password" {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match"
          })} id="" />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span> }
        </div>

        <div>
          <input type="checkbox" {...register("terms", {
            required: "You must accept the terms"
          })} id="" />
          Accept Terms
          {errors.terms && <span>{errors.terms.message}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}



