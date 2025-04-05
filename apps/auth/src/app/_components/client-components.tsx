'use client';

import { FormEventHandler, useCallback, useState } from "react";
import { PasswordInput, TextInput } from '@kloudlite/design-system/atoms/input';
import {z} from "zod";


const CredientialsSchema  = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = useCallback(() => {
    console.log(CredientialsSchema.parse({
      email, password
    }));
  }, [email, password]);
  
  return (
    <form
      onSubmit={submit }
      className="flex flex-col items-stretch gap-3xl"
    >
      <div className="flex flex-col items-stretch gap-3xl">
        <TextInput
          name="name"
          value={values.name}
          error={!!errors.name}
          message={errors.name}
          onChange={handleChange("name")}
          label="Name"
          placeholder="Full name"
          size="lg"
          className="h-[48px]"
        />
        <TextInput
          name="email"
          value={values.email}
          error={!!errors.email}
          message={errors.email}
          onChange={handleChange("email")}
          label="Email"
          placeholder="ex: john@company.com"
          size="lg"
          className="h-[48px]"
        />
        <PasswordInput
          name="password"
          value={values.password}
          error={!!errors.password}
          onChange={handleChange("password")}
          label="Password"
          placeholder="XXXXXX"
          size="lg"
          message={errors.password}
          className="h-[48px]"
        />

        <PasswordInput
          value={values.c_password}
          error={!!errors.c_password}
          onChange={handleChange("c_password")}
          label="Confirm Password"
          placeholder="XXXXXX"
          size="lg"
          message={errors.c_password}
          className="h-[48px]"
        />
      </div>
      <Button
        loading={isLoading}
        size="lg"
        variant="primary"
        content={<span className="bodyLg-medium">Continue with email</span>}
        suffix={<ArrowRight />}
        block
        type="submit"
      />
    </form>
  );
};
