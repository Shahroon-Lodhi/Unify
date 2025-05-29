import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookPoster = () => {
  const [pageAccessToken, setPageAccessToken] = useState('');
  const [pageId, setPageId] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Called after successful Facebook login
  const responseFacebook = async (response) => {
    console.log("Facebook login response", response);

    if (!response.accessToken) {
      alert("Login failed or permission denied.");
      return;
    }

    setIsLoggedIn(true);

    const userAccessToken = response.accessToken;

    // Step 1: Get list of pages
    const res = await fetch(
      `https://graph.facebook.com/me/accounts?access_token=${userAccessToken}`
    );
    const data = await res.json();
    console.log("Pages:", data);

    if (data.data.length === 0) {
      alert("No managed pages found.");
      return;
    }

    const firstPage = data.data[0]; // You can list all of them if needed
    setPageId(firstPage.id);
    setPageAccessToken(firstPage.access_token);
  };

  // Step 2: Post to the selected page
  const postToPage = async () => {
    if (!pageAccessToken || !message) {
      alert("Missing page access token or message.");
      return;
    }

    const postRes = await fetch(`https://graph.facebook.com/${pageId}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message,
        access_token: pageAccessToken,
      }),
    });

    const result = await postRes.json();
    console.log("Post result:", result);

    if (result.id) {
      alert("✅ Post published successfully!");
      setMessage('');
    } else {
      alert("❌ Failed to post. See console.");
    }
  };

  return (
    <div className="App" style={{ padding: '2rem' }}>
      <h2>Facebook Page Poster</h2>

      {!isLoggedIn && (
        <FacebookLogin
          appId="1450513062624294"
          autoLoad={false}
          fields="name,email"
          scope="public_profile,pages_show_list,pages_read_engagement,pages_manage_posts"
          callback={responseFacebook}
        />
      )}

      {isLoggedIn && (
        <div style={{ marginTop: '1rem' }}>
          <textarea
            rows="4"
            cols="50"
            placeholder="Write your Facebook post here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <br />
          <button onClick={postToPage}>Post to Facebook Page</button>
        </div>
      )}
    </div>
  );
};

export default FacebookPoster;
