import React, { useState } from 'react'
import './styles.css'
import { useToast } from '@chakra-ui/react'
import axios from "axios"
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

const SignUp = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmpassword, setConfirmPassword] = useState()
    const [pic, setPic] = useState()
    const [loading, setLoading] = useState(false)
    const [picLoading, setPicLoading] = useState(false);
    const [show, setshow] = useState(false)
    const toast = useToast();

    const handleClick = () => setshow(!show);
    const postDetails = (pics) => {
        setLoading(true);

        if (pics === undefined) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics)
            data.append("upload_preset", "chat-app")
            data.append("cloud_name", "vijayvardhan")
            axios.post("https://api.cloudinary.com/v1_1/vijayvardhan/image/upload", data)
                .then((res) => {
                    console.log("Cloudinary response:", res);
                    setPic(res.data.url.toString());
                    setLoading(false);
                    toast({
                        title: "Image uploaded successfully!",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                })
                .catch((error) => {
                    console.log("Cloudinary error:", error);
                    setLoading(false);
                })
        }

    };
    const submitHandler = async () => {
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        };
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post("/api/user",
                { name, email, password, pic },
                config
            );
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setPicLoading(false);
            <Redirect to="/chats" />
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
        }
    }


    return (
        <div className="form-container">
            <div className="form-control" id="first-name" required>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter Your Name"
                    onChange={(e) => { setName(e.target.value) }}
                />
            </div>

            <div className="form-control" id="email" required>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter Your Email"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
            </div>

            <div className="form-control" id="password" required>
                <label htmlFor="password">Password</label>
                <div className="input-group">
                    <input
                        type={show ? "text" : "password"}
                        id="password"
                        placeholder="Enter Your Password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <div className="show-hide-button" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </div>
                </div>
            </div>

            <div className="form-control" id="confirm-password" required>
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="input-group">
                    <input
                        type={show ? "text" : "password"}
                        id="confirm-password"
                        placeholder="Confirm Your Password"
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                    />
                    <div className="show-hide-button" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </div>
                </div>
            </div>

            <div className="form-control" id="pic" required>
                <label htmlFor="pic">Upload Your Pic</label>
                <div className="input-group">
                    <input
                        type="file"
                        id="pic"
                        accept="image/*"
                        placeholder="Enter Your Password"
                        onChange={(e) => { postDetails(e.target.files[0]) }}
                    />
                </div>
            </div>

            <button
                className="signup-btn"
                onClick={submitHandler}
            // isLoading={loading}
            >
                Sign Up
            </button>
        </div>
    );


}

export default SignUp