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
    { id: "welcome", role: "bot", content: "Welcome to SEVVA! 🍽️ Ask me about our menu, timings, booking, or anything else!" },
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
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-[72px] right-4 z-40 w-12 h-12 rounded-full bg-gold-gradient shadow-gold flex items-center justify-center text-primary-foreground active:scale-95"
            aria-label="Open chat"
          >
            <Bot size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-[72px] right-3 z-50 w-[calc(100%-24px)] max-w-sm"
          >
            <div className="glass-card rounded-2xl overflow-hidden border border-primary/20 shadow-gold-lg flex flex-col" style={{ height: "min(60vh, 420px)" }}>
              <div className="bg-gold-gradient px-3 py-2.5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Bot size={16} className="text-primary-foreground" />
                  <span className="font-display font-bold text-primary-foreground text-xs">SEVVA Assistant</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-1.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center ${msg.role === "bot" ? "bg-primary/20" : "bg-secondary"}`}>
                      {msg.role === "bot" ? <Bot size={12} className="text-primary" /> : <User size={12} className="text-foreground" />}
                    </div>
                    <div className={`max-w-[80%] rounded-xl px-2.5 py-1.5 text-[11px] leading-relaxed ${
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

              <div className="p-2 border-t border-border/30 shrink-0">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask anything..."
                    className="flex-1 bg-secondary rounded-lg px-2.5 py-2 text-[11px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
                    maxLength={500}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center text-primary-foreground disabled:opacity-50 active:scale-90"
                  >
                    <Send size={14} />
                  </button>
                </div>
                <div className="flex gap-1 mt-1.5 overflow-x-auto scrollbar-hide">
                  {["Menu", "Hours", "Book", "Location"].map((q) => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); }}
                      className="shrink-0 px-2 py-0.5 rounded-full bg-muted text-[9px] font-medium text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
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
