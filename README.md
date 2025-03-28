
# AWS Instances MCP (Model Context Protocol) Server

## Overview
This is a Model Context Protocol (MCP) server that retrieves and lists running AWS EC2 instances for a specified region using the AWS SDK.

## Prerequisites
- Node.js (version 18 or later)
- AWS Account
- AWS Access Key and Secret Access Key

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/codewithdpk/aws-mcp-server.git
cd aws-mcp-server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure AWS Credentials
Create a `.env` file in the project root with your AWS credentials:
```
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_ACCESS_SECRET_KEY=your_secret_access_key
```

### 4. Build the server
To build the server locally:
```bash
npm run build
```

### 5. Testing your server with Claude for Desktop

<img width="666" alt="Screenshot 2025-03-28 at 6 33 16 PM" src="https://github.com/user-attachments/assets/bc5a53cc-d12e-49da-8053-540cf80b47c5" />

Claude for Desktop is not yet available on Linux. Linux users can proceed to the Building a client tutorial to build an MCP client that connects to the server we just built.

First, make sure you have Claude for Desktop installed. You can install the latest version here. If you already have Claude for Desktop, make sure it’s updated to the latest version.

We’ll need to configure Claude for Desktop for whichever MCP servers you want to use. To do this, open your Claude for Desktop App configuration at `~/Library/Application Support/Claude/claude_desktop_config.json` in a text editor. Make sure to create the file if it doesn’t exist.

You’ll then add your servers in the `mcpServers` key. The MCP UI elements will only show up in Claude for Desktop if at least one server is properly configured.

In this case, we’ll add our single weather server like so:
```json
{
    "mcpServers": {
        "weather": {
            "command": "node",
            "args": [
                "/ABSOLUTE/PATH/TO/PARENT/FOLDER/aws-mcp-server/build/index.js"
            ]
        }
    }
}
```

#### Troubleshooting
- Verify AWS credentials have appropriate EC2 read permissions
- Ensure you have the latest version of Claude Desktop App
- Check that all dependencies are correctly installed

## Features
- Retrieve running EC2 instances for a specified AWS region
- Support for multiple availability zones
- Detailed instance information including:
  - Instance ID
  - Instance Type
  - Public IP
  - Private IP
  - Instance State

## Tools
- `get-aws-instances`: Retrieves list of running AWS instances for a given region

## Example Usage
```typescript
server.tool("get-aws-instances", {
  region: "ap-south-1"
})
```

## Technologies
- MCP
- TypeScript
- AWS SDK
- Model Context Protocol (MCP)
- Zod for type validation

