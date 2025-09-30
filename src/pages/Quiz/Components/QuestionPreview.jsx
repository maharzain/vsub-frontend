import React from 'react';

const QuestionPreview = ({ questions, selectedTemplate }) => {
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="bg-[#1a1d29] rounded-lg p-6 border border-primary-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-lg font-semibold">Questions for {selectedTemplate}</h3>
          <span className="bg-darkIndigo text-white px-3 py-1 rounded-full text-sm">
            {questions.length} Question{questions.length > 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="bg-[#151822] rounded-lg p-4 border border-gray-700">
              <div className="mb-3">
                <span className="text-darkIndigo font-semibold text-sm">Question {questionIndex + 1}</span>
                <p className="text-white font-medium mt-1">{question.statement}</p>
              </div>
              
              {question.options && question.options.length > 0 && (
                <div className="grid grid-cols-1 gap-2">
                  {question.options.map((option, optionIndex) => (
                    <div 
                      key={optionIndex} 
                      className={`p-2 rounded border text-sm ${
                        option.isCorrect 
                          ? 'bg-green-900/20 border-green-600 text-green-300' 
                          : 'bg-gray-800 border-gray-600 text-gray-300'
                      }`}
                    >
                      <span className="font-semibold mr-2">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      {option.text}
                      {option.isCorrect && (
                        <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                          Correct
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionPreview;