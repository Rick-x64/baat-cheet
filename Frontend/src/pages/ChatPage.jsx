import { useAuthStore } from "../store/useAuthStore";
// import { useState } from "react";
function ChatPage() {
    const { logout } = useAuthStore();
    return (
        <div className="z-10">
            Chat Page
            <button onClick={logout}>button</button>
        </div>
    );

}

export default ChatPage;
