export function Button({ children, className, ...props }) {
    return (
      <button
        className={`bg-[#FFD166] text-[#1B3A57] font-semibold py-3 px-4 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  