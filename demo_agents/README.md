# Demo Agents Workspace

Generated from configured documentation URLs. If upstream paths moved, validated fallback paths were used.

## Demos

- `01` `01-ai-system-architect-advisor-r1`: AI System Architect Advisor (R1) -> `streamlit run ai_system_architect_r1.py`
- `02` `02-corrective-rag-agent`: Corrective RAG Agent -> `streamlit run corrective_rag.py`
- `03` `03-multi-mcp-agent-router`: Multi-MCP Agent Router -> `streamlit run agent_forge.py` (remapped)
- `04` `04-ai-data-analysis-agent`: AI Data Analysis Agent -> `streamlit run ai_data_analyst.py`
- `05` `05-ai-consultant-agent`: AI Consultant Agent -> `adk web` (remapped)
- `06` `06-ai-vc-due-diligence-team`: AI VC Due Diligence Team -> `adk web --project vc_diligence` (remapped)
- `07` `07-ai-finance-agent`: AI Finance Agent -> `python xai_finance_agent.py` (remapped)
- `08` `08-ai-product-launch-intelligence`: AI Product Launch Intelligence -> `streamlit run product_launch_intelligence_agent.py` (remapped)
- `09` `09-ai-sales-intelligence-team`: AI Sales Intelligence Team -> `adk web` (remapped)
- `10` `10-ai-competitor-intelligence-agent`: AI Competitor Intelligence Agent -> `streamlit run competitor_agent_team.py` (remapped)
- `11` `11-ai-recruitment-agent-team`: AI Recruitment Agent Team -> `streamlit run ai_recruitment_agent_team.py` (remapped)
- `12` `12-chat-with-gmail-inbox`: Chat with Gmail Inbox -> `streamlit run chat_gmail.py` (remapped)
- `13` `13-chat-with-github-repo`: Chat with GitHub Repo -> `streamlit run chat_github.py` (remapped)
- `14` `14-ai-travel-agent-with-memory`: AI Travel Agent with Memory -> `streamlit run travel_agent_memory.py` (remapped)
- `15` `15-mcp-travel-planner-team`: MCP Travel Planner Team -> `streamlit run app.py` (remapped)

## Run any demo

```bash
cd demo_agents/<folder>
./setup.sh
./run.sh
```

## Notes

- `setup.sh` creates a local virtualenv and installs dependencies if declared.
- Demos may still require API credentials.
