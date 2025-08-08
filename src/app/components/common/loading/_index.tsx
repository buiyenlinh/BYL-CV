interface ILoadingProps {
  fullScreen?: boolean;
  className?: string;
}

const Loading = ({ fullScreen = false, className = "" }: ILoadingProps) => {
  const containerClasses = `
    flex 
    items-center 
    justify-center 
    ${
      fullScreen
        ? "fixed inset-0 bg-white/80 dark:bg-gray-900/80 z-50"
        : "w-full h-full"
    }
    ${className}
  `.trim();

  return (
    <div className={containerClasses}>
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-900"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
