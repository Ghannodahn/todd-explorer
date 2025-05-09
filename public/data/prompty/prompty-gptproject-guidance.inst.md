<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Best Practices for GPT Project Instructions Across AI Platforms: A Comparative Analysis

This report analyzes instruction design approaches across four major AI platforms: OpenAI's Custom GPTs, Anthropic's Claude Projects, Google's Gemini Gems, and Perplexity Spaces. Each platform offers distinct mechanisms for configuring persistent AI behavior within dedicated workspaces, with important similarities and differences in their implementation.

## Platform-Specific Instruction Approaches

### OpenAI (Custom GPTs)

#### Instruction Format \& Structure

OpenAI's Custom GPTs utilize a dedicated instructions field where users can input comprehensive guidance for model behavior. Instructions can be authored through the conversational GPT Builder interface or manually in the Configure tab[^16]. The system supports structured formats with delimiters between instruction sets to enhance clarity and execution accuracy[^1].

#### Capabilities Integration

Custom GPT instructions can be paired with various capabilities including web browsing, DALLE image generation, and code interpretation. Users can also integrate external APIs through "Actions," allowing for expanded functionality beyond base model capabilities[^18]. Knowledge files can be uploaded to provide domain-specific context.

#### Role and Tone Configuration

The instructions field allows detailed definition of the GPT's persona, communication style, and behavioral patterns. Users can specify how the GPT should introduce itself and adapt its responses based on different scenarios[^16].

#### Content Best Practices

OpenAI recommends breaking down multi-step instructions into simpler, more manageable steps to ensure accuracy[^1]. Using "trigger/instruction pairs" separated by delimiters improves reliability in following sequential steps without merging or skipping them[^1]. Explicitly defining terms and classifications with few-shot examples enhances consistency in outputs[^1].

#### Optimization Tips

Including phrases like "take your time" and "check your work" encourages model thoroughness[^1]. Using "strengthening language" highlights critical instructions, ensuring they aren't overlooked[^1]. Framing instructions positively rather than negatively improves adherence and reduces confusion[^1].

### Anthropic Claude (Projects)

#### Instruction Format \& Structure

Claude Projects allow setting custom instructions within a dedicated interface for each project workspace[^4]. These instructions apply consistently across all conversations within that project, creating a persistent context for interactions[^13].

#### Capabilities Integration

Projects integrate seamlessly with uploaded documents that serve as knowledge bases, which Claude references when answering questions[^17]. With a 200k context window, the platform supports substantial document integration[^17]. The workflow typically involves creating a project, uploading knowledge, setting custom instructions, and then querying against the documents[^17].

#### Role and Tone Configuration

Custom instructions can define Claude's behavior, tone, and response style specific to the project context[^17]. This allows creating specialized assistants for different work domains or communication needs.

#### Content Best Practices

Best practices include uploading relevant knowledge before setting custom instructions[^17]. Clear definition of project purpose and scope in the description helps establish context. Instructions should be specific about desired outputs, including format and style preferences.

#### Optimization Tips

Testing and iteratively refining instructions based on Claude's outputs improves alignment with goals[^17]. Setting custom instructions that complement the uploaded knowledge rather than duplicating information maximizes efficiency.

### Google Gemini (Gems)

#### Instruction Format \& Structure

Gems use a structured input format where users define instructions for specific purposes[^6]. The interface supports both direct authoring and AI-assisted instruction creation, where Gemini can help rewrite or enhance basic instructions[^10].

#### Capabilities Integration

Gems integrate with uploaded files which provide additional context for responses[^14]. The knowledge section allows adding files from both local devices and Google Drive, with changes to Drive files automatically reflected in the Gem[^6].

#### Role and Tone Configuration

A recommended framework includes defining the Persona (professional role), Task (primary objective), Context (background information), and Format (output structure)[^14]. This PACT approach allows specifying the Gem's identity and communication characteristics.

#### Content Best Practices

Starting with premade Gems and customizing them is effective for new users[^10]. Creating Gems for repetitive tasks saves time and ensures consistency[^10]. Pre-made options like Brainstormer, Career guide, and Coding partner provide starting points for customization[^10].

#### Optimization Tips

Using Gemini itself to help write or rewrite instructions can improve clarity and effectiveness[^10]. Keeping instructions concise and simple while still providing necessary context ensures optimal performance[^14].

### Perplexity (Spaces)

#### Instruction Format \& Structure

Perplexity Spaces include a Custom Instructions field where users can input prompts that apply to all threads within that Space[^7]. These persistent instructions eliminate the need to repeatedly provide the same context or formatting preferences[^15].

#### Capabilities Integration

Spaces allow uploading files (for Pro/Enterprise users) and can search across both web and uploaded files[^7]. Users can configure which sources to prioritize when generating responses: Web, Space Files, or both combined[^15]. This integration enables creating comprehensive knowledge hubs that combine online research with proprietary information.

#### Role and Tone Configuration

Custom instructions can define the AI's persona, communication style, and tone[^11]. This includes specifying expertise areas, preferred writing styles, and response structures.

#### Content Best Practices

A recommended template includes defining Persona/Tone, Key Instructions, Response Guidelines, and Prohibited Content[^11]. This structured approach ensures comprehensive coverage of behavioral aspects. Spaces are particularly effective for long-term research projects and collaborative work[^15].

#### Optimization Tips

Creating Spaces for repetitive tasks avoids rewriting similar instructions[^15]. Using specific, reusable prompts for formatting, tone adjustment, or providing context enhances consistency[^15].

## Cross-Platform Comparative Matrix

| Feature | OpenAI (Custom GPTs) | Anthropic Claude (Projects) | Google Gemini (Gems) | Perplexity (Spaces) |
| :-- | :-- | :-- | :-- | :-- |
| **Primary Interface** | GPT editor with conversational creation option[^16] | Project-level custom instructions field[^17] | Structured instruction field with AI assist[^10][^14] | Custom Instructions field for each Space[^7] |
| **Knowledge Integration** | File uploads, web browsing, API connections[^12][^18] | Document uploads within 200k context window[^17] | File uploads from device or Google Drive[^6][^14] | File uploads and web search integration[^7][^15] |
| **Persona Configuration** | Detailed role specification with examples[^1][^16] | Role-based behavior definitions[^17] | PACT framework (Persona, Actions, Context, Tone)[^14] | Template-based persona definition[^11] |
| **Instruction Complexity** | Supports multi-step instructions with delimiters[^1] | Project-specific behavior configuration[^17] | Balance of simplicity and task specificity[^14] | Research-oriented directives[^15] |
| **Optimization Approach** | Step breakdown, positive framing, strengthening language[^1] | Iterative testing with knowledge integration[^17] | AI-assisted instruction writing, simplicity[^10] | Topic-focused organization, reusable prompts[^15] |
| **Collaboration Features** | Sharing options for created GPTs[^12] | Shared workspace for documents and conversations[^4] | Limited sharing capabilities | Strong collaboration with viewer/editor roles[^7][^15] |
| **Creation Process** | Builder interface or manual configuration[^8][^16] | Project creation, knowledge upload, instruction setting[^17] | Gem manager with optional AI assistance[^6][^10] | Space creation with custom settings[^7][^15] |

## Meta-Patterns and Design Heuristics

### Cross-Platform Commonalities

1. **Persona-First Design**: All platforms emphasize defining the AI's role and communication style as foundational to effective instructions[^1][^11][^14][^17].
2. **Context Integration**: Each platform supports mechanisms for providing additional context through file uploads or knowledge bases that complement instructions[^6][^7][^12][^17].
3. **Instruction Persistence**: Project-level instructions create consistency across multiple interactions, eliminating the need to repeat context or parameters[^7][^13][^14][^16].
4. **Format Specificity**: Defining output formats, structures, and styles emerges as crucial across all platforms[^1][^11][^14].
5. **AI-Assisted Design**: Multiple platforms now support using the AI itself to help craft better instructions, creating a meta-level guidance system[^10][^16].

### Platform-Specific Strengths

1. **OpenAI Custom GPTs**: Excel in structural techniques (delimiters, trigger-instruction pairs) and capability integration. Best for creating tool-like experiences with specific capabilities and behaviors[^1][^12].
2. **Anthropic Claude Projects**: Strongest in document-centric workflows and knowledge application. Ideal for research projects requiring deep integration with extensive documentation[^4][^17].
3. **Google Gemini Gems**: Emphasizes simplicity and task automation with the PACT framework. Best for repetitive task assistance and streamlined workflows[^10][^14].
4. **Perplexity Spaces**: Optimized for research organization and collaboration. Excels at creating persistent research contexts with strong collaboration features[^7][^15].

### Emerging Design Principles

1. **Layered Instruction Architecture**: Effective instructions increasingly use layers-from fundamental behaviors to situational directives-creating a hierarchical instruction set.
2. **Positive Framing Priority**: Instructions that describe desired behaviors rather than prohibited ones prove more effective across all platforms[^1].
3. **Context-Behavior Separation**: Clear separation between factual knowledge/context and behavioral instructions enhances performance across platforms[^17].
4. **Domain Specialization**: All platforms show movement toward highly specialized AI configurations for specific domains, tasks, or workflows[^9][^10][^15][^20].
5. **Collaborative Awareness**: Platforms are increasingly designed with multi-user scenarios in mind, ensuring consistent AI behavior in team environments[^7][^15].

## Recommendation Framework

### Universal Best Practices

1. **Define Role Before Tasks**: Establish who the AI is (persona, expertise) before defining what it should do[^1][^11][^14][^17].
2. **Use Concrete Examples**: Provide representative examples of desired outputs to improve consistency[^1].
3. **Balance Specificity and Flexibility**: Instructions should guide behavior while maintaining adaptability to diverse queries[^1][^10].
4. **Begin With Core Templates**: Start with platform-provided templates or examples and customize from there[^10][^11].
5. **Test Iteratively**: Evaluate instruction effectiveness with typical and edge cases, refining based on actual outputs[^17].

### Platform-Specific Strategies

**For OpenAI Custom GPTs:**

- Leverage delimiter-separated instruction blocks for complex behaviors[^1]
- Use trigger-action pairs for sequential processes[^1]
- Define terms explicitly to prevent interpretation drift[^1]
- Configure capability-specific instructions (web browsing, DALLE)[^12]

**For Anthropic Claude Projects:**

- Begin with knowledge upload before instruction design[^17]
- Create clear boundaries between general behavior and document-specific guidance[^17]
- Design project structures around cohesive knowledge domains[^9]

**For Google Gemini Gems:**

- Adopt the PACT framework systematically[^14]
- Keep instructions concise but comprehensive[^14]
- Use Gemini to refine instruction clarity[^10]
- Focus on specific, repeatable tasks[^10]

**For Perplexity Spaces:**

- Structure instructions around research methodologies[^15]
- Define source priorities clearly (web vs. files vs. both)[^15]
- Include collaboration-specific guidelines[^7]
- Organize by research topic or project phase[^15]


## Conclusion

Project-level instructions across AI platforms share fundamental principles while exhibiting platform-specific implementations that reflect their unique design philosophies and target use cases. OpenAI emphasizes structured techniques and tool-like capabilities, Anthropic focuses on document integration and knowledge application, Google prioritizes simplicity and task automation, and Perplexity specializes in research organization and collaboration.

The evolution of these instruction systems reveals an industry trend toward more structured, domain-specific AI configurations that balance precise control with intuitive interfaces. As these platforms continue to develop, we can expect further refinement of instruction frameworks, improved AI assistance in instruction creation, and enhanced integration between instructions and knowledge contexts.

Effective project-level instructions ultimately combine clear role definition, specific format guidance, relevant contextual knowledge, and iterative refinement-principles that transcend platform differences while adapting to the unique strengths of each system.

## References

For detailed implementation guides and additional examples, refer to each platform's official documentation:

- OpenAI Custom GPTs: https://help.openai.com/en/articles/8770868-gpt-builder
- Anthropic Claude Projects: https://support.anthropic.com/en/articles/9517075-what-are-projects
- Google Gemini Gems: https://support.google.com/gemini/answer/15146780
- Perplexity Spaces: https://www.perplexity.ai/hub/faq/what-are-spaces

<div style="text-align: center">⁂</div>

[^1]: https://help.openai.com/en/articles/9358033-key-guidelines-for-writing-instructions-for-custom-gpts

[^2]: https://www.datacamp.com/blog/chatgpt-projects

[^3]: https://www.godofprompt.ai/blog/how-to-use-custom-instructions-for-chatgpt

[^4]: https://support.anthropic.com/en/articles/9517075-what-are-projects

[^5]: https://www.youtube.com/watch?v=hP1bNevQEGI

[^6]: https://support.google.com/gemini/answer/15146780?co=GENIE.Platform%3DAndroid

[^7]: https://www.perplexity.ai/hub/faq/what-are-spaces

[^8]: https://help.openai.com/en/articles/8554397-creating-a-gpt

[^9]: https://support.anthropic.com/en/articles/9529781-examples-of-projects-you-can-create

[^10]: https://blog.google/products/gemini/google-gems-tips/

[^11]: https://aibranding.academy/your-first-perplexity-space-instruction-prompt/

[^12]: https://openai.com/index/introducing-gpts/

[^13]: https://support.anthropic.com/en/articles/9945648-intro-to-projects

[^14]: https://www.youtube.com/watch?v=yO01B8OoXfo

[^15]: https://airespo.com/resources/perplexity-spaces-explained-in-depth/

[^16]: https://help.openai.com/en/articles/8770868-gpt-builder

[^17]: https://www.youtube.com/watch?v=YnDyBS3-zuM

[^18]: https://www.youtube.com/watch?v=0Q1AQAxpdGg

[^19]: https://docs.anthropic.com/en/docs/intro-to-claude

[^20]: https://mitsloanedtech.mit.edu/ai/tools/writing/custom-gpts-at-mit-sloan-a-comprehensive-guide/

[^21]: https://www.wired.com/story/how-to-use-chatgpt-projects/

[^22]: https://community.openai.com/t/custom-instructions-could-be-better-using-this-technique/763793

[^23]: https://openai.com/index/custom-instructions-for-chatgpt/

[^24]: https://learnprompting.org/blog/how-to-use-openai-chatgpt-projects

[^25]: https://community.openai.com/t/custom-instructions-to-make-gpt-4o-concise/905595

[^26]: https://www.pickaxeproject.com/post/openai-gpt-builders-prompt-instructions-prompt-design-walkthrough

[^27]: https://www.wealest.com/articles/how-to-use-chatgpt-projects

[^28]: https://www.reddit.com/r/ChatGPT/comments/196lv8i/custom_gpt_instructions_best_practices/

[^29]: https://zapier.com/blog/custom-chatgpt/

[^30]: https://www.youtube.com/watch?v=4tup7u9AqWY

[^31]: https://community.openai.com/t/exploring-best-practices-for-writing-instructions-for-gpts/504107

[^32]: https://www.reddit.com/r/ChatGPTPro/comments/1clu0bq/custom_gpts_and_instructions/

[^33]: https://www.instituteofaistudies.com/insights/how-to-use-claudes-projects

[^34]: https://support.anthropic.com/en/articles/9519177-how-can-i-create-and-manage-projects

[^35]: https://www.youtube.com/watch?v=oNAi8blLLk4

[^36]: https://www.fastcompany.com/91186280/how-to-get-the-most-out-of-claudes-ai-superpowers

[^37]: https://www.reddit.com/r/ClaudeAI/comments/1guwfqf/custom_instructions_in_projects/

[^38]: https://www.anthropic.com/news/projects

[^39]: https://ragaboutit.com/understanding-claude-projects-a-comprehensive-guide/

[^40]: https://support.anthropic.com/en/articles/10185728-understanding-claude-s-personalization-features

[^41]: https://www.reddit.com/r/ClaudeAI/comments/1e0s2vw/what_projectlevel_custom_instructions_do_you_use/

[^42]: https://support.anthropic.com/en/articles/9797557-usage-limit-best-practices

[^43]: https://www.aiville.com/c/anthropic/anthropic-introduces-projects-with-custom-instructions-to-claude

[^44]: https://giancarlomori.substack.com/p/a-practical-guide-to-implementing

[^45]: https://blog.google/products/gemini/google-gemini-update-august-2024/

[^46]: https://www.googlecloudcommunity.com/gc/AI-ML/Implementing-System-Prompts-in-Gemini-Pro-for-Chatbot-Creation/m-p/722482

[^47]: https://gemini.google/overview/gems/

[^48]: https://support.google.com/gemini/answer/15235603

[^49]: https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart

[^50]: https://www.zdnet.com/article/how-to-use-geminis-gems-to-create-your-own-custom-ai-assistants/

[^51]: https://yourstory.com/2024/08/googles-new-gems-personalizing-ai-geminis-latest-upgrade

[^52]: https://ai.google.dev/gemini-api/docs/prompting-intro

[^53]: https://tech.yahoo.com/general/articles/geminis-gems-now-available-free-011644597.html

[^54]: https://cloud.google.com/gemini/docs/discover/write-prompts

[^55]: https://steamcommunity.com/app/526870/discussions/0/601900667412483122/

[^56]: https://ai.google.dev/gemini-api/docs/prompting-strategies

[^57]: https://dev.to/proflead/notebooklm-vs-perplexity-spaces-the-ultimate-guide-3jce

[^58]: https://aitoolsclub.com/step-by-step-guide-on-how-to-use-perplexity-spaces-the-ultimate-ai-powered-collaboration-hub/

[^59]: https://www.youtube.com/watch?v=CSuMA_QSEGg

[^60]: https://www.reddit.com/r/perplexity_ai/comments/1h5kfax/how_are_you_using_the_perplexity_spaces_feature/

[^61]: https://www.perplexity.ai/hub/blog/introducing-internal-knowledge-search-and-spaces

[^62]: https://www.youtube.com/watch?v=JCHPG6PTpsM

[^63]: https://learnprompting.org/blog/guide-perplexity

[^64]: https://www.reddit.com/r/ClaudeAI/comments/1fl5j3t/general_tips_for_developing_a_large_project_using/

[^65]: https://www.reddit.com/r/ClaudeAI/comments/1egxxmz/not_enough_people_are_getting_creative_with/

[^66]: https://gemini.google.com/gems/create

[^67]: https://www.youtube.com/watch?v=NOUkKrhOWW4

[^68]: https://www.linkedin.com/pulse/diy-guide-making-your-own-gemini-gem-chester-beard-l01bc

[^69]: https://www.reddit.com/r/GoogleGeminiAI/comments/1f3bm1u/so_i_have_gemini_gems/

[^70]: https://zapier.com/blog/gemini-gems/

[^71]: https://www.perplexity.ai/hub/blog/a-student-s-guide-to-using-perplexity-spaces

[^72]: https://www.perplexity.ai/help-center/en/articles/10352961-what-are-spaces

[^73]: https://www.youtube.com/watch?v=x9dgJo4GCTw

[^74]: https://www.youtube.com/watch?v=ArPU944U_q8

[^75]: https://www.youtube.com/watch?v=2xVWJQxPzow

