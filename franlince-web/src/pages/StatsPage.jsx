import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { Image, TrendingUp, Palette, Clock } from 'lucide-react'
import { fetchStats } from '../store/catalogSlice'
import { Card, CardBody, Spinner } from '../components/common/index'

const COLORS = [
  '#ec751b', '#4f7ca7', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'
]

function StatsPage() {
  const dispatch = useDispatch()
  const { stats, loading } = useSelector(state => state.catalog)

  useEffect(() => {
    dispatch(fetchStats())
  }, [dispatch])

  if (loading || !stats) {
    return (
      <div className="pt-16 flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  const pieData = stats.por_estilo?.map(item => ({
    name: item.estilo_principal,
    value: item.cantidad,
    confianza: item.confianza_promedio,
  })) || []

  const barData = stats.por_estilo?.map(item => ({
    estilo: item.estilo_principal,
    cantidad: item.cantidad,
    confianza: parseFloat((item.confianza_promedio * 100).toFixed(1)),
  })) || []

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
          <p className="text-sm text-gray-500 tracking-widest uppercase">Estadisticas del Inventario de Pinturas</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 mt-1">
          Análisis y métricas del inventario de pinturas
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Image className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Pinturas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total_pinturas}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Con Embeddings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.con_embeddings}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Palette className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Estilos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.por_estilo?.length || 0}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Última actualización</p>
                <p className="text-sm font-medium text-gray-900">
                  {stats.ultima_actualizacion 
                    ? new Date(stats.ultima_actualizacion).toLocaleDateString()
                    : 'N/A'
                  }
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart */}
        <Card>
          <CardBody>
            <h3 className="font-semibold text-gray-900 mb-4">Pinturas por Estilo</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical" margin={{ left: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="estilo" type="category" width={80} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value, name) => [value, name === 'cantidad' ? 'Cantidad' : 'Confianza %']}
                  />
                  <Bar dataKey="cantidad" fill="#ec751b" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardBody>
            <h3 className="font-semibold text-gray-900 mb-4">Distribución por Estilo</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} pinturas`, 'Cantidad']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Confidence Chart */}
      <Card className="mb-6">
        <CardBody>
          <h3 className="font-semibold text-gray-900 mb-4">Confianza Promedio por Estilo</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="estilo" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                  tick={{ fontSize: 11 }}
                />
                <YAxis domain={[0, 20]} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(value) => [`${value}%`, 'Confianza']} />
                <Bar dataKey="confianza" fill="#4f7ca7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <Card>
        <CardBody>
          <h3 className="font-semibold text-gray-900 mb-4">Detalle por Estilo</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Estilo
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Cantidad
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    % del Total
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Confianza Promedio
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats.por_estilo?.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium text-gray-900">{item.estilo_principal}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {item.cantidad}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {((item.cantidad / stats.total_pinturas) * 100).toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-primary-600 font-medium">
                        {(item.confianza_promedio * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default StatsPage
