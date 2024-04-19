import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
console.log(API_BASE_URL)
export type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: number
}

const Register = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>()

    const mutation = useMutation(apiClient.register, {
        onSuccess: () => {
            showToast({ message: "Registration Success!", type: "SUCCESS" });
            navigate("/signin")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit} >
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className=" text-gray-700 text-sm  font-bold flex-1">
                    FirstName
                    <input className=" w-full rounded font-normal h-9 mt-1 py-1 px-2 border"
                        type="text"
                        {...register("firstName", { required: "this is reqired !!" })}
                    />
                    {errors.firstName && (
                        <span className="text-red-500 mt-">{errors.firstName.message}</span>
                    )}
                </label>

                <label className=" text-gray-700 text-sm  font-bold flex-1">
                    LastName
                    <input className=" w-full rounded font-normal h-9 mt-1 py-1 px-2 border"
                        type="text"
                        {...register("lastName", { required: "this is reqired !!" })}
                    />
                    {errors.lastName && (
                        <span className="text-red-500 mt-2">{errors.lastName.message}</span>
                    )}
                </label>
            </div>
            <label className=" text-gray-700 text-sm  font-bold flex-1">
                Email
                <input className=" w-full rounded font-normal h-9 mt-1 py-1 px-2 border"
                    type="text"
                    {...register("email", { required: "this is reqired !!" })}
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>

            <label className=" text-gray-700 text-sm  font-bold flex-1">
                Password
                <input className=" w-full rounded font-normal h-9 mt-1 py-1 px-2 border"
                    {...register("password",
                        {
                            "required": "password is reqired !!",
                            minLength: {
                                value: 6,
                                message: "password must be atleat 6 charcter"
                            }
                        })
                    }
                    type="password" />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
            <label className=" text-gray-700 text-sm  font-bold flex-1">
                Phone no.
                <input className=" w-full rounded font-normal h-9 mt-1 py-1 px-2 border"
                    {...register("phone", { required: "phone no is reqired !!" })}
                    type="number" />
                {errors.phone && (
                    <span className="text-red-500">{errors.phone.message}</span>
                )}
            </label>
            <span>
                <button type="submit" className=" bg-blue-600 text-white p-2 font-bold hover:bg-blue-500">
                    Submit
                </button>
            </span>
        </form>
    )
}

export default Register


