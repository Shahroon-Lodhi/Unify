import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlySales, setMonthlySales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [products, setProducts] = useState([]); // all products fetched

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Orders
        const ordersRes = await axios.get('https://strapi-backend-production-63b5.up.railway.app/api/orders?sort=placed_at:desc&pagination[limit]=5');
        const ordersData = ordersRes.data.data || [];
        const formattedOrders = ordersData.map((item) => ({
          id: item.id,
          order_id: item.order_id,
          total_amount: parseFloat(item.total_amount) || 0,
          order_status: item.order_status,
          placed_at: item.placed_at,
          line_items: item.line_items.map((lineItem) => ({
            title: lineItem.title || lineItem.name,
            quantity: lineItem.quantity,
          })),
        }));
        setOrders(formattedOrders);
        setRecentOrders(formattedOrders.slice(0, 5)); // Show latest 5 orders
        processSalesData(formattedOrders);

        // Fetch Products
        const productsResponse = await fetch('https://strapi-backend-production-63b5.up.railway.app/api/products');
        if (!productsResponse.ok) {
          console.error('Failed to fetch products:', productsResponse.statusText);
          setLowStockProducts([]);
          setProducts([]);
          return;
        }

        const productsJson = await productsResponse.json();
        const productsData = productsJson.data || [];

        const formattedProducts = productsData.map((item) => ({
          Product_Name: item.Product_Name || 'Unnamed Product',
          Product_SKU: item.Product_SKU || 'N/A',
          Stock_Quantity: Number(item.Stock_Quantity) || 0,
          Category: item.Category || 'Uncategorized',
          Selling_Price: Number(item.Selling_Price) || 0,
          Cost_Price: Number(item.Cost_Price) || 0,
        }));

        setProducts(formattedProducts);

        const lowStockThreshold = 10;
        const lowStock = formattedProducts.filter((p) => p.Stock_Quantity <= lowStockThreshold);
        setLowStockProducts(lowStock);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function processSalesData(orders) {
    const monthlyTotals = months.reduce((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {});

    const productSales = {};

    orders.forEach((order) => {
      if (order.order_status?.toLowerCase() === 'paid') {
        const date = new Date(order.placed_at);
        const monthName = months[date.getMonth()];
        monthlyTotals[monthName] += order.total_amount;

        order.line_items.forEach((item) => {
          productSales[item.title] = (productSales[item.title] || 0) + item.quantity;
        });
      }
    });

    const monthlySalesArr = months.map((m) => monthlyTotals[m]);

    const top5Products = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([title, count]) => ({ title, count }));

    setMonthlySales(monthlySalesArr);
    setTopProducts(top5Products);
  }

  if (loading) return <div>Loading dashboard data...</div>;

  // Sales chart data
  const salesData = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Sales (PKR)',
        data: monthlySales.map((val) => Number(val.toFixed(2))),
        backgroundColor: '#4caf50',
      },
    ],
  };

  // Profit Margin Data for Top Products (by sales)
  const profitDataLabels = [];
  const profitDataValues = [];

  topProducts.forEach(({ title }) => {
    const prod = products.find((p) => p.Product_Name === title);
    if (prod && prod.Selling_Price > 0) {
      const profitMargin = ((prod.Selling_Price - prod.Cost_Price) / prod.Selling_Price) * 100;
      profitDataLabels.push(title);
      profitDataValues.push(Number(profitMargin.toFixed(2)));
    } else {
      profitDataLabels.push(title);
      profitDataValues.push(0);
    }
  });

  const profitMarginData = {
    labels: profitDataLabels,
    datasets: [
      {
        label: 'Profit Margin (%)',
        data: profitDataValues,
        backgroundColor: profitDataValues.map((val) => (val < 0 ? '#e74c3c' : '#3498db')),
      },
    ],
  };

  return (
    <div className="dashboard" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {/* Monthly Sales Chart */}
      <div style={{ flex: '3 1 600px', minWidth: '300px' }}>
        <h3>Monthly Sales</h3>
        <Bar data={salesData} options={{ responsive: true }} />
      </div>

      {/* Profit Margin Chart */}
      <div style={{ flex: '2 1 400px', minWidth: '300px', background: '#f0f4f8', padding: '1rem', borderRadius: '8px', boxShadow: '0 0 8px rgba(0,0,0,0.1)' }}>
        <h3>💰 Profit Margins (Top 5 Products)</h3>
        {profitDataLabels.length > 0 ? (
          <Bar data={profitMarginData} options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: function(value) {
                    return value + '%';
                  },
                },
                title: {
                  display: true,
                  text: 'Profit Margin (%)',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Product',
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return context.parsed.y + '% profit margin';
                  },
                },
              },
            },
          }} />
        ) : (
          <p>No profit margin data available.</p>
        )}
      </div>

      {/* Top Selling Products */}
      <div
        style={{
          flex: '1 1 300px',
          background: '#f7f7f7',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 0 8px rgba(0,0,0,0.1)',
          height: 'fit-content',
        }}
      >
        <h3>🔥 Top Selling Products</h3>
        {topProducts.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {topProducts.map(({ title, count }) => (
              <li
                key={title}
                style={{
                  marginBottom: '1rem',
                  borderBottom: '1px solid #ddd',
                  paddingBottom: '0.5rem',
                }}
              >
                <strong>{title}</strong>
                <div style={{ color: '#555' }}>Units Sold: {count}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sales data available.</p>
        )}
      </div>

      {/* Recent Orders */}
      <div
        style={{
          flex: '2 1 500px',
          background: '#e8f0fe',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 0 8px rgba(0,0,0,0.1)',
          maxHeight: '400px',
          overflowY: 'auto',
        }}
      >
        <h3>📦 Recent Orders</h3>
        {recentOrders.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {recentOrders.map((order) => (
              <li
                key={order.id}
                style={{
                  marginBottom: '1rem',
                  borderBottom: '1px solid #c3d0fc',
                  paddingBottom: '0.5rem',
                }}
              >
                <div>
                  <strong>Order ID:</strong> {order.order_id}
                </div>
                <div>
                  <strong>Status:</strong> {order.order_status}
                </div>
                <div>
                  <strong>Placed At:</strong> {new Date(order.placed_at).toLocaleString()}
                </div>
                <div>
                  <strong>Total:</strong> PKR {order.total_amount.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent orders available.</p>
        )}
      </div>

      {/* Low Stock Alerts */}
      <div
        style={{
          background: '#fff3f3',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 0 8px rgba(0,0,0,0.1)',
          minWidth: '250px',
          maxHeight: '400px',
          overflowY: 'auto',
          flex: '1 1 250px',
          color: '#a94442',
        }}
      >
        <h3>⚠️ Low Stock Alerts</h3>
        {lowStockProducts.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {lowStockProducts.map(({ Product_Name, Product_SKU, Stock_Quantity }) => (
              <li
                key={Product_SKU}
                style={{
                  marginBottom: '1rem',
                  borderBottom: '1px solid #f1c0c0',
                  paddingBottom: '0.5rem',
                  fontWeight: '600',
                }}
              >
                <div>{Product_Name} (SKU: {Product_SKU})</div>
                <div style={{ fontWeight: 'normal', color: '#a94442' }}>
                  Stock Left: {Stock_Quantity}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No low stock products.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
