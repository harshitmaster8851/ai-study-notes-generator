const features = [
  {
    id: 'summary',
    name: 'AI Summary',
    description: 'Get concise bullet points',
    icon: '📝',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'quiz',
    name: 'Quiz Generator',
    description: 'Test your knowledge with MCQs',
    icon: '🎯',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'flashcards',
    name: 'Flashcards',
    description: 'Quick Q&A for memorization',
    icon: '📇',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'explain',
    name: 'Explain Simply',
    description: 'Like teaching a beginner',
    icon: '🧠',
    color: 'from-amber-500 to-orange-500'
  }
]

export default function FeatureSelector({ activeFeature, onSelect, isLoading }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature) => (
        <button
          key={feature.id}
          onClick={() => !isLoading && onSelect(feature.id)}
          disabled={isLoading}
          className={`relative overflow-hidden p-6 rounded-2xl text-left transition-all duration-300 ${
            activeFeature === feature.id 
              ? 'ring-2 ring-offset-2 ring-indigo-500 shadow-lg scale-[1.02]' 
              : 'hover:shadow-md hover:-translate-y-1 bg-white border border-gray-100 shadow-sm'
          } ${isLoading && activeFeature !== feature.id ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {activeFeature === feature.id && (
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10`} />
          )}
          <div className="flex items-start space-x-4 relative z-10">
            <div className={`text-4xl ${activeFeature === feature.id ? 'scale-110' : ''} transition-transform`}>
              {feature.icon}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">{feature.name}</h4>
              <p className="text-gray-500 text-sm mt-1">{feature.description}</p>
            </div>
          </div>
          {isLoading && activeFeature === feature.id && (
            <div className="absolute top-4 right-4">
              <div className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
