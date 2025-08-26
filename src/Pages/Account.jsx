import React, { useState } from 'react';
import './Account.css';

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // User state
  const [user, setUser] = useState(null);
  const [purchaseHistory] = useState([]);
  
  // Demo login handler
  const handleDemoLogin = () => {
    // Set default user data when logging in
    setUser({
      name: 'Demo User',
      email: 'demo@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Demo St, Demo City',
      joinDate: 'August 2023'
    });
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="account-container">
        <div className="account-content">
          <div className="demo-login-overlay">
            <div className="demo-auth-box">
              <h2>Welcome to Your Account</h2>
              <p>Click below to enter the demo account</p>
              <button 
                className="demo-login-btn"
                onClick={handleDemoLogin}
              >
                Enter Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-header">
        <div className="header-content">
          <h1>My Account</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <div className="account-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </button>
        </div>
      </div>

      <div className="account-content">
        {activeTab === 'profile' ? (
          <div className="split-layout">
            <div className="main-content">
              <div className="profile-section">
                <h2>Profile Information</h2>
                <div className="profile-header">
                  <div className="profile-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <h2>{user.name}</h2>
                  <p className="member-since">Member since {user.joinDate}</p>
                </div>

                <div className="profile-details">
                  <h3>Account Information</h3>
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{user.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{user.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{user.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">{user.address}</span>
                  </div>
                  <button className="edit-profile-btn">Edit Profile</button>
                </div>
              </div>
            </div>
            
            <div className="suggestion-panel">
              <h3>Suggestions For You</h3>
              <div className="suggestion-list">
                <div className="suggestion-item">
                  <span>🎁</span>
                  <p>Complete your profile to get personalized recommendations</p>
                </div>
                <div className="suggestion-item">
                  <span>🔔</span>
                  <p>Enable notifications for exclusive deals</p>
                </div>
                <div className="suggestion-item">
                  <span>📱</span>
                  <p>Download our mobile app for a better experience</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="split-layout">
            <div className="main-content">
              <div className="purchase-history">
                <h2>Purchase History</h2>
                {purchaseHistory.length === 0 ? (
                  <div className="no-orders">
                    <p>You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  <div className="orders-list">
                    {purchaseHistory.map((order) => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <div>
                            <span className="order-id">Order #{order.id}</span>
                            <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                          </div>
                          <span className={`order-status ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                      
                        <div className="order-items">
                          {order.items.map((item) => {
                            const product = null; // data?.find(p => p.id === item.id);
                            return (
                              <div key={`${order.id}-${item.id}`} className="order-item">
                                <img 
                                  src={product?.image} 
                                  alt={item.name} 
                                  className="order-item-image"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/60';
                                  }}
                                />
                                <div className="order-item-details">
                                  <h4>{item.name}</h4>
                                  <p>Quantity: {item.quantity}</p>
                                  <p>₱{item.price.toFixed(2)} each</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="order-footer">
                          <div className="order-total">
                            Total: <span>₱{order.total.toFixed(2)}</span>
                          </div>
                          <button className="reorder-btn">Reorder</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
