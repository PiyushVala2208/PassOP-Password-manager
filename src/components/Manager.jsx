import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [showPass, setShowPass] = useState(false)

    const [form, setform] = useState({
        id: "",
        site: "",
        username: "",
        password: ""
    })

    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        const passwords = JSON.parse(localStorage.getItem("passwords"))
        if (passwords) setpasswordArray(passwords)
    }, [])

    const copyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text)
            toast.success("Copied to clipboard! 📋", { theme: "dark" })
        } catch {
            toast.error("Copy failed ❌", { theme: "dark" })
        }
    }

    const showPassword = () => {
        setShowPass(prev => !prev)

        if (ref.current.src.includes("eyecross")) {
            ref.current.src = "icons/eye.png"
        } else {
            ref.current.src = "icons/eyecross.png"
        }
    }


    const savePassword = () => {
        if (
            form.site.length < 3 ||
            form.username.length < 3 ||
            form.password.length < 3
        ) {
            toast.error("Fill all fields properly ❌", { theme: "dark" })
            return
        }

        let updatedPasswords

        if (form.id) {
            updatedPasswords = passwordArray.map(item =>
                item.id === form.id ? form : item
            )
            toast.success("Password updated ✨", { theme: "dark" })
        } else {
            updatedPasswords = [
                ...passwordArray,
                { ...form, id: uuidv4() }
            ]
            toast.success("Password saved 🔐", { theme: "dark" })
        }

        setpasswordArray(updatedPasswords)
        localStorage.setItem(
            "passwords",
            JSON.stringify(updatedPasswords)
        )

        setform({ id: "", site: "", username: "", password: "" })
    }

    const deletePassword = (id) => {
        if (!confirm("Do you really want to delete this password?")) return

        const updated = passwordArray.filter(item => item.id !== id)
        setpasswordArray(updated)
        localStorage.setItem("passwords", JSON.stringify(updated))

        toast.success("Password deleted 🗑️", { theme: "dark" })
    }

    const editPassword = (id) => {
        const selected = passwordArray.find(item => item.id === id)
        setform(selected)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer />


            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50
              bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
              linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
              bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10
                  m-auto h-[260px] w-[260px] sm:h-[310px] sm:w-[310px]
                  rounded-full bg-green-400 opacity-20 blur-[100px]">
                </div>
            </div>


            <div className="p-3 min-h-[88.2vh] max-w-6xl mx-auto">


                <h1 className="text-3xl sm:text-4xl font-bold text-center">
                    <span className="text-green-500">&lt;</span>
                    Pass
                    <span className="text-green-500">OP/&gt;</span>
                </h1>

                <p className="text-green-900 text-base sm:text-lg text-center">
                    Your own Password Manager
                </p>


                <div className="flex flex-col p-4 gap-6 sm:gap-8 items-center">

                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter website URL"
                        className="rounded-full border border-green-500 w-full p-3 sm:p-4"
                        name="site"
                    />

                    <div className="flex flex-col md:flex-row w-full gap-6">

                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            className="rounded-full border border-green-500 w-full p-3 sm:p-4"
                            name="username"
                        />

                        <div className="relative w-full md:w-[80%]">
                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="rounded-full border border-green-500 w-full p-3 sm:p-4 pr-12"
                                type={showPass ? "text" : "password"}
                                name="password" />
                            <span
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer  p-1.5 rounded-full transition-all duration-200 hover:bg-green-200 hover:scale-110 active:scale-95"
                                onClick={showPassword} >
                                <img
                                    ref={ref}
                                    width={26}
                                    src="icons/eye.png"
                                    alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className="relative flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full  bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold text-sm  shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden">
                        
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                            style={{ width: 26, height: 26 }}
                            className="relative z-10"
                        ></lord-icon>

                        <span className="relative z-10">Save</span>

                        
                        <span className="absolute inset-0 rounded-full bg-white/10 pointer-events-none blur-sm animate-pulse-glow"></span>

                       
                        <span className="absolute top-0 left-0 w-0 h-full bg-white/30 pointer-events-none
                   transition-all duration-500 ease-out hover:w-full"></span>
                    </button>

                </div>


                <div className="passwords">
                    <h2 className="font-bold text-xl sm:text-2xl py-4">
                        Your Passwords
                    </h2>

                    {passwordArray.length === 0 && (
                        <div>No passwords to show</div> )}
                        
                    {passwordArray.length !== 0 && (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full min-w-[650px]
                              rounded-md overflow-hidden mb-10">
                                <thead className="bg-green-800 text-white">
                                    <tr className="hover:bg-green-900 transition">
                                        <th className="py-2">Site</th>
                                        <th className="py-2">Username</th>
                                        <th className="py-2">Password</th>
                                        <th className="py-2">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index}>

                                            <td className="py-2 border border-white text-center">

                                                <div className="flex items-center justify-center gap-2">
                                                    <a href={item.site} target="_blank">
                                                        {item.site}
                                                    </a>
                                                    <div
                                                        className="cursor-pointer"
                                                        onClick={() => copyText(item.site)}
                                                    >
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-2 border border-white text-center">

                                                <div className="flex items-center justify-center gap-2">
                                                    <span>{item.username}</span>
                                                    <div
                                                        className="cursor-pointer"
                                                        onClick={() => copyText(item.username)}
                                                    >
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-2 border border-white text-center">

                                                <div className="flex items-center justify-center gap-2">
                                                    <span>{"*".repeat(item.password.length)}</span>
                                                    <div
                                                        className="cursor-pointer"
                                                        onClick={() => copyText(item.password)}  >
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-2 border border-white text-center">

                                                <div className="flex justify-center gap-4">
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={() => editPassword(item.id)}
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                                            trigger="hover"
                                                            style={{ width: "25px", height: "25px" }}>
                                                        </lord-icon>
                                                    </span>

                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={() => deletePassword(item.id)}
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{ width: "25px", height: "25px" }}>
                                                        </lord-icon>
                                                    </span>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Manager
