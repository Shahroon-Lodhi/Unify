import React, { useEffect, useState } from "react";

const styles = {
  container: {
    maxWidth: "480px",
    margin: "3rem auto",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#1877f2", // Facebook blue
  },
  button: {
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#1877f2",
    color: "#fff",
    fontWeight: "600",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#145dbf",
  },
  textarea: {
    width: "100%",
    padding: "0.8rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "vertical",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    marginBottom: "1rem",
  },
  loggedInContainer: {
    marginTop: "1.5rem",
  },
};

const FacebookPoster = () => {
  const [pageAccessToken, setPageAccessToken] = useState("");
  const [pageId, setPageId] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1450513062624294",
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
    };

    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

const handleLogin = () => {
  window.FB.login((response) => {
    if (response.authResponse) {
      fetchPages(response.authResponse.accessToken); // async logic goes in separate function
      setIsLoggedIn(true);
    } else {
      alert("Login failed or cancelled.");
    }
  }, {
    scope: "public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts",
  });
};

const fetchPages = async (userAccessToken) => {
  try {
    const res = await fetch(
      `https://graph.facebook.com/me/accounts?access_token=${userAccessToken}`
    );
    const data = await res.json();
    console.log("Pages:", data);

    if (!data.data || data.data.length === 0) {
      alert("No managed pages found.");
      return;
    }

    const firstPage = data.data[0];
    setPageId(firstPage.id);
    setPageAccessToken(firstPage.access_token);
  } catch (err) {
    console.error("Error fetching pages:", err);
    alert("Error fetching pages.");
  }
};


  const postToPage = async () => {
    if (!pageAccessToken || !message) {
      alert("Missing page access token or message.");
      return;
    }

    const postRes = await fetch(`https://graph.facebook.com/${pageId}/feed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        access_token: pageAccessToken,
      }),
    });

    const result = await postRes.json();

    if (result.id) {
      alert("✅ Post published successfully!");
      setMessage("");
    } else {
      alert("❌ Failed to post. See console for error.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Facebook Page Poster</h2>

{!isLoggedIn && (
  <div
    style={{
      height: "60vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <button
      onClick={handleLogin}
      style={{
        backgroundColor: "#1877F2", // Official Facebook blue
        color: "#fff",
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      Login with Facebook
    </button>
  </div>
)}


      {isLoggedIn && (
        <div style={styles.loggedInContainer}>
          <textarea
            rows="5"
            placeholder="Write your Facebook post here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.textarea}
          />
          <button
            style={styles.button}
            onClick={postToPage}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#145dbf")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1877f2")}
          >
            Post to Facebook Page
          </button>
        </div>
      )}
    </div>
  );
};

export default FacebookPoster;
