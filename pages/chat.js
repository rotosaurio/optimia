 import { useState } from 'react';
import axios from 'axios';
import { useSession, getSession } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()

  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const sendData = async () => {
    try {
      const response = await axios.post('/api/chatapi', { userInput });
      const respuesta = response.data;

      setChatHistory([...chatHistory, { role: 'user', content: userInput }, { role: 'system', content: respuesta }]);

      setUserInput('');
    } catch (error) {
      console.error('Error al enviar datos al backend', error);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

  return (
  <div className="mx-auto p-4 bg-gray-100 rounded-md shadow-md">
  <div className="border p-4 mb-4 bg-white rounded-md shadow-md">
    {/* Historial del chat */}
    {chatHistory.map((message, index) => (
      <div key={index} className={message.role === 'user' ? 'text-right mb-4' : 'mb-3'}>
        <span className={message.role === 'user' ? 'bg-blue-500 text-white p-3 rounded-md' : 'bg-gray-300 p-3 rounded-md block'}>
          {message.content}
        </span>
      </div>
    ))}
  </div>

  {/* Campo de entrada y botón de enviar */}
  <div className="flex">
    <input
      type="text"
      value={userInput}
      onChange={handleInputChange}
      className="flex-grow border p-3 mr-2 rounded-md focus:outline-none"
      placeholder="Escribe un mensaje..."
    />
    <button onClick={sendData} className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none">
      Enviar 
    </button>
  </div>
</div>

  );
}
