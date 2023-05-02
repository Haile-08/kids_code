import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './style.css';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post('https://api.kidscode.com/auth/login', {
        email: data.email,
        password: data.password,
      })
      .then(function (res) {
        return res;
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  return (
    <div className="log">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email', { required: true })} />
        {errors.email && <span>This field is required</span>}
        <input {...register('password', { required: true })} />
        {errors.password && <span>This field is required</span>}
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default Login;
