import React from 'react';
import { Settings as SettingsIcon, Moon, Sun, Globe, Bell, Shield, Palette, Database, Download, Trash2 } from 'lucide-react';
import './Settings.css';

export const Settings: React.FC = () => {
  return (
    <div className="settings">
      <div className="settings-header">
        <div className="header-content">
          <div className="header-icon">
            <SettingsIcon size={32} />
          </div>
          <div className="header-text">
            <h1>Settings</h1>
            <p>Customize your app preferences and system settings</p>
          </div>
        </div>
      </div>

      <div className="settings-content">
        <div className="settings-grid">
          {/* Appearance Settings */}
          <div className="settings-card">
            <div className="card-header">
              <div className="card-icon">
                <Palette size={24} />
              </div>
              <h3>Appearance</h3>
            </div>
            <div className="card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Theme</h4>
                  <p>Choose your preferred color scheme</p>
                </div>
                <div className="theme-options">
                  <button className="theme-btn active">
                    <Sun size={16} />
                    Light
                  </button>
                  <button className="theme-btn">
                    <Moon size={16} />
                    Dark
                  </button>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Compact View</h4>
                  <p>Show more content in less space</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Animation Effects</h4>
                  <p>Enable smooth transitions and animations</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="settings-card">
            <div className="card-header">
              <div className="card-icon">
                <Bell size={24} />
              </div>
              <h3>Notifications</h3>
            </div>
            <div className="card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Push Notifications</h4>
                  <p>Receive notifications on your device</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Email Notifications</h4>
                  <p>Get updates via email</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Transaction Alerts</h4>
                  <p>Instant notifications for transactions</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Weekly Summary</h4>
                  <p>Receive weekly spending reports</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="settings-card">
            <div className="card-header">
              <div className="card-icon">
                <Shield size={24} />
              </div>
              <h3>Privacy & Security</h3>
            </div>
            <div className="card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Auto-Lock</h4>
                  <p>Lock app after inactivity</p>
                </div>
                <select className="setting-select">
                  <option value="5">5 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Biometric Login</h4>
                  <p>Use fingerprint or face unlock</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Data Encryption</h4>
                  <p>Encrypt sensitive data</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div className="settings-card">
            <div className="card-header">
              <div className="card-icon">
                <Globe size={24} />
              </div>
              <h3>Language & Region</h3>
            </div>
            <div className="card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Language</h4>
                  <p>Choose your preferred language</p>
                </div>
                <select className="setting-select">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Currency</h4>
                  <p>Default currency for transactions</p>
                </div>
                <select className="setting-select">
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                  <option value="JPY">Japanese Yen (¥)</option>
                </select>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Time Zone</h4>
                  <p>Your local time zone</p>
                </div>
                <select className="setting-select">
                  <option value="PST">Pacific Standard Time</option>
                  <option value="MST">Mountain Standard Time</option>
                  <option value="CST">Central Standard Time</option>
                  <option value="EST">Eastern Standard Time</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="settings-card">
            <div className="card-header">
              <div className="card-icon">
                <Database size={24} />
              </div>
              <h3>Data Management</h3>
            </div>
            <div className="card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Sync Data</h4>
                  <p>Automatically sync across devices</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Data Backup</h4>
                  <p>Regular backups to cloud storage</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="data-actions">
                <button className="data-btn export">
                  <Download size={16} />
                  Export Data
                </button>
                <button className="data-btn clear">
                  <Trash2 size={16} />
                  Clear Cache
                </button>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="settings-card">
            <div className="card-header">
              <div className="card-icon">
                <SettingsIcon size={24} />
              </div>
              <h3>About</h3>
            </div>
            <div className="card-content">
              <div className="about-info">
                <div className="app-info">
                  <h4>Spend Tracker</h4>
                  <p>Version 1.0.0</p>
                </div>
                <div className="app-details">
                  <p>A modern spend tracking application built with React and TypeScript.</p>
                  <div className="app-links">
                    <a href="#" className="app-link">Privacy Policy</a>
                    <a href="#" className="app-link">Terms of Service</a>
                    <a href="#" className="app-link">Support</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
