import React, { useEffect, useState } from 'react'
import './App.css'
import { bear, coin, highVoltage, notcoin, rocket, trophy } from './images';
import './index.css'
import { motion, AnimatePresence } from 'framer-motion';

// Definición de tipos para los elementos del menú
type MenuItemType = {
  title: string;
  points: string;
};

type MenuContentType = {
  [key: string]: MenuItemType[];
};

/**
 * Componente principal de la aplicación TapSwap.
 * Maneja la lógica del juego, la interfaz de usuario y las animaciones.
 */
function App() {
  // Estados para manejar los puntos, energía, clicks y menús
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(2532);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [clickAnimation, setClickAnimation] = useState(false);
  const pointsToAdd = 12;
  const energyToReduce = 12;

  /**
   * Maneja el evento de clic en el botón principal.
   * Aumenta los puntos, reduce la energía y añade una animación de clic.
   * @param e - Evento del mouse
   */
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(Math.max(0, energy - energyToReduce));
    setClicks([...clicks, { id: Date.now(), x, y }]);
    setClickAnimation(true);
    setTimeout(() => setClickAnimation(false), 150);
  };

  /**
   * Elimina la animación de clic una vez que ha terminado.
   * @param id - ID único del clic a eliminar
   */
  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  /**
   * Abre una nueva ventana para comprar el código del proyecto.
   */
  const handleBuyCode = () => {
    window.open('https://t.me/Tonydarko98', '_blank', 'noopener,noreferrer');
  };

  /**
   * Alterna la visibilidad del menú seleccionado.
   * @param menu - Nombre del menú a alternar
   */
  const toggleMenu = (menu: string) => {
    if (menu === 'Tap') {
      // No hacer nada para el botón Tap
      return;
    }
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // Efecto para regenerar energía con el tiempo
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 6500));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Contenido de los diferentes menús
  const menuContent: MenuContentType = {
    Ref: [
      { title: 'Invite Friends', points: '50 coins per referral' },
      { title: 'Share on Social Media', points: '100 coins' },
      { title: 'Referral Milestone', points: '500 coins for 10 referrals' },
      { title: 'Daily Referral Bonus', points: '10 coins per active referral' },
    ],
    Task: [
      { title: 'Daily Login', points: '20 coins' },
      { title: 'Complete 100 Taps', points: '50 coins' },
      { title: 'Reach 1000 Total Coins', points: '100 coins' },
      { title: 'Upgrade Energy 5 Times', points: '200 coins' },
    ],
    Boost: [
      { title: 'Double Coins (30 min)', points: '100 coins' },
      { title: 'Energy Refill', points: '50 coins' },
      { title: 'Auto-Tapper (1 hour)', points: '200 coins' },
      { title: 'Lucky Spin', points: '500 coins' },
    ],
    Stats: [
      { title: 'Total Taps', points: '1,234,567' },
      { title: 'Coins Earned', points: '9,876,543' },
      { title: 'Referrals Made', points: '42' },
      { title: 'Time Played', points: '73 hours' },
    ],
  };

  return (
    <div className="bg-gradient-main min-h-screen flex flex-col text-white font-mono relative overflow-hidden">
      {/* Componentes de fondo y superposiciones */}
      <div className="bg-gradient-overlay absolute inset-0"></div>
      <div className="radial-gradient-overlay"></div>
      
      {/* Botón para comprar el código del proyecto */}
      <button 
        onClick={handleBuyCode}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 transition-colors relative z-10 self-center shadow-md border-b-4 border-yellow-700 active:border-b-2 active:translate-y-[2px]"
      >
        Get Project Code
      </button>

      <div className="flex-grow flex flex-col p-4 overflow-y-auto">
        {/* Encabezado */}
        <header className="flex justify-center items-center mb-4 relative z-10">
          <h1 className="text-6xl font-bold tracking-tight">TapSwap</h1>
        </header>

        {/* Contador de puntos */}
        <div className="flex items-center justify-center mb-2 relative z-10">
          <img src={coin} width={24} height={24} alt="Coin" className="mr-2" />
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">{points.toLocaleString()}</span>
        </div>

        {/* Indicador de nivel */}
        <div className="flex items-center justify-center mb-4 relative z-10">
          <img src={trophy} width={20} height={20} alt="Elite" className="mr-2" />
          <span className="text-base sm:text-lg md:text-xl tracking-wide">Elite &gt;</span>
        </div>

        {/* Botón principal del juego */}
        <main className="flex-grow flex flex-col items-center justify-center relative z-10 my-4">
          <motion.div 
            className="w-60 h-60 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
            onClick={handleClick}
            animate={{
              scale: clickAnimation ? 0.95 : 1,
              rotate: clickAnimation ? [0, -5, 5, -5, 0] : 0
            }}
            transition={{ duration: 0.15 }}
          >
            <motion.div 
              className="w-60 h-60 sm:w-44 sm:h-44 md:w-60 md:h-60 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <img src={notcoin} alt="Click me!" className="w-34 h-34 sm:w-20 sm:h-20 md:w-24 md:h-24" />
            </motion.div>
          </motion.div>
          {/* Animaciones de clic */}
          <AnimatePresence>
            {clicks.map((click) => (
              <motion.div
                key={click.id}
                className="absolute text-lg sm:text-xl md:text-2xl font-bold text-yellow-300"
                style={{
                  top: `${click.y - 20}px`,
                  left: `${click.x - 14}px`,
                }}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -50 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                onAnimationComplete={() => handleAnimationEnd(click.id)}
              >
                +{pointsToAdd}
              </motion.div>
            ))}
          </AnimatePresence>
        </main>

        {/* Barra de energía */}
        <div className="mt-4 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <img src={highVoltage} width={20} height={20} alt="Energy" />
            <span className="tracking-wide">{energy} / 6500</span>
          </div>
          <div className="w-full bg-purple-950 rounded-full h-2 sm:h-3 md:h-4 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-full rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${(energy / 6500) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Barra de navegación inferior */}
      <div className="flex justify-between p-2 relative z-10 bg-purple-900 mb-6">
        {['Ref', 'Task', 'Tap', 'Boost', 'Stats'].map((text, index) => (
          <button 
            key={index} 
            onClick={() => toggleMenu(text)}
            className={`flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl ${
              text === 'Tap' ? 'bg-yellow-500' : 'bg-purple-800'
            } hover:bg-opacity-80 transition-colors shadow-lg`}
          >
            <img src={[bear, coin, notcoin, rocket, highVoltage][index]} alt={text} className="w-6 h-6 mb-1" />
            <span className="text-[8px] sm:text-[10px] md:text-xs tracking-tight">{text}</span>
          </button>
        ))}
      </div>

      {/* Menús desplegables */}
      <AnimatePresence>
        {activeMenu && activeMenu !== 'Tap' && (
          <motion.div 
            className="fixed inset-0 bg-purple-900 flex flex-col items-center justify-start z-20 p-4 overflow-y-auto"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold tracking-wide">{activeMenu === 'Ref' ? 'Refers' : activeMenu}</h2>
                <button 
                  onClick={() => setActiveMenu(null)}
                  className="text-white text-2xl"
                >
                  &times;
                </button>
              </div>
              {menuContent[activeMenu].map((item, index) => (
                <div key={index} className="bg-purple-800 rounded-lg p-4 mb-4 flex justify-between items-center">
                  <span className="text-lg tracking-wide">{item.title}</span>
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold">
                    {item.points}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;