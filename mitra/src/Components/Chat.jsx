import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
// We are using Lucide icons for a clean look
import { Leaf, Truck, Send, LogOut, MapPin, User, Loader } from 'lucide-react';

// Color Constants
const COLOR_DARK_COFFEE = '#4f3d2a';
const COLOR_LIGHT_BROWN = '#bd9476';
const COLOR_CREAM_BG = '#f7f4f1';
const COLOR_LIGHT_GRAY = '#efebe7';

// --- MOCK/PLACEHOLDER DATA & FUNCTIONS (REPLACE WITH YOUR MONGODB API CALLS) ---

// Mock Driver Data to simulate MongoDB fetch
const INITIAL_DRIVERS = [
  { id: 'driver_raj', name: 'Rajesh Kumar', location: 'Sector 5, Mohali', status: 'Available' },
  { id: 'driver_suresh', name: 'Suresh Patil', location: 'Shivaji Nagar, Pune', status: 'On Delivery' },
  { id: 'driver_altaf', name: 'Altaf Khan', location: 'Old Delhi Road, Gurgaon', status: 'Available' },
];

// MOCK USER ID - In a real app, this comes from your authentication system
const MOCK_USER_ID = 'farmer_user_99'; 

const fetchDrivers = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/driver");
    if (!res.ok) throw new Error("Failed to fetch drivers");
    const data = await res.json();
    return data; // should be an array of drivers
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return [];
  }
};


// Function to simulate sending a message to your MongoDB API
const postMessage = async (messagePayload) => {
  // --- MONGODB API REPLACEMENT POINT 2 ---
  // Replace this with: await fetch('/api/chats', { method: 'POST', body: JSON.stringify(messagePayload) });
  // Your MongoDB backend would handle persistence and real-time updates.
  await new Promise(resolve => setTimeout(resolve, 200)); 
  console.log("MOCK: Message Sent to MongoDB API endpoint:", messagePayload);
  return { success: true };
};

// Function to simulate real-time chat listening. 
// For a real MongoDB app, this would be replaced by a WebSocket or long-polling mechanism.
const subscribeToChat = (chatID, onNewMessages) => {
  console.log("MOCK: Subscribing to chat updates for:", chatID);
  
  // MOCK DATA: For the demo, we use a simple interval to simulate new messages
  const mockMessages = [];
  
  const interval = setInterval(() => {
    // This part should be replaced by your real-time MongoDB data stream
    onNewMessages(mockMessages.map(msg => ({
      ...msg,
      // Format mock timestamp
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    })));
  }, 1000); 

  // Cleanup function (important for React Hooks)
  return () => {
    clearInterval(interval);
    console.log("MOCK: Unsubscribed from chat updates for:", chatID);
  };
};

// --- END MOCK/PLACEHOLDER DATA & FUNCTIONS ---

const Chat = () => {
  // Application State
  const [drivers, setDrivers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null); 
  
  // Auth/Role State (Simulated)
  const [userId, setUserId] = useState(MOCK_USER_ID); 
  const [isAuthReady, setIsAuthReady] = useState(true); // Always ready for mock
  const isFarmer = true; // Hardcoded role for this farmer portal
  const myRole = isFarmer ? 'farmer' : 'driver'; 
  
  // Ref to automatically scroll the chat window to the bottom
  const messagesEndRef = useRef(null);

  // --- 1. INITIAL DRIVER LIST FETCH (MongoDB API Call) ---
  useEffect(() => {
    const loadDrivers = async () => {
      try {
        const loadedDrivers = await fetchDrivers();
        setDrivers(loadedDrivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    loadDrivers();
  }, []);


  // --- 2. REAL-TIME CHAT LISTENER (MongoDB WebSocket/Polling Simulation) ---
  useEffect(() => {
    if (!selectedDriver) {
        setMessages([]); // Clear messages when no driver is selected
        return;
    }

    // This unique ID should be used to look up the chat session in your MongoDB
    const chatID = [userId, selectedDriver.id].sort().join('_'); 
    
    // In a real app, this function sets up a connection (like a WebSocket) 
    // to listen for new messages related to this chatID.
    const unsubscribe = subscribeToChat(chatID, (newMessages) => {
        setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [userId, selectedDriver]);

  // --- 3. SCROLL TO BOTTOM EFFECT ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedDriver) {
        scrollToBottom();
    }
  }, [messages, selectedDriver]);


  // --- 4. SEND MESSAGE FUNCTION (MongoDB API Call) ---
  const handleSend = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '' || !selectedDriver) return;

    // We add a temporary message locally for a fast UI update (optimistic update)
    const tempId = Date.now();
    const tempTimestamp = 'Sending...';
    const messageText = inputMessage.trim();

    setMessages(prev => [...prev, { 
        id: tempId, 
        text: messageText, 
        role: myRole, 
        timestamp: tempTimestamp 
    }]);
    setInputMessage('');

    const newMessagePayload = {
      text: messageText,
      role: myRole, 
      senderId: userId,
      recipientId: selectedDriver.id,
      timestamp: new Date().toISOString(), // Use ISO string to be saved in MongoDB
    };
    
    try {
      // API call to your MongoDB backend
      await postMessage(newMessagePayload);
      
      // In a real application, the real-time subscription (useEffect 2) 
      // would automatically update the message list with the confirmed message.
      
    } catch (error) {
      console.error("Error sending message:", error);
      // If the send fails, revert the optimistic update
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
      console.error("User facing error: Failed to send message. Please check network connection.");
    }
  };

  // --- MESSAGE BUBBLE COMPONENT ---
  const MessageBubble = ({ message }) => {
    // Determine if the message was sent by the currently logged-in user (the Farmer)
    const isMyMessage = message.role === myRole;
    
    // Own message styles (Farmer: Dark Coffee on the Right)
    const myStyles = `bg-[${COLOR_DARK_COFFEE}] text-white rounded-br-none ml-auto`;
    // Other person's message styles (Driver: Light Brown Theme on the Left)
    const otherStyles = `bg-[${COLOR_LIGHT_GRAY}] text-[${COLOR_DARK_COFFEE}] rounded-tl-none mr-auto border border-[${COLOR_LIGHT_BROWN}]`;

    return (
      <div className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} mb-4 max-w-[90%] sm:max-w-[75%] md:max-w-md`}>
        <div className={`p-4 rounded-xl shadow-md ${isMyMessage ? myStyles : otherStyles}`}>
          <p className="text-sm font-medium break-words">{message.text}</p>
          <p className={`text-xs mt-1 text-right ${isMyMessage ? 'text-gray-300' : 'text-gray-500'}`}>
            {isMyMessage ? 'You' : message.role.charAt(0).toUpperCase() + message.role.slice(1)} • {message.timestamp}
          </p>
        </div>
      </div>
    );
  };
  
  // --- DRIVER SELECTION UI ---
  const DriverSelection = () => (
    <div className={`p-8 sm:p-12 max-w-4xl mx-auto w-full bg-[${COLOR_CREAM_BG}]`}>
      <h2 className={`text-3xl font-bold text-center text-[${COLOR_DARK_COFFEE}] mb-4`}>
        Select a Driver to Connect
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Start a real-time conversation to coordinate product pickup and delivery.
      </p>

      {!isAuthReady || drivers.length === 0 ? (
        <div className="flex items-center justify-center p-20 text-gray-500">
             <Loader className='w-6 h-6 animate-spin mr-3 text-[#bd9476]' /> Fetching drivers...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver) => (
            <div 
              key={driver.id} 
              onClick={() => driver.status === 'Available' && setSelectedDriver(driver)}
              className={`
                bg-white p-6 rounded-xl shadow-lg border-2 
                ${driver.status === 'Available' 
                  ? 'border-[#bd9476] cursor-pointer hover:shadow-xl hover:bg-[#fcfaf8] transition duration-200' 
                  : 'border-gray-200 cursor-not-allowed opacity-70'
                }
              `}
            >
              <User className={`w-8 h-8 mb-3 text-[${COLOR_DARK_COFFEE}]`} />
              <h3 className={`text-xl font-semibold text-[${COLOR_DARK_COFFEE}]`}>{driver.name}</h3>
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-gray-400" /> {driver.location}
              </p>
              <p className={`mt-3 text-sm font-bold 
                ${driver.status === 'Available' ? 'text-green-600' : 'text-orange-500'}`}>
                Status: {driver.status}
              </p>
              <button
                disabled={driver.status !== 'Available'}
                className={`w-full mt-4 py-2 text-white text-sm font-medium rounded-lg transition duration-200
                  ${driver.status === 'Available' 
                    ? `bg-[#bd9476] hover:bg-[#4f3d2a] shadow-md` 
                    : 'bg-gray-400'
                  }
                `}
              >
                {driver.status === 'Available' ? 'Start Chat' : 'Unavailable'}
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-10 text-center">
        <p className="text-sm text-gray-500">Current User ID (Farmer): {userId || 'N/A'}</p>
        <p className="text-xs text-gray-400 italic mt-1">This ID is used to manage your private conversations.</p>
      </div>
    </div>
  );

  if (!isAuthReady) {
    return (
        <div className={`min-h-screen flex items-center justify-center bg-[${COLOR_CREAM_BG}]`}>
            <div className='flex items-center text-xl text-gray-700'>
                <Loader className='w-6 h-6 animate-spin mr-3 text-[#bd9476]' /> Connecting to Agrimitra...
            </div>
        </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-[${COLOR_CREAM_BG}] font-sans antialiased`}>
      
      {/* Header / Navbar */}
      <header className={`bg-[${COLOR_DARK_COFFEE}] shadow-lg sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <Leaf className={`w-8 h-8 text-[${COLOR_LIGHT_BROWN}]`} />
            <h1 className={`text-xl font-extrabold text-white tracking-tight`}>
              Agrimitra | Logistics Chat
            </h1>
          </div>
          
          {/* Back/Logout */}
          <div className="flex items-center space-x-4">
            {selectedDriver && (
              <button
                onClick={() => setSelectedDriver(null)}
                className={`flex items-center text-gray-200 hover:text-[${COLOR_LIGHT_BROWN}] transition duration-150`}
              >
                <Truck className="w-5 h-5 mr-1" /> Back to Driver List
              </button>
            )}
            
          </div>

        </div>
      </header>
      
      {/* Conditional Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {selectedDriver ? (
          // --- CHAT INTERFACE ---
          <div className="flex flex-col h-full max-w-5xl mx-auto w-full">
            
            {/* Conversation Header */}
            <div className="p-4 sm:p-6 bg-white border-b border-gray-200 shadow-sm text-center">
                <p className={`text-lg font-semibold text-[${COLOR_DARK_COFFEE}]`}>
                    Chatting with {selectedDriver.name}
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-center">
                    <MapPin className="w-4 h-4 mr-1" /> {selectedDriver.location}
                </p>
            </div>

            {/* Conversation Area */}
            <div className={`flex-1 overflow-y-auto p-4 sm:p-6 bg-[${COLOR_CREAM_BG}]`}>
              {messages.length === 0 && (
                <div className="text-center p-10 text-gray-500">
                  You are now connected. Send a message to start coordinating your delivery!
                </div>
              )}
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              
              <div ref={messagesEndRef} /> {/* Scroll target */}
            </div>

            {/* Message Input Area */}
            <form onSubmit={handleSend} className={`p-4 sm:p-6 bg-white border-t border-[${COLOR_LIGHT_GRAY}] shadow-md`}>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Send a message as Farmer...`}
                  className={`flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#bd9476] focus:border-[#bd9476] transition`}
                  disabled={!isAuthReady}
                />
                <button
                  type="submit"
                  className={`p-3 rounded-xl text-white bg-[#4f3d2a] hover:bg-black transition duration-300 shadow-lg disabled:opacity-50`}
                  disabled={!isAuthReady}
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          // --- DRIVER SELECTION SCREEN ---
          <DriverSelection />
        )}
      </main>
      
    </div>
  );
};

export default Chat;



