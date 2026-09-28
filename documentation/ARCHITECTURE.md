# System Architecture

## Overview

Recall is an AI-powered customer support application built
around a web interface, a serverless backend, an LLM, and
a persistent memory service.

## Components

### 1. Frontend

The web interface allows users to sign in, send support
messages, view responses, and inspect available memories.

### 2. Cloudflare Worker

The Worker handles application requests, authentication,
conversation processing, and communication with external services.

### 3. Hindsight

Hindsight provides persistent memory capabilities. Recall uses
it to retain and retrieve useful context from prior interactions.

### 4. Groq

The Groq API provides language-model responses using the
conversation and relevant context supplied by the application.

### 5. Cloudflare D1

D1 stores application data used by the authentication and
account-related functionality.

## Request Flow

1. The user submits a message through the frontend.
2. The frontend sends the message and conversation context
   to the backend.
3. The backend retrieves relevant memories from Hindsight,
   where applicable.
4. The backend prepares the model request and sends it to Groq.
5. The response is returned to the frontend.
6. Relevant interaction information is retained in Hindsight
   for future retrieval.

## Deployment

The application is deployed using Cloudflare Workers.

Production secrets are configured through Cloudflare and
should not be stored in the repository.
