const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-gradient-to-r from-gray-300 to-slate-600 h-full text-white flex items-center">{children}</div>;
};

export default layout;