import React from 'react';
import { User, CreditCard, Shield, Bell, Lock } from 'lucide-react';
import './Account.css';

export const Account: React.FC = () => {
  return (
    <div className="account">
      <div className="account-header">
        <div className="header-content">
          <div className="header-icon">
            <User size={32} />
          </div>
          <div className="header-text">
            <h1>Account Settings (No functionality)</h1>
            <p>Manage your profile and account preferences</p>
          </div>
        </div>
      </div>

      <div className="account-content">
        <div className="account-grid">
          {/* Profile Section */}
          <div className="account-card">
            <div className="card-header">
              <div className="card-icon">
                <User size={24} />
              </div>
              <h3>Profile Information</h3>
            </div>
            <div className="card-content">
              <div className="profile-section">
                <div className="profile-avatar">
                  <div className="avatar-circle">
                    <User size={32} />
                  </div>
                  <button className="change-photo-btn">Change Photo</button>
                </div>
                <div className="profile-details">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" value="Nhien Pham" readOnly />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value="nhien.pham@email.com" readOnly />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" value="+1 (312) 123-3899" readOnly />
                  </div>
                </div>
              </div>
              <button className="edit-btn">Edit Profile</button>
            </div>
          </div>

          {/* Security Section */}
          <div className="account-card">
            <div className="card-header">
              <div className="card-icon">
                <Shield size={24} />
              </div>
              <h3>Security</h3>
            </div>
            <div className="card-content">
              <div className="security-item">
                <div className="security-info">
                  <Lock size={20} />
                  <div>
                    <h4>Password</h4>
                    <p>Last changed 30 days ago</p>
                  </div>
                </div>
                <button className="security-btn">Change</button>
              </div>
              <div className="security-item">
                <div className="security-info">
                  <Shield size={20} />
                  <div>
                    <h4>Two-Factor Authentication</h4>
                    <p>Add an extra layer of security</p>
                  </div>
                </div>
                <button className="security-btn">Setup</button>
              </div>
            </div>
          </div>

          {/* Connected Accounts */}
          <div className="account-card">
            <div className="card-header">
              <div className="card-icon">
                <CreditCard size={24} />
              </div>
              <h3>Connected Accounts</h3>
            </div>
            <div className="card-content">
              <div className="connected-account">
                <div className="account-info">
                  <div className="account-logo">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h4>Chase Checking</h4>
                    <p>••••••••••1234</p>
                  </div>
                </div>
                <span className="status connected">Connected</span>
              </div>
              <div className="connected-account">
                <div className="account-info">
                  <div className="account-logo">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h4>Wells Fargo Savings</h4>
                    <p>••••••••••5678</p>
                  </div>
                </div>
                <span className="status connected">Connected</span>
              </div>
              <button className="add-account-btn">+ Add New Account</button>
            </div>
          </div>

          {/* Preferences */}
          <div className="account-card">
            <div className="card-header">
              <div className="card-icon">
                <Bell size={24} />
              </div>
              <h3>Preferences</h3>
            </div>
            <div className="card-content">
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Email Notifications</h4>
                  <p>Receive updates about your transactions</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Transaction Alerts</h4>
                  <p>Get notified of large transactions</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Monthly Reports</h4>
                  <p>Receive monthly spending summaries</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
