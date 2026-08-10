# Find all steps using Gemini

Run this in Hasura Console GraphiQL to find all steps still using Gemini:

```graphql
query FindGeminiSteps {
  workflow_steps(where: { config: { _contains: { provider: "gemini" } } }) {
    id
    name
    type
    config
    workflow_id
  }
}
```

Then for each step returned, run this mutation to update it to Groq:

```graphql
mutation UpdateStepToGroq {
  update_workflow_steps_by_pk(
    pk_columns: { id: "<STEP_ID>" }
    _set: { config: { provider: "groq", model: "llama-3.1-8b-instant", prompt: "<YOUR_PROMPT>", temperature: 0.2 } }
  ) {
    id
    config
  }
}
```
