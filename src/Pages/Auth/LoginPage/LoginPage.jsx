import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../../hook/useAuth";

const LoginPage = () => {
    const { singInWithEmailPassword } = useAuth()
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const email = data.email;
        const password =  data.password;
        singInWithEmailPassword(email, password)
            .then(res => {
                console.log(res.user);
            })
            .catch(error => console.error(error))
    };
  return (
    <div className="hero min-h-screen bg-base-200">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-4xl font-bold ">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register('password')}
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <div className="space-y-2 mt-4">
			<p className="px-6 text-sm text-center dark:text-gray-600">Don't have an account yet?
				<Link to='/register' rel="noopener noreferrer" className="hover:underline text-violet-600">Sign up</Link>.
			</p>
		</div>
          </form>
      </div>
    </div>
  );
};

export default LoginPage;
