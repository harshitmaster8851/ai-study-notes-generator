import { useCallback } from 'react'

export default function FileUpload({ onFileUpload }) {
  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      if (files[0].type === 'application/pdf') {
        onFileUpload(files[0])
      } else {
        alert('Please upload a PDF file.')
      }
    }
  }, [onFileUpload])

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileUpload(files[0])
    }
  }

  return (
    <div 
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="bg-white p-10 rounded-3xl shadow-xl shadow-indigo-100/50 border-2 border-dashed border-indigo-200 hover:border-indigo-400 transition-colors duration-300 flex flex-col items-center justify-center text-center cursor-pointer group"
      onClick={() => document.getElementById('fileInput').click()}
    >
      <input 
        type="file" 
        id="fileInput" 
        accept="application/pdf" 
        className="hidden" 
        onChange={handleFileInput}
      />
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-300">
        <svg className="w-10 h-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Drop your PDF here</h3>
      <p className="text-gray-500 mb-6">or click to browse from your computer</p>
      <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5">
        Select PDF File
      </button>
    </div>
  )
}
