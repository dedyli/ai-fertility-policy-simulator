import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Play, RotateCcw, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';
import Head from 'next/head';

const FertilityPolicySimulator = () => {
  const [selectedCountry, setSelectedCountry] = useState('south_korea');
  const [policies, setPolicies] = useState({
    aiEducation: 0,
    workplaceAI: 0,
    childcareAI: 0,
    housingAI: 0
  });
  const [results, setResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Base fertility rates and country data
  const countryData = {
    south_korea: {
      name: 'South Korea',
      baseTFR: 0.72,
      baseFactors: {
        educationCost: 85,
        workLifeBalance: 25,
        childcareCost: 70,
        housingCost: 90
      },
      demographics: {
        population: 51.8,
        gdpPerCapita: 35000,
        femaleParticipation: 59.2
      }
    },
    japan: {
      name: 'Japan',
      baseTFR: 1.26,
      baseFactors: {
        educationCost: 75,
        workLifeBalance: 30,
        childcareCost: 65,
        housingCost: 80
      },
      demographics: {
        population: 124.8,
        gdpPerCapita: 40000,
        femaleParticipation: 71.2
      }
    }
  };

  // AI intervention definitions
  const aiInterventions = {
    aiEducation: {
      name: 'AI-Powered Education',
      description: 'Adaptive learning platforms reducing private tutoring costs',
      maxImpact: 0.15,
      costPerPoint: 50000,
      factors: ['educationCost']
    },
    workplaceAI: {
      name: 'Workplace AI Systems',
      description: 'Bias reduction and workflow optimization',
      maxImpact: 0.12,
      costPerPoint: 75000,
      factors: ['workLifeBalance']
    },
    childcareAI: {
      name: 'AI Childcare Support',
      description: 'Smart coordination and cost optimization',
      maxImpact: 0.10,
      costPerPoint: 60000,
      factors: ['childcareCost']
    },
    housingAI: {
      name: 'AI Housing Solutions',
      description: 'Smart city planning and affordable housing optimization',
      maxImpact: 0.08,
      costPerPoint: 100000,
      factors: ['housingCost']
    }
  };

  const simulateTFRImpact = () => {
    setIsSimulating(true);
    
    setTimeout(() => {
      const country = countryData[selectedCountry];
      let tfrImpact = 0;
      let totalCost = 0;
      let factorReductions = { ...country.baseFactors };

      Object.keys(policies).forEach(policy => {
        const intervention = aiInterventions[policy];
        const intensity = policies[policy] / 100;
        const policyImpact = intervention.maxImpact * intensity;
        tfrImpact += policyImpact;
        totalCost += intervention.costPerPoint * policies[policy];

        intervention.factors.forEach(factor => {
          factorReductions[factor] *= (1 - intensity * 0.4);
        });
      });

      const finalTFRIncrease = tfrImpact * (1 - Math.exp(-2 * tfrImpact));
      const projectedTFR = Math.min(2.5, country.baseTFR + finalTFRIncrease);

      const projectionData = [];
      for (let year = 0; year <= 10; year++) {
        const progress = Math.min(1, year / 7);
        const currentTFR = country.baseTFR + (projectedTFR - country.baseTFR) * progress;
        projectionData.push({
          year: 2025 + year,
          baseline: country.baseTFR,
          projected: Number(currentTFR.toFixed(3)),
          target: 2.1
        });
      }

      const populationIncrease = (projectedTFR - country.baseTFR) * country.demographics.population * 10000;
      const economicBenefit = populationIncrease * country.demographics.gdpPerCapita * 0.7;

      setResults({
        projectedTFR,
        tfrIncrease: projectedTFR - country.baseTFR,
        totalCost: totalCost / 1000000,
        projectionData,
        factorReductions,
        economicBenefit: economicBenefit / 1000000000,
        roi: economicBenefit / totalCost,
        populationIncrease
      });
      setIsSimulating(false);
    }, 2000);
  };

  const resetSimulation = () => {
    setPolicies({
      aiEducation: 0,
      workplaceAI: 0,
      childcareAI: 0,
      housingAI: 0
    });
    setResults(null);
  };

  const country = countryData[selectedCountry];

  return (
    <>
      <Head>
        <title>AI-Driven Fertility Policy Simulator | East Asia Demographic Solutions</title>
        <meta name="description" content="Interactive tool exploring how AI interventions can address declining fertility rates in East Asia. Research by Group 88 - STARS." />
        <meta name="keywords" content="fertility policy, AI, East Asia, demographics, South Korea, Japan, total fertility rate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI-Driven Fertility Policy Simulator" />
        <meta property="og:description" content="Explore how AI can address demographic challenges in East Asia" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI-Driven Fertility Policy Simulator" />
        <meta name="twitter:description" content="Interactive research tool for demographic policy innovation" />
        
        {/* Custom slider styles - guaranteed to work */}
        <style jsx global>{`
          .custom-slider {
            -webkit-appearance: none;
            appearance: none;
            height: 8px;
            background: #e5e7eb;
            border-radius: 5px;
            outline: none;
            opacity: 0.7;
            transition: opacity 0.2s;
          }
          .custom-slider:hover {
            opacity: 1;
          }
          .custom-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: #3b82f6;
            cursor: pointer;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          .custom-slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #3b82f6;
            cursor: pointer;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          .custom-slider::-webkit-slider-thumb:hover {
            background: #2563eb;
            transform: scale(1.1);
          }
          .custom-slider::-moz-range-thumb:hover {
            background: #2563eb;
            transform: scale(1.1);
          }
        `}</style>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              AI-Driven Fertility Policy Simulator
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore how AI-powered interventions can address demographic challenges in East Asia. 
              Adjust policy parameters and see projected impacts on Total Fertility Rate (TFR).
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Research by Group 88 - STARS | Innovation and Entrepreneurship for the 21st Century
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Control Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Policy Controls</h2>
                
                {/* Country Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Select Country</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="south_korea">South Korea (TFR: 0.72)</option>
                    <option value="japan">Japan (TFR: 1.26)</option>
                  </select>
                </div>

                {/* Policy Sliders */}
                {Object.keys(aiInterventions).map((policy) => (
                  <div key={policy} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">
                        {aiInterventions[policy].name}
                      </label>
                      <span className="text-sm text-gray-500 bg-blue-100 px-2 py-1 rounded">
                        {policies[policy]}%
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={policies[policy]}
                        onChange={(e) => setPolicies({
                          ...policies,
                          [policy]: parseInt(e.target.value)
                        })}
                        className="custom-slider w-full cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${policies[policy]}%, #e5e7eb ${policies[policy]}%, #e5e7eb 100%)`
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      {aiInterventions[policy].description}
                    </p>
                    <p className="text-xs text-blue-600 mt-1 font-medium">
                      Cost: ${(aiInterventions[policy].costPerPoint * policies[policy] / 1000000).toFixed(1)}M
                    </p>
                  </div>
                ))}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={simulateTFRImpact}
                    disabled={isSimulating}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                  >
                    {isSimulating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Simulating...
                      </>
                    ) : (
                      <>
                        <Play size={18} />
                        Run Simulation
                      </>
                    )}
                  </button>
                  <button
                    onClick={resetSimulation}
                    className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-600 flex items-center justify-center gap-2 transition-colors"
                  >
                    <RotateCcw size={18} />
                    Reset
                  </button>
                </div>
              </div>

              {/* Country Overview */}
              <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">{country.name} Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current TFR:</span>
                    <span className="font-medium">{country.baseTFR}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Population:</span>
                    <span className="font-medium">{country.demographics.population}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GDP per Capita:</span>
                    <span className="font-medium">${country.demographics.gdpPerCapita.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Female Labor Force:</span>
                    <span className="font-medium">{country.demographics.femaleParticipation}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2 space-y-6">
              {results ? (
                <>
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Projected TFR</p>
                          <p className="text-2xl font-bold text-green-600">
                            {results.projectedTFR.toFixed(3)}
                          </p>
                        </div>
                        <TrendingUp className="text-green-500" size={24} />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        +{(results.tfrIncrease * 100).toFixed(1)}% increase
                      </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Cost</p>
                          <p className="text-2xl font-bold text-blue-600">
                            ${results.totalCost.toFixed(1)}M
                          </p>
                        </div>
                        <DollarSign className="text-blue-500" size={24} />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Implementation cost
                      </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Economic ROI</p>
                          <p className="text-2xl font-bold text-purple-600">
                            {results.roi.toFixed(1)}x
                          </p>
                        </div>
                        <Users className="text-purple-500" size={24} />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Return on investment
                      </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Time to Target</p>
                          <p className="text-2xl font-bold text-orange-600">
                            {results.projectedTFR >= 2.1 ? '7' : '10+'}
                          </p>
                        </div>
                        <Clock className="text-orange-500" size={24} />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Years to 2.1 TFR
                      </p>
                    </div>
                  </div>

                  {/* TFR Projection Chart */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">10-Year TFR Projection</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={results.projectionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis domain={[0, 2.5]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="baseline" 
                          stroke="#ef4444" 
                          strokeDasharray="5 5"
                          name="Current Baseline"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="projected" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          name="With AI Interventions"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="target" 
                          stroke="#10b981" 
                          strokeDasharray="10 5"
                          name="Replacement Level (2.1)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Barrier Reduction Chart */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Barrier Reduction Impact</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={[
                        {
                          name: 'Education Cost',
                          before: country.baseFactors.educationCost,
                          after: results.factorReductions.educationCost
                        },
                        {
                          name: 'Work-Life Balance',
                          before: 100 - country.baseFactors.workLifeBalance,
                          after: 100 - results.factorReductions.workLifeBalance
                        },
                        {
                          name: 'Childcare Cost',
                          before: country.baseFactors.childcareCost,
                          after: results.factorReductions.childcareCost
                        },
                        {
                          name: 'Housing Cost',
                          before: country.baseFactors.housingCost,
                          after: results.factorReductions.housingCost
                        }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="before" fill="#ef4444" name="Before AI" />
                        <Bar dataKey="after" fill="#10b981" name="After AI" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Economic Impact Summary */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Economic Impact Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Population Benefits</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Estimated population increase: {results.populationIncrease.toLocaleString()} people</li>
                          <li>• Economic benefit: ${results.economicBenefit.toFixed(1)}B over lifetime</li>
                          <li>• Reduced dependency ratio by 2040</li>
                          <li>• Increased workforce sustainability</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Implementation Benefits</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Reduced private education costs for families</li>
                          <li>• Improved workplace gender equality</li>
                          <li>• Enhanced work-life balance</li>
                          <li>• Smart city infrastructure development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <TrendingUp size={64} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Run Simulation to See Results
                  </h3>
                  <p className="text-gray-500">
                    Adjust the policy parameters and click "Run Simulation" to see the projected impact on fertility rates and economic outcomes.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 p-6 bg-white rounded-lg shadow-lg">
            <p className="text-sm text-gray-600 mb-2">
              <strong>About this Research:</strong> This interactive simulator demonstrates our AI-driven policy framework 
              for addressing demographic challenges in East Asia. Based on quantitative analysis of socio-economic barriers 
              and predictive modeling using OECD data.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Disclaimer:</strong> This is a research prototype for demonstration purposes. 
              Actual policy impacts may vary based on numerous factors not captured in this simplified model.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                <strong>Research Team:</strong> Tran Thu Hang (Hannah), Dedy E Lingga, 楊哲航 (Lucas), 
                Phan Viet Anh (Frank), Vu Huong Linh (Lylla)
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Group 88 - STARS | Innovation and Entrepreneurship for the 21st Century AI-Driven Digital Economy
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FertilityPolicySimulator;