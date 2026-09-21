// ========================================================================
// SITE DATA CONFIGURATION
// You and your partner can easily edit your details, services, and works here!
// ========================================================================

const siteConfig = {
  configVersion: "2.1",

  // Shared Studio / Brand Information
  brand: {
    name: "NEXUS",
    tagline: "CCTV / Home automation / Security system (ELV)",
    aboutShort: "Specialized engineering in intelligent CCTV surveillance, smart home automation, intrusion alarms, renewable solar power, and Extra Low Voltage (ELV) infrastructure.",
    location: "Kerala, India",
    sharedEmail: "asadukdpm@gmail.com",
    hideProjectPhotos: true, // Hide project images until user uploads real project photos
    masterPin: "0169"
  },

  // Individual Partner Profiles
  // Each partner has their own direct contact info, WhatsApp number, and vCard
  partners: {
    partner1: {
      id: "partner1",
      name: "Asadullah K. P.",
      role: "Founder & Product Strategist",
      company: "Nexus",
      phoneDisplay: "+91 90489 14570",
      phoneRaw: "+919048914570", // Clean number for tel: and WhatsApp
      whatsapp: "919048914570",  // Digits only with country code
      email: "asadukdpm@gmail.com",
      website: "https://nexus.studio",
      location: "Kerala, India",
      avatar: "assets/asad-profile.jpg",
      caricature: "assets/asad-caricature.jpg",
      pin: "0169",
      bio: "Specializing in enterprise IP surveillance architecture, smart building automation, and high-performance ELV solutions. Driving technical planning, seamless integrations, and reliable security deployment.",
      customWhatsappGreeting: "Hi Asadullah\nI am ___ from ___",
      socials: {},
      vcard: {
        firstName: "Asadullah",
        lastName: "K. P.",
        contactName: "Asadullah / CCTV, Home Automation",
        title: "Founder & Product Strategist",
        note: "Nexus Founder. Contact for CCTV surveillance, Home Automation, and ELV security systems."
      }
    },

    partner2: {
      id: "partner2",
      name: "Ansarullah K. P.",
      role: "Founder & Creative Director",
      company: "Nexus",
      phoneDisplay: "+91 98479 14570",
      phoneRaw: "+919847914570",
      whatsapp: "919847914570",
      email: "ansaransarullahkp@gmail.com",
      website: "https://nexus.studio",
      location: "Kerala, India",
      avatar: "assets/ansar-profile.jpg",
      caricature: "assets/ansar-caricature.jpg",
      visitingCard: "assets/ansar-visiting-card.jpg",
      pin: "0169",
      bio: "Curating intuitive smart living environments, bespoke automation aesthetics, and high-standard client experiences. Blending technological security with refined architectural design.",
      customWhatsappGreeting: "Hi Ansarullah\nI am ___ from ___",
      socials: {},
      vcard: {
        firstName: "Ansarullah",
        lastName: "K. P.",
        contactName: "Ansarullah / CCTV, Home Automation",
        title: "Founder & Creative Director",
        note: "Nexus Founder. Contact for smart home automation, security design, and ELV projects."
      }
    }
  },

  // Shared Working Fields & Capabilities (ELV, Security & Automation Systems)
  workingFields: [
    {
      id: "field-1",
      icon: "home-automation",
      title: "Home automation",
      tag: "Smart Living & IoT",
      description: "Complete intelligent home automation ecosystems featuring centralized lighting controls, smart ambiance scenes, touch keypads, climate control, and voice integrations.",
      deliverables: ["Lighting & Dimming Automation", "Smart Touch Panels & Keypads", "Voice Control (Alexa / Google)", "Mobile App Remote Management"]
    },
    {
      id: "field-2",
      icon: "security-alarm",
      title: "Security Alarm",
      tag: "Intrusion Protection",
      description: "High-sensitivity perimeter and indoor intrusion detection systems engineered with multi-zone alarm panels, vibration sensors, magnetic door contacts, and siren relays.",
      deliverables: ["PIR Motion & Beam Detectors", "GSM & IP Alarm Control Panels", "Instant Mobile Call/SMS Alerts", "24/7 Siren & Strobe Integration"]
    },
    {
      id: "field-3",
      icon: "cctv",
      title: "Large scale CCTV System",
      tag: "Surveillance & VMS",
      description: "High-definition IP surveillance networks engineered for commercial buildings, industrial facilities, educational campuses, and estates with centralized NVR storage and remote monitoring.",
      deliverables: ["4K & ColorVu Night-Vision Cameras", "Enterprise NVR & VMS Storage", "PTZ Automated Tracking & ANPR", "Multi-Screen Central Monitoring"]
    },
    {
      id: "field-4",
      icon: "solar-camera",
      title: "Wifi / Solar Camera systm",
      tag: "Off-Grid Wireless",
      description: "Autonomous standalone wireless camera systems equipped with monocrystalline solar panels, 4G LTE SIM connectivity, and long-life lithium battery backup for remote sites.",
      deliverables: ["Solar-Powered Standalone Cameras", "4G LTE Wireless Connectivity", "PIR Motion Triggered Recording", "IP67 Heavy All-Weather Rating"]
    },
    {
      id: "field-5",
      icon: "solar-electric",
      title: "Solar Electric",
      tag: "Clean Energy",
      description: "On-grid, off-grid, and hybrid solar power architectures designed to cut energy bills, provide uninterrupted backup for essential loads, and power security infrastructure.",
      deliverables: ["Hybrid & On-Grid Solar Systems", "Smart Inverter & Battery Banks", "Net-Metering Assistance", "Real-Time Solar Yield Monitoring"]
    },
    {
      id: "field-6",
      icon: "gate-automation",
      title: "Gate/shutter automation",
      tag: "Motorized Access",
      description: "Heavy-duty motorized sliding gates, swing gate openers, and motorized rolling shutters with wireless remote control, safety infrared photocells, and smartphone activation.",
      deliverables: ["Automated Sliding & Swing Motors", "Industrial Rolling Shutter Drives", "Obstacle Detection Safety Photocells", "Wireless Remote & Phone Control"]
    },
    {
      id: "field-7",
      icon: "biometric",
      title: "Biometric / Attandance system",
      tag: "Access Control & HR",
      description: "Contactless AI facial recognition terminals, optical fingerprint sensors, and RFID card access control systems linked with automated employee attendance and door locks.",
      deliverables: ["AI Face & Fingerprint Scanners", "Electromagnetic (EM) Door Locks", "Automated Payroll & Attendance Logs", "Multi-Location Cloud Management"]
    },
    {
      id: "field-8",
      icon: "wifi-network",
      title: "wifi / network",
      tag: "Structured Cabling",
      description: "End-to-end IT network infrastructure including structured CAT6 cabling, fiber optic links, gigabit PoE managed switches, server rack cabinets, and whole-premises mesh WiFi.",
      deliverables: ["Structured CAT6 & Optic Fiber", "Enterprise Gigabit PoE Switches", "Seamless Roaming Mesh WiFi APs", "Server Rack Cabinets & Patching"]
    },
    {
      id: "field-9",
      icon: "nurse-call",
      title: "Nurse call system",
      tag: "Healthcare ELV",
      description: "Dedicated hospital and healthcare communication systems featuring bed-head calling stations, emergency bathroom pull cords, duty nurse master consoles, and corridor dome indicators.",
      deliverables: ["Patient Bed Call Stations", "Emergency Toilet Pull Switches", "Over-Door Corridor Indicator Domes", "Central Master Nurse Station"]
    }
  ],

  // Shared Work Timeline & Project Archive (ELV, Security & Automation Milestones)
  timelineWorks: [
    {
      id: "work-2026-1",
      date: "2026",
      year: "2026",
      status: "Recent Installation",
      category: "automation",
      categoryLabel: "Home Automation",
      title: "Luxury Residential Smart Villa Automation & Security",
      client: "Private Residence",
      summary: "Comprehensive multi-tier automation integrating smart lighting, climate, motorized curtains, and unified security alarms.",
      fullDescription: "Engineered a centralized home automation ecosystem encompassing 45+ lighting circuits, smart touch panels, motorized gate controls, and app-controlled security zones.",
      roleText: "Joint Execution: Asadullah K. P. (Surveillance & Network Engineering) + Ansarullah K. P. (Smart Automation Aesthetics & UI)",
      image: "",
      tags: ["Home Automation", "Security Alarms", "Touch Panels", "Remote App"],
      metrics: "100% smart coverage across 3 floors"
    },
    {
      id: "work-2025-2",
      date: "2025",
      year: "2025",
      status: "Completed",
      category: "cctv",
      categoryLabel: "CCTV Surveillance",
      title: "Commercial Logistics Campus – 64-Channel 4K IP CCTV",
      client: "Enterprise Logistics",
      summary: "Turnkey enterprise IP surveillance setup with fiber optic backbone, NVR failover storage, and automated perimeter alerts.",
      fullDescription: "Implemented high-definition color night-vision IP cameras covering loading docks, administrative wings, and perimeter fences with real-time video management server.",
      roleText: "Joint Execution: System architecture, fiber optic splicing, camera placement, and control room configuration.",
      image: "",
      tags: ["Large Scale CCTV", "Fiber Backbone", "Enterprise NVR", "Perimeter Security"],
      metrics: "64 IP Cameras & 24/7 Control Room"
    },
    {
      id: "work-2025-1",
      date: "2025",
      year: "2025",
      status: "Completed",
      category: "solar",
      categoryLabel: "Off-Grid Security",
      title: "Agricultural Estate 4G Solar Surveillance & Off-Grid Power",
      client: "Private Estate",
      summary: "Autonomous solar-powered camera towers with 4G LTE transmission and hybrid solar power backup.",
      fullDescription: "Overcame remote terrain limitations by deploying autonomous solar camera units with infrared PIR triggers and cloud recording, backed by a hybrid solar electrical bank.",
      roleText: "Joint Execution: Solar power sizing, wireless 4G transmission, and heavy weather-sealed mounting.",
      image: "",
      tags: ["Wifi / Solar Camera", "Solar Electric", "4G LTE", "Off-Grid"],
      metrics: "Zero grid dependency & 24/7 uptime"
    },
    {
      id: "work-2024-2",
      date: "2024",
      year: "2024",
      status: "Completed",
      category: "biometric",
      categoryLabel: "Access & Automation",
      title: "Corporate Facility Biometric Access & Motorized Gate Automation",
      client: "Corporate Office",
      summary: "AI facial recognition door access combined with heavy-duty sliding gate automation and automated HR attendance.",
      fullDescription: "Integrated high-speed face recognition turnstiles and EM-lock glass door access control synchronized directly with attendance software, along with motorized perimeter gate motors.",
      roleText: "Joint Execution: Hardware installation, motor tuning, access control controller programming, and software sync.",
      image: "",
      tags: ["Biometric Access", "Gate Automation", "EM Locks", "Time Attendance"],
      metrics: "Sub-second touchless verification"
    },
    {
      id: "work-2024-1",
      date: "2024",
      year: "2024",
      status: "Milestone",
      category: "elv",
      categoryLabel: "Healthcare ELV",
      title: "Specialty Clinic Nurse Call & Structured Network Rollout",
      client: "Healthcare Facility",
      summary: "Hospital-grade nurse call system installation paired with gigabit structured CAT6 network cabling.",
      fullDescription: "Deployed patient bed-head call panels, emergency toilet cords, and central nurse console stations, supported by a structured CAT6 rack network infrastructure.",
      roleText: "Joint Execution: Cabling layout, call panel termination, nurse station commissioning, and network certification.",
      image: "",
      tags: ["Nurse Call System", "Structured Cabling", "wifi / network", "Healthcare ELV"],
      metrics: "Instant audio-visual nurse response"
    }
  ]
};
