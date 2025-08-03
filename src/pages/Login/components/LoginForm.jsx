import { useFormik } from "formik";
import * as Yup from "yup";
import Notice from "../../../components/Notice";
import InputIconField from "../../../components/InputIconField";
import WideFilledButton from "../../../components/WideFilledButton";
import BorderButton from "../../../components/BorderButton";
import { IconMailFilled, IconLockFilled } from "@tabler/icons-react";

const LoginForm = ({ setShowForm }) => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  return (
    <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[65%] xl:w-[60%] mx-auto">
      <Notice>
        We don't support creating an account with a password. You can only set a
        password after logging in via a Google account.
      </Notice>
      <form className="flex flex-col gap-3 mt-4" onSubmit={formik.handleSubmit}>
        <InputIconField
          placeholder="Email"
          inputType="text"
          Icon={IconMailFilled}
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />

        <InputIconField
          placeholder="Password"
          inputType="password"
          Icon={IconLockFilled}
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
        />

        <div className="flex flex-col mt-4 gap-3">
          <WideFilledButton type="submit">Login</WideFilledButton>
          <BorderButton type="button" onClick={() => setShowForm(false)}>
            Back
          </BorderButton>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
