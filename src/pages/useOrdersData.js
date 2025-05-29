// hooks/useOrdersData.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useOrdersData = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/orders?sort=placed_at:desc')
      .then((res) => {
        const data = res.data.data || [];
        const formattedOrders = data.map((item) => ({
          id: item.id,
          order_id: item.order_id,
          total_amount: item.total_amount,
          placed_at: item.placed_at,
        }));
        setOrders(formattedOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
  }, []);

  return { orders, loading };
};

export default useOrdersData;
