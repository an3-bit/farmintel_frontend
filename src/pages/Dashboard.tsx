import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Settings,
  CheckCircle,
  History,
  Menu,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Types for our API responses
interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  [key: string]: any;
}

interface WeatherData {
  date: string | number | Date;
  temperature: number;
  rainfall: number;
  humidity: number;
  forecast: string;
}

interface Recommendations {
  crop: string;
  soil: string;
  weather: string;
  biodiversity?: string; // Added biodiversity to the interface
}

const crops = ["Maize", "Beans", "Peas", "Potatoes"];

const Dashboard = () => {
  const [county, setCounty] = useState("");
  const [soilData, setSoilData] = useState<SoilData>({
    ph: 0,
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0
  });
  const [weatherForecast, setWeatherForecast] = useState<WeatherData[]>([]);
  const [selectedCrop, setSelectedCrop] = useState("maize");
  const [history, setHistory] = useState<any[]>([]);
  const [userId] = useState("default_user");
  const [recommendations, setRecommendations] = useState<Recommendations>({
    crop: "",
    soil: "",
    weather: "",
  });
  const [totalRain, setTotalRain] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Fetch advice from backend using geolocation
const getLocationAndAdvice = () => {
  if (!navigator.geolocation) {
    setError("Geolocation is not supported by your browser.");
    return;
  }
  setLoading(true);
  setError("");
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const lat = Number(position.coords.latitude);
        const lon = Number(position.coords.longitude);
        const payload = {
          lat,
          lon,
          crop: String(selectedCrop),
          userId: String(userId)
        };
        // Log the payload to be sent
        console.log("Sending to backend:", payload);

        const response = await fetch("https://farmintel-backend.onrender.com/api/get-agri-advice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errData = await response.json();
          console.error("Backend error:", errData); // Log the full backend error
          throw new Error(errData.message || "Failed to fetch advice from server");
        }
        const data = await response.json();
        console.log("Backend response:", data); // Debug log
        setCounty(data.county || "");
        // Accept both backend and frontend soilData formats, including pH, N, P, K
        const parsedSoilData = {
          ph: Number(data.soilData?.ph ?? data.soilData?.pH ?? 0),
          nitrogen: Number(data.soilData?.nitrogen ?? data.soilData?.N ?? 0),
          phosphorus: Number(data.soilData?.phosphorus ?? data.soilData?.P ?? 0),
          potassium: Number(data.soilData?.potassium ?? data.soilData?.K ?? 0),
        };
        setSoilData(parsedSoilData);
        setRecommendations({
          crop: data.recommendations?.crop || "",
          soil: data.recommendations?.soil || "",
          weather: data.recommendations?.weather || "",
          biodiversity: data.recommendations?.biodiversity || "", // Assign biodiversity
        });
        
        // Debug logging
        console.log('Frontend received recommendations:', data.recommendations);
        console.log('Soil recommendation text:', data.recommendations?.soil);
        console.log('Biodiversity text:', data.recommendations?.biodiversity);
        setTotalRain(Number(data.totalRain) || 0);
        // Fetch real-time weather data from Open-Meteo (now with rainfall and humidity)
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,relative_humidity_2m`);
        const weatherJson = await weatherRes.json();
        // Group hourly data by day for temperature, rainfall, and humidity
        const dailyWeather = {};
        if (weatherJson.hourly && weatherJson.hourly.time) {
          for (let i = 0; i < weatherJson.hourly.time.length; i++) {
            const dateStr = weatherJson.hourly.time[i].split("T")[0];
            if (!dailyWeather[dateStr]) dailyWeather[dateStr] = { temps: [], rains: [], hums: [] };
            dailyWeather[dateStr].temps.push(weatherJson.hourly.temperature_2m[i]);
            dailyWeather[dateStr].rains.push(weatherJson.hourly.precipitation ? weatherJson.hourly.precipitation[i] : 0);
            dailyWeather[dateStr].hums.push(weatherJson.hourly.relative_humidity_2m ? weatherJson.hourly.relative_humidity_2m[i] : 0);
          }
        }
        // Calculate average temperature, rainfall, humidity for each day
        const weatherForecastArr = Object.entries(dailyWeather).slice(0, 7).map(([date, vals]) => {
          const tempArr = (vals as any).temps as number[];
          const rainArr = (vals as any).rains as number[];
          const humArr = (vals as any).hums as number[];
          const avgTemp = tempArr.reduce((a, b) => a + b, 0) / tempArr.length;
          const avgRain = rainArr.reduce((a, b) => a + b, 0) / rainArr.length;
          const avgHum = humArr.reduce((a, b) => a + b, 0) / humArr.length;
          return {
            date,
            temperature: Math.round(avgTemp * 10) / 10,
            rainfall: Math.round(avgRain * 10) / 10,
            humidity: Math.round(avgHum * 10) / 10,
            forecast: '', // Not available from Open-Meteo basic API
          };
        });
        setWeatherForecast(weatherForecastArr as WeatherData[]);
        setHistory(
          Array.isArray(data.history)
            ? data.history.map((item) => ({
                ...item,
                soilData: {
                  ph: Number(item.soilData?.ph ?? item.soilData?.pH ?? 0),
                  nitrogen: Number(item.soilData?.nitrogen ?? item.soilData?.N ?? 0),
                  phosphorus: Number(item.soilData?.phosphorus ?? item.soilData?.P ?? 0),
                  potassium: Number(item.soilData?.potassium ?? item.soilData?.K ?? 0),
                },
              }))
            : []
        );
      } catch (err) {
        setError(`Error fetching advice: ${err.message}. Please try again.`);
      } finally {
        setLoading(false);
      }
    },
    (geoError) => {
      setError(`Error getting location: ${geoError.message}. Please try again or enter a county manually.`);
      setLoading(false);
    }
  );
};

  // Dummy sign out handler
  const handleSignOut = () => {
    navigate("/");
  };

  // Add a helper to get the user's initial (for demo, use a placeholder or from localStorage)
  const getUserInitial = () => {
    const name = localStorage.getItem('userName') || 'User';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 flex flex-col">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-white/80 shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-green-700 text-2xl font-bold tracking-tight">🌱 CLIMATE SMART SOIL ADVISOR</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg shadow">
            {getUserInitial()}
          </span>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full bg-white/90 rounded-2xl shadow-lg p-8 mt-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-6 text-center">
            Welcome to your Climate Smart Soil Advisor
          </h1>
          <div className="mb-4 text-center text-lg text-green-900 font-medium">
            Click the button to get insights about soil in your area.
          </div>
          {/* Location and Crop Selection Section */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location:</label>
              <Button
                onClick={getLocationAndAdvice}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                disabled={loading}
              >
                {loading ? "Loading..." : "Get My Location and Advice"}
              </Button>
              {county && (
                <div className="mt-2 text-gray-700 text-base font-semibold">
                  Detected Location: <span className="text-green-700">{county}</span>
                </div>
              )}
              {error && (
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-red-600">{error}</p>
                  <Button
                    onClick={() => setError("")}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    Clear Error
                  </Button>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Crop:</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full md:w-auto"
              >
                {crops.map((crop) => (
                  <option key={crop} value={crop.toLowerCase()}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Soil Data, Recommendations, Weather, and History */}
          {soilData.ph > 0 && (
            <>
              {/* Soil Data Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-green-800 mb-4">Soil Data</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="bg-white border border-green-200">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600">pH</div>
                      <div className="text-2xl font-bold text-green-900">{soilData.ph.toFixed(1)}</div>
                      <div className="text-sm text-gray-500">
                        {soilData.ph < 5.5 ? "Very acidic" : soilData.ph < 6.5 ? "Acidic" : soilData.ph < 7.5 ? "Neutral" : "Alkaline"}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border border-green-200">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600">Nitrogen (N)</div>
                      <div className="text-2xl font-bold text-green-900">{soilData.nitrogen.toFixed(1)}</div>
                      <div className="text-sm text-gray-500">mg/kg</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border border-green-200">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600">Phosphorus (P)</div>
                      <div className="text-2xl font-bold text-green-900">{soilData.phosphorus.toFixed(1)}</div>
                      <div className="text-sm text-gray-500">mg/kg</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border border-green-200">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600">Potassium (K)</div>
                      <div className="text-2xl font-bold text-green-900">{soilData.potassium.toFixed(1)}</div>
                      <div className="text-sm text-gray-500">mg/kg</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Crop Recommendation Section */}
              <div className="mb-8">
                <Card className="bg-green-50 border border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="text-green-600" size={20} />
                      <div className="font-medium text-green-900 text-lg">Smart Soil & Crop-Specific Recommendations</div>
                    </div>
                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line font-mono bg-white p-4 rounded-lg border">
                      {recommendations.soil.split('**').map((part, index) => 
                        index % 2 === 1 ? 
                          <span key={index} className="font-bold text-green-800">{part}</span> : 
                          part
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Biodiversity & Land Restoration Section */}
              {recommendations.biodiversity && (
                <div className="mb-8">
                  <Card className="bg-green-100 border border-green-300">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-green-700 text-2xl">🌿</span>
                        <div className="font-medium text-green-900 text-lg">Soil Biodiversity & Land Restoration</div>
                      </div>
                      <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line font-mono bg-white p-4 rounded-lg border">
                        {recommendations.biodiversity.split('**').map((part, index) => 
                          index % 2 === 1 ? 
                            <span key={index} className="font-bold text-green-800">{part}</span> : 
                            part
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Weather Summary Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-green-800 mb-4">7-Day Weather Forecast</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weatherForecast.slice(0, 7).map((day, index) => (
                    <Card key={index} className="bg-white border border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-blue-600 text-2xl">🌤️</span>
                          <div>
                            <div className="font-medium text-green-900">
                              {new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                            </div>
                            <div className="text-gray-600">Avg Temperature: {day.temperature}°C</div>
                            <div className="text-gray-600">Avg Rainfall: {day.rainfall} mm</div>
                            <div className="text-gray-600">Avg Humidity: {day.humidity}%</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Search History Section */}
              {history.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-green-800 mb-4">Access History</h2>
                  <div className="space-y-4">
                    {history.map((item, index) => {
                      // Handle different possible timestamp field names
                      const timestamp = item.createdat || item.createdAt || item.accessedAt;
                      let displayTime = 'Accessed now';
                      
                      if (index > 0 && timestamp) {
                        try {
                          const date = new Date(timestamp);
                          if (!isNaN(date.getTime())) {
                            displayTime = date.toLocaleString();
                          } else {
                            displayTime = 'Unknown time';
                          }
                        } catch (error) {
                          displayTime = 'Unknown time';
                        }
                      }
                      
                      return (
                        <Card key={index} className="bg-white border border-green-200">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <History className="text-blue-600" size={20} />
                              <div>
                                <div className="font-medium text-green-900">
                                  {item.county} - {item.crop} - {displayTime}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;