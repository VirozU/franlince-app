import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Search, Sparkles, Clock, X, ArrowRight, Heart,
  Zap, Sun, Mountain, Palette, Info
} from 'lucide-react'
import {
  smartSearch,
  setQuery,
  addRecentSearch,
  clearResults,
  fetchEmociones
} from '../store/searchSlice'
import { catalogApi } from '../api/catalogApi'
import { Card, CardBody, Button, Badge, Spinner } from '../components/common/index'

// Emotion icons mapping
const emotionIcons = {
  'Alegría': Sun,
  'Paz': Mountain,
  'Libertad': Zap,
  'Energía': Zap,
  'Romanticismo': Heart,
  'Nostalgia': Clock,
  'Aventura': Mountain,
  'Esperanza': Sun,
}

// Search type labels
const searchTypeLabels = {
  'hibrida': { label: 'Híbrida', color: 'bg-purple-100 text-purple-700', icon: Sparkles },
  'contenido': { label: 'Contenido', color: 'bg-blue-100 text-blue-700', icon: Search },
  'emocion': { label: 'Emoción', color: 'bg-pink-100 text-pink-700', icon: Heart },
}

function SearchPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    query,
    results,
    total,
    searching,
    suggestions,
    emotionSuggestions,
    recentSearches,
    searchType,
    contentSearched,
    emotionSearched,
    emociones
  } = useSelector(state => state.search)

  const [inputValue, setInputValue] = useState('')
  const [showEmotions, setShowEmotions] = useState(false)

  // Fetch emotions on mount
  useEffect(() => {
    if (emociones.length === 0) {
      dispatch(fetchEmociones())
    }
  }, [dispatch, emociones.length])

  const handleSearch = (searchQuery) => {
    const q = searchQuery || inputValue
    if (!q.trim()) return

    dispatch(setQuery(q))
    dispatch(addRecentSearch(q))
    dispatch(smartSearch({ query: q, limit: 20 }))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
    handleSearch(suggestion)
  }

  const handleEmotionClick = (emotion) => {
    const newQuery = inputValue
      ? `${inputValue} que inspire ${emotion.toLowerCase()}`
      : emotion.toLowerCase()
    setInputValue(newQuery)
    setShowEmotions(false)
  }

  const handleClear = () => {
    setInputValue('')
    dispatch(setQuery(''))
    dispatch(clearResults())
  }

  // Get search type info for display
  const getSearchTypeInfo = () => {
    if (!searchType) return null
    return searchTypeLabels[searchType] || searchTypeLabels['contenido']
  }

  const searchTypeInfo = getSearchTypeInfo()

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Banner with Logo */}
      <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col items-center justify-center py-8 px-4 bg-gradient-to-b from-gray-50 to-white">
          <img
            src="/logo-franlince.png"
            alt="Franlince Decoración"
            className="h-24 sm:h-32 w-auto mb-4"
          />
          <div className="w-16 h-0.5 bg-primary-500 rounded-full mb-3"></div>
          <p className="text-sm text-gray-500 tracking-widest uppercase">Busqueda Inteligente de Pinturas</p>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-pink-100 rounded-full mb-4">
          <Sparkles className="h-8 w-8 text-primary-600" />
        </div>
        
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Busca por contenido, emoción o ambos. Describe lo que buscas y cómo quieres que te haga sentir.
        </p>
      </div>

      {/* Search Input */}
      <Card className="mb-6">
        <CardBody>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ej: caballo corriendo que inspire libertad y aventura..."
              className="w-full pl-12 pr-32 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              {inputValue && (
                <button
                  onClick={handleClear}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={() => setShowEmotions(!showEmotions)}
                className={`p-2 rounded-lg transition-colors ${
                  showEmotions
                    ? 'bg-pink-100 text-pink-600'
                    : 'text-gray-400 hover:text-pink-500 hover:bg-pink-50'
                }`}
                title="Agregar emoción"
              >
                <Heart className="h-5 w-5" />
              </button>
              <Button onClick={() => handleSearch()} disabled={!inputValue.trim()}>
                Buscar
              </Button>
            </div>
          </div>

          {/* Emotion chips */}
          {showEmotions && emociones.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-2 flex items-center">
                <Heart className="h-4 w-4 mr-1 text-pink-500" />
                Agrega una emoción a tu búsqueda:
              </p>
              <div className="flex flex-wrap gap-2">
                {emociones.map((emotion) => {
                  const Icon = emotionIcons[emotion] || Heart
                  return (
                    <button
                      key={emotion}
                      onClick={() => handleEmotionClick(emotion)}
                      className="inline-flex items-center px-3 py-1.5 bg-pink-50 border border-pink-200 rounded-full text-sm text-pink-700 hover:bg-pink-100 transition-colors"
                    >
                      <Icon className="h-3.5 w-3.5 mr-1" />
                      {emotion}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* How it works info */}
      {!query && !results.length && (
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardBody className="py-4">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 mb-1">Búsqueda inteligente con emociones</p>
                <p className="text-blue-600">
                  Puedes buscar por contenido ("flores amarillas"), por emoción ("paz y tranquilidad"),
                  o combinar ambos ("paisaje que inspire libertad"). El sistema detecta automáticamente
                  el tipo de búsqueda.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Suggestions */}
      {!query && !results.length && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            Búsquedas por contenido:
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Heart className="h-4 w-4 mr-2 text-pink-500" />
            Búsquedas con emociones:
          </h3>
          <div className="flex flex-wrap gap-2">
            {emotionSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 bg-pink-50 border border-pink-200 rounded-full text-sm text-pink-700 hover:bg-pink-100 hover:border-pink-300 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent searches */}
      {!query && recentSearches.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Búsquedas recientes
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(search)}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {searching && (
        <div className="flex flex-col items-center justify-center py-12">
          <Spinner size="lg" />
          <p className="text-gray-500 mt-4">Buscando pinturas...</p>
        </div>
      )}

      {/* Results */}
      {!searching && results.length > 0 && (
        <div className="animate-fadeIn">
          {/* Results header with search type */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">
                {total} {total === 1 ? 'resultado' : 'resultados'} para "{query}"
              </h3>
              {/* Search type info */}
              {searchTypeInfo && (
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mr-2 ${searchTypeInfo.color}`}>
                    <searchTypeInfo.icon className="h-3 w-3 mr-1" />
                    {searchTypeInfo.label}
                  </span>
                  {contentSearched && (
                    <span className="mr-2">
                      Contenido: <span className="font-medium">{contentSearched}</span>
                    </span>
                  )}
                  {emotionSearched && (
                    <span>
                      Emoción: <span className="font-medium text-pink-600">{emotionSearched}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {results.map((result) => (
              <Card
                key={result.id}
                hover
                onClick={() => navigate(`/catalog/${result.id}`)}
                className="group"
              >
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <img
                    src={catalogApi.getPaintingImageUrl(result.id)}
                    alt={result.archivo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300?text=Sin+imagen'
                    }}
                  />

                  {/* Score badges */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    {/* Combined or content score */}
                    {result.score_combinado !== undefined ? (
                      <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" />
                        {result.score_combinado?.toFixed(0)}%
                      </div>
                    ) : (
                      <div className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                        {(result.similitud_busqueda || result.similitud_contenido || 0).toFixed(0)}%
                      </div>
                    )}

                    {/* Emotion score if hybrid */}
                    {result.similitud_emocion > 0 && (
                      <div className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {result.similitud_emocion?.toFixed(0)}%
                      </div>
                    )}
                  </div>

                </div>
                <CardBody className="p-3">
                  <div className="flex flex-wrap gap-1 mb-1">
                    <Badge variant="primary">{result.estilo}</Badge>
                    {result.emocion && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
                        {result.emocion}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{result.archivo}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {!searching && query && results.length === 0 && (
        <Card>
          <CardBody className="text-center py-12">
            <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
            <p className="text-gray-500 mb-4">
              Intenta con una descripción diferente o más general
            </p>
            <Button variant="outline" onClick={handleClear}>
              Nueva búsqueda
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Tips */}
      {!query && !results.length && (
        <Card className="mt-8">
          <CardBody>
            <h3 className="font-semibold text-gray-900 mb-4">Consejos para mejores resultados</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" />
                <span><strong>Contenido:</strong> "paisaje con montañas y lago al atardecer"</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0" />
                <span><strong>Emoción:</strong> "paz y tranquilidad" o "energía y aventura"</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                <span><strong>Híbrida:</strong> "caballos que inspiren libertad" o "flores que transmitan alegría"</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                <span><strong>Ejemplo completo:</strong> "vocho azul vintage con maletas que inspire libertad y aventura"</span>
              </li>
            </ul>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

export default SearchPage
