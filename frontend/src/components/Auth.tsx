import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@faz18/medium-common"
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        email: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signin' ? 'signin' : 'signup'}`, postInputs)
            const token = response.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('username', postInputs.username)
            navigate('/blogs')
        } catch (e) {
            alert("Invalid Credentials")
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center ">
            <div>
                <div className="px-10">
                    <div className=" text-3xl font-extrabold">
                        {type === 'signin' ? " Don't have  an Account" : "Already have an account?  "}
                    </div>
                    <div className="text-slate-400 max-w-md">{type === 'signin' ? "Sign up to create an account" : "Login to your account"}
                        <Link className="pl-2 underline" to={type === 'signin' ? "/signup" : "/signin"}> {type === 'signin' ? 'Signup' : 'Login'}</Link>
                    </div>
                </div>
                <div className="pt-4">
                    {type === 'signup' ? <LabelledInput label="Name" placeholder="Shamika" onChange={(e) => {
                        setPostInputs(
                            {
                                ...postInputs,
                                name: e.target.value
                            }
                        )
                    }} /> : null}
                    {type === 'signup' ? <LabelledInput label="email" placeholder="shamshetty18@gmail.com" onChange={(e) => {
                        setPostInputs(
                            {
                                ...postInputs,
                                email: e.target.value
                            }
                        )
                    }} /> : null}
                    <LabelledInput label="Username" placeholder="Shamika_shetty24" onChange={(e) => {
                        setPostInputs(
                            {
                                ...postInputs,
                                username: e.target.value
                            }
                        )
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="..............💖" onChange={(e) => {
                        setPostInputs(
                            {
                                ...postInputs,
                                password: e.target.value
                            }
                        )
                    }} />
                    <button onClick={sendRequest} type="button" className="m-8 w-full  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                  dark:focus:ring-gray-700 dark:border-gray-700">{type === 'signin' ? "Sign In" : "Sign up"}</button>
                </div>

            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input
            onChange={onChange} type={type || "text"}
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={placeholder} required
        />
    </div>
}
