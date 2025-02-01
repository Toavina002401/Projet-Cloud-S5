import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Card } from "react-native-paper";
import { AreaChart, Grid, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
// import { Defs, LinearGradient, Stop } from "react-native-svg";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";

// Initial data for cryptocurrencies
const generateCryptoData = () => {
  const cryptos = [
    { name: "Bitcoin", symbol: "BTC", basePrice: 48335.67 },
    { name: "Ethereum", symbol: "ETH", basePrice: 2910.39 },
    { name: "Binance Coin", symbol: "BNB", basePrice: 324.94 },
    { name: "Cardano", symbol: "ADA", basePrice: 1.24 },
    { name: "Solana", symbol: "SOL", basePrice: 96.71 },
    { name: "Ripple", symbol: "XRP", basePrice: 0.48 },
    { name: "Polkadot", symbol: "DOT", basePrice: 17.12 },
    { name: "Dogecoin", symbol: "DOGE", basePrice: 0.03 },
    { name: "Avalanche", symbol: "AVAX", basePrice: 81.10 },
    { name: "Polygon", symbol: "MATIC", basePrice: 1.46 },
  ];

  return cryptos.map(crypto => ({
    ...crypto,
    currentPrice: crypto.basePrice * (1 + (Math.random() * 0.1 - 0.05)),
    priceChange: (Math.random() * 10 - 5).toFixed(2),
  }));
};

const CryptoScreen = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [cryptoData, setCryptoData] = useState(generateCryptoData());
  const [chartData, setChartData] = useState<{ time: string; value: number }[]>([]);
  const [favoriteCryptos, setFavoriteCryptos] = useState<string[]>([]);
  const [notification, setNotification] = useState("");

  const generateChartData = () => {
    const timePoints = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];
    return timePoints.map(time => ({
      time,
      value: Math.random() * 1000 + 4000,
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(generateCryptoData());
      setChartData(generateChartData());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setChartData(generateChartData());
  }, [selectedCrypto]);

  const handleFavoriteClick = (cryptoSymbol: string) => {
    if (favoriteCryptos.includes(cryptoSymbol)) {
      setFavoriteCryptos(favoriteCryptos.filter(symbol => symbol !== cryptoSymbol));
      setNotification(`You have removed ${cryptoSymbol} from your favorites.`);
    } else {
      setFavoriteCryptos([...favoriteCryptos, cryptoSymbol]);
      setNotification(`You have added ${cryptoSymbol} to your favorites.`);
    }
  };

  const selectedCryptoData = cryptoData.find(c => c.symbol === selectedCrypto);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Text style={styles.title}>Cryptocurrency Market</Text>
          
          <View style={styles.grid}>
            {cryptoData.map((crypto) => (
              <TouchableOpacity
                key={crypto.symbol}
                style={[styles.cryptoItem, selectedCrypto === crypto.symbol && styles.selectedCrypto]}
                onPress={() => setSelectedCrypto(crypto.symbol)}
              >
                <Text style={styles.cryptoName}>{crypto.name}</Text>
                <Text style={styles.cryptoPrice}>${crypto.currentPrice.toFixed(2)}</Text>
                <Text style={[styles.cryptoChange, { color: Number(crypto.priceChange) >= 0 ? "green" : "red" }]}>
                  {Number(crypto.priceChange) >= 0 ? "+" : ""}{crypto.priceChange}%
                </Text>
                <Icon
                  name={favoriteCryptos.includes(crypto.symbol) ? "star" : "star-outline"}
                  size={24}
                  color={favoriteCryptos.includes(crypto.symbol) ? "gold" : "gray"}
                  onPress={() => handleFavoriteClick(crypto.symbol)}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.selectedCryptoInfo}>
            <Text style={styles.selectedCryptoName}>{selectedCryptoData?.name} ({selectedCryptoData?.symbol})</Text>
            <Text style={styles.selectedCryptoTime}>Last 24 hours</Text>
            <Text style={styles.selectedCryptoPrice}>${selectedCryptoData?.currentPrice.toFixed(2)}</Text>
            <Text style={[styles.selectedCryptoChange, { color: Number(selectedCryptoData?.priceChange) >= 0 ? "green" : "red" }]}>
              {Number(selectedCryptoData?.priceChange) >= 0 ? "+" : ""}{selectedCryptoData?.priceChange}%
            </Text>
          </View>

          {notification && (
            <View style={styles.notification}>
              <Text style={styles.notificationText}>{notification}</Text>
            </View>
          )}

          <View style={styles.chartContainer}>
            <AreaChart
              style={{ height: 200 }}
              data={chartData}
              contentInset={{ top: 20, bottom: 20 }}
              curve={shape.curveNatural}
              svg={{ fill: "url(#gradient)" }}
            >
              <Grid />
              <Defs>
                <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#9b87f5" stopOpacity={0.8} />
                <Stop offset="100%" stopColor="#9b87f5" stopOpacity={0} />
                </LinearGradient>
            </Defs>
            </AreaChart>

            <XAxis
              data={chartData}
              formatLabel={(_, index) => chartData[index].time}
              contentInset={{ left: 20, right: 20 }}
              svg={{ fontSize: 10, fill: "black" }}
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 10,
  },
  card: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cryptoItem: {
    width: "48%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  selectedCrypto: {
    backgroundColor: "#d0d0ff",
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cryptoPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cryptoChange: {
    fontSize: 14,
  },
  selectedCryptoInfo: {
    marginTop: 20,
    alignItems: "center",
  },
  selectedCryptoName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  selectedCryptoTime: {
    fontSize: 14,
    color: "gray",
  },
  selectedCryptoPrice: {
    fontSize: 32,
    fontWeight: "bold",
  },
  selectedCryptoChange: {
    fontSize: 18,
  },
  notification: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff3cd",
    borderRadius: 10,
  },
  notificationText: {
    fontSize: 14,
    color: "#856404",
  },
  chartContainer: {
    marginTop: 20,
    height: 250,
  },
});

export default CryptoScreen;
