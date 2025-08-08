interface IErrorComponentProps {
  title: string;
  description?: string;
  onReload?: () => void;
}

const ErrorComponent = ({
  title,
  description,
  onReload,
}: IErrorComponentProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-2">{title}</h2>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      {onReload && (
        <button
          onClick={onReload}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Reload
        </button>
      )}
    </div>
  );
};

export default ErrorComponent;
