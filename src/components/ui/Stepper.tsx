"use client";

export interface StepItem {
  id: string;
  label: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStepId: string;
  className?: string;
}

export default function Stepper({ steps, currentStepId, className = "" }: StepperProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStepId);
  return (
    <nav aria-label="Progreso de la solicitud" className={className}>
      <ol className="flex items-center justify-between gap-1">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = step.id === currentStepId;
          const stepNumber = index + 1;
          return (
            <li
              key={step.id}
              className="flex-1 flex flex-col items-center"
              aria-current={isCurrent ? "step" : undefined}
            >
              <div className="flex items-center w-full">
                {index > 0 && (
                  <div
                    className={`flex-1 h-0.5 -mr-1 ${
                      isCompleted ? "bg-primary-600" : "bg-gray-200"
                    }`}
                    aria-hidden
                  />
                )}
                <span
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                    ${isCompleted ? "bg-primary-600 text-white" : ""}
                    ${isCurrent ? "bg-primary-600 text-white ring-2 ring-primary-200 ring-offset-2" : ""}
                    ${!isCompleted && !isCurrent ? "bg-gray-200 text-gray-600" : ""}
                  `}
                >
                  {isCompleted ? "✓" : stepNumber}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 -ml-1 ${
                      isCompleted ? "bg-primary-600" : "bg-gray-200"
                    }`}
                    aria-hidden
                  />
                )}
              </div>
              <span
                className={`mt-1 text-xs font-semibold text-center max-w-[4rem] sm:max-w-none ${
                  isCurrent ? "text-primary-700" : isCompleted ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
