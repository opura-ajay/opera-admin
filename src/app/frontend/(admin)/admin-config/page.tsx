// app/admin/opura-bot/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Save, 
  RotateCcw, 
  Upload, 
  MessageCircle, 
  Minus,
  Eye,
  Settings,
  Bot,
  Brain,
  MessageSquare,
  Database,
  Users,
  Shield,
  BarChart3,
  Code,
  LayoutDashboard,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

// Type definitions from the JSON config
interface ConfigField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'dropdown' | 'color' | 'toggle' | 'number' | 'object' | 'slider';
  options?: string[];
  default?: any;
  min?: number;
  max?: number;
  step?: number;
  fields?: ConfigField[];
  visibleIf?: Record<string, any>;
}

interface ConfigSection {
  id: string;
  label: string;
  visible: boolean;
  fields: ConfigField[];
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  hasSubItems?: boolean;
  subItems?: ConfigSection[];
}

interface PageConfig {
  layoutVersion: string;
  page: {
    id: string;
    title: string;
    description: string;
    layoutStyle: string;
    theme: {
      primaryColor: string;
      surfaceColor: string;
      radius: number;
    };
    sections: ConfigSection[];
  };
}

// Updated configuration with slang field in guardrails
const defaultConfig: PageConfig = {
  "layoutVersion": "2.2.0",
  "page": {
    "id": "chatbot_config",
    "title": "Chatbot Configuration",
    "description": "Configure chatbot design, tone, and AI behavior.",
    "layoutStyle": "standard",
    "theme": {
      "primaryColor": "#0EA5E9",
      "surfaceColor": "#FFFFFF",
      "radius": 10
    },
    "sections": [
      {
        "id": "botSetup",
        "label": "Bot Setup",
        "visible": true,
        "fields": [
          {
            "key": "tone",
            "label": "Bot Tone",
            "type": "dropdown",
            "options": ["friendly", "formal", "casual"],
            "default": "friendly"
          },
          {
            "key": "greeting",
            "label": "Greeting Message",
            "type": "text",
            "default": "Hi there! Welcome to our store 👋"
          },
          {
            "key": "fallback",
            "label": "Fallback Message",
            "type": "textarea",
            "default": "Sorry, I didn't get that. Could you rephrase?"
          },
          {
            "key": "botIdentity",
            "label": "Bot Identity",
            "type": "object",
            "fields": [
              { "key": "name", "type": "text", "label": "Name", "default": "SalesBot" },
              { "key": "avatar", "type": "text", "label": "Avatar URL", "default": "https://cdn.opura.ai/default.png" }
            ]
          }
        ]
      },
      {
        "id": "branding",
        "label": "Branding",
        "visible": true,
        "fields": [
          { "key": "themeColor", "type": "color", "label": "Theme Color", "default": "#FF5733" },
          {
            "key": "position",
            "type": "dropdown",
            "label": "Widget Position",
            "options": ["bottom-right", "bottom-left", "top-right", "top-left"],
            "default": "bottom-right"
          },
          {
            "key": "brandFooter",
            "label": "Brand Footer",
            "type": "object",
            "fields": [
              { "key": "enabled", "type": "toggle", "label": "Enabled", "default": true },
              { "key": "text", "type": "text", "label": "Footer Text", "default": "Powered by Opura.ai" }
            ]
          }
        ]
      },
      {
        "id": "aiSettings",
        "label": "AI Settings",
        "visible": true,
        "fields": [
          {
            "key": "model",
            "type": "dropdown",
            "label": "AI Model",
            "options": ["gpt-4o-mini", "gpt-4-turbo"],
            "default": "gpt-4o-mini"
          },
          {
            "key": "temperature",
            "type": "slider",
            "label": "Response Creativity",
            "min": 0,
            "max": 1,
            "step": 0.1,
            "default": 0.7
          },
          { "key": "persona", "type": "text", "label": "Bot Persona", "default": "friendly assistant" }
        ]
      },
      {
        "id": "behavior",
        "label": "Behavior",
        "visible": true,
        "fields": [
          {
            "key": "responseStyle",
            "type": "dropdown",
            "label": "Response Style",
            "options": ["short", "detailed", "humorous", "formal"],
            "default": "short"
          },
          { "key": "maxResponseTokens", "type": "number", "label": "Max Tokens", "default": 150 },
          { "key": "interruptible", "type": "toggle", "label": "Allow Interruption", "default": true },
          { "key": "useMemory", "type": "toggle", "label": "Use Memory", "default": true },
          {
            "key": "memoryWindow",
            "type": "number",
            "label": "Memory Window",
            "default": 10,
            "visibleIf": { "useMemory": true }
          }
        ]
      },
      {
        "id": "knowledge",
        "label": "Knowledge Base",
        "visible": true,
        "fields": [
          {
            "key": "sourceType",
            "type": "dropdown",
            "label": "Source Type",
            "options": ["manual", "api", "url", "productFeed"],
            "default": "productFeed"
          },
          {
            "key": "dataUrl",
            "type": "text",
            "label": "Data URL",
            "default": "https://merchant.com/products.json",
            "visibleIf": { "sourceType": "productFeed" }
          },
          {
            "key": "refreshInterval",
            "type": "dropdown",
            "label": "Refresh Frequency",
            "options": ["hourly", "daily", "weekly"],
            "default": "daily"
          }
        ]
      },
      {
        "id": "handoff",
        "label": "Human Handoff",
        "visible": true,
        "fields": [
          { "key": "enableHandoff", "type": "toggle", "label": "Enable Handoff", "default": true },
          {
            "key": "handoffPlatform",
            "type": "dropdown",
            "label": "Platform",
            "options": ["Zendesk", "HubSpot", "Freshdesk"],
            "default": "Zendesk",
            "visibleIf": { "enableHandoff": true }
          },
          {
            "key": "handoffWebhook",
            "type": "text",
            "label": "Webhook URL",
            "default": "https://api.merchant.com/handoff",
            "visibleIf": { "enableHandoff": true }
          }
        ]
      },
      {
        "id": "guardrails",
        "label": "AI Guardrails",
        "visible": true,
        "fields": [
          { "key": "blockSensitiveTopics", "type": "toggle", "label": "Block Sensitive Topics", "default": true },
          {
            "key": "blockedKeywords",
            "type": "textarea",
            "label": "Blocked Keywords",
            "default": "politics, religion, violence"
          },
          {
            "key": "allowSlang",
            "type": "toggle",
            "label": "Allow Slang",
            "default": false
          },
          {
            "key": "slangLevel",
            "type": "dropdown",
            "label": "Slang Level",
            "options": ["minimal", "moderate", "casual", "street"],
            "default": "minimal",
            "visibleIf": { "allowSlang": true }
          },
          {
            "key": "customSlangTerms",
            "type": "textarea",
            "label": "Custom Slang Terms",
            "default": "lit, fire, salty, bet, cap",
            "visibleIf": { "allowSlang": true }
          },
          { "key": "gdprCompliant", "type": "toggle", "label": "GDPR Compliant", "default": true }
        ]
      },
      {
        "id": "analytics",
        "label": "Analytics",
        "visible": true,
        "fields": [
          { "key": "enableAnalytics", "type": "toggle", "label": "Enable Analytics", "default": true },
          {
            "key": "analyticsProvider",
            "type": "dropdown",
            "label": "Analytics Provider",
            "options": ["GoogleAnalytics", "Mixpanel", "Amplitude"],
            "default": "Mixpanel"
          },
          {
            "key": "eventWebhook",
            "type": "text",
            "label": "Event Webhook URL",
            "default": "https://merchant.com/bot-events"
          }
        ]
      },
      {
        "id": "devOptions",
        "label": "Developer Options",
        "visible": true,
        "fields": [
          { "key": "sandboxMode", "type": "toggle", "label": "Sandbox Mode", "default": false },
          { "key": "apiAccess", "type": "toggle", "label": "Enable API Access", "default": false }
        ]
      }
    ]
  }
};

// Component for individual form fields
const FormField = ({ 
  field, 
  value, 
  onChange, 
  formData 
}: { 
  field: ConfigField; 
  value: any; 
  onChange: (key: string, newValue: any) => void;
  formData: any;
}) => {
  // Check visibility conditions
  if (field.visibleIf) {
    const shouldShow = Object.entries(field.visibleIf).every(
      ([key, expectedValue]) => formData[key] === expectedValue
    );
    if (!shouldShow) return null;
  }

  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || field.default || ''}
            onChange={(e) => onChange(field.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={field.label}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || field.default || ''}
            onChange={(e) => onChange(field.key, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder={field.label}
          />
        );

      case 'dropdown':
        return (
          <select
            value={value || field.default || ''}
            onChange={(e) => onChange(field.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        );

      case 'color':
        return (
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={value || field.default || '#0EA5E9'}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={value || field.default || '#0EA5E9'}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="#0EA5E9"
            />
          </div>
        );

      case 'toggle':
        return (
          <button
            type="button"
            onClick={() => onChange(field.key, !(value ?? field.default))}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${(value ?? field.default) ? 'bg-blue-600' : 'bg-gray-200'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${(value ?? field.default) ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value ?? field.default ?? 0}
            onChange={(e) => onChange(field.key, parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      case 'slider':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={field.min || 0}
              max={field.max || 100}
              step={field.step || 1}
              value={value ?? field.default ?? 0}
              onChange={(e) => onChange(field.key, parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-sm text-gray-600 text-center">
              {value ?? field.default ?? 0}
            </div>
          </div>
        );

      case 'object':
        return (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            {field.fields?.map((subField) => (
              <div key={subField.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {subField.label}
                </label>
                <FormField
                  field={subField}
                  value={value?.[subField.key]}
                  onChange={(subKey, subValue) => {
                    const newValue = { ...(value || {}), [subKey]: subValue };
                    onChange(field.key, newValue);
                  }}
                  formData={value || {}}
                />
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return renderField();
};

// Dashboard component
const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <LayoutDashboard className="w-5 h-5 mr-2" />
          Dashboard Overview
        </h2>
        
        Stats Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Conversations</p>
                <p className="text-2xl font-bold text-blue-900">2,847</p>
              </div>
              <MessageCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Success Rate</p>
                <p className="text-2xl font-bold text-green-900">94.2%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-yellow-900">0.8s</p>
              </div>
              <Brain className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Human Handoffs</p>
                <p className="text-2xl font-bold text-purple-900">156</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        Recent Activity
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Bot successfully handled customer inquiry about shipping</span>
              <span className="text-xs text-gray-500 ml-auto">2 minutes ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Configuration updated: AI model changed to GPT-4 Turbo</span>
              <span className="text-xs text-gray-500 ml-auto">15 minutes ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Handoff initiated for complex pricing inquiry</span>
              <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
            </div>
          </div>
        </div>
      </div> */}
      <h1> Dashboard work here ....!</h1>
    </div>
  );
};

// Sidebar navigation component
const Sidebar = ({ 
  sections, 
  activeSection, 
  onSectionChange,
  currentView,
  onViewChange
}: {
  sections: ConfigSection[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  currentView: 'dashboard' | 'config';
  onViewChange: (view: 'dashboard' | 'config') => void;
}) => {
  const [adminConfigExpanded, setAdminConfigExpanded] = useState(true);

  const getSectionIcon = (sectionId: string) => {
    const iconMap: Record<string, any> = {
      botSetup: Settings,
      branding: Eye,
      aiSettings: Brain,
      behavior: MessageSquare,
      knowledge: Database,
      handoff: Users,
      guardrails: Shield,
      analytics: BarChart3,
      devOptions: Code
    };
    
    const IconComponent = iconMap[sectionId] || Settings;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
      <nav className="p-4">
        <ul className="space-y-1">
          {/* Dashboard */}
          <li>
            <button
              onClick={() => onViewChange('dashboard')}
              className={`
                w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                ${currentView === 'dashboard'
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="font-medium">Dashboard</span>
            </button>
          </li>

          {/* Admin Config with sub-items */}
          <li>
            <button
              onClick={() => {
                setAdminConfigExpanded(!adminConfigExpanded);
                if (!adminConfigExpanded) {
                  onViewChange('config');
                  onSectionChange('botSetup');
                }
              }}
              className={`
                w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                ${currentView === 'config'
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <Bot className="w-4 h-4" />
              <span className="font-medium flex-1">Admin Config</span>
              {adminConfigExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            {/* Sub-items for Admin Config */}
            {adminConfigExpanded && (
              <ul className="mt-2 ml-4 space-y-1 border-l-2 border-gray-100 pl-4">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => {
                        onViewChange('config');
                        onSectionChange(section.id);
                      }}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-sm
                        ${activeSection === section.id && currentView === 'config'
                          ? 'bg-blue-100 text-blue-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-700'
                        }
                      `}
                    >
                      {getSectionIcon(section.id)}
                      <span>{section.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

// Live preview component
const LivePreview = ({ formData }: { formData: any }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Eye className="w-5 h-5 mr-2" />
        Live Preview
      </h3>
      
      <div className="space-y-4">
        {/* Chat widget mockup */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-dashed border-blue-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-gray-900">
              {formData.botIdentity?.name || 'Opura Bot'}
            </span>
            <button className="ml-auto">
              <Minus className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-sm text-gray-700">
                {formData.greeting || 'Hi there! Welcome to our store 👋'}
              </p>
            </div>
            
            <div className="bg-blue-600 text-white rounded-lg p-3 ml-8">
              <p className="text-sm">
                Good afternoon! How may I assist you?
                {formData.allowSlang && formData.slangLevel === 'casual' && ' 😎'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Configuration preview */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Theme Color:</span>
            <div className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded border"
                style={{ backgroundColor: formData.themeColor || '#0EA5E9' }}
              />
              <span className="font-mono">{formData.themeColor || '#0EA5E9'}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Position:</span>
            <span className="font-medium capitalize">{formData.position || 'bottom-right'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">AI Model:</span>
            <span className="font-medium">{formData.model || 'gpt-4o-mini'}</span>
          </div>
          {formData.allowSlang && (
            <div className="flex justify-between">
              <span className="text-gray-600">Slang Level:</span>
              <span className="font-medium capitalize">{formData.slangLevel || 'minimal'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main component
export default function OpuraBotAdminConsole() {
  const [config] = useState<PageConfig>(defaultConfig);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [activeSection, setActiveSection] = useState('botSetup');
  const [currentView, setCurrentView] = useState<'dashboard' | 'config'>('dashboard');

  // Initialize form data with defaults
  useEffect(() => {
    const initializeDefaults = () => {
      const defaults: Record<string, any> = {};
      
      config.page.sections.forEach(section => {
        section.fields.forEach(field => {
          if (field.type === 'object' && field.fields) {
            defaults[field.key] = {};
            field.fields.forEach(subField => {
              defaults[field.key][subField.key] = subField.default;
            });
          } else {
            defaults[field.key] = field.default;
          }
        });
      });
      
      setFormData(defaults);
    };

    initializeDefaults();
  }, [config]);

  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      // In a real application, you would save to an API
      console.log('Saving configuration:', formData);
      // Show success notification
      alert('Configuration saved successfully!');
    } catch (error) {
      console.error('Error saving configuration:', error);
      alert('Error saving configuration. Please try again.');
    }
  };

  const handleRollback = () => {
    // Reset to defaults
    const defaults: Record<string, any> = {};
    config.page.sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.type === 'object' && field.fields) {
          defaults[field.key] = {};
          field.fields.forEach(subField => {
            defaults[field.key][subField.key] = subField.default;
          });
        } else {
          defaults[field.key] = field.default;
        }
      });
    });
    setFormData(defaults);
  };

  const handlePublish = async () => {
    try {
      // In a real application, you would publish the configuration
      console.log('Publishing configuration:', formData);
      alert('Configuration published successfully!');
    } catch (error) {
      console.error('Error publishing configuration:', error);
      alert('Error publishing configuration. Please try again.');
    }
  };

  const activeConfigSection = config.page.sections.find(s => s.id === activeSection);

  const getPageTitle = () => {
    if (currentView === 'dashboard') {
      return 'Dashboard Overview';
    }
    return activeConfigSection?.label || 'Admin Configuration';
  };

  const getPageDescription = () => {
    if (currentView === 'dashboard') {
      return 'Monitor your bot performance and activity';
    }
    return config.page.description;
  };

  return (
    <div className="mb-height bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Bot className="w-8 h-8 mr-3 text-blue-600" />
              Opura Bot Admin Console
            </h1>
            <p className="text-gray-600 mt-1">{getPageDescription()}</p>
          </div>
          
          {currentView === 'config' && (
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
              <button
                onClick={handleRollback}
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Rollback Config
              </button>
              <button
                onClick={handlePublish}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Publish
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-207px)]">
        {/* Sidebar */}
        <Sidebar 
          sections={config.page.sections} 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {currentView === 'dashboard' ? (
              <Dashboard />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Configuration Form */}
                <div className="lg:col-span-2">
                  {activeConfigSection && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                          {activeConfigSection.label}
                        </h2>
                      </div>
                      
                      <div className="p-6 space-y-6">
                        {activeConfigSection.fields.map((field) => (
                          <div key={field.key}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {field.label}
                            </label>
                            <FormField
                              field={field}
                              value={formData[field.key]}
                              onChange={handleFieldChange}
                              formData={formData}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Live Preview */}
                <div className="lg:col-span-1">
                  <div className="sticky top-6">
                    <LivePreview formData={formData} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}