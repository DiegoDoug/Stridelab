# Agent Entry Point

The authoritative AI development system is `stridelab-ai/`.

Root-level AI tools should:
- route work through the registry;
- keep Department responsibilities separate from application bounded contexts;
- use Department agents for specialist work;
- use root cross-department agents for orchestration/review;
- treat project memory and approved artifacts as the source of project state;
- require verification before marking work complete.
