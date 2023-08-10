import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from "axios"
import { useHistory } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [show, setshow] = useState(false)
    const toast = useToast();
    const [loading, setLoading] = useState(false)
    const [picLoading, setPicLoading] = useState(false);

    const history = useHistory();

    const handleClick = () => setshow(!show);
    const submitHandler = async () => {
        if (!email || !password) {
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

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post("/api/user/login",
                { email, password },
                config
            );
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data)); //storing in local storage
            setPicLoading(false);
            history.push("/chats");
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


    return <div className="form-container">

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

        <button
            className="signup-btn"
            onClick={submitHandler}
        >
            Login
        </button>
        {/* <button
            className="custom-button"
            onClick={() => {
                setEmail("guest@example.com");
                setPassword("123456");
            }}
        >
            Get Guest User Credentials
        </button> */}

    </div>
}

export default Login