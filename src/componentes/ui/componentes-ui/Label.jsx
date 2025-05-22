export function Label({ children, className, ...props }) {
    return (
      <label className={`text-[#333333] text-sm font-medium ${className}`} {...props}>
        {children}
      </label>
    );
  }
  