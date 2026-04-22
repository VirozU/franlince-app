import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { Upload, Image, X, CheckCircle, AlertCircle, Loader2, Heart } from 'lucide-react'
import { uploadPainting, uploadPaintingsBatch, clearResult, clearPreview } from '../store/uploadSlice'
import { Card, CardBody, Button, Badge } from '../components/common/index'

function UploadPage() {
  const dispatch = useDispatch()
  const { uploading, result, history, error } = useSelector(state => state.upload)
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles)
    
    // Generate previews
    const newPreviews = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }))
    setPreviews(newPreviews)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    multiple: true,
  })

  const handleUpload = async () => {
    if (files.length === 0) return

    if (files.length === 1) {
      dispatch(uploadPainting(files[0]))
    } else {
      dispatch(uploadPaintingsBatch(files))
    }
  }

  const handleClear = () => {
    setFiles([])
    setPreviews([])
    dispatch(clearResult())
    dispatch(clearPreview())
  }

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    setFiles(newFiles)
    setPreviews(newPreviews)
  }

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
          <p className="text-sm text-gray-500 tracking-widest uppercase">Carga Digital de Pinturas</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 mt-1">
        </p>
      </div>

      {/* Upload Zone */}
      <Card className="mb-6">
        <CardBody>
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
              transition-colors duration-200
              ${isDragActive 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
              }
            `}
          >
            <input {...getInputProps()} />
            <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? 'text-primary-500' : 'text-gray-400'}`} />
            
            {isDragActive ? (
              <p className="text-primary-600 font-medium">Suelta las imágenes aquí...</p>
            ) : (
              <>
                <p className="text-gray-700 font-medium">
                  Arrastra imágenes aquí o haz clic para seleccionar
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  JPG, PNG, GIF, WEBP • Máximo 10MB por archivo
                </p>
              </>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Previews */}
      {previews.length > 0 && (
        <Card className="mb-6">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                {previews.length} {previews.length === 1 ? 'imagen' : 'imágenes'} seleccionadas
              </h3>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                Limpiar todo
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={preview.preview} 
                      alt={preview.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="text-xs text-gray-600 mt-1 truncate">{preview.name}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleUpload} 
                disabled={uploading}
                loading={uploading}
              >
                {uploading ? 'Catalogando...' : `Catalogar ${previews.length} ${previews.length === 1 ? 'pintura' : 'pinturas'}`}
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Result */}
      {result && (
        <Card className="mb-6 animate-fadeIn">
          <CardBody>
            <div className="flex items-start space-x-3">
              {result.success ? (
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
              )}
              
              <div className="flex-1">
                <h3 className={`font-semibold ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                  {result.message || (result.success ? 'Catalogación exitosa' : 'Error en la catalogación')}
                </h3>
                
                {result.data && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Estilo detectado:</p>
                        <p className="text-lg font-semibold text-gray-900">{result.data.estilo_principal}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Confianza:</p>
                        <p className="text-lg font-semibold text-primary-600">{result.data.confianza}%</p>
                      </div>
                    </div>
                    
                    {result.data.top_estilos && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Top 3 estilos:</p>
                        <div className="flex flex-wrap gap-2">
                          {result.data.top_estilos.map((style, i) => (
                            <Badge key={i} variant={i === 0 ? 'primary' : 'default'}>
                              {style.estilo} ({style.confianza}%)
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.data.emocion_principal && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">Emoción detectada:</p>
                            <p className="text-lg font-semibold text-pink-700 flex items-center mt-0.5">
                              <Heart className="h-4 w-4 mr-1.5" />
                              {result.data.emocion_principal}
                            </p>
                          </div>
                          {result.data.confianza_emocion && (
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Confianza:</p>
                              <p className="text-lg font-semibold text-pink-600">{result.data.confianza_emocion}%</p>
                            </div>
                          )}
                        </div>

                        {result.data.top_emociones && result.data.top_emociones.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-600 mb-2">Top 3 emociones:</p>
                            <div className="flex flex-wrap gap-2">
                              {result.data.top_emociones.map((emo, i) => (
                                <span
                                  key={i}
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    i === 0
                                      ? 'bg-pink-100 text-pink-700'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {i === 0 && <Heart className="h-3 w-3 mr-1" />}
                                  {emo.emocion} ({emo.confianza}%)
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Batch results */}
                {result.pinturas && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">
                      Procesadas: {result.total_procesadas} | Errores: {result.total_errores}
                    </p>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {result.pinturas.map((p, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm truncate flex-1 mr-2">{p.archivo_original}</span>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge variant="primary">{p.estilo}</Badge>
                            {p.emocion && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
                                <Heart className="h-3 w-3 mr-1" />
                                {p.emocion}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Error */}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardBody>
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* History */}
      {history.length > 0 && (
        <Card>
          <CardBody>
            <h3 className="font-semibold text-gray-900 mb-4">Historial de esta sesión</h3>
            <div className="space-y-3">
              {history.slice(0, 10).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Image className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-700">{item.archivo || item.archivo_guardado}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="primary">{item.estilo_principal || item.estilo}</Badge>
                    {(item.emocion_principal || item.emocion) && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
                        <Heart className="h-3 w-3 mr-1" />
                        {item.emocion_principal || item.emocion}
                      </span>
                    )}
                    <span className="text-sm text-gray-500">{item.confianza}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

export default UploadPage
