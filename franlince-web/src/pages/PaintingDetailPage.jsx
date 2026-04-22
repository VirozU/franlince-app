import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeft, Trash2, Download, Calendar, Tag, Percent } from 'lucide-react'
import { fetchPaintingDetail, deletePainting, clearCurrentPainting } from '../store/catalogSlice'
import { catalogApi } from '../api/catalogApi'
import { Card, CardBody, Button, Badge, Spinner } from '../components/common/index'

function PaintingDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentPainting, loading, error } = useSelector(state => state.catalog)

  useEffect(() => {
    dispatch(fetchPaintingDetail(id))
    
    return () => {
      dispatch(clearCurrentPainting())
    }
  }, [dispatch, id])

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de que deseas eliminar esta pintura?')) {
      await dispatch(deletePainting(id))
      navigate('/catalog')
    }
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = catalogApi.getPaintingImageUrl(id)
    link.download = currentPainting?.archivo || 'pintura.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="pt-16 flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error || !currentPainting) {
    return (
      <div className="pt-16">
        <Card>
          <CardBody className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Pintura no encontrada</h3>
            <p className="text-gray-500 mb-4">{error || 'No se pudo cargar la información'}</p>
            <Button onClick={() => navigate('/catalog')}>
              Volver al catálogo
            </Button>
          </CardBody>
        </Card>
      </div>
    )
  }

  const todosEstilos = currentPainting.todos_estilos 
    ? (typeof currentPainting.todos_estilos === 'string' 
        ? JSON.parse(currentPainting.todos_estilos) 
        : currentPainting.todos_estilos)
    : []

  return (
    <div className="pt-16 max-w-6xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate('/catalog')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Volver al catálogo
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image */}
        <Card>
          <div className="aspect-square relative bg-gray-100">
            <img
              src={catalogApi.getPaintingImageUrl(id)}
              alt={currentPainting.archivo}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600?text=Sin+imagen'
              }}
            />
          </div>
        </Card>

        {/* Details */}
        <div className="space-y-6">
          {/* Main info */}
          <Card>
            <CardBody>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant="primary" className="text-base px-3 py-1">
                    {currentPainting.estilo_principal}
                  </Badge>
                  <h1 className="text-xl font-bold text-gray-900 mt-3">
                    {currentPainting.archivo}
                  </h1>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary-600">
                    {(currentPainting.confianza * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-500">Confianza</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                <Button variant="outline" onClick={handleDownload} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Classification details */}
          <Card>
            <CardBody>
              <h3 className="font-semibold text-gray-900 mb-4">Clasificación completa</h3>
              
              {/* Top 3 */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-primary-600 font-bold mr-3">1º</span>
                    <span className="font-medium">{currentPainting.estilo_principal}</span>
                  </div>
                  <span className="text-primary-600 font-semibold">
                    {(currentPainting.confianza * 100).toFixed(1)}%
                  </span>
                </div>
                
                {currentPainting.estilo_2 && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-gray-500 font-bold mr-3">2º</span>
                      <span>{currentPainting.estilo_2}</span>
                    </div>
                    <span className="text-gray-600">
                      {(currentPainting.confianza_2 * 100).toFixed(1)}%
                    </span>
                  </div>
                )}
                
                {currentPainting.estilo_3 && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-gray-500 font-bold mr-3">3º</span>
                      <span>{currentPainting.estilo_3}</span>
                    </div>
                    <span className="text-gray-600">
                      {(currentPainting.confianza_3 * 100).toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>

              {/* All styles chart */}
              {todosEstilos.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Todos los estilos</h4>
                  <div className="space-y-2">
                    {todosEstilos.map((style, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-32 text-sm text-gray-600 truncate">
                          {style.estilo}
                        </span>
                        <div className="flex-1 mx-3">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary-500 rounded-full"
                              style={{ width: `${style.confianza * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 w-12 text-right">
                          {(style.confianza * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Metadata */}
          <Card>
            <CardBody>
              <h3 className="font-semibold text-gray-900 mb-4">Información</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                  <span className="text-sm">
                    Creado: {new Date(currentPainting.created_at).toLocaleString()}
                  </span>
                </div>
                {currentPainting.updated_at && (
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                    <span className="text-sm">
                      Actualizado: {new Date(currentPainting.updated_at).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Tag className="h-5 w-5 mr-3 text-gray-400" />
                  <span className="text-sm">ID: {currentPainting.id}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PaintingDetailPage
