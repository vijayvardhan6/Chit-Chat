import { createContext, useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo) {
            history.push("/")
        }
    }, [history]);



    return (
        <ChatContext.Provider
            value={{
                selectedChat,
                setSelectedChat,
                user,
                setUser,
                notification,
                setNotification,
                chats,
                setChats,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

// It allows functional components to consume values from a context, which is essentially a way to share data across the component tree without passing props manually at each level.
export const ChatState = () => {
    return useContext(ChatContext);
}
