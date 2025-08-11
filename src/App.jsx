import { useState, useEffect } from 'react'
import { Search, MapPin, Phone, Bed, Heart, Users, Star, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import longTermCareData from './assets/long_term_care_database.json'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCounty, setSelectedCounty] = useState('all')
  const [filteredInstitutions, setFilteredInstitutions] = useState([])
  const [stats, setStats] = useState({
    totalInstitutions: 0,
    totalBeds: 0,
    availableBeds: 0
  })

  // 模擬完整的機構資料（基於PDF資料）
  const institutions = [
    {
      id: 1,
      name: "清福長照社團法人附設新北市私立清福一館住宿長照機構",
      county: "新北市",
      address: "新北市三峽區介壽路一段261號5樓、6樓",
      licensed_beds: 200,
      available_beds: 200,
      type: "住宿式長照機構",
      phone: "02-2671-1234",
      services: ["失智照護", "復健服務", "醫療照護", "營養餐食"],
      rating: 4.5,
      image: "/src/assets/long_term_care_photos/新北市私立大坪林老人長期照顧中心.jpeg"
    },
    {
      id: 2,
      name: "逢運長照社團法人附設新北市私立逢運住宿長照機構",
      county: "新北市",
      address: "新北市三重區溪尾街59號1至7樓",
      licensed_beds: 200,
      available_beds: 130,
      type: "住宿式長照機構",
      phone: "02-2988-5678",
      services: ["24小時照護", "復健服務", "失智照護", "安寧照護"],
      rating: 4.3,
      image: "/src/assets/long_term_care_photos/東明健康福祉事業有限公司附設彰化縣私立東明北斗綜合長照機構.jpeg"
    },
    {
      id: 3,
      name: "財團法人天下為公社會福利慈善事業基金會附設新北市私立南丁格爾住宿長照機構",
      county: "新北市",
      address: "新北市汐止區大同路三段421號1樓及425號2樓",
      licensed_beds: 116,
      available_beds: 90,
      type: "住宿式長照機構",
      phone: "02-2641-9999",
      services: ["專業護理", "復健治療", "營養照護", "心理輔導"],
      rating: 4.7,
      image: "/src/assets/long_term_care_photos/新北市私立大坪林老人長期照顧中心.jpeg"
    },
    {
      id: 4,
      name: "台中市大肚松群護理之家",
      county: "臺中市",
      address: "臺中市大肚區中山路123號",
      licensed_beds: 79,
      available_beds: 65,
      type: "護理之家",
      phone: "04-2699-1234",
      services: ["安寧緩和", "進出管理", "門診接送", "大傷口照顧"],
      rating: 4.2,
      image: "/src/assets/long_term_care_photos/東明健康福祉事業有限公司附設彰化縣私立東明北斗綜合長照機構.jpeg"
    },
    {
      id: 5,
      name: "新竹縣懷恩護理之家",
      county: "新竹縣",
      address: "新竹縣湖口鄉中正路456號",
      licensed_beds: 52,
      available_beds: 38,
      type: "護理之家",
      phone: "03-5901-234",
      services: ["安寧緩和", "門診接送", "進出管理", "大傷口照顧"],
      rating: 4.4,
      image: "/src/assets/long_term_care_photos/新北市私立大坪林老人長期照顧中心.jpeg"
    }
  ]

  const counties = [
    "臺北市", "新北市", "桃園市", "臺中市", "臺南市", "高雄市",
    "新竹縣", "新竹市", "苗栗縣", "彰化縣", "南投縣", "雲林縣",
    "嘉義縣", "嘉義市", "屏東縣", "宜蘭縣", "花蓮縣", "臺東縣",
    "澎湖縣", "金門縣", "連江縣", "基隆市"
  ]

  useEffect(() => {
    let filtered = institutions

    if (searchTerm) {
      filtered = filtered.filter(institution =>
        institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institution.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institution.services.some(service => service.includes(searchTerm))
      )
    }

    if (selectedCounty !== 'all') {
      filtered = filtered.filter(institution => institution.county === selectedCounty)
    }

    setFilteredInstitutions(filtered)

    // 計算統計資料
    const totalBeds = filtered.reduce((sum, inst) => sum + inst.licensed_beds, 0)
    const availableBeds = filtered.reduce((sum, inst) => sum + inst.available_beds, 0)
    
    setStats({
      totalInstitutions: filtered.length,
      totalBeds,
      availableBeds
    })
  }, [searchTerm, selectedCounty])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-3 rounded-full">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">銘心智護</h1>
                <p className="text-lg text-blue-600 font-medium">長照中心搜尋平台</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalInstitutions}</div>
                <div className="text-sm text-gray-600">機構總數</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.availableBeds}</div>
                <div className="text-sm text-gray-600">可用床位</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            找到最適合的長照服務
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            全台灣最完整的長照中心資訊平台，幫助您為家人找到最好的照護服務
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="搜尋機構名稱或服務項目..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-gray-800"
                />
              </div>
              <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                <SelectTrigger className="h-12 text-gray-800">
                  <SelectValue placeholder="選擇縣市" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部縣市</SelectItem>
                  {counties.map(county => (
                    <SelectItem key={county} value={county}>{county}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="h-12 bg-blue-600 hover:bg-blue-700">
                <Search className="h-5 w-5 mr-2" />
                搜尋
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center border-l-4 border-blue-500">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalInstitutions}</div>
                <div className="text-gray-600">搜尋結果</div>
              </CardContent>
            </Card>
            <Card className="text-center border-l-4 border-green-500">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalBeds}</div>
                <div className="text-gray-600">總床位數</div>
              </CardContent>
            </Card>
            <Card className="text-center border-l-4 border-orange-500">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">{stats.availableBeds}</div>
                <div className="text-gray-600">可用床位</div>
              </CardContent>
            </Card>
            <Card className="text-center border-l-4 border-purple-500">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">22</div>
                <div className="text-gray-600">服務縣市</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Institution List */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-800">長照機構列表</h3>
            <div className="flex items-center space-x-2 text-gray-600">
              <Filter className="h-5 w-5" />
              <span>共 {filteredInstitutions.length} 個結果</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredInstitutions.map((institution) => (
              <Card key={institution.id} className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="flex">
                  <div className="w-1/3">
                    <img
                      src={institution.image}
                      alt={institution.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuaaguaXoOWcluePiTwvdGV4dD48L3N2Zz4='
                      }}
                    />
                  </div>
                  <div className="w-2/3 p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                            {institution.name}
                          </CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span>{institution.rating}</span>
                            </div>
                            <Badge variant="secondary">{institution.type}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600 line-clamp-2">{institution.address}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{institution.phone}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Bed className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-gray-600">
                              床位: {institution.available_beds}/{institution.licensed_beds}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-600">
                              空床: {institution.available_beds}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {institution.services.slice(0, 3).map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {institution.services.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{institution.services.length - 3}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" className="flex-1">查看詳情</Button>
                          <Button size="sm" variant="outline" className="flex-1">聯絡機構</Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredInstitutions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">沒有找到符合條件的長照機構</div>
              <p className="text-gray-400">請嘗試調整搜尋條件或聯繫客服協助</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Centers */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">各縣市長照管理中心</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {longTermCareData.contact_centers.slice(0, 12).map((center, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">{center.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Phone className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600">{center.phone}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      撥打
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-500 p-2 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">銘心智護</h3>
                  <p className="text-gray-400">長照中心搜尋平台</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                致力於提供全台灣最完整、最準確的長照機構資訊，幫助每個家庭找到最適合的照護服務。
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">服務項目</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>長照機構搜尋</li>
                <li>床位查詢</li>
                <li>服務比較</li>
                <li>聯繫協助</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">聯絡資訊</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>長照專線: 1966</li>
                <li>客服電話: 0800-123-456</li>
                <li>服務時間: 週一至週五 8:30-17:30</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">關於我們</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>平台介紹</li>
                <li>使用說明</li>
                <li>隱私政策</li>
                <li>服務條款</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 銘心智護長照中心搜尋平台. 資料來源：衛福部長照專區(1966專線)</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

