export function Input({ className, ...props }) {
    return (
      <input
        className={`pl-10 pr-10 py-2 bg-transparent border-b-2 border-[#B0BEC5] text-[#333333] placeholder-[#B0BEC5] focus:border-[#FFD166] transition-all duration-300 rounded-none focus:ring-0 ${className}`}
        {...props}
      />
    );
  }
  