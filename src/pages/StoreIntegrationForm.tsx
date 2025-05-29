import React, { useState } from 'react';
import axios from 'axios';

const StoreIntegrationForm = () => {
  const [platform, setPlatform] = useState<'shopify' | 'woocommerce'>('shopify');
  const [formData, setFormData] = useState({
    store_url: '',
    access_token: '',
    consumer_key: '',
    consumer_secret: '',
    api_version: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as 'shopify' | 'woocommerce';
    setPlatform(selected);
    setFormData({
      store_url: '',
      access_token: '',
      consumer_key: '',
      consumer_secret: '',
      api_version: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      platform,
      store_url: formData.store_url,
      is_active: true,
    };

    if (platform === 'shopify') {
      payload.access_token = formData.access_token;
    } else {
      payload.consumer_key = formData.consumer_key;
      payload.consumer_secret = formData.consumer_secret;
      payload.api_version = formData.api_version;
    }

    try {
      await axios.post('http://localhost:1337/api/store-integrations', {
        data: payload
      });
      alert('Store integration saved!');
    } catch (error) {
      console.error('Error saving integration:', error);
      alert('Failed to save store integration.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connect Your Store</h2>

      <label>Platform:</label>
      <select name="platform" value={platform} onChange={handlePlatformChange}>
        <option value="shopify">Shopify</option>
        <option value="woocommerce">WooCommerce</option>
      </select>

      <label>Store URL:</label>
      <input name="store_url" value={formData.store_url} onChange={handleChange} required />

      {platform === 'shopify' && (
        <>
          <label>Access Token:</label>
          <input name="access_token" value={formData.access_token} onChange={handleChange} required />
        </>
      )}

      {platform === 'woocommerce' && (
        <>
          <label>Consumer Key:</label>
          <input name="consumer_key" value={formData.consumer_key} onChange={handleChange} required />
          <label>Consumer Secret:</label>
          <input name="consumer_secret" value={formData.consumer_secret} onChange={handleChange} required />
          <label>API Version (e.g., wc/v3):</label>
          <input name="api_version" value={formData.api_version} onChange={handleChange} required />
        </>
      )}

      <button type="submit">Save Integration</button>
    </form>
  );
};

export default StoreIntegrationForm;
