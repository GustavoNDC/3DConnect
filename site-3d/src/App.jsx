import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MessageCircle, Printer, Box, Cpu, X, Send, User, Bot, 
  ChevronRight, Star, Hammer, MapPin, Clock, Paperclip, ArrowLeft, Filter,
  Lock, Mail, Github, Chrome
} from 'lucide-react';

// --- MOCK DATA ---

const MOCK_MODELS = [
  { id: 1, title: "Suporte de Headset Cyberpunk", category: "Acessórios", price: "R$ 45,00", image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=400", author: "NeoDesign" },
  { id: 2, title: "Vaso Geométrico Low-Poly", category: "Decoração", price: "R$ 30,00", image: "https://images.unsplash.com/photo-1589828156827-1428a2a09f87?auto=format&fit=crop&q=80&w=400", author: "ArtHouse" },
  { id: 3, title: "Peça de Xadrez Gigante", category: "Jogos", price: "R$ 25,00", image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&q=80&w=400", author: "GameMaster" },
  { id: 4, title: "Prótese Mecânica Articulada", category: "Funcional", price: "R$ 150,00", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400", author: "TechLab" },
  { id: 5, title: "Miniatura RPG Dragão", category: "Miniaturas", price: "R$ 60,00", image: "https://images.unsplash.com/photo-1633519183604-a15d59728cb1?auto=format&fit=crop&q=80&w=400", author: "DungeonForge" },
  { id: 6, title: "Engrenagem Planetária", category: "Engenharia", price: "R$ 40,00", image: "https://images.unsplash.com/photo-1531297461136-82lwDe43?auto=format&fit=crop&q=80&w=400", author: "Engenheiro3D" },
  { id: 7, title: "Case Raspberry Pi 4", category: "Eletrônica", price: "R$ 35,00", image: "https://images.unsplash.com/photo-1601057790757-b089601ae56b?auto=format&fit=crop&q=80&w=400", author: "MakerPro" },
  { id: 8, title: "Action Figure Guerreiro", category: "Colecionável", price: "R$ 120,00", image: "https://images.unsplash.com/photo-1560963689-093356bc082f?auto=format&fit=crop&q=80&w=400", author: "SculptMaster" },
];

const MOCK_PRINTERS = [
  { id: 1, name: "Marcos Silva", machine: "Prusa i3 MK3S", type: "FDM", location: "São Paulo, SP", rating: 4.9, price: "R$ 15/hora", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Ana Tech", machine: "Elegoo Saturn 2", type: "Resina 8K", location: "Rio de Janeiro, RJ", rating: 5.0, price: "R$ 25/hora", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "FabLab Centro", machine: "Farm (10x Ender 3)", type: "FDM", location: "Curitiba, PR", rating: 4.7, price: "R$ 10/hora", avatar: "https://i.pravatar.cc/150?u=3" },
];

const MOCK_MODELERS = [
  { id: 1, name: "Sarah Connor", specialty: "Personagens RPG", software: "ZBrush, Blender", rating: 5.0, price: "R$ 80/hora", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: 2, name: "John Doe", specialty: "Peças Mecânicas", software: "Fusion 360", rating: 4.8, price: "R$ 60/hora", avatar: "https://i.pravatar.cc/150?u=5" },
];

const MOCK_CHATS = {
  printer: [
    { id: 1, sender: 'other', text: 'Olá! Recebi suas informações da triagem. Vi que é uma miniatura pequena.' },
    { id: 2, sender: 'me', text: 'Isso! Tenho o STL aqui. Você consegue fazer em alta resolução?' },
    { id: 3, sender: 'other', text: 'Com certeza! A Saturn 2 é perfeita pra isso (8K). O detalhe fica incrível.' },
    { id: 4, sender: 'me', text: 'Precisa colocar os suportes ainda. Quanto ficaria?' },
    { id: 5, sender: 'other', text: 'Para preparar e imprimir, cobro R$ 45,00 + frete. Demora cerca de 6 horas pra imprimir. O que acha?' },
  ],
  modeler: [
    { id: 1, sender: 'other', text: 'Oi! O assistente me passou que você quer um busto do seu pet. Adoro fazer isso!' },
    { id: 2, sender: 'me', text: 'Que bom! Tenho várias fotos dele.' },
    { id: 3, sender: 'other', text: 'Ótimo. É um cachorro ou gato? Pode me mandar as referências?' },
    { id: 4, sender: 'me', text: 'É um Bulldog Francês. Vou mandar as fotos.' },
    { id: 5, sender: 'other', text: 'Perfeito! Bulldogues ficam ótimos impressos. O orçamento base é R$ 150,00.' },
  ]
};

// --- COMPONENTS ---

// 1. Navigation Bar
const Navbar = ({ setPage, currentPage }) => (
  <nav className="w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-md sticky top-0 z-50">
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setPage('home')}
        >
          <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-2 rounded-lg group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
            <Box size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            3D Connect
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-1">
          {['models', 'printers', 'modelers'].map((key) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentPage === key 
                ? 'bg-slate-800 text-cyan-400' 
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
              }`}
            >
              {key === 'models' ? 'Modelos Prontos' : key === 'printers' ? 'Alugar Impressora' : 'Encomendar Modelagem'}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setPage('login')}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-full font-medium transition-all shadow-[0_0_10px_rgba(8,145,178,0.3)] flex items-center gap-2"
        >
          <User size={18} /> Entrar
        </button>
      </div>
    </div>
  </nav>
);

// 2. Home Page
const HomePage = ({ setPage }) => (
  <div className="w-full">
    {/* Hero */}
    <div className="relative w-full overflow-hidden border-b border-slate-800">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631541909061-71e349d1f203?q=80&w=2000')] bg-cover bg-center opacity-5"></div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
          Sua imaginação, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Materializada.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10">
          O maior marketplace de impressão 3D do Brasil. Conecte-se com makers, alugue máquinas de alta performance ou compre modelos exclusivos.
        </p>
        <div className="flex justify-center gap-4 flex-col sm:flex-row">
          <button 
            onClick={() => setPage('printers')}
            className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Printer size={20} /> Quero Imprimir
          </button>
          <button 
            onClick={() => setPage('models')}
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold text-lg border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
          >
            <Search size={20} /> Explorar Modelos
          </button>
        </div>
      </div>
    </div>

    {/* Featured Categories */}
    <div className="w-full max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-2xl font-bold mb-8 text-slate-200">Categorias em Alta</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Box className="text-cyan-400" />, title: "Modelos Prontos", desc: "Baixe arquivos STL verificados.", action: "models" },
          { icon: <Printer className="text-purple-400" />, title: "Impressão sob Demanda", desc: "Encontre uma impressora perto de você.", action: "printers" },
          { icon: <Cpu className="text-green-400" />, title: "Modelagem Personalizada", desc: "Tire sua ideia do papel com um expert.", action: "modelers" },
        ].map((item, idx) => (
          <div 
            key={idx}
            onClick={() => setPage(item.action)}
            className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/30 hover:bg-slate-800 transition-all cursor-pointer group"
          >
            <div className="bg-slate-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 3. Login Page
const LoginPage = ({ setPage }) => (
  <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center px-4 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000')] bg-cover bg-center">
    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>
    
    <div className="relative w-full max-w-md bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 w-16 h-16 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
          <Box size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">Bem-vindo de volta!</h2>
        <p className="text-slate-400 mt-2">Acesse sua conta para continuar.</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setPage('home'); }} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input type="email" placeholder="seu@email.com" className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Senha</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input type="password" placeholder="••••••••" className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors" />
          </div>
        </div>

        <div className="flex justify-end">
          <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300">Esqueceu a senha?</a>
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold py-3 rounded-lg shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5">
          Entrar
        </button>
      </form>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-800 text-slate-500">Ou continue com</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center py-2.5 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors text-slate-300">
            <Chrome size={20} className="mr-2" /> Google
          </button>
          <button className="flex items-center justify-center py-2.5 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors text-slate-300">
            <Github size={20} className="mr-2" /> GitHub
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-slate-400">
        Não tem uma conta? <a href="#" className="font-bold text-cyan-400 hover:text-cyan-300">Registre-se</a>
      </p>
    </div>
  </div>
);

// 4. Models Page
const ModelsPage = () => (
  <div className="w-full max-w-7xl mx-auto px-4 py-8">
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filter */}
      <div className="w-full md:w-64 shrink-0 space-y-6">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Filter size={18}/> Filtros</h3>
          <div className="space-y-3">
            <div className="text-sm text-slate-400 font-medium">Categoria</div>
            {['Todos', 'Acessórios', 'Decoração', 'Cosplay', 'Engenharia'].map(cat => (
              <label key={cat} className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 cursor-pointer">
                <input type="checkbox" className="rounded bg-slate-700 border-slate-600 text-cyan-500 focus:ring-0" />
                {cat}
              </label>
            ))}
            <div className="h-px bg-slate-700 my-4"></div>
            <div className="text-sm text-slate-400 font-medium">Preço</div>
            <input type="range" className="w-full accent-cyan-500" />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Catálogo de Modelos</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input type="text" placeholder="Buscar..." className="bg-slate-800 border-none rounded-full py-2 pl-10 pr-4 text-slate-200 focus:ring-1 focus:ring-cyan-500" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MODELS.map((model) => (
            <div key={model.id} className="group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img src={model.image} alt={model.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 truncate">{model.title}</h3>
                <p className="text-xs text-slate-400 mb-3">{model.category}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-cyan-400">{model.price}</span>
                  <button className="p-2 bg-slate-700 rounded-lg hover:bg-cyan-600 text-white transition-colors">
                    <Box size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// 5. Printers Page
const PrintersPage = ({ onChatStart }) => (
  <div className="w-full max-w-7xl mx-auto px-4 py-8">
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold text-white">Encontre uma Impressora</h2>
      <p className="text-slate-400 mt-2">Makers verificados prontos para imprimir seu projeto.</p>
    </div>

    <div className="grid gap-4">
      {MOCK_PRINTERS.map(printer => (
        <div key={printer.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row items-center gap-6 hover:border-purple-500/50 transition-all">
          <img src={printer.avatar} alt={printer.name} className="w-20 h-20 rounded-full border-2 border-slate-600" />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">{printer.name}</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm text-slate-300">
              <span className="flex items-center gap-1"><Printer size={16} className="text-purple-400"/> {printer.machine} ({printer.type})</span>
              <span className="flex items-center gap-1"><MapPin size={16} className="text-red-400"/> {printer.location}</span>
              <span className="flex items-center gap-1"><Star size={16} className="text-yellow-400"/> {printer.rating}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white mb-2">{printer.price}</div>
            <button 
              onClick={() => onChatStart('printer', printer)}
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <MessageCircle size={18} /> Falar com Dono
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 6. Modelers Page
const ModelersPage = ({ onChatStart }) => (
  <div className="w-full max-w-7xl mx-auto px-4 py-8">
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold text-white">Contrate um Modelador</h2>
      <p className="text-slate-400 mt-2">Artistas 3D prontos para tirar sua ideia do papel.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {MOCK_MODELERS.map(modeler => (
        <div key={modeler.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex items-start gap-4 hover:border-cyan-500/50 transition-all">
          <img src={modeler.avatar} alt={modeler.name} className="w-16 h-16 rounded-lg object-cover" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white">{modeler.name}</h3>
                <p className="text-cyan-400 text-sm">{modeler.specialty}</p>
              </div>
              <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-xs font-bold">
                <Star size={12} fill="currentColor" /> {modeler.rating}
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-2 mb-4">Softwares: {modeler.software}</p>
            <div className="flex justify-between items-center border-t border-slate-700 pt-4">
              <span className="font-bold text-white">{modeler.price}</span>
              <button 
                onClick={() => onChatStart('modeler', modeler)}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-1"
              >
                Solicitar Orçamento <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 7. Smart Chat Page (Triagem + Conversa)
const ChatPage = ({ context, target, goBack }) => {
  const [stage, setStage] = useState('screening'); // 'screening' | 'connecting' | 'human'
  const [screeningHistory, setScreeningHistory] = useState([]);
  const [humanHistory, setHumanHistory] = useState([]);
  const [loadingText, setLoadingText] = useState('');
  
  // Bot initialization
  useEffect(() => {
    if (stage === 'screening') {
      const initialMessage = context === 'printer' 
        ? "Olá! Sou o assistente virtual da 3D Connect. Para agilizar seu atendimento com o dono da impressora, preciso saber: Qual o tamanho aproximado da peça que deseja imprimir?"
        : "Olá! Antes de conectar você ao modelador, me diga: Você já possui referências (fotos/desenhos) do que deseja criar?";
      
      setScreeningHistory([{ id: 'bot-1', sender: 'bot', text: initialMessage }]);
    }
  }, [context, stage]);

  const handleScreeningResponse = (response) => {
    // Add user response
    setScreeningHistory(prev => [...prev, { id: `user-${Date.now()}`, sender: 'me', text: response }]);
    
    // Simulate Bot thinking then connecting
    setTimeout(() => {
      setScreeningHistory(prev => [...prev, { id: `bot-${Date.now()}`, sender: 'bot', text: "Entendido! Estou transferindo essas informações para o profissional. Aguarde um momento..." }]);
      
      setTimeout(() => {
        setStage('connecting');
        setLoadingText(`Conectando com ${target.name}...`);
        
        setTimeout(() => {
          setStage('human');
          setHumanHistory(MOCK_CHATS[context] || []);
        }, 2500);
      }, 1500);
    }, 800);
  };

  const renderScreeningOptions = () => {
    if (screeningHistory[screeningHistory.length - 1]?.sender === 'me') return null;

    if (context === 'printer') {
      return (
        <div className="flex flex-wrap gap-2 mt-2 justify-end">
          {['Pequena (até 5cm)', 'Média (5-15cm)', 'Grande (+15cm)', 'Não sei dizer'].map(opt => (
            <button key={opt} onClick={() => handleScreeningResponse(opt)} className="bg-slate-700 hover:bg-cyan-600 text-white text-sm py-2 px-4 rounded-full transition-colors border border-slate-600">
              {opt}
            </button>
          ))}
        </div>
      );
    } else {
      return (
        <div className="flex flex-wrap gap-2 mt-2 justify-end">
          {['Sim, tenho fotos', 'Tenho apenas uma ideia', 'Tenho um desenho técnico'].map(opt => (
            <button key={opt} onClick={() => handleScreeningResponse(opt)} className="bg-slate-700 hover:bg-purple-600 text-white text-sm py-2 px-4 rounded-full transition-colors border border-slate-600">
              {opt}
            </button>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[calc(100vh-80px)] p-4">
      <div className="bg-slate-800 rounded-2xl overflow-hidden flex flex-col h-full border border-slate-700 shadow-2xl relative">
        
        {/* Chat Header */}
        <div className="bg-slate-900 p-4 border-b border-slate-700 flex items-center gap-4">
          <button onClick={goBack} className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="relative">
            {stage === 'screening' || stage === 'connecting' ? (
               <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center">
                 <Bot size={20} className="text-white" />
               </div>
            ) : (
               <img src={target.avatar} alt={target.name} className="w-10 h-10 rounded-full" />
            )}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white">
              {stage === 'human' ? target.name : 'Assistente Virtual'}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              {stage === 'human' ? 'Online agora' : 'Triagem Automática'}
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/50">
          
          {/* Screening Messages */}
          {screeningHistory.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
                msg.sender === 'me' 
                  ? 'bg-slate-600 text-slate-200 rounded-tr-none' 
                  : 'bg-slate-800 border border-cyan-500/30 text-cyan-100 rounded-tl-none'
              }`}>
                {msg.sender === 'bot' && <Bot size={16} className="mb-1 text-cyan-400" />}
                <p className="leading-relaxed text-sm">{msg.text}</p>
              </div>
            </div>
          ))}

          {/* Screening Options */}
          {stage === 'screening' && renderScreeningOptions()}

          {/* Connecting State */}
          {stage === 'connecting' && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-400 text-sm">{loadingText}</p>
            </div>
          )}

          {/* Divider when human connects */}
          {stage === 'human' && (
            <div className="flex items-center justify-center py-4 opacity-50">
              <div className="h-px bg-slate-600 w-full"></div>
              <span className="px-4 text-xs text-slate-500 whitespace-nowrap">Conexão estabelecida com {target.name}</span>
              <div className="h-px bg-slate-600 w-full"></div>
            </div>
          )}

          {/* Human History */}
          {stage === 'human' && humanHistory.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-sm ${
                msg.sender === 'me' 
                  ? 'bg-cyan-600 text-white rounded-tr-none' 
                  : 'bg-slate-700 text-slate-200 rounded-tl-none'
              }`}>
                <p className="leading-relaxed">{msg.text}</p>
                <div className={`text-[10px] mt-1 text-right opacity-70 ${msg.sender === 'me' ? 'text-cyan-100' : 'text-slate-400'}`}>
                  Agora
                </div>
              </div>
            </div>
          ))}
          
        </div>

        {/* Input Area (Disabled during screening) */}
        <div className="p-4 bg-slate-800 border-t border-slate-700">
          <div className="flex gap-2">
            <button disabled={stage !== 'human'} className="p-3 text-slate-400 hover:text-cyan-400 transition-colors disabled:opacity-30">
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              disabled={stage !== 'human'}
              placeholder={stage === 'human' ? "Digite sua mensagem..." : "Responda ao assistente acima..."}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 text-slate-200 focus:outline-none focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button disabled={stage !== 'human'} className="p-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full transition-colors shadow-lg shadow-cyan-500/20 disabled:opacity-30 disabled:bg-slate-700">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [chatContext, setChatContext] = useState(null); // 'printer' or 'modeler'
  const [chatTarget, setChatTarget] = useState(null); // The object (person) we are talking to

  // Handler to open chat from any page
  const handleChatStart = (context, target) => {
    setChatContext(context);
    setChatTarget(target);
    setCurrentPage('chat');
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setPage={setCurrentPage} />;
      case 'models':
        return <ModelsPage />;
      case 'printers':
        return <PrintersPage onChatStart={handleChatStart} />;
      case 'modelers':
        return <ModelersPage onChatStart={handleChatStart} />;
      case 'chat':
        return <ChatPage context={chatContext} target={chatTarget} goBack={() => setCurrentPage('home')} />;
      default:
        return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white flex flex-col">
      {/* Hide Navbar on Login page for cleaner look, or keep it depending on preference. Keeping it for navigation ease. */}
      {currentPage !== 'login' && <Navbar setPage={setCurrentPage} currentPage={currentPage} />}
      
      {/* Main Content Area */}
      <main className={`flex-grow ${currentPage === 'login' ? '' : 'pb-20'}`}>
        {renderPage()}
      </main>

      {/* Global Footer (only show if not in chat/login to focus attention) */}
      {currentPage !== 'chat' && currentPage !== 'login' && (
        <footer className="w-full bg-slate-950 py-8 text-center text-slate-600 border-t border-slate-900">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Box size={16} /> 3D Connect
          </div>
          <p className="text-sm">© 2023 Plataforma Mockup. Todos os direitos reservados.</p>
        </footer>
      )}
    </div>
  );
}

export default App;