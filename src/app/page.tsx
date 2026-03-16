'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Bot, 
  Brain, 
  Code2, 
  Database, 
  Globe, 
  Rocket, 
  Shield, 
  TrendingUp, 
  Users, 
  Zap,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Target,
  MessageSquare,
  Map,
  Mail,
  Github,
  Calendar,
  Building2,
  LineChart,
  FileSearch,
  Briefcase,
  UserCheck
} from 'lucide-react'

interface Agent {
  id: number
  name: string
  shortName: string
  description: string
  features: string[]
  usage: string
  github: string
  example: string
  saasReasoning: string
  tech: string[]
  icon: React.ReactNode
  gradient: string
  category: string
}

const agents: Agent[] = [
  {
    id: 1,
    name: "AI System Architect Advisor",
    shortName: "Architect",
    description: "Expert software architecture analysis using dual-model approach combining DeepSeek R1 and Claude for comprehensive system design.",
    features: [
      "Dual AI Model Architecture: DeepSeek Reasoner for initial analysis + Claude-3.5 for roadmaps",
      "Comprehensive Analysis: Covers pattern selection, infrastructure, security, and risk assessment",
      "Diverse Domain Support: Real-time systems, Healthcare, Finance, and Multi-tenant SaaS",
      "Implementation Specifications: Detailed roadmaps and technical architectural decisions"
    ],
    usage: "streamlit run ai_system_architect_r1.py",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/advanced_ai_agents/single_agent_apps/ai_system_architect_r1",
    example: "Build a high-frequency trading platform with sub-millisecond latency and 100k TPS.",
    saasReasoning: "This serves as a 'Virtual CTO' for high-growth tech teams. It cuts down technical planning cycles from weeks to minutes, providing validated architectural patterns and infrastructure cost estimations ready for executive review.",
    tech: ["DeepSeek R1", "Claude 3.5 Sonnet", "Agno", "Streamlit"],
    icon: <Building2 className="w-6 h-6" />,
    gradient: "from-violet-500 to-purple-600",
    category: "Architecture"
  },
  {
    id: 2,
    name: "Corrective RAG Agent",
    shortName: "RAG",
    description: "Sophisticated LangGraph system combining retrieval, relevance grading, and web-search for highly accurate responses.",
    features: [
      "Smart Document Retrieval: Uses Qdrant vector store for high-precision matching",
      "Document Relevance Grading: Claude 4.5 Sonnet filters out irrelevant noise",
      "Query Transformation: Automatically optimizes user queries for better search context",
      "Web Search Fallback: Integrates Tavily API when internal documentation is insufficient"
    ],
    usage: "streamlit run corrective_rag.py",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/rag_tutorials/corrective_rag",
    example: "Provide a research paper and ask specific questions; the agent will verify internal facts or find updates online.",
    saasReasoning: "Ideal for 'High-Stakes Knowledge Bases' where accuracy is non-negotiable. By incorporating a verification loop, it prevents hallucinations, making it safe for enterprise deployment in legal, medical, or regulatory sectors.",
    tech: ["LangGraph", "Claude 4.5 Sonnet", "Qdrant", "OpenAI Embeddings", "Tavily"],
    icon: <Database className="w-6 h-6" />,
    gradient: "from-emerald-500 to-teal-600",
    category: "RAG"
  },
  {
    id: 3,
    name: "Multi-MCP Agent Router",
    shortName: "MCP Router",
    description: "Specialized multi-agent pattern connecting AI agents to different MCP servers for domain-specific tasks.",
    features: [
      "4 Specialized Agents: Code Reviewer, Security Auditor, Researcher, and BIM Engineer",
      "MCP Tool Routing: Dedicated access to GitHub, filesystem, and fetch servers",
      "Automatic Intent Classification: Intelligent routing based on user query context",
      "Conversation Memory: Persistent per-agent session history for iterative tasks"
    ],
    usage: "streamlit run agent_forge.py",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/mcp_ai_agents/multi_mcp_agent_forge",
    example: "Perform a security audit of a repository while fetching the latest compliance standards via the Fetch MCP.",
    saasReasoning: "This is a blueprint for the 'Modular Enterprise Hub'. It allows companies to scale their AI capabilities by simply plugging in new MCP servers and specialized agents.",
    tech: ["Claude 3.5 Sonnet", "Anthropic API", "MCP", "GitHub", "Streamlit"],
    icon: <Code2 className="w-6 h-6" />,
    gradient: "from-orange-500 to-red-600",
    category: "Multi-Agent"
  },
  {
    id: 4,
    name: "AI Data Analysis Agent",
    shortName: "Data Analyst",
    description: "Natural language queries for CSV and Excel files using DuckDB with intelligent data visualization.",
    features: [
      "File Upload Support: Automatic data type detection and schema inference for CSV/Excel",
      "Natural Language Queries: Converts plain English into complex DuckDB SQL queries",
      "Advanced Analysis: Performs aggregations, filtering, and statistical summaries",
      "Interactive Visualizations: Real-time charting and Streamlit-based result presentation"
    ],
    usage: "streamlit run ai_data_analyst.py",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/starter_ai_agents/ai_data_analysis_agent",
    example: "Upload a sales report and ask: 'Show me the correlation between advertising spend and conversion rates.'",
    saasReasoning: "A 'No-Code BI' asset for non-technical departments. It removes the need for manual SQL writing or complex Excel pivot tables, allowing operations and marketing teams to query live data directly.",
    tech: ["Agno", "GPT-4o", "DuckDB", "Streamlit", "Pandas"],
    icon: <LineChart className="w-6 h-6" />,
    gradient: "from-cyan-500 to-blue-600",
    category: "Analytics"
  },
  {
    id: 5,
    name: "AI Consultant Agent",
    shortName: "Consultant",
    description: "Business strategist providing real-time market research and strategic recommendations via AI.",
    features: [
      "Real-time Web Research: Powered by Perplexity AI for up-to-the-minute market data",
      "Strategic Recommendations: Logic-driven business advice based on current trends",
      "Risk Assessment: Identifies market entry barriers and competitive threats",
      "Citation Support: Provides sources for verified accuracy in reporting"
    ],
    usage: "adk web",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/starter_ai_agents/ai_consultant_agent",
    example: "Ask: 'Analyze the growth potential of the sustainable fashion market in Dhaka for 2026.'",
    saasReasoning: "Commercialized as a 'Market Intel' tool. It cuts research time from weeks to minutes, making it valuable for entrepreneurs and corporate strategy teams who need fast, data-backed insights.",
    tech: ["Google ADK", "Gemini", "Perplexity AI"],
    icon: <Briefcase className="w-6 h-6" />,
    gradient: "from-pink-500 to-rose-600",
    category: "Strategy"
  },
  {
    id: 6,
    name: "AI VC Due Diligence Team",
    shortName: "Due Diligence",
    description: "7-stage sequential pipeline for startup investment analysis with McKinsey-style reports.",
    features: [
      "Sequential Pipeline: 7-stage orchestration from research to final memo",
      "Bear/Base/Bull Models: Automated revenue and growth projection charting",
      "Investor Memo Generation: Standardized PDF/HTML artifacts for deal rooms",
      "Automated Infographics: Visual summaries of SWOT and market positioning"
    ],
    usage: "adk web --project vc_diligence",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/starter_ai_agents/ai_vc_due_diligence",
    example: "Perform a Series A evaluation of a new Fintech startup including competitive benchmarking.",
    saasReasoning: "Direct ROI for VC and PE firms. It automates the high-volume initial screening of startups, ensuring that human analysts only spend time on deals that pass the automated due diligence filters.",
    tech: ["Google ADK", "Gemini 3 Pro", "Gemini 3 Flash"],
    icon: <FileSearch className="w-6 h-6" />,
    gradient: "from-amber-500 to-yellow-600",
    category: "Finance"
  },
  {
    id: 7,
    name: "AI Finance Agent",
    shortName: "Finance",
    description: "Structured financial insights and stock analysis using xAI Grok and YFinance for real-time market data.",
    features: [
      "Real-time Stock Data: Direct integration with Yahoo Finance for live price fetching",
      "Formatted Financial Tables: Structured output of balance sheets and stock comparisons",
      "AgentOS Control Plane: Autonomous tool-calling for cross-sector analysis",
      "Grok Reasoning: High-speed synthesis of financial news and market indicators"
    ],
    usage: "python xai_finance_agent.py",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/starter_ai_agents/ai_finance_agent",
    example: "Query: 'Compare the P/E ratios and debt-to-equity of the top 5 semiconductor stocks.'",
    saasReasoning: "A 'Financial Co-pilot' for wealth management firms and retail investors. It allows for high-velocity screening of equities based on live technical and fundamental data.",
    tech: ["xAI Grok-4 Fast", "YFinance", "DuckDuckGo"],
    icon: <TrendingUp className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-600",
    category: "Finance"
  },
  {
    id: 8,
    name: "AI Product Launch Intelligence",
    shortName: "Launch Intel",
    description: "GTM strategist team using Agno and Firecrawl to turn web data into launch insights.",
    features: [
      "Competitor Analysis: Scrapes and analyzes rival GTM strategies and positioning",
      "Market Sentiment: Evaluates public perception across social and review platforms",
      "GTM Roadmap Generation: Automates the creation of launch-ready markdown reports",
      "Firecrawl Integration: Handles complex JS-rendered web pages for data extraction"
    ],
    usage: "streamlit run product_launch_intelligence_agent.py",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/starter_ai_agents/ai_product_launch_intelligence",
    example: "Input a competitor's URL to extract their pricing tiers and core feature differentiation.",
    saasReasoning: "Reduces product-market-fit risk. It provides GTM teams with a 'live' competitive dashboard, ensuring their launch strategy accounts for the latest rival moves and market pricing.",
    tech: ["Agno Team", "Firecrawl", "GPT-4o"],
    icon: <Rocket className="w-6 h-6" />,
    gradient: "from-indigo-500 to-purple-600",
    category: "Marketing"
  },
  {
    id: 9,
    name: "AI Sales Intelligence Team",
    shortName: "Sales Intel",
    description: "Generates professional competitive battle cards and objection handling scripts in real-time.",
    features: [
      "Battle Card Generation: HTML-ready cards with 'We Win' vs 'They Win' sections",
      "Objection Scripts: Step-by-step talk tracks for sales reps to handle pushback",
      "Killer Questions: Strategic questions to ask prospects to reveal rival weaknesses",
      "State Management: Passes research data through a multi-agent coordinator"
    ],
    usage: "adk web (Sales Intel module)",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/starter_ai_agents/ai_sales_intelligence_agent",
    example: "Generate a battle card for a prospect currently using a legacy ERP system.",
    saasReasoning: "A high-leverage 'Sales Enablement' SaaS. It directly increases revenue by empowering reps with the technical and strategic knowledge needed to win competitive displacement deals.",
    tech: ["Google ADK", "Gemini 3", "Google Search Tool"],
    icon: <Target className="w-6 h-6" />,
    gradient: "from-red-500 to-orange-600",
    category: "Sales"
  },
  {
    id: 10,
    name: "AI Competitor Intelligence",
    shortName: "Competitor",
    description: "Extracts structured data from competitor websites to identify market gaps and opportunities.",
    features: [
      "Competitor Discovery: Uses Exa AI neural search to find rivals beyond keywords",
      "Structured Extraction: Turns competitor websites into clean JSON/CSV data",
      "Comparison Table Generation: Automated feature-by-feature benchmarking",
      "Pricing Strategy Analysis: Identifies hidden discounts or tiered pricing models"
    ],
    usage: "streamlit run ai_competitor_analyser.py",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/starter_ai_agents/ai_competitor_intelligence",
    example: "Identify market gaps in the Dhaka e-commerce grocery sector by analyzing top 5 rivals.",
    saasReasoning: "A 'Live Strategy' tool for executives. It provides an automated, always-on view of the competitive landscape, removing the need for manual, periodic market research projects.",
    tech: ["Agno", "Firecrawl", "Exa AI", "GPT-4o"],
    icon: <Shield className="w-6 h-6" />,
    gradient: "from-slate-500 to-gray-600",
    category: "Strategy"
  },
  {
    id: 11,
    name: "AI Recruitment Agent Team",
    shortName: "Recruitment",
    description: "Automates resume screening, technical evaluation, and interview scheduling for HR teams.",
    features: [
      "Resume Analyzer: RAG-based skill matching vs job descriptions",
      "Scheduling Coordinator: Automated Zoom/Calendar integration for booking",
      "Technical Assessment: Generates role-specific questions and scores answers",
      "Full-Service Simulation: Operates as a multi-agent HR department workflow"
    ],
    usage: "streamlit run ai_recruitment_agent_team.py",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/starter_ai_agents/ai_recruitment_agent_team",
    example: "Filter 500 applicants for a DevOps role to find the top 5 with Kubernetes expertise.",
    saasReasoning: "Ideal for recruiting agencies and HR departments. This agent handles the 'low-value' filtering work, allowing recruiters to focus solely on high-value candidate engagement.",
    tech: ["Phidata", "GPT-4o", "Zoom API", "Gmail API"],
    icon: <UserCheck className="w-6 h-6" />,
    gradient: "from-teal-500 to-cyan-600",
    category: "HR"
  },
  {
    id: 12,
    name: "Chat with Gmail Inbox",
    shortName: "Gmail Chat",
    description: "RAG-powered app to analyze and answer questions based on your Gmail content with semantic search.",
    features: [
      "Oauth2 Security: Secure integration with the Google Gmail API",
      "RAG-Powered Q&A: Deep semantic search over thousands of email threads",
      "Context Retrieval: Summarizes recent invoices, threads, or flight details",
      "Interactive Streamlit UI: User-friendly chat interface for personal mail"
    ],
    usage: "streamlit run chat_gmail.py",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/starter_ai_agents/chat_with_gmail",
    example: "Ask: 'Find all correspondence regarding the apartment lease renewal and summarize terms.'",
    saasReasoning: "A productivity SaaS for power users. It eliminates the 'search bar fatigue' in traditional email clients by allowing for natural language synthesis of buried information.",
    tech: ["Python", "RAG", "OpenAI API", "Google Cloud Console"],
    icon: <Mail className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-600",
    category: "Productivity"
  },
  {
    id: 13,
    name: "Chat with GitHub Repo",
    shortName: "GitHub Chat",
    description: "Analyze repository content using RAG and Embedchain for instant code understanding.",
    features: [
      "Knowledge Base Creation: Automatically indexes GitHub repos via API",
      "Natural Language Search: 'How does the payment logic work?' queries",
      "Embedchain Integration: Sophisticated chunking and embedding for code logic",
      "Real-time Insights: Immediate analysis of repository health and activity"
    ],
    usage: "streamlit run chat_github.py",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/starter_ai_agents/chat_with_github",
    example: "Point the agent to a legacy codebase to identify where the database connection is handled.",
    saasReasoning: "Targeted at large-scale software onboarding. It significantly reduces 'ramp-up' time for new developers by providing an instant technical expert on any repository.",
    tech: ["Embedchain", "OpenAI", "GitHub API", "ChromaDB"],
    icon: <Github className="w-6 h-6" />,
    gradient: "from-gray-600 to-slate-700",
    category: "Developer Tools"
  },
  {
    id: 14,
    name: "AI Travel Agent with Memory",
    shortName: "Travel",
    description: "Intelligent travel assistant maintaining persistent memory of user preferences across sessions.",
    features: [
      "Persistent Memory: Mem0 integration for cross-session preference tracking",
      "Chat-based Planning: Dynamic itinerary creation based on ongoing dialogue",
      "Preference Vectoring: Learns user habits (e.g., budget-friendly vs luxury) over time",
      "Contextual Awareness: Remembers past trip feedback to improve future suggestions"
    ],
    usage: "streamlit run travel_agent_memory.py",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/starter_ai_agents/ai_travel_agent_memory",
    example: "Plan a trip to Japan, knowing the user previously mentioned a preference for quiet cities.",
    saasReasoning: "The ultimate 'Loyalty' engine. By remembering user traits, this agent becomes more valuable over time, creating a powerful moat against generic, non-personalized travel competitors.",
    tech: ["GPT-4o", "Mem0", "Qdrant"],
    icon: <Map className="w-6 h-6" />,
    gradient: "from-sky-500 to-blue-600",
    category: "Lifestyle"
  },
  {
    id: 15,
    name: "MCP Travel Planner Team",
    shortName: "Travel Planner",
    description: "Sophisticated planner using MCP for real-time Airbnb and Google Maps data integration.",
    features: [
      "Airbnb Integration: Fetches live listings and pricing via the Airbnb MCP",
      "Google Maps Tooling: Real-time distance, time, and route calculations",
      "Calendar Export: Automatically generates .ics files for itinerary management",
      "Multi-Agent Execution: Coordinates between booking and logistics experts"
    ],
    usage: "streamlit run app.py",
    github: "https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/mcp-travel-planner",
    example: "Find an Airbnb in Paris near a Metro station for under $150 and map the walk.",
    saasReasoning: "Moves from 'Recommendation' to 'Execution'. By using live protocols (MCP), it provides verified, actionable data that can be used for direct booking and logistical planning.",
    tech: ["Airbnb MCP", "Google Maps MCP", "GPT-4o", "Streamlit"],
    icon: <Calendar className="w-6 h-6" />,
    gradient: "from-fuchsia-500 to-pink-600",
    category: "Lifestyle"
  }
]

const categories = [...new Set(agents.map(a => a.category))]

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredAgents = selectedCategory 
    ? agents.filter(a => a.category === selectedCategory)
    : agents

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Betopia
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#demos" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">
                Demos
              </a>
              <a href="#categories" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">
                Categories
              </a>
              <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25">
                Contact Us
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-100/40 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-violet-50 text-violet-700 border border-violet-200">
              <Bot className="w-4 h-4 mr-2" />
              15 Enterprise-Ready AI Agents
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                AI Agent
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                Demo Showcase
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explore our curated collection of enterprise AI agents, each designed for industrial scalability and ready for commercial deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-xl shadow-violet-500/25 h-12 px-8">
                <Rocket className="w-5 h-5 mr-2" />
                Explore Demos
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 h-12 px-8">
                <MessageSquare className="w-5 h-5 mr-2" />
                Request Custom Agent
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {[
              { label: "AI Agents", value: "15", icon: <Bot className="w-5 h-5" /> },
              { label: "Categories", value: "10+", icon: <Database className="w-5 h-5" /> },
              { label: "LLM Models", value: "8+", icon: <Brain className="w-5 h-5" /> },
              { label: "Integrations", value: "20+", icon: <Zap className="w-5 h-5" /> },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-600 mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section id="categories" className="py-8 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "bg-violet-600 hover:bg-violet-700" : ""}
            >
              All Agents
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? "bg-violet-600 hover:bg-violet-700" : ""}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Grid */}
      <section id="demos" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <Card 
                key={agent.id}
                className="group relative overflow-hidden border-slate-200 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 cursor-pointer bg-white"
                onClick={() => setSelectedAgent(agent)}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${agent.gradient}`} />
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-white shadow-lg`}>
                      {agent.icon}
                    </div>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-xs">
                      {agent.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-900 mt-3 group-hover:text-violet-600 transition-colors">
                    {agent.name}
                  </CardTitle>
                  <CardDescription className="text-slate-500 text-sm leading-relaxed">
                    {agent.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {agent.tech.slice(0, 3).map((t, i) => (
                      <Badge key={i} variant="outline" className="text-xs font-normal border-slate-200 text-slate-600">
                        {t}
                      </Badge>
                    ))}
                    {agent.tech.length > 3 && (
                      <Badge variant="outline" className="text-xs font-normal border-slate-200 text-slate-500">
                        +{agent.tech.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors"
                  >
                    View Demo Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Let us build a custom AI agent tailored to your specific industry needs and workflow requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-violet-700 hover:bg-slate-50 h-12 px-8 shadow-xl">
                Schedule a Demo
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-8">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Betopia</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2024 Betopia. All rights reserved. Powered by cutting-edge AI technology.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/Shubhamsaboo/awesome-llm-apps" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Agent Detail Modal */}
      <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
          {selectedAgent && (
            <div className="flex flex-col h-full">
              <div className={`bg-gradient-to-r ${selectedAgent.gradient} p-6 text-white`}>
                <DialogHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                      {selectedAgent.icon}
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-bold text-white">
                        {selectedAgent.name}
                      </DialogTitle>
                      <DialogDescription className="text-white/80 mt-1">
                        {selectedAgent.category} • Enterprise-Ready
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
              </div>
              
              <ScrollArea className="flex-1 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-violet-600" />
                        Key Features
                      </h4>
                      <ul className="space-y-3">
                        {selectedAgent.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-1 w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                              <ChevronRight className="w-3 h-3 text-violet-600" />
                            </div>
                            <span className="text-sm text-slate-600 leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-violet-600" />
                        Use Case Example
                      </h4>
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <p className="text-sm text-slate-600 italic">&ldquo;{selectedAgent.example}&rdquo;</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Brain className="w-4 h-4 text-violet-600" />
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedAgent.tech.map((t, i) => (
                          <Badge key={i} variant="secondary" className="bg-violet-50 text-violet-700 border border-violet-200">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-violet-600" />
                        SaaS Potential
                      </h4>
                      <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
                        <p className="text-sm text-slate-600 leading-relaxed">{selectedAgent.saasReasoning}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-violet-600" />
                        Quick Start
                      </h4>
                      <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm">
                        <code className="text-emerald-400">{selectedAgent.usage}</code>
                      </div>
                    </div>

                    <Separator />

                    <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700" asChild>
                      <a href={selectedAgent.github} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
