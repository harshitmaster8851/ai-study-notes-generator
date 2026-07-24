import { useState } from 'react'
import FileUpload from './components/FileUpload'
import FeatureSelector from './components/FeatureSelector'
import ResultView from './components/ResultView'

function App() {
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState('')
  const [activeFeature, setActiveFeature] = useState(null)
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (uploadedFile) => {
    setFile(uploadedFile)
    setIsUploading(true)
    setUploadMessage('Uploading and parsing PDF...')
    
    const formData = new FormData()
    formData.append('file', uploadedFile)

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      if (response.ok) {
        setUploadMessage('PDF uploaded successfully! Choose a feature below.')
      } else {
        setUploadMessage(`Error: ${data.detail || 'Failed to upload PDF'}`)
        setFile(null)
      }
    } catch (error) {
      setUploadMessage('Error connecting to backend.')
      setFile(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFeatureSelect = async (feature) => {
    setActiveFeature(feature)
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch(`http://localhost:8000/${feature}`, {
        method: 'POST',
      })
      const data = await response.json()
      if (response.ok) {
        setResult(data.result)
      } else {
        setResult(`Error: ${data.detail || 'Failed to generate result'}`)
      }
    } catch (error) {
      setResult('Error connecting to backend.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-indigo-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              AI
            </div>
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
              Study Notes Generator
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        <section className="text-center space-y-4">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            Transform your notes into <span className="text-indigo-600">active learning</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your PDF study notes and let AI generate summaries, quizzes, flashcards, or simple explanations instantly.
          </p>
        </section>

        {!file && !isUploading && (
          <section className="animate-fade-in-up">
            <FileUpload onFileUpload={handleFileUpload} />
          </section>
        )}

        {isUploading && (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-6 text-lg font-medium text-gray-700 animate-pulse">{uploadMessage}</p>
          </div>
        )}

        {file && !isUploading && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">PDF Uploaded</p>
                  <p className="text-sm text-gray-500">{file.name}</p>
                </div>
              </div>
              <button 
                onClick={() => { setFile(null); setResult(null); setActiveFeature(null); }}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Start Over
              </button>
            </div>

            <FeatureSelector 
              activeFeature={activeFeature} 
              onSelect={handleFeatureSelect} 
              isLoading={isLoading} 
            />

            {result && (
              <ResultView result={result} feature={activeFeature} />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
