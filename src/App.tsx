import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Compass, 
  Plane, 
  Calendar, 
  Search, 
  ArrowRight, 
  MessageSquare, 
  X, 
  Send,
  Globe,
  Star,
  ChevronRight,
  Menu,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getTravelAdvice } from './services/gemini';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Types
interface Destination {
  id: string;
  title: string;
  location: string;
  image: string;
  price: string;
  rating: number;
  category: 'Coastal' | 'Mountain' | 'Urban' | 'Cultural';
}

const DESTINATIONS: Destination[] = [
  {
    id: '1',
    title: 'Amalfi Coast',
    location: 'Italy',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800',
    price: '$2,400',
    rating: 4.9,
    category: 'Coastal'
  },
  {
    id: '2',
    title: 'Kyoto Temples',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    price: '$1,800',
    rating: 4.8,
    category: 'Cultural'
  },
  {
    id: '3',
    title: 'Swiss Alps',
    location: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?auto=format&fit=crop&q=80&w=800',
    price: '$3,200',
    rating: 5.0,
    category: 'Mountain'
  },
  {
    id: '4',
    title: 'Santorini',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
    price: '$2,100',
    rating: 4.7,
    category: 'Coastal'
  },
  {
    id: '5',
    title: 'Marrakech Medina',
    location: 'Morocco',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=800',
    price: '$1,500',
    rating: 4.6,
    category: 'Cultural'
  },
  {
    id: '6',
    title: 'Reykjavik',
    location: 'Iceland',
    image: 'https://images.unsplash.com/photo-1520637102912-2df6bb2aec6d?auto=format&fit=crop&q=80&w=800',
    price: '$2,900',
    rating: 4.9,
    category: 'Urban'
  }
];

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await getTravelAdvice(userMessage);
    setMessages(prev => [...prev, { role: 'ai', content: aiResponse || 'Failed to get response.' }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <Compass className="text-black w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase">Wanderlust</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Destinations', 'Experiences', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
            <button className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95">
              Book Now
            </button>
          </div>

          <button className="md:hidden p-2 text-white/60">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6">
              Exclusive Travel 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              UNVEIL THE <br />
              <span className="text-emerald-500 italic font-serif">EXTRAORDINARY</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Curated journeys for the modern explorer. Experience the world's most breathtaking destinations with unparalleled luxury and local insight.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-10 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group">
                Explore Destinations
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 backdrop-blur-md font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                Plan with AI
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 left-0 w-full">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8">
            {[
              { label: 'Destinations', value: '150+' },
              { label: 'Happy Travelers', value: '12k+' },
              { label: 'Luxury Hotels', value: '450+' },
              { label: 'Countries', value: '45+' }
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-white/40 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Curated Escapes</h2>
              <p className="text-white/40 max-w-md">Carefully selected destinations that offer unique experiences and exceptional luxury.</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {['All', 'Coastal', 'Mountain', 'Cultural', 'Urban'].map((cat) => (
                <button 
                  key={cat}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                    cat === 'All' ? "bg-white text-black" : "bg-white/5 text-white/60 hover:bg-white/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS.map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6">
                  <img 
                    src={dest.image} 
                    alt={dest.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                    <span className="text-xs font-bold">{dest.rating}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <button className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{dest.title}</h3>
                    <div className="flex items-center gap-1 text-white/40 text-sm">
                      <MapPin className="w-3 h-3" />
                      {dest.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 font-bold">{dest.price}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/20">per person</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why Us */}
      <section className="py-32 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                icon: <Globe className="w-8 h-8 text-emerald-500" />,
                title: 'Global Reach',
                desc: 'Access to exclusive destinations across 7 continents, from hidden gems to iconic landmarks.'
              },
              {
                icon: <Star className="w-8 h-8 text-emerald-500" />,
                title: 'Elite Service',
                desc: '24/7 personalized concierge service to handle every detail of your journey.'
              },
              {
                icon: <Plane className="w-8 h-8 text-emerald-500" />,
                title: 'Seamless Travel',
                desc: 'End-to-end logistics management for a stress-free exploration experience.'
              }
            ].map((feature) => (
              <div key={feature.title}>
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Compass className="text-emerald-500 w-8 h-8" />
                <span className="text-2xl font-bold tracking-tighter uppercase">Wanderlust</span>
              </div>
              <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
                Redefining luxury travel through curated experiences and personalized service. Explore the world with confidence and style.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-white/20">Quick Links</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Destinations</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Travel Guides</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-white/20">Newsletter</h4>
              <p className="text-sm text-white/40 mb-4">Subscribe for exclusive travel offers.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 w-full"
                />
                <button className="p-2 bg-emerald-500 text-black rounded-full hover:bg-emerald-400 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20 uppercase tracking-widest font-medium">
            <div>© 2026 Wanderlust Elite. All rights reserved.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-6 right-6 w-full max-w-[450px] h-[600px] bg-[#111] border border-white/10 rounded-[32px] shadow-2xl z-[70] flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-emerald-500 text-black">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <Globe className="text-emerald-500 w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Travel Assistant</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold opacity-60">Powered by Gemini</div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-black/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h4 className="font-bold mb-2">Plan Your Dream Trip</h4>
                    <p className="text-sm text-white/40 px-8">Ask me about destinations, itineraries, or travel tips. I'm here to help!</p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex flex-col max-w-[85%]",
                      msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div className={cn(
                      "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      msg.role === 'user' 
                        ? "bg-emerald-500 text-black font-medium" 
                        : "bg-white/5 text-white/80 border border-white/10"
                    )}>
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/20 mt-2 font-bold">
                      {msg.role === 'user' ? 'You' : 'Assistant'}
                    </span>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 items-center text-white/40 text-xs font-bold uppercase tracking-widest">
                    <div className="flex gap-1">
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-emerald-500 rounded-full" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-emerald-500 rounded-full" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-emerald-500 rounded-full" />
                    </div>
                    Thinking...
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-6 border-t border-white/5 bg-black/40">
                <div className="relative">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Where to next?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-14 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Chat Trigger */}
      {!isChatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-500 text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
        >
          <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-4 border-[#050505]" />
        </motion.button>
      )}

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
