import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Grid3X3, List, Filter, Search, Trash2, Eye, Heart } from 'lucide-react'
import { fetchPaintings, deletePainting, setFilters } from '../store/catalogSlice'
import { catalogApi } from '../api/catalogApi'
import { Card, CardBody, Button, Badge, Spinner, Modal } from '../components/common/index'

const ESTILOS = [
  'Todos',
  'Paisaje',
  'Marino',
  'Abstracto',
  'Retrato',
  'Naturaleza Muerta',
  'Urbano',
  'Floral',
  'Fauna',
  'Religioso',
]

function CatalogPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { paintings, total, loading, filters } = useSelector(state => state.catalog)
  
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEstilo, setSelectedEstilo] = useState('Todos')
  const [deleteModal, setDeleteModal] = useState({ open: false, painting: null })

  useEffect(() => {
    const estilo = selectedEstilo === 'Todos' ? null : selectedEstilo
    dispatch(fetchPaintings({ estilo, limit: 50 }))
  }, [dispatch, selectedEstilo])

  const handleDelete = async () => {
    if (deleteModal.painting) {
      await dispatch(deletePainting(deleteModal.painting.id))
      setDeleteModal({ open: false, painting: null })
    }
  }

  const filteredPaintings = paintings.filter(p =>
    p.archivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.estilo_principal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.emocion_principal && p.emocion_principal.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div>
      {/* Hero Banner with Logo */}
      <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col items-center justify-center py-8 px-4 bg-gradient-to-b from-gray-50 to-white">
          <img
            src="/logo-franlince.png"
            alt="Franlince Decoración"
            className="h-24 sm:h-32 w-auto mb-4"
          />
          <div className="w-16 h-0.5 bg-primary-500 rounded-full mb-3"></div>
          <p className="text-sm text-gray-500 tracking-widest uppercase">Catálogo Digital de Pinturas</p>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <p className="text-gray-600 mt-1">{total} pinturas en el catálogo</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o estilo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
            
            {/* Style filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedEstilo}
                onChange={(e) => setSelectedEstilo(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              >
                {ESTILOS.map(estilo => (
                  <option key={estilo} value={estilo}>{estilo}</option>
                ))}
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      )}

      {/* Grid View */}
      {!loading && viewMode === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredPaintings.map((painting) => (
            <Card 
              key={painting.id} 
              hover
              onClick={() => navigate(`/catalog/${painting.id}`)}
              className="group"
            >
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                <img
                  src={catalogApi.getPaintingImageUrl(painting.id)}
                  alt={painting.archivo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300?text=Sin+imagen'
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <CardBody className="p-3">
                <div className="flex flex-wrap gap-1 mb-2">
                  <Badge variant="primary">{painting.estilo_principal}</Badge>
                  {painting.emocion_principal && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
                      <Heart className="h-3 w-3 mr-1" />
                      {painting.emocion_principal}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">{painting.archivo}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Confianza: {(painting.confianza * 100).toFixed(1)}%
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {!loading && viewMode === 'list' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Imagen
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Archivo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estilo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Emoción
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confianza
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPaintings.map((painting) => (
                  <tr key={painting.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                        <img
                          src={catalogApi.getPaintingImageUrl(painting.id)}
                          alt={painting.archivo}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/48?text=...'
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-900 truncate max-w-xs">{painting.archivo}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="primary">{painting.estilo_principal}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      {painting.emocion_principal ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
                          <Heart className="h-3 w-3 mr-1" />
                          {painting.emocion_principal}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">
                        {(painting.confianza * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-500">
                        {new Date(painting.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/catalog/${painting.id}`)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setDeleteModal({ open: true, painting })
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Empty state */}
      {!loading && filteredPaintings.length === 0 && (
        <Card>
          <CardBody className="text-center py-12">
            <Grid3X3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pinturas</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedEstilo !== 'Todos' 
                ? 'No se encontraron pinturas con esos filtros'
                : 'Aún no has subido ninguna pintura'
              }
            </p>
            <Button onClick={() => navigate('/upload')}>
              Subir pinturas
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, painting: null })}
        title="Eliminar pintura"
      >
        <p className="text-gray-600 mb-6">
          ¿Estás seguro de que deseas eliminar esta pintura? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={() => setDeleteModal({ open: false, painting: null })}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default CatalogPage
