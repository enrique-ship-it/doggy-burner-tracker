// DOGGY BIMSNESS - Design Preview v4
// Meme + Windows 98 + Burning Money

import Image from 'next/image';

export default function DesignPreview() {
  return (
    <div className="bg-burning-money">
      <div className="bg-overlay">
        <div className="max-w-4xl mx-auto p-6">
          
          {/* HEADER */}
          <header className="header-bimsness -mx-6 -mt-6 px-6 py-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image 
                src="/doggy.png" 
                alt="Doggy" 
                width={50} 
                height={50}
                className="doggy-mascot-sm"
              />
              <span className="text-xl text-white font-bold">
                <span className="dollar-sign dollar-md mr-1">$</span>
                DOGGY BIMSNESS
              </span>
            </div>
            <div className="flex gap-2">
              <button className="btn-win98 btn-gray btn-sm">DOCS</button>
              <button className="btn-win98 btn-navy">CONECTAR</button>
            </div>
          </header>

          {/* HERO */}
          <div className="text-center mb-8">
            <Image 
              src="/doggy.png" 
              alt="Doggy Bimsness" 
              width={200} 
              height={200}
              className="doggy-mascot-lg mx-auto mb-4"
            />
            <h1 className="title-meme mb-2">
              <span className="fire-emoji">🔥</span> DOGGY BURN TRACKER <span className="fire-emoji">🔥</span>
            </h1>
            <p className="subtitle-meme">
              donde los tokens vienen a morir (profesionalmente)
            </p>
          </div>

          {/* STATS EN VENTANA 98 */}
          <div className="window-98 mb-8">
            <div className="window-titlebar">
              <span>📊 burn_stats.exe</span>
              <span>—  ▢  ✕</span>
            </div>
            <div className="window-content">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="number-stonks">1.5M</p>
                  <p className="text-meme">total quemado</p>
                </div>
                <div>
                  <p className="number-stonks">
                    <span className="dollar-sign dollar-md">$</span>420
                  </p>
                  <p className="text-meme">valor destruido</p>
                </div>
                <div>
                  <p className="number-stonks number-red">69</p>
                  <p className="text-meme">top quemadores</p>
                </div>
              </div>
            </div>
          </div>

          {/* BOTONES WIN98 */}
          <section className="panel-paper mb-8">
            <h2 className="subtitle-meme mb-4">🖱️ Botones (estilo Windows 98)</h2>
            <div className="flex flex-wrap gap-3">
              <button className="btn-win98 btn-navy">CONECTAR WALLET</button>
              <button className="btn-win98 btn-tie">QUEMAR TOKENS</button>
              <button className="btn-win98 btn-gold">VER REWARDS</button>
              <button className="btn-win98 btn-gray">CANCELAR</button>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <button className="btn-win98 btn-navy btn-sm">Chico</button>
              <button className="btn-win98 btn-navy btn-lg">Grande</button>
              <button className="btn-win98 btn-navy" disabled>Deshabilitado</button>
            </div>
          </section>

          {/* BADGES */}
          <section className="panel-paper mb-8">
            <h2 className="subtitle-meme mb-4">🏆 Niveles de Quemado</h2>
            <div className="flex flex-wrap gap-3">
              <span className="badge badge-chispa">🔥 CHISPA</span>
              <span className="badge badge-llamarada">🔥🔥 LLAMARADA</span>
              <span className="badge badge-infierno">💀🔥 INFIERNO</span>
            </div>
          </section>

          {/* LEADERBOARD */}
          <div className="window-98 window-98-tie mb-8">
            <div className="window-titlebar">
              <span>🏆 leaderboard.exe</span>
              <span>—  ▢  ✕</span>
            </div>
            <div className="window-content p-0">
              <table className="table-leaderboard">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Wallet</th>
                    <th>Quemado</th>
                    <th>Nivel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="rank-1">🥇 1</td>
                    <td className="code-address">3Cs...XaQ</td>
                    <td className="text-meme-bold">1,234,567</td>
                    <td><span className="badge badge-infierno">💀🔥 INFIERNO</span></td>
                  </tr>
                  <tr>
                    <td className="rank-2">🥈 2</td>
                    <td className="code-address">7Hx...k2P</td>
                    <td className="text-meme-bold">567,890</td>
                    <td><span className="badge badge-llamarada">🔥🔥 LLAMARADA</span></td>
                  </tr>
                  <tr>
                    <td className="rank-3">🥉 3</td>
                    <td className="code-address">9Qw...m4R</td>
                    <td className="text-meme-bold">123,456</td>
                    <td><span className="badge badge-chispa">🔥 CHISPA</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* DOLLAR SIGNS */}
          <section className="panel-paper mb-8">
            <h2 className="subtitle-meme mb-4">💵 Decoraciones $</h2>
            <div className="flex items-end gap-4">
              <span className="dollar-sign dollar-sm">$</span>
              <span className="dollar-sign dollar-md">$</span>
              <span className="dollar-sign dollar-lg">$</span>
            </div>
          </section>

          {/* INPUTS */}
          <section className="panel-paper mb-8">
            <h2 className="subtitle-meme mb-4">⌨️ Inputs</h2>
            <input 
              type="text" 
              className="input-98 w-full mb-3"
              placeholder="Ingresa tu wallet..."
            />
            <input 
              type="number" 
              className="input-98 w-full"
              placeholder="Cantidad a quemar..."
            />
          </section>

          {/* COLORES */}
          <section className="panel-paper mb-8">
            <h2 className="subtitle-meme mb-4">🎨 Paleta de Colores</h2>
            <div className="grid grid-cols-5 gap-2">
              <div className="h-16 bg-navy flex items-end justify-center pb-1 text-xs text-white">Navy (traje)</div>
              <div className="h-16 bg-tie flex items-end justify-center pb-1 text-xs text-white">Tie (corbata)</div>
              <div className="h-16 bg-gold flex items-end justify-center pb-1 text-xs">Dorado</div>
              <div className="h-16 bg-paper border-2 border-black flex items-end justify-center pb-1 text-xs">Papel</div>
              <div className="h-16 bg-[#1e5631] flex items-end justify-center pb-1 text-xs text-white">Dólar</div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-center text-meme py-6 border-t-2 border-[var(--suit-navy)]">
            <p className="text-navy">
              no es consejo financiero • probablemente nada • haz tu propia investigación
            </p>
            <p className="text-sm text-tie mt-1">
              doggy bimsness club © 2024
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
}
