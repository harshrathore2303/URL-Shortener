import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


export default function LocationStats({stats}) {
    const cityCount = stats.reduce((acc, item) => {
        if (acc[item.city]){
            acc[item.city] += 1;
        } else {
            acc[item.city] = 1;
        }
        return acc;
    }, {})

    const cities = Object.entries(cityCount).map(([city, count]) => ({
        city,
        count
    }))
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          style={{ width: 700, height: 300, aspectRatio: 1.618 }}
          responsive
          data={cities.slice(0, 5)}
        >
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip labelStyle={{ color: "green" }} />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
