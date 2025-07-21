export default function Stepper({ labels, currentStep }) {
  return (
    <div className="flex items-center">
      {labels.map((label, idx) => {
        const step = idx + 1;
        const isActive = currentStep === step;
        return (
          <div key={idx} className="flex-1 text-center">
            <div
              className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center 
                ${isActive ? 'bg-brand text-white' : 'bg-gray-300 text-gray-600'}`}
            >
              {step}
            </div>
            <p className={`mt-2 text-sm ${isActive ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}>
              {label}
            </p>
            {idx < labels.length - 1 && (
              <div className="absolute transform translate-x-4 -mt-4 h-0.5 bg-gray-300 w-1/4"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
