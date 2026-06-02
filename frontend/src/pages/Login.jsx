import React, { useState } from 'react';

function Login() {

  // Guarda se a senha está aparecendo ou escondida
  // Começa como false porque a senha inicia oculta
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen flex flex-col font-sans select-none">
      
      {/* Cabeçalho da página */}
      <header className="w-full flex justify-center items-center px-6 h-14 bg-white border-b border-slate-200 shadow-sm fixed top-0 left-0 z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#003366] text-2xl font-semibold">
            shield_person
          </span>
          <span className="font-bold text-[#003366] tracking-tight text-base">
            UFMA
          </span>
        </div>
      </header>

      {/* Parte principal da tela */}
      <main className="w-full min-w-full flex-grow flex items-center justify-center pt-14 pb-12 bg-gradient-to-tr from-[#edf2f9] via-[#f8f9ff] to-[#edf2f9]">
        
        {/* Caixa do login */}
        <div className="w-full max-w-[480px] bg-white p-10 rounded-xl border border-slate-150 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mx-4 z-10">
          
          {/* Título e ícone */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-[#e5eeff] rounded-xl flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[#003366] text-2xl">
                verified_user
              </span>
            </div>

            <h1 className="text-xl font-bold text-[#003366] tracking-tight">
              Acesso ao Sistema
            </h1>

            <p className="text-xs text-slate-500 mt-1 font-medium">
              Plataforma
            </p>
          </div>

          {/* Formulário */}
          <form
            className="space-y-5"
            onSubmit={(e) => {
              // Evita que a página recarregue ao clicar em Entrar
              e.preventDefault();
            }}
          >
            
            {/* Campo para CPF ou usuário */}
            <div>
              <label
                className="block text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1.5"
                htmlFor="user_cpf"
              >
                CPF OU USUÁRIO
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                  person
                </span>

                <input
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366] transition-all text-sm placeholder-slate-300 text-slate-700"
                  id="user_cpf"
                  name="user_cpf"
                  placeholder="000.000.000-00"
                  type="text"
                />
              </div>
            </div>

            {/* Campo da senha */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label
                  className="block text-[10px] font-bold text-slate-500 tracking-wider uppercase"
                  htmlFor="password"
                >
                  SENHA
                </label>

                <a
                  className="text-[10px] font-bold text-[#003366] hover:underline"
                  href="#forgot"
                >
                  Esqueceu a senha?
                </a>
              </div>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                  lock
                </span>

                {/* 
                  Se showPassword for true a senha aparece.
                  Se for false a senha fica escondida.
                */}
                <input
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366] transition-all text-sm placeholder-slate-300 text-slate-700"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                />

                {/* Botão para mostrar ou esconder a senha */}
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 flex items-center justify-center"
                  type="button"
                  onClick={() => {
                    // Troca entre true e false
                    setShowPassword(!showPassword);
                  }}
                >
                  <span className="material-symbols-outlined text-xl">
                    {/* Muda o ícone dependendo do estado */}
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Opção para lembrar o login */}
            <div className="flex items-center">
              <input
                className="w-4 h-4 text-[#003366] border-slate-300 rounded focus:ring-[#003366] cursor-pointer"
                id="remember"
                name="remember"
                type="checkbox"
              />

              <label
                className="ml-2 text-xs text-slate-500 font-medium cursor-pointer"
                htmlFor="remember"
              >
                Lembrar meu acesso
              </label>
            </div>

            {/* Botão de entrar */}
            <button
              type="submit"
              className="w-full bg-[#003366] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#002244] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              Entrar no Sistema
              <span className="material-symbols-outlined text-lg">
                login
              </span>
            </button>

            {/* Informações extras */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col items-center gap-3">
              <p className="text-[10px] text-slate-400 text-center leading-relaxed max-w-[280px]">
                Precisa de acesso? Entre em contato com o administrador da sua
                unidade de saúde.
              </p>

              {/* Logos ilustrativos */}
              <div className="flex gap-2">
                <div className="w-10 h-8 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-400">
                  SES-MA
                </div>

                <div className="w-10 h-8 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-400">
                  GOV
                </div>
              </div>
            </div>

          </form>
        </div>
      </main>

      {/* Rodapé da página */}
      <footer className="w-full bg-white border-t border-slate-200 px-6 h-10 flex justify-between items-center text-[10px] text-slate-400 fixed bottom-0 left-0 z-50">

        {/* Links úteis */}
        <div className="flex gap-4">
          <a className="hover:text-slate-600 transition-colors" href="#privacy">
            Privacidade
          </a>

          <a className="hover:text-slate-600 transition-colors" href="#terms">
            Termos de Uso
          </a>

          <a className="hover:text-slate-600 transition-colors" href="#transparency">
            Transparência
          </a>
        </div>

        {/* Informações do sistema */}
        <div className="flex items-center gap-3">
          <span>© 2026 Governo do Estado do Maranhão</span>

          <div className="h-3 w-[1px] bg-slate-200"></div>

          <a
            className="flex items-center gap-0.5 text-[#003366] font-bold hover:underline"
            href="#support"
          >
            <span className="material-symbols-outlined text-xs">
              contact_support
            </span>
            Suporte Técnico
          </a>
        </div>
      </footer>

    </div>
  );
}

export default Login;