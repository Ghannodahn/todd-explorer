/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import React, { useState } from 'react';

const AmwaySuccessPathways = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedStrategy, setSelectedStrategy] = useState('product');
  const [monthlyHours, setMonthlyHours] = useState(40);
  const [skillPreference, setSkillPreference] = useState(5);
  const [timeHorizon, setTimeHorizon] = useState(12);
  
  // Calculate recommended strategy based on inputs
  const calculateStrategy = () => {
    // Simplistic algorithm that weights factors
    const salesScore = (10 - skillPreference) * 2 + (100 - monthlyHours) / 5 + (24 - timeHorizon) / 2;
    const teamScore = skillPreference * 2 + monthlyHours / 5 + timeHorizon / 2;
    
    if (Math.abs(salesScore - teamScore) < 10) {
      return 'hybrid';
    } else if (salesScore > teamScore) {
      return 'product';
    } else {
      return 'team';
    }
  };
  
  // Recalculate recommendation when inputs change
  React.useEffect(() => {
    setSelectedStrategy(calculateStrategy());
  }, [monthlyHours, skillPreference, timeHorizon]);
  
  // Leadership Level Requirements
  const leadershipLevels = [
    { 
      level: "Independent Business Owner (IBO)", 
      requirements: "Starting point", 
      benefits: "Product discounts, retail margin (20-30%)",
      timeline: "Immediate"
    },
    { 
      level: "Silver Producer", 
      requirements: "7,500 PV (monthly)", 
      benefits: "25% Performance Bonus",
      timeline: "3-6 months"
    },
    { 
      level: "Platinum", 
      requirements: "25,000 Monthly Group Volume, 3+ qualified legs", 
      benefits: "Leadership Bonus (6% of downline)", 
      timeline: "12-24 months"
    },
    { 
      level: "Emerald", 
      requirements: "3+ Platinum legs", 
      benefits: "Additional bonuses, deeper downline commissions",
      timeline: "24-48 months" 
    },
    { 
      level: "Diamond", 
      requirements: "6+ Platinum legs, sustained volume", 
      benefits: "Diamond bonus, international recognition",
      timeline: "48-84 months" 
    },
    { 
      level: "Executive Diamond+", 
      requirements: "9+ Platinum legs, leadership development", 
      benefits: "Crown bonuses, passive income potential",
      timeline: "5-10+ years" 
    }
  ];
  
  // Strategy pathways
  const pathways = {
    product: {
      title: "Product-Centric Sales Path",
      description: "Focus on building a customer base and direct sales",
      advantages: [
        "Immediate cash flow (20-30% retail margin)",
        "Lower barrier to entry",
        "Customer loyalty and repeat purchases",
        "Less regulatory scrutiny"
      ],
      challenges: [
        "Income ceiling (limited by personal time)",
        "Market saturation in mature areas",
        "Time-intensive product demonstrations",
        "Requires strong sales skills"
      ],
      timeline: [
        { month: "1-3", focus: "Product knowledge mastery, target 5-10 customers" },
        { month: "4-6", focus: "Expand to 15-25 regular customers, social media presence" },
        { month: "7-12", focus: "Create niche specialization, target $2,000-$3,000 monthly" },
        { month: "12+", focus: "Scale with digital storefront, consider selective recruiting" }
      ],
      idealFor: "Those with sales experience, specific product expertise, limited time for team building"
    },
    team: {
      title: "Downline-Driven Team Path",
      description: "Focus on recruiting, training, and building an organization",
      advantages: [
        "Leveraged income (6-21% on downline volume)",
        "Scalable beyond personal time limitations",
        "Residual earnings potential",
        "Leadership development opportunity"
      ],
      challenges: [
        "High attrition rates (80% in first 3 months)",
        "Ethical and regulatory considerations",
        "Upfront investment in training materials",
        "Delayed income (compared to direct sales)"
      ],
      timeline: [
        { month: "1-3", focus: "Identify 5-7 potential business partners, master presentation" },
        { month: "4-6", focus: "Develop mentoring system, duplicate presentations" },
        { month: "7-12", focus: "Build depth in organization, focus on leader development" },
        { month: "12+", focus: "System building, recognition events, organizational expansion" }
      ],
      idealFor: "Natural networkers, former managers, long-term business builders, leadership minded"
    },
    hybrid: {
      title: "Balanced Hybrid Approach",
      description: "Strategic combination of sales and team building",
      advantages: [
        "Diversified income streams",
        "Flexibility to adapt to market conditions",
        "Sales credibility enhances recruiting",
        "More sustainable growth pattern"
      ],
      challenges: [
        "Requires time management mastery",
        "Need for diverse skill set",
        "Potential to dilute focus",
        "Complex strategy execution"
      ],
      timeline: [
        { month: "1-3", focus: "80% product sales / 20% selective recruiting" },
        { month: "4-6", focus: "60% product sales / 40% team development" },
        { month: "7-12", focus: "50% product sales / 50% team leadership" },
        { month: "12+", focus: "30% personal sales / 70% organization building" }
      ],
      idealFor: "Balanced entrepreneurs, those wanting sustainable growth, digital influencers"
    }
  };
  
  // Example niche strategies
  const nicheStrategies = [
    {
      name: "Wellness Professional",
      focus: "Nutrilite, XS Energy",
      approach: "Leverage health credentials, offer personalized supplement plans",
      advantage: "Expert positioning, higher customer retention"
    },
    {
      name: "Social Media Influencer",
      focus: "Artistry, G&H, product demonstrations",
      approach: "Content creation, before/after showcases, lifestyle integration",
      advantage: "Scalable audience, passive prospect generation"
    },
    {
      name: "Corporate Wellness",
      focus: "XS Energy, Nutrilite, employee programs",
      approach: "B2B partnerships, workplace wellness initiatives",
      advantage: "Bulk sales, organizational penetration"
    },
    {
      name: "Eco-Conscious Specialist",
      focus: "Amway Home, sustainability messaging",
      approach: "Environmental impact education, plastic reduction emphasis",
      advantage: "Aligned with PNW values, unique selling proposition"
    },
    {
      name: "Hybrid Digital Coach",
      focus: "Balance of products and selective recruiting",
      approach: "Online community building, digital courses, success stories",
      advantage: "Location independence, scalable systems"
    }
  ];
  
  return (
    <div className="flex flex-col max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Main Header */}
      <div className="bg-blue-800 text-white p-6">
        <h1 className="text-3xl font-bold mb-2">Amway Success Pathways</h1>
        <p className="text-lg opacity-90">Interactive Strategy Visualizer for IBO Growth Planning</p>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-blue-700 text-white flex">
        <button 
          onClick={() => setSelectedTab('overview')}
          className={`py-3 px-6 ${selectedTab === 'overview' ? 'bg-white text-blue-800 font-bold' : 'hover:bg-blue-600'}`}
        >
          Pathways Overview
        </button>
        <button 
          onClick={() => setSelectedTab('calculator')}
          className={`py-3 px-6 ${selectedTab === 'calculator' ? 'bg-white text-blue-800 font-bold' : 'hover:bg-blue-600'}`}
        >
          Strategy Calculator
        </button>
        <button 
          onClick={() => setSelectedTab('leadership')}
          className={`py-3 px-6 ${selectedTab === 'leadership' ? 'bg-white text-blue-800 font-bold' : 'hover:bg-blue-600'}`}
        >
          Leadership Track
        </button>
        <button 
          onClick={() => setSelectedTab('niches')}
          className={`py-3 px-6 ${selectedTab === 'niches' ? 'bg-white text-blue-800 font-bold' : 'hover:bg-blue-600'}`}
        >
          Niche Strategies
        </button>
      </div>
      
      {/* Content Area */}
      <div className="p-6">
        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Three Paths to Amway Success</h2>
            <p className="mb-6 text-gray-700">
              Amway offers multiple pathways to build a business. Understanding which approach 
              aligns with your skills, time commitment, and goals is essential for sustainable growth.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Product-Centric Card */}
              <div className={`border rounded-lg overflow-hidden shadow-md ${selectedStrategy === 'product' ? 'ring-4 ring-blue-500' : ''}`}>
                <div className="bg-green-100 p-4">
                  <h3 className="text-xl font-bold text-green-800">Product-Centric</h3>
                  <p className="text-sm text-green-700">Focus: Direct Sales</p>
                </div>
                <div className="p-4">
                  <p className="text-sm mb-3">
                    Build your business through product expertise, customer relationships, and retail margin.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-24 text-sm font-medium">Income Speed:</div>
                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
                        <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 text-sm font-medium">Scalability:</div>
                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
                        <div className="bg-green-500 h-2 rounded-full w-2/5"></div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 text-sm font-medium">Time Required:</div>
                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
                        <div className="bg-green-500 h-2 rounded-full w-3/5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button 
                      onClick={() => setSelectedStrategy('product')}
                      className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
                    >
                      Explore This Path
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Team-Building Card */}
              <div className={`border rounded-lg overflow-hidden shadow-md ${selectedStrategy === 'team' ? 'ring-4 ring-blue-500' : ''}`}>
                <div className="bg-purple-100 p-4">
                  <h3 className="text-xl font-bold text-purple-800">Team-Building</h3>
                  <p className="text-sm text-purple-700">Focus: Downline Development</p>
                </div>
                <div className="p-4">
                  <p className="text-sm mb-3">
                    Create a scalable organization through recruiting, mentoring, and leadership development.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-24 text-sm font-medium">Income Speed:</div>
                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
                        <div className="bg-purple-500 h-2 rounded-full w-2/5"></div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 text-sm font-medium">Scalability:</div>
                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
                        <div className="bg-purple-500 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 text-sm font-medium">Time Required:</div>
                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
                        <div className="bg-purple-500 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button 
                      onClick={() => setSelectedStrategy('team')}
                      className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 font-medium"
                    >
                      Explore This Path
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Hybrid Approach Card */}
              <div className={`border rounded-lg overflow-hidden shadow-md ${selectedStrategy === 'hybrid' ? 'ring-4 ring-blue-500' : ''}`}>
                <div className="bg-blue-100 p-4">
                  <h3 className="text-xl font-bold text-blue-800">Hybrid Approach</h3>
                  <p className="text-sm text-blue-700">Focus: Balanced Growth</p>
                </div>
                <div className="p-4">
                  <p className="text-sm mb-3">
                    Balance product sales with selective recruiting for a sustainable, diversified business.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-24 text-sm font-medium">Income Speed:</div>
                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
                        <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 text-sm font-medium">Scalability:</div>
                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
                        <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 text-sm font-medium">Time Required:</div>
                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
                        <div className="bg-blue-500 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button 
                      onClick={() => setSelectedStrategy('hybrid')}
                      className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                    >
                      Explore This Path
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Selected Strategy Details */}
            <div className="mt-8 border rounded-lg p-6 bg-gray-50">
              <h3 className="text-2xl font-bold text-blue-800 mb-2">{pathways[selectedStrategy].title}</h3>
              <p className="text-gray-700 mb-4">{pathways[selectedStrategy].description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-blue-700 mb-2">Key Advantages</h4>
                  <ul className="space-y-1">
                    {pathways[selectedStrategy].advantages.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-blue-700 mb-2">Challenges to Navigate</h4>
                  <ul className="space-y-1">
                    {pathways[selectedStrategy].challenges.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">!</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-bold text-blue-700 mb-3">Growth Timeline</h4>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-8 w-1 bg-blue-200"></div>
                  <div className="space-y-4">
                    {pathways[selectedStrategy].timeline.map((item, index) => (
                      <div key={index} className="flex items-start relative">
                        <div className="absolute top-0 left-0 w-16 mt-1 pr-4 text-right text-sm font-bold text-blue-800">
                          {item.month}
                        </div>
                        <div className="z-10 bg-blue-500 rounded-full w-4 h-4 mt-1 ml-6 flex-shrink-0"></div>
                        <div className="ml-4 bg-white p-3 rounded-lg shadow-sm border flex-1">
                          <p className="text-sm">{item.focus}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm"><strong>Best For:</strong> {pathways[selectedStrategy].idealFor}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Strategy Calculator Tab */}
        {selectedTab === 'calculator' && (
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Strategy Calculator</h2>
            <p className="mb-6 text-gray-700">
              Adjust the sliders below to find the Amway business strategy that best matches your 
              preferences, time availability, and goals.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h3 className="font-bold text-lg text-blue-800 mb-4">Your Parameters</h3>
                
                {/* Monthly Hours Slider */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Hours Available: <span className="font-bold text-blue-700">{monthlyHours} hours</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={monthlyHours}
                    onChange={(e) => setMonthlyHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10h</span>
                    <span>40h</span>
                    <span>70h</span>
                    <span>100h</span>
                  </div>
                </div>
                
                {/* Skill Preference Slider */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Preference: 
                    <span className="font-bold text-blue-700 ml-1">
                      {skillPreference <= 3 ? 'Sales-Oriented' : 
                       skillPreference >= 7 ? 'Leadership-Oriented' : 
                       'Balanced'}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={skillPreference}
                    onChange={(e) => setSkillPreference(parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Sales</span>
                    <span>Balanced</span>
                    <span>Leadership</span>
                  </div>
                </div>
                
                {/* Time Horizon Slider */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Success Timeline (months): <span className="font-bold text-blue-700">{timeHorizon}</span>
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="36"
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>3mo</span>
                    <span>12mo</span>
                    <span>24mo</span>
                    <span>36mo</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h3 className="font-bold text-lg text-blue-800 mb-4">Recommended Strategy</h3>
                
                <div className="flex items-center justify-center h-56">
                  <div className="text-center">
                    <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center
                      ${selectedStrategy === 'product' ? 'bg-green-100 text-green-800 border-4 border-green-500' : 
                        selectedStrategy === 'team' ? 'bg-purple-100 text-purple-800 border-4 border-purple-500' :
                        'bg-blue-100 text-blue-800 border-4 border-blue-500'}`}
                    >
                      <div>
                        <div className="font-bold text-xl">
                          {selectedStrategy === 'product' ? 'Product' : 
                           selectedStrategy === 'team' ? 'Team' : 
                           'Hybrid'}
                        </div>
                        <div className="text-sm">Focus</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 font-semibold text-gray-800">
                      {selectedStrategy === 'product' ? 'Product-Centric Sales Path' : 
                       selectedStrategy === 'team' ? 'Downline-Driven Team Path' : 
                       'Balanced Hybrid Approach'}
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-600 max-w-xs mx-auto">
                      {selectedStrategy === 'product' ? 
                        'Focus on building your customer base and mastering the product portfolio.' : 
                       selectedStrategy === 'team' ? 
                        'Focus on identifying and developing business partners for your organization.' : 
                        'Balance product sales with selective recruiting for sustainable growth.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">Result Analysis</h4>
              <p className="text-sm mb-2">
                Based on your inputs, the {selectedStrategy === 'product' ? 'Product-Centric' : 
                selectedStrategy === 'team' ? 'Team-Building' : 'Hybrid'} approach aligns best with your situation.
              </p>
              
              <div className="text-sm">
                <strong>Key factors in this recommendation:</strong>
                <ul className="mt-1">
                  {monthlyHours < 40 && selectedStrategy === 'product' && (
                    <li>• Your limited time availability (under 40 hours/month) favors focused product sales</li>
                  )}
                  {monthlyHours > 60 && selectedStrategy === 'team' && (
                    <li>• Your substantial time commitment (over 60 hours/month) supports team development</li>
                  )}
                  {skillPreference <= 3 && selectedStrategy === 'product' && (
                    <li>• Your sales-oriented skill preference aligns with direct customer engagement</li>
                  )}
                  {skillPreference >= 7 && selectedStrategy === 'team' && (
                    <li>• Your leadership orientation suggests strength in mentoring and team building</li>
                  )}
                  {timeHorizon <= 6 && selectedStrategy === 'product' && (
                    <li>• Your shorter timeframe (under 6 months) benefits from immediate product sales income</li>
                  )}
                  {timeHorizon >= 24 && selectedStrategy === 'team' && (
                    <li>• Your longer timeframe (24+ months) allows for organization development</li>
                  )}
                  {selectedStrategy === 'hybrid' && (
                    <li>• Your balanced parameters suggest a hybrid approach would be most effective</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Leadership Track Tab */}
        {selectedTab === 'leadership' && (
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Amway Leadership Advancement Track</h2>
            <p className="mb-6 text-gray-700">
              The Amway business offers a structured advancement path with increasing income potential
              and recognition at each level. Below is the progression from new IBO to top leadership.
            </p>
            
            <div className="relative mb-10">
              <div className="absolute left-8 top-8 bottom-8 w-1 bg-blue-300"></div>
              
              {leadershipLevels.map((level, index) => (
                <div key={index} className="relative mb-8 flex">
                  <div className="absolute h-full w-16 flex items-center justify-center">
                    <div className={`z-10 rounded-full w-6 h-6 flex items-center justify-center font-bold text-white
                      ${index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-blue-600' : 
                        index === 2 ? 'bg-blue-700' : 
                        index === 3 ? 'bg-blue-800' : 
                        index === 4 ? 'bg-purple-700' : 
                        'bg-purple-900'}`}
                    >
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="ml-16 bg-white p-5 rounded-lg shadow-md border flex-1">
                    <div className="flex flex-col md:flex-row md:items-center mb-2">
                      <h3 className={`font-bold text-lg mr-3
                        ${index === 0 ? 'text-blue-500' : 
                          index === 1 ? 'text-blue-600' : 
                          index === 2 ? 'text-blue-700' : 
                          index === 3 ? 'text-blue-800' : 
                          index === 4 ? 'text-purple-700' : 
                          'text-purple-900'}`}
                      >
                        {level.level}
                      </h3>
                      <div className="text-sm text-gray-600 mt-1 md:mt-0">
                        Typical Timeline: <span className="font-medium">{level.timeline}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <div className="text-sm font-medium text-blue-800 mb-1">Requirements:</div>
                        <div className="text-sm text-gray-700">{level.requirements}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-blue-800 mb-1">Benefits:</div>
                        <div className="text-sm text-gray-700">{level.benefits}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 mt-6">
              <h4 className="font-bold text-blue-800 mb-2">Understanding Performance Bonus Levels</h4>
              <p className="text-sm mb-3">
                Your monthly PV (Point Value) determines your Performance Bonus percentage, which is calculated on BV (Business Volume).
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="py-2 px-4 border-b text-left text-sm">Monthly PV</th>
                      <th className="py-2 px-4 border-b text-left text-sm">Performance Bonus</th>
                      <th className="py-2 px-4 border-b text-left text-sm">For Example (on $1,000 BV)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="bg-white">
                      <td className="py-2 px-4 border-b">7,500+</td>
                      <td className="py-2 px-4 border-b font-medium text-blue-700">25% of BV</td>
                      <td className="py-2 px-4 border-b">$250</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 border-b">6,000-7,499</td>
                      <td className="py-2 px-4 border-b font-medium text-blue-700">23% of BV</td>
                      <td className="py-2 px-4 border-b">$230</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-2 px-4 border-b">4,000-5,999</td>
                      <td className="py-2 px-4 border-b font-medium text-blue-700">21% of BV</td>
                      <td className="py-2 px-4 border-b">$210</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 border-b">2,500-3,999</td>
                      <td className="py-2 px-4 border-b font-medium text-blue-700">18% of BV</td>
                      <td className="py-2 px-4 border-b">$180</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-2 px-4 border-b">1,500-2,499</td>
                      <td className="py-2 px-4 border-b font-medium text-blue-700">15% of BV</td>
                      <td className="py-2 px-4 border-b">$150</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 border-b">1,000-1,499</td>
                      <td className="py-2 px-4 border-b font-medium text-blue-700">12% of BV</td>
                      <td className="py-2 px-4 border-b">$120</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-2 px-4 border-b">600-999</td>
                      <td className="py-2 px-4 border-b font-medium text-blue-700">9% of BV</td>
                      <td className="py-2 px-4 border-b">$90</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 border-b">300-599</td>
                      <td className="py-2 px-4 border-b font-medium text-blue-700">6% of BV</td>
                      <td className="py-2 px-4 border-b">$60</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-2 px-4 border-b">100-299</td>
                      <td className="py-2 px-4 border-b font-medium text-blue-700">3% of BV</td>
                      <td className="py-2 px-4 border-b">$30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                Note: Current BV to PV ratio is 3.43 to 1. This means $343 in BV equals 100 PV.
              </p>
            </div>
          </div>
        )}
        
        {/* Niche Strategies Tab */}
        {selectedTab === 'niches' && (
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Specialized Niche Strategies</h2>
            <p className="mb-6 text-gray-700">
              Successful Amway IBOs often develop specialized approaches that leverage their unique 
              backgrounds, skills, and market opportunities. Explore these niche strategies for inspiration.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {nicheStrategies.map((strategy, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md border overflow-hidden">
                  <div className={`p-4 ${
                    index === 0 ? 'bg-red-100' : 
                    index === 1 ? 'bg-pink-100' : 
                    index === 2 ? 'bg-yellow-100' : 
                    index === 3 ? 'bg-green-100' : 
                    'bg-blue-100'
                  }`}>
                    <h3 className={`font-bold text-lg ${
                      index === 0 ? 'text-red-800' : 
                      index === 1 ? 'text-pink-800' : 
                      index === 2 ? 'text-yellow-800' : 
                      index === 3 ? 'text-green-800' : 
                      'text-blue-800'
                    }`}>
                      {strategy.name}
                    </h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Product Focus:</div>
                      <div className="text-sm">{strategy.focus}</div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Strategic Approach:</div>
                      <div className="text-sm">{strategy.approach}</div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="text-sm font-medium text-gray-700 mb-1">Competitive Advantage:</div>
                      <div className="text-sm">{strategy.advantage}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-blue-50 p-5 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">Finding Your Niche</h4>
              <p className="text-sm mb-3">
                The most successful Amway businesses have a clear positioning strategy that differentiates 
                them in the marketplace. Consider these factors when developing your niche:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-blue-700 mb-1">Personal Background</div>
                  <ul className="text-sm space-y-1">
                    <li>• Professional credentials</li>
                    <li>• Unique life experiences</li>
                    <li>• Cultural connections</li>
                    <li>• Community involvement</li>
                  </ul>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-blue-700 mb-1">Market Opportunities</div>
                  <ul className="text-sm space-y-1">
                    <li>• Underserved demographics</li>
                    <li>• Regional lifestyle trends</li>
                    <li>• Local health concerns</li>
                    <li>• Seasonal needs</li>
                  </ul>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-blue-700 mb-1">Strategic Channels</div>
                  <ul className="text-sm space-y-1">
                    <li>• Digital platforms</li>
                    <li>• Community events</li>
                    <li>• Workshops & seminars</li>
                    <li>• Specialized groups</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="bg-gray-100 p-4 text-center text-sm text-gray-500 border-t">
        <p>This interactive tool is for educational purposes only. Always refer to official Amway documentation 
        for the most current policies and compensation details.</p>
      </div>
    </div>
  );
};

export default AmwaySuccessPathways;