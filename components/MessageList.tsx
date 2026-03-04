
import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  onFeedback: (messageId: string, type: 'up' | 'down') => void;
}

interface MessageItemProps {
  msg: Message;
  onFeedback: (messageId: string, type: 'up' | 'down') => void;
  renderContent: (content: string) => React.ReactNode;
}

const MessageItem: React.FC<MessageItemProps> = ({ msg, onFeedback, renderContent }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(msg.content + "\n\n— Radical Uncertainty Roundtables: The Infrastructure of Intelligence")}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`relative max-w-[92%] md:max-w-[85%] transition-all duration-300 group ${
          msg.role === 'user' 
            ? 'bg-white/[0.04] backdrop-blur-xl px-6 py-4 rounded-[24px] rounded-tr-sm border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] text-white' 
            : 'bg-transparent border-l border-[#8E8E93]/20 pl-6 py-2'
        }`}
      >
        {/* Assistant Header */}
        {msg.role === 'assistant' && (
          <div className="font-serif text-[10px] uppercase tracking-[0.2em] text-[#8E8E93] mb-4 opacity-70">
            Roundtables Assistant Briefing
          </div>
        )}

        {/* User Message Copy Button (Absolute Corner) */}
        {msg.role === 'user' && (
          <button 
            onClick={handleCopy}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity p-1"
            title="Copy Message"
          >
            {copied ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
          </button>
        )}

        <div className="text-[15px] antialiased leading-relaxed">
          {renderContent(msg.content)}
        </div>

        {msg.sources && msg.sources.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-[10px] text-[#8E8E93] uppercase tracking-widest mb-3 opacity-60">Strategic Intelligence Sources</div>
            <div className="flex flex-wrap gap-2">
              {msg.sources.map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] bg-white/5 hover:bg-white hover:text-black px-3 py-1.5 rounded-full text-[#8E8E93] border border-white/10 transition-all duration-200"
                >
                  {source.title.length > 30 ? source.title.substring(0, 30) + '...' : source.title}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Assistant Actions Bar */}
        {msg.role === 'assistant' && msg.id !== 'initial' && (
          <div className="mt-4 flex items-center gap-4 pt-2 border-t border-white/5">
            <div className="flex gap-2">
              <button 
                onClick={() => onFeedback(msg.id, 'up')}
                className={`p-1.5 transition-colors duration-200 rounded-lg hover:bg-white/5 ${msg.feedback === 'up' ? 'text-white' : 'text-[#8E8E93] hover:text-white'}`}
                aria-label="Helpful"
                title="Helpful"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </button>
              <button 
                onClick={() => onFeedback(msg.id, 'down')}
                className={`p-1.5 transition-colors duration-200 rounded-lg hover:bg-white/5 ${msg.feedback === 'down' ? 'text-white' : 'text-[#8E8E93] hover:text-white'}`}
                aria-label="Not Helpful"
                title="Not Helpful"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                </svg>
              </button>
            </div>
            
            <div className="w-[1px] h-3 bg-white/10"></div>
            
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider transition-all duration-200 py-1.5 px-2 rounded-lg hover:bg-white/5 ${copied ? 'text-green-400' : 'text-[#8E8E93] hover:text-white'}`}
              title="Copy Briefing"
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span>Copy Briefing</span>
                </>
              )}
            </button>

            <button 
              onClick={handleShare}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider transition-all duration-200 py-1.5 px-2 rounded-lg hover:bg-white/5 text-[#8E8E93] hover:text-white"
              title="Share to LinkedIn"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span>Share</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, onFeedback }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.trim() === '') return <div key={i} className="h-2" />;
      
      if (line.startsWith('# ')) return <h1 key={i} className="font-serif text-2xl font-bold mt-6 mb-3 text-white border-b border-white/10 pb-2">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="font-serif text-xl font-bold mt-5 mb-2 text-white">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="font-serif text-lg font-bold mt-4 mb-2 text-[#F5F5F7]">{line.replace('### ', '')}</h3>;
      if (line.startsWith('* ')) return <li key={i} className="ml-4 list-disc mb-2 pl-2 text-[#F5F5F7]/80 leading-relaxed">{processParts(line.replace('* ', ''))}</li>;
      if (line.startsWith('---')) return <hr key={i} className="border-white/10 my-6" />;
      
      return <p key={i} className="mb-3 leading-relaxed text-[#F5F5F7]/90">{processParts(line)}</p>;
    });
  };

  const processParts = (text: string) => {
    let currentParts: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    
    // Regex for bold and italic markdown
    const combinedRegex = /(\*\*.*?\*\*)|(\*.*?\*)/g;
    let match;
    
    while ((match = combinedRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        currentParts.push(text.substring(lastIndex, match.index));
      }
      
      const m = match[0];
      if (m.startsWith('**')) {
        currentParts.push(<strong key={match.index} className="font-bold text-white">{m.slice(2, -2)}</strong>);
      } else if (m.startsWith('*')) {
        currentParts.push(<em key={match.index} className="not-italic text-[#8E8E93] font-medium">{m.slice(1, -1)}</em>);
      }
      
      lastIndex = combinedRegex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      currentParts.push(text.substring(lastIndex));
    }
    
    return currentParts.length > 0 ? currentParts : [text];
  };

  const [loadingText, setLoadingText] = useState('Thinking');

  useEffect(() => {
    if (!isTyping) return;
    
    const states = ['Thinking', 'Aggregating Intelligence', 'Synthesizing Data', 'Formulating Strategy'];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % states.length;
      setLoadingText(states[index]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isTyping]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 pt-40 pb-40 space-y-8 scroll-smooth no-scrollbar">
      {messages.map((msg) => (
        <MessageItem 
          key={msg.id} 
          msg={msg} 
          onFeedback={onFeedback} 
          renderContent={renderContent} 
        />
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <div className="border-l border-[#8E8E93]/30 pl-6 py-4">
            <div className="flex flex-col gap-2">
              <div className="text-[10px] uppercase tracking-widest text-[#8E8E93] animate-pulse">
                {loadingText}...
              </div>
              <div className="flex space-x-2">
                <div className="w-1.5 h-1.5 bg-[#8E8E93] rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-[#8E8E93] rounded-full animate-pulse [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-[#8E8E93] rounded-full animate-pulse [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
