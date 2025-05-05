// src/pages/AdminPage.jsx
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const ADMIN_CODE = import.meta.env.VITE_ADMIN_KEY; // .env로 빼도 OK

const AdminPage = () => {
  const [inputCode, setInputCode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [messages, setMessages] = useState([]);

  // 관리자 인증 후 메시지 불러오기
  useEffect(() => {
    if (!isAuthorized) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("cheering")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("데이터 불러오기 오류:", error);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();
  }, [isAuthorized]);

  // 삭제 기능
  const handleDelete = async (id) => {
    const { error } = await supabase.from("cheering").delete().eq("id", id);
    if (error) {
      alert("삭제 실패");
    } else {
      setMessages(messages.filter((msg) => msg.id !== id));
    }
  };

  // 코드 확인
  const handleCodeSubmit = () => {
    if (inputCode === ADMIN_CODE) {
      setIsAuthorized(true);
    } else {
      alert("관리자 코드가 틀렸습니다.");
    }
  };

  // 관리자 코드 입력 UI
  if (!isAuthorized) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>🔐 관리자 인증</h2>
        <input
          type="password"
          placeholder="관리자 코드를 입력하세요"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          style={{ padding: "10px", width: "250px", fontSize: "16px" }}
        />
        <br /><br />
        <button onClick={handleCodeSubmit}>확인</button>
      </div>
    );
  }

  // 메시지 삭제 UI
  return (
    <div style={{ padding: "50px" }}>
      <h2>📋 등록된 고백 메시지 목록</h2>
      {messages.length === 0 ? (
        <p>등록된 메시지가 없습니다.</p>
      ) : (
        <ul>
          {messages.map((msg) => (
            <li key={msg.id} style={{ marginBottom: "20px" }}>
              <strong>{msg.name}</strong>: {msg.text}
              <button
                onClick={() => handleDelete(msg.id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
