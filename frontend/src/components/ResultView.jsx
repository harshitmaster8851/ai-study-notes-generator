import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ResultView({ result, feature }) {
  const handleDownload = () => {
    // Basic text file download for simplicity
    // A more advanced version would generate a PDF on the client or server
    const element = document.createElement("a");
    const file = new Blob([result], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${feature}-result.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-indigo-50 overflow-hidden animate-fade-in-up">
      <div className="bg-gradient-to-r from-indigo-50 to-white px-6 py-4 border-b border-indigo-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-800 flex items-center space-x-2">
          <span>Result</span>
        </h3>
        <button 
          onClick={handleDownload}
          className="px-4 py-2 bg-white hover:bg-gray-50 text-indigo-600 text-sm font-medium rounded-lg border border-indigo-100 shadow-sm transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download</span>
        </button>
      </div>
      <div className="p-6 prose prose-indigo max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {result}
        </ReactMarkdown>
      </div>
    </div>
  )
}
