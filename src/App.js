import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/dracula.css';

function App() {
  const [code, setCode] = useState(""); 
  const [testResults, setTestResults] = useState({}); 
  const [testCase1Passed, setTestCase1Passed] = useState(false);
  const [testCase2Passed, setTestCase2Passed] = useState(false);

  const handleTestCase = (testCase) => {
    let testCaseResult={};

    if (testCase === "Test Case 1") {
      const passed= code==="Test Case 1 Code";
      setTestCase1Passed(passed);
     testCaseResult={
      testCase:"Text Case 1",
      result:code=== "Test Case 1 Code" ? "Passed" : "Failed"
     };
  } else if(testCase==="Test Case 2"){
    const passed = code === "Test Case 2 Code";
    setTestCase2Passed(passed);
    testCaseResult={
      testCase:"Text Case 2",
      result:code === "Test Case 2 Code" ? "Passed" : "Failed"
    }
  }
  setTestResults(testCaseResult);
};

const handleSubmit = () => {
  if (testCase1Passed && testCase2Passed) {
    setTestResults({ submit: "Code submitted!" });
  } else {
    setTestResults({ submit: "Both test cases must pass to submit!" });
  }
};

return (
  <div className="bg-black text-white min-h-screen">
    <div className="container grid grid-cols-2 gap-20 mt-20">
      <div className="question border border-gray-300 p-5">
        <div className="question-buttons flex flex-row mb-10">
          <button className="question-button px-10 py-5 bg-transparent border-none cursor-pointer text-yellow-500 relative">Description</button>
          <button className="question-button px-10 py-5 bg-transparent border-none cursor-pointer text-yellow-500 relative">Editorial</button>
          <button className="question-button px-10 py-5 bg-transparent border-none cursor-pointer text-yellow-500 relative">Solutions</button>
          <button className="question-button px-10 py-5 bg-transparent border-none cursor-pointer text-yellow-500 relative">Submissions</button>
        </div>
        <hr className='divider'/> {/* Added margin-top to extend the line */}
        <h2>Question Prompt</h2>
        <p>This is where the question prompt will be displayed.</p>
      </div>

      <div className="code-editor">
        <h2 className="text-blue-400 text-5xl flex justify-center m-10 ">Code Editor</h2>
        <CodeMirror
          className='w-50 h-26 mr-10 ' // Set a specific height for the CodeMirror component
          value={code}
          options={{
            theme:'dracula',
            keyMap:'sublime',
            mode:'jsx',
            onChange: (editor, data, value) => {
              setCode(value);
            }
          }}
        />
        <div className="test-buttons flex gap-20 m-10 justify-center">
          <button 
            className="test-button  px-5 py-3 bg-yellow-400 border-4 border-yellow-500 text-black cursor-pointer"
            onClick={() => handleTestCase("Test Case 1")}
          >
            Test Case 1
          </button>
          <button 
            className="test-button px-5 py-3 bg-yellow-400 border-4 border-yellow-500 text-black cursor-pointer"
            onClick={() => handleTestCase("Test Case 2")}
          >
            Test Case 2
          </button>
          <button
            className="submit-button  px-5 py-3  bg-yellow-400 border-4 border-yellow-500 text-black cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>

    <div className="test-results border border-gray-300 p-10 mt-20 relative">
      <h2>Test Results</h2>
      {testResults.testCase && (
        <p>{testResults.testCase} <span className="ml-15">{testResults.result}</span></p>
      )}
      {testResults.submit && (
        <p>{testResults.submit}</p>
      )}
    </div>
  </div>
);
}

export default App;
