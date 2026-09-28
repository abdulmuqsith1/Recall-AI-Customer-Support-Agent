# Hindsight Integration

## Purpose

Hindsight is Recall's persistent memory layer. It helps the
support agent use relevant information from earlier interactions
when responding to a customer.

## Memory Lifecycle

### Retention

After a support interaction, the application sends useful
conversation information to Hindsight for retention.

### Recall

When a user sends another message, the application can request
relevant memories from Hindsight and use the returned context
when preparing the response.

### Response Generation

The backend combines the current message, recent conversation
history, and relevant recalled context for the language model.

### Continuous Context

As interactions accumulate, the agent has more retained
information available to support future conversations.

## Why Memory Matters

Without persistent memory, an agent may have to rely only on
the current conversation. With relevant recalled context,
it can potentially recognize previously discussed issues
and avoid asking customers to repeat information.

## Example

1. A customer describes a recurring connectivity issue.
2. The interaction is retained in Hindsight.
3. The customer returns and asks about the same issue.
4. Recall retrieves relevant information from the earlier
   interaction.
5. The agent uses that context when generating its response.

## Implementation Notes

Document the actual Hindsight API operations, memory
identifiers, request formats, error handling, and retention
behavior implemented in this repository.

Do not include API keys, private customer conversations,
or production credentials in this document.
