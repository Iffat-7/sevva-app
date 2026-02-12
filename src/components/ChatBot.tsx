import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

const knowledgeBase: { keywords: string[]; answer: string }[] = [
  { keywords: ["hour", "time", "open", "close", "timing"], answer: "SEVVA Restaurant is open daily from 12:00 PM to 12:00 AM (midnight). Hours may vary on public holidays or special events." },
  { keywords: ["address", "location", "where", "direction", "map"], answer: "We're located at Adda Plot Roundabout, Raiwind Road, opposite GO Pump, near Lake City, Lahore, Punjab 54790, Pakistan." },
  { keywords: ["phone", "call", "contact", "number", "whatsapp"], answer: "You can reach us at +92 315 1773177 (Phone & WhatsApp). We prefer booking via phone or WhatsApp." },
  { keywords: ["book", "reservation", "reserve", "table"], answer: "You can book a table through our app's Booking page, or directly via WhatsApp/phone at +92 315 1773177. We need your name, contact, date, time, and number of guests." },
  { keywords: ["menu", "food", "eat", "dish", "cuisine"], answer: "We specialize in Desi cuisine with Pakistani BBQ, Karahi, Handi, Tawa specials, Arabic & Turkish dishes, Tandoor breads, and desserts. Check our Menu page for the full list with prices!" },
  { keywords: ["hitea", "hi-tea", "buffet", "brunch"], answer: "Our Hi-Tea Buffet features 50+ items including snacks, mains, live counters & desserts for ~PKR 2,000 + tax. Sunday Premium Brunch is ~PKR 1,800 + tax. Prices subject to change — please confirm when booking." },
  { keywords: ["karahi", "half", "full"], answer: "Our signature Karahi is available in Half (PKR 1,300) and Full (PKR 2,500) portions, cooked in pure desi ghee with fresh tomatoes and green chilies." },
  { keywords: ["bbq", "tikka", "kebab", "kabab", "grill", "boti"], answer: "Our BBQ section includes Tikka Boti (12 pcs - PKR 1,300), Malai Boti (12 pcs - PKR 1,699), Seekh Kababs, Mutton Chops (6 pcs - PKR 2,999), and Bosphorus Fish Tikka (PKR 2,499)." },
  { keywords: ["delivery", "deliver", "order", "pickup"], answer: "You can order for pickup or delivery through our app! Select your items, choose pickup or delivery, and confirm via WhatsApp for fastest processing." },
  { keywords: ["platter", "family", "group"], answer: "We offer Signature Platters — Platter for 2 (PKR 3,358) and Platter for 4 (PKR 6,000) with an assortment of our best grilled meats and sides." },
  { keywords: ["dessert", "sweet", "gulab", "kheer", "halwa"], answer: "Our desserts include Hot Gulab Jamun (3 pcs - PKR 350), Sheherzadi Shahi Kheer (PKR 450), and Gajar Ka Halwa (250g - PKR 500)." },
  { keywords: ["naan", "roti", "bread", "tandoor"], answer: "From our Tandoor: Khameeri Roti (PKR 50), various Naan options (PKR 199), Choopri Roti (PKR 120), and stuffed naans — Chicken (PKR 749), Beef Qeema (PKR 849), Mutton Qeema (PKR 1,200)." },
  { keywords: ["special", "signature", "famous", "best", "popular", "recommend"], answer: "Our signature dishes include Sevva's Mutton Joints (PKR 2,995), Sevva Kuna Pot (PKR 2,995), Tawa Chicken (PKR 950), and Nawabi Butter Handi (PKR 2,100). The Malai Boti and Tikka Boti are customer favorites!" },
  { keywords: ["price", "cost", "expensive", "cheap", "budget"], answer: "Our prices range from PKR 50 (Khameeri Roti) to PKR 6,000 (Platter for 4). Main dishes range PKR 950–2,999. Prices are approximate and subject to change — please confirm when ordering." },
  { keywords: ["cancel", "cancellation"], answer: "For cancellations, please contact us directly at +92 315 1773177 via WhatsApp or phone. We'll process your cancellation promptly." },
  { keywords: ["payment", "pay", "cash", "card"], answer: "Please contact the restaurant directly at +92 315 1773177 for payment options and details." },
  { keywords: ["handi", "butter", "mughlai", "jalfrezi", "achari"], answer: "Our Boneless Handi section features Nawabi Butter Handi (PKR 2,100), Mughlai Handi (PKR 2,500), Chicken Jalfrezi Handi (PKR 2,100), and Achari Handi (PKR 2,100)." },
  { keywords: ["tawa", "brain", "champ", "raan"], answer: "Sevva's Tawa Specials: Tawa Chicken (PKR 950), Champ Qeema 4 pcs (PKR 3,299), Taka Tak (PKR 1,999), Shehzadi Raan Qeema (PKR 2,495), Brain Masala (PKR 1,599)." },
  { keywords: ["mutton", "qorma", "palak", "shorba"], answer: "Mutton Section: Desi Chicken Shorba Quarter (PKR 1,799), Mutton Palak (PKR 1,995), Mutton Royal Qorma (PKR 2,499)." },
  { keywords: ["hello", "hi", "hey", "assalam", "salam"], answer: "Welcome to SEVVA Restaurant! 🍽️ I'm here to help you with our menu, bookings, hours, location, or anything else. What would you like to know?" },
];

const findAnswer = (query: string): string => {
  const lower = query.toLowerCase();
  let bestMatch = { score: 0, answer: "" };

  for (const entry of knowledgeBase) {
    const score = entry.keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestMatch.score) {
      bestMatch = { score, answer: entry.answer };
    }
  }

  if (bestMatch.score > 0) return bestMatch.answer;
  return "I'd be happy to help! You can ask me about our menu, hours (12 PM–12 AM daily), booking a table, our location on Raiwind Road, or any of our dishes. For specific queries, feel free to WhatsApp us at +92 315 1773177 🍽️";
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "bot", content: "Assalam-o-Alaikum! Welcome to SEVVA Restaurant 🍽️ How can I help you today? Ask me about our menu, timings, booking, or anything else!" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    const answer = findAnswer(input.trim());
    const botMsg: Message = { id: (Date.now() + 1).toString(), role: "bot", content: answer };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-gold-gradient shadow-gold-lg flex items-center justify-center text-primary-foreground transition-transform hover:scale-110 active:scale-95"
            aria-label="Open chat"
          >
            <Bot size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-20 right-3 left-3 z-50 max-w-sm mx-auto"
          >
            <div className="glass-card rounded-2xl overflow-hidden border border-primary/20 shadow-gold-lg flex flex-col" style={{ height: "min(70vh, 500px)" }}>
              {/* Header */}
              <div className="bg-gold-gradient p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <Bot size={18} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-primary-foreground text-sm">SEVVA Assistant</h3>
                    <p className="text-[10px] text-primary-foreground/70">Always here to help</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center ${msg.role === "bot" ? "bg-primary/20" : "bg-secondary"}`}>
                      {msg.role === "bot" ? <Bot size={14} className="text-primary" /> : <User size={14} className="text-foreground" />}
                    </div>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                      msg.role === "bot"
                        ? "bg-secondary text-secondary-foreground rounded-tl-sm"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border/30 shrink-0">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask about menu, hours, booking..."
                    className="flex-1 bg-secondary rounded-xl px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
                    maxLength={500}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center text-primary-foreground disabled:opacity-50 transition-transform active:scale-90"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <div className="flex gap-1.5 mt-2 overflow-x-auto scrollbar-hide">
                  {["Menu", "Hours", "Book Table", "Location", "Specials"].map((q) => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); }}
                      className="shrink-0 px-2.5 py-1 rounded-full bg-muted text-[10px] font-medium text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
