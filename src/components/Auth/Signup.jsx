"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../features/auth/authApi";
import { toast } from "react-hot-toast";

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid Email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(8),
});

const Signup = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration succesful";
      toast.success(message);
      setRoute("Verification");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data?.message, setRoute]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <h1
        className={`${"text-[25px] text-white font-[500] font-Poppins text-center py-2 "}`}
      >
        Join to SafeChild
      </h1>
      <form onSubmit={handleSubmit}>
        <label className={`${"text-[16px] font-Poppins text-white "}`}>
          Enter Your Name
        </label>
        <input
          type="text"
          name=""
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="Shiki"
          className={`${
            errors.name && touched.name && "border-red-500"
          } ${"w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"}`}
        />
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${"text-[16px] font-Poppins text-white "}`}>
            Enter Your Email
          </label>
          <input
            type="email"
            name=""
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${
              errors.email && touched.email && "border-red-500"
            } ${"w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"}`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>
        <div className="w-full mt-5 relative mb-1">
          <label className={`${"text-[16px] font-Poppins text-white "}`}>
            Enter Your Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${"w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-2 right-2 z-4 cursor-pointer text-white"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-2 right-2 z-4 cursor-pointer text-white"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && errors.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Sign Up"
            className={`${"flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2100ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold text-white"}`}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-white">
          Already have an Account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Signup;
