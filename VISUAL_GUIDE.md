# Crop Link - Visual Guide

## 🎨 User Journey

```
┌─────────────────────────────────┐
│   Landing Page (/)              │
│  ┌───────────────────────────┐  │
│  │  Beautiful Hero Section   │  │
│  │  • Animated Title         │  │
│  │  • Feature Cards          │  │
│  │  • CTA Buttons            │  │
│  │  [Get Started] [Learn]    │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌─────────────────────────────┘
│  │
│  ▼
│  │
│  │ Click "Get Started"
│  │
│  ▼
│  │
│  └─────────────────────────────┐
│                                │
│   Authentication (/auth/*)     │
│  ┌───────────────────────────┐ │
│  │    Sign Up or Login       │ │
│  │  ┌─────────────────────┐  │ │
│  │  │ Email Input         │  │ │
│  │  │ Password Input      │  │ │
│  │  │ [Sign Up/Login]     │  │ │
│  │  └─────────────────────┘  │ │
│  │  Link: Have account?      │ │
│  └───────────────────────────┘ │
│                                │
│  ┌─────────────────────────────┘
│  │ Firebase validates
│  │ Token created
│  │
│  ▼
│  │
│  └─────────────────────────────┐
│                                │
│   Dashboard (/dashboard)       │
│  ┌───────────────────────────┐ │
│  │  Header: user@email.com   │ │
│  │  [≡ Menu] [Logout]        │ │
│  ├───────────┬───────────────┤ │
│  │ Sidebar   │ Dashboard     │ │
│  │ • Home    │ ┌───────────┐ │ │
│  │ • Devices │ │ Metrics   │ │ │
│  │ • Data    │ │ Charts    │ │ │
│  │ • Network │ │ Alerts    │ │ │
│  │ • Alerts  │ └───────────┘ │ │
│  │ • Settings│               │ │
│  └───────────┴───────────────┘ │
│                                │
└────────────────────────────────┘
```

## 📊 Dashboard Page Layout

### Desktop View (1920px+)
```
┌──────────────────────────────────────────────────┐
│ [≡] Crop Link Dashboard    user@email.com [Logout]│
├──────────┬───────────────────────────────────────┤
│ Sidebar  │ Main Content                          │
│          │ ┌─────────────────────────────────────┐
│ • Home   │ │ Online Devices        Avg Moisture │
│ • Devices│ │      3                    62%       │
│ • Data   │ ├─────────────────────────────────────┤
│ • Network│ │ Soil Moisture Trend                 │
│ • Alerts │ │ ┌─────────────────────────────────┐ │
│ • Config │ │ │                                 │ │
│          │ │ │     [Chart]                     │ │
│          │ │ │                                 │ │
│          │ │ └─────────────────────────────────┘ │
│          │ ├─────────────────────────────────────┤
│          │ │ Active Alerts    Device Status     │
│          │ │ • Low Moisture   • Online (3)      │
│          │ │ • High Temp      • Offline (0)     │
│          │ └─────────────────────────────────────┘
└──────────┴───────────────────────────────────────┘
```

### Tablet View (768px - 1024px)
```
┌──────────────────────────┐
│ [≡] Dashboard [Logout]   │
├──────────┬───────────────┤
│ Sidebar  │ Content       │
│ (narrow) │               │
│          │ [Metrics]     │
│ • Home   │               │
│ • Device │ [Chart]       │
│ • Data   │ (stacked)     │
│ • Network│               │
│ • Alerts │ [Alerts]      │
│          │               │
└──────────┴───────────────┘
```

### Mobile View (320px - 768px)
```
┌────────────────┐
│ [≡] [Logout]   │
├────────────────┤
│ Dashboard      │
│                │
│ [Metrics]      │
│                │
│ [Chart]        │
│                │
│ [Alerts]       │
│                │
│ [Status]       │
└────────────────┘

Sidebar Hidden
(Click ≡ to expand)
```

## 🎨 Component Hierarchy

```
App
├── RootLayout
│   ├── AuthProvider
│   │   └── Analytics
│   └── Children (pages)
│
├── Landing Page (/)
│   ├── CropLinkLanding
│   │   ├── HeroSection
│   │   ├── FeaturesSection
│   │   ├── HowItWorksSection
│   │   └── CTASection
│   └── Footer
│
├── Auth Routes (/auth/*)
│   ├── LoginPage
│   │   └── LoginForm
│   │       ├── EmailInput
│   │       ├── PasswordInput
│   │       └── LoginButton
│   └── SignupPage
│       └── SignupForm
│           ├── EmailInput
│           ├── PasswordInput
│           ├── SignupButton
│           └── LoginLink
│
└── Dashboard (/dashboard/*)
    ├── DashboardLayout
    │   ├── Header
    │   │   ├── MenuButton
    │   │   ├── Title
    │   │   ├── UserEmail
    │   │   └── LogoutButton
    │   ├── Sidebar
    │   │   ├── Logo
    │   │   ├── NavItems
    │   │   │   ├── Dashboard Link
    │   │   │   ├── Devices Link
    │   │   │   ├── Analytics Link
    │   │   │   ├── Network Link
    │   │   │   ├── Alerts Link
    │   │   │   └── Settings Link
    │   │   └── Collapse Toggle
    │   └── MainContent
    │
    ├── Dashboard Page (/dashboard)
    │   ├── MetricCard (Online Devices)
    │   ├── MetricCard (Avg Moisture)
    │   ├── ChartWrapper
    │   │   └── Soil Moisture Chart
    │   ├── AlertItem (multiple)
    │   └── Device Status Card
    │
    ├── Devices Page (/dashboard/devices)
    │   ├── DeviceTable
    │   │   └── DeviceRow (multiple)
    │   │       ├── DeviceCard
    │   │       └── StatusBadge
    │   └── DeviceDetailDrawer
    │       ├── Sensor Readings
    │       ├── Signal Strength
    │       └── Battery Level
    │
    ├── Analytics Page (/dashboard/analytics)
    │   ├── TimeRangePicker
    │   ├── DeviceSelector
    │   ├── ChartWrapper (Moisture)
    │   ├── ChartWrapper (Temp vs Humidity)
    │   └── DataExportButton
    │
    ├── Network Page (/dashboard/network)
    │   ├── MetricCard (RSSI)
    │   ├── MetricCard (SNR)
    │   ├── ChartWrapper (PDR)
    │   └── ChartWrapper (Latency)
    │
    ├── Alerts Page (/dashboard/alerts)
    │   ├── SeverityFilter
    │   ├── StatusFilter
    │   └── AlertItem (multiple)
    │       ├── AlertType
    │       ├── Severity Badge
    │       └── AcknowledgeButton
    │
    └── Settings Page (/dashboard/settings)
        ├── ThresholdInput (Moisture)
        ├── ThresholdInput (Temperature)
        ├── ThresholdInput (Humidity)
        ├── NotificationToggle
        └── SaveButton
```

## 🔄 Data Flow Diagram

### Authentication Flow
```
Sign Up Page
    ↓
[email, password] → Firebase Auth
    ↓
Firebase validates & creates UID
    ↓
Generate ID Token
    ↓
AuthContext stores token
    ↓
Redirect to /dashboard
    ↓
✓ User authenticated
```

### Data Fetch Flow
```
Dashboard loads
    ↓
useAuth() gets token
    ↓
GET /api/devices (with Bearer token)
    ↓
Verify token with Firebase Admin SDK
    ↓
Extract userId from token
    ↓
Query MongoDB: devices where userId=...
    ↓
Return device data
    ↓
useEffect updates state
    ↓
Components re-render with data
```

### Sensor Reading Flow
```
LoRa Device
    ↓
Send reading to gateway
    ↓
POST /api/sensor-data (with timestamp)
    ↓
API verifies token
    ↓
Insert into MongoDB sensor-data collection
    ↓
Dashboard polls GET /api/sensor-data
    ↓
Charts update with new reading
    ↓
Real-time visualization
```

## 📱 Responsive Behavior

### Sidebar
```
Desktop (1024px+)         Tablet (768-1024px)       Mobile (<768px)
┌─────┬──────┐           ┌─────┬──────┐             ┌──────┐
│ [■] │ Side │ Open      │ [■] │ Side │ Open        │ [≡]  │ Hidden
│     │ bar  │           │     │ bar  │             │      │
│     │      │           │     │ (sm) │             └──────┘
└─────┴──────┘           └─────┴──────┘
Click [■] to toggle

Sidebar always visible   Click [■] to toggle     Click [≡] to expand
```

### Content Area
```
Desktop                   Tablet                    Mobile
Full width content        70% width content         Full width content
2-3 column layout         1-2 column layout         1 column layout
Side-by-side cards        Stacked cards             Stacked cards
```

## 🎯 Page Navigation Map

```
                    ┌─────────────┐
                    │   Landing   │
                    │   (PUBLIC)  │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
        ┌────────┐    ┌────────┐    ┌──────────┐
        │ Login  │    │ SignUp │    │ Features │
        │ (AUTH) │    │ (AUTH) │    │(Public)  │
        └────┬───┘    └────┬───┘    └──────────┘
             │             │
             └─────────┬───┘
                       │
                       ▼
            ┌──────────────────┐
            │    DASHBOARD     │
            │   (PROTECTED)    │
            └────────┬─────────┘
            │        │        │        │        │
            ▼        ▼        ▼        ▼        ▼
        ┌──────┐  ┌───────┐  ┌────────┐  ┌───────┐  ┌─────────┐
        │ Home │  │Device │  │Analytics│  │Network│  │  Alerts │
        └──────┘  └───────┘  └────────┘  └───────┘  └─────────┘
            │
            ▼
        ┌────────┐
        │Settings│
        └────────┘
```

## 🎨 Color System

```
Primary Colors          Secondary Colors        Status Colors
┌──────────────┐       ┌──────────────┐        ┌─────────────────┐
│ Dark BG      │       │ Light Gray   │        │ Online: Green   │
│ (#1a1a1a)    │       │ (#e5e7eb)    │        │ Offline: Red    │
└──────────────┘       └──────────────┘        │ Warning: Yellow │
                                               │ Info: Blue      │
┌──────────────┐       ┌──────────────┐        └─────────────────┘
│ Card BG      │       │ Accent Green │
│ (#2d2d2d)    │       │ (#10b981)    │
└──────────────┘       └──────────────┘

All colors follow agricultural/nature theme:
- Green for healthy/online status
- Red for critical/offline
- Yellow for warnings
- Blue for information
- Dark grays for professional look
```

## 📊 Chart Types

```
Soil Moisture (24h)          Temp vs Humidity             RSSI Signal
┌─────────────────┐         ┌──────────────────┐         ┌─────────────┐
│ Line Chart      │         │ Multi-line Chart │         │ Line Chart  │
│ X: Time         │         │ Y: Percentage    │         │ Y: dBm      │
│ Y: Percentage   │         │ Line 1: Temp     │         │ Lower = Bad │
│ Single device   │         │ Line 2: Humidity │         │ Trend view  │
└─────────────────┘         └──────────────────┘         └─────────────┘

Packet Delivery Rate         Network Latency              Device Status
┌─────────────────┐         ┌──────────────────┐         ┌─────────────┐
│ Area Chart      │         │ Bar Chart        │         │ Metric Card │
│ Y: Percentage   │         │ Y: Milliseconds  │         │ Text + Icon │
│ Shows trend     │         │ X: Devices       │         │ Colored bg  │
│ Filled area     │         │ Horizontal bars  │         │ Key numbers │
└─────────────────┘         └──────────────────┘         └─────────────┘
```

## 🎯 Interactive Elements

### Buttons
```
[Primary Button]       [Secondary Button]      [Ghost Button]
(Get Started)         (Learn More)            (More Options)
```

### Cards
```
┌────────────────────────┐
│  Metric Card           │ Hover effect
│  ┌─────────────────┐   │ Shadow increases
│  │ 65%             │   │ Slight scale up
│  │ Soil Moisture   │   │
│  │ ↑ +5% (today)   │   │
│  └─────────────────┘   │
└────────────────────────┘
```

### Badges
```
[Online]    [Offline]    [Warning]    [Critical]
 Green       Red          Yellow        Red
```

### Inputs
```
Email: [────────────────────]  Hover: border color change
Pass:  [────────────────────]  Focus: blue outline
```

## 🚀 Performance Visualization

```
Landing Page Load        API Response Time        Dashboard Render
┌────────────┐           ┌────────────┐          ┌────────────┐
│  100ms     │           │  <100ms    │          │  <1000ms   │
│ Static     │           │ Cached     │          │ Charts +   │
│ content    │           │ MongoDB    │          │ Data       │
└────────────┘           └────────────┘          └────────────┘

Ideal performance targets:
- Page load: <2s
- API calls: <200ms
- Chart render: <500ms
- Navigation: instant
```

## 📈 Growth Path

```
Phase 1 (Current)         Phase 2 (Next)            Phase 3 (Future)
┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│ Web App      │          │ Mobile App   │          │ Advanced AI  │
│ Basic Auth   │          │ Real devices │          │ Predictions  │
│ Mock data    │          │ Live data    │          │ Auto-control │
│ Dashboard    │          │ Notifications│          │ Optimization │
│ CRUD ops     │          │ Multi-tenant │          │ Multi-farm   │
└──────────────┘          └──────────────┘          └──────────────┘
```

---

**Visual Guide Complete!** 🎨

This guide helps you understand the UI structure, data flow, and user experience of Crop Link.
