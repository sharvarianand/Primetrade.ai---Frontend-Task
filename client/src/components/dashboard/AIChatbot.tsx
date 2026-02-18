'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { useTasks } from '@/context/TaskContext';
import { toast } from 'sonner';

interface Message {
    id: string;
    type: 'user' | 'bot';
    content: string;
}

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'bot',
            content: 'Hello! I am your AI assistant. I can help you manage your tasks. Try saying "Create a task to buy groceries" or "Show my pending tasks".',
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { createTask, deleteTask, tasks } = useTasks();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const processCommand = async (command: string) => {
        const lowerCommand = command.toLowerCase();

        // Simulate AI processing delay
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            if (lowerCommand.includes('create') || lowerCommand.includes('add')) {
                // Simple regex to extract task title
                // "Create task [title]" or "Add task [title]"
                const titleMatch = command.match(/(?:create|add)\s+(?:a\s+)?(?:task\s+)?(?:to\s+)?(.+)/i);

                if (titleMatch && titleMatch[1]) {
                    const title = titleMatch[1];
                    await createTask({
                        title: title,
                        description: 'Created via AI Assistant',
                        status: 'pending',
                        priority: 'medium',
                        dueDate: (() => {
                            const date = new Date();
                            date.setHours(23, 59, 59, 999);
                            return date.toISOString();
                        })(),
                    });
                    return `I've created a new task for you: "${title}"`;
                } else {
                    return "I can create a task for you, but I need a title. Try saying 'Create task Buy Milk'.";
                }
            }

            else if (lowerCommand.includes('delete') || lowerCommand.includes('remove')) {
                // "Delete task [title]"
                const titleMatch = command.match(/(?:delete|remove)\s+(?:task\s+)?(.+)/i);
                if (titleMatch && titleMatch[1]) {
                    const searchTitle = titleMatch[1].toLowerCase();
                    const taskToDelete = tasks.find(t => t.title.toLowerCase().includes(searchTitle));

                    if (taskToDelete) {
                        await deleteTask(taskToDelete.id);
                        return `I've deleted the task: "${taskToDelete.title}"`;
                    } else {
                        return `I couldn't find a task matching "${titleMatch[1]}".`;
                    }
                }
                return "Which task would you like me to delete?";
            }

            else if (lowerCommand.includes('show') || lowerCommand.includes('list')) {
                if (lowerCommand.includes('pending')) {
                    const pendingTasks = tasks.filter(t => t.status === 'pending');
                    return `You have ${pendingTasks.length} pending tasks:\n${pendingTasks.map(t => `- ${t.title}`).join('\n')}`;
                }
                return `You have ${tasks.length} total tasks. Would you like to see 'pending' or 'completed' ones?`;
            }

            else if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
                return "Hello there! How can I help you be more productive today?";
            }

            return "I'm not sure I understand that command yet. I can create, delete, or list tasks for you.";

        } catch (error) {
            console.error('AI Error:', error);
            return "Sorry, I encountered an error while processing your request.";
        } finally {
            setIsTyping(false);
        }
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputValue,
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        const botResponseContent = await processCommand(userMessage.content);

        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'bot',
            content: botResponseContent,
        };

        setMessages(prev => [...prev, botMessage]);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-20 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 h-[500px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-indigo-400/30 shadow-lg shadow-indigo-500/20">
                                    <img
                                        src="/chatbot-avatar.png"
                                        alt="AI Assistant"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-sm">AI Assistant</h3>
                                    <p className="text-xs text-white/50 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/50 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                                            ? 'bg-indigo-600 text-white rounded-tr-sm'
                                            : 'bg-white/10 text-white/90 rounded-tl-sm border border-white/5'
                                            }`}
                                    >
                                        {msg.content.split('\n').map((line, i) => (
                                            <div key={i}>{line}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm border border-white/5 flex items-center space-x-1">
                                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-0" />
                                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-150" />
                                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-300" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/5">
                            <div className="relative flex items-center gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type a command..."
                                    className="bg-black/50 border-white/10 text-white focus-visible:ring-indigo-500/50 pr-10"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
                                    disabled={!inputValue.trim() || isTyping}
                                >
                                    {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white z-50 border border-white/10 hover:shadow-indigo-500/50 transition-all overflow-hidden"
            >
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <img
                        src="/chatbot-avatar.png"
                        alt="AI Assistant"
                        className="w-full h-full object-cover"
                    />
                )}
            </motion.button>
        </>
    );
}
