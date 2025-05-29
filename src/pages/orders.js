import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './OrdersPage.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hotProducts, setHotProducts] = useState([]);

  const fetchOrders = () => {
    setLoading(true);
    axios
      .get('http://localhost:1337/api/orders?sort=placed_at:desc')
      .then((res) => {
        const data = res.data.data || [];
        const formattedOrders = data.map((item) => ({
          id: item.id,
          order_id: item.order_id,
          customer_name: item.customer_name,
          total_amount: item.total_amount,
          order_status: item.order_status,
          placed_at: item.placed_at,
          source: item.source,
          email: item.email,
          line_items: item.line_items.map((lineItem) => ({
            title: lineItem.title || lineItem.name,
            quantity: lineItem.quantity,
            price: lineItem.price,
            sku: lineItem.sku,
          })),
        }));

        setOrders(formattedOrders);
        updateHotProducts(formattedOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders');
        setLoading(false);
      });
  };

  const updateHotProducts = (ordersList) => {
    const productCount = {};
    ordersList.forEach((order) => {
      order.line_items.forEach((item) => {
        const key = item.title;
        productCount[key] = (productCount[key] || 0) + item.quantity;
      });
    });

    const topProducts = Object.entries(productCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([title, count]) => ({ title, count }));

    setHotProducts(topProducts);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (orderId, strapiId) => {
    const confirmed = window.confirm(`Are you sure you want to delete Order ID: ${orderId}?`);
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:1337/api/orders/${strapiId}`);
      const updatedOrders = orders.filter((order) => order.id !== strapiId);
      setOrders(updatedOrders);
      updateHotProducts(updatedOrders);
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete the order.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isWithinDateRange = (date) => {
    if (!startDate && !endDate) return true;
    const orderDate = new Date(date);
    if (startDate && new Date(startDate) > orderDate) return false;
    if (endDate && new Date(endDate) < orderDate) return false;
    return true;
  };

  const filteredOrders = orders
    .filter((order) =>
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((order) =>
      statusFilter ? order.order_status.toLowerCase() === statusFilter.toLowerCase() : true
    )
    .filter((order) =>
      sourceFilter ? order.source.toLowerCase() === sourceFilter.toLowerCase() : true
    )
    .filter((order) => isWithinDateRange(order.placed_at));

  const totalSales = filteredOrders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0);

  const exportToCSV = () => {
    const headers = [
      'Order ID',
      'Customer',
      'Email',
      'Total Amount',
      'Status',
      'Placed At',
      'Source',
    ];
    const rows = filteredOrders.map((order) => [
      order.order_id,
      order.customer_name,
      order.email,
      order.total_amount,
      order.order_status,
      formatDate(order.placed_at),
      order.source,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'orders.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'paid';
      case 'pending':
        return 'pending';
      case 'cancelled':
        return 'cancelled';
      default:
        return '';
    }
  };

  if (loading) return <div className="loading-container">Loading orders...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="orders-container">
      <h2 className="orders-heading">Orders</h2>

      <div className="hot-products">
        <h3>🔥 Hot Sellers</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={hotProducts}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="filters">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by customer name or order ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
          <option value="">All Sources</option>
          <option value="shopify">Shopify</option>
          <option value="woocommerce">WooCommerce</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button className="export-btn" onClick={exportToCSV}>
          Export CSV
        </button>
      </div>

      <div className="total-sales">
        Total Sales: {totalSales.toLocaleString('en-US', {
          style: 'currency',
          currency: 'PKR',
        })}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders-container">No orders found</div>
      ) : (
        <ul className="orders-list">
          {filteredOrders.map((order) => (
            <li key={order.id} className="order-item">
<li key={order.id} className="order-item">
  <div className="order-detail">
    <span className="order-label">Order ID:</span>
    <span className="order-value highlight">{order.order_id}</span>
  </div>
  <div className="order-detail">
    <span className="order-label">Customer:</span>
    <span className="order-value">{order.customer_name}</span>
  </div>
  <div className="order-detail">
    <span className="order-label">Email:</span>
    <span className="order-value">{order.email}</span>
  </div>
  <div className="order-detail">
    <span className="order-label">Source:</span>
    <span className="order-value">{order.source}</span>
  </div>
  <div className="order-detail">
    <span className="order-label">Status:</span>
    <span className={`order-status ${getStatusClass(order.order_status)}`}>
      {order.order_status}
    </span>
  </div>
  <div className="order-detail">
    <span className="order-label">Total:</span>
    <span className="order-value">
      {parseFloat(order.total_amount).toLocaleString('en-US', {
        style: 'currency',
        currency: 'PKR',
      })}
    </span>
  </div>
  <div className="order-detail">
    <span className="order-label">Placed At:</span>
    <span className="order-value">{formatDate(order.placed_at)}</span>
  </div>

  <div className="items-heading">Items</div>
  <ul className="items-list">
    {order.line_items.map((item, index) => (
      <li key={index} className="item-detail">
        <div>
          <span className="item-name">{item.title}</span>
          <span className="item-sku">({item.sku})</span>
        </div>
        <div>
          {item.quantity} ×{' '}
          <span className="item-price">
            {parseFloat(item.price).toLocaleString('en-US', {
              style: 'currency',
              currency: 'PKR',
            })}
          </span>
        </div>
      </li>
    ))}
  </ul>

  <button className="delete-btn" onClick={() => handleDelete(order.order_id, order.id)}>
    Delete
  </button>
</li>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
