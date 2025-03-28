import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { listRunningInstances } from "./aws.js";

// Create server instance
const server = new McpServer({
  name: "aws-instances",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "get-aws-instances",
  "Get list of running aws instances from aws cloud of given region",
  {
    region: z.string().describe("Region of the aws compute"),
  },
  async ({ region }) => {
    const instances = await listRunningInstances(region);
    if (!instances) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to retrieve aws compute instances on  following region: ${region} .`,
          },
        ],
      };
    }

    if (instances.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No compute instance found in ${region}`,
          },
        ],
      };
    }

    const formattedText = `Here is the result of running compute instance on ${region} region : \n\n ${instances?.join(
      "\n"
    )}`;

    return {
      content: [
        {
          type: "text",
          text: formattedText,
        },
      ],
    };
  }
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Aws MCP server running on stdio");
  }
  
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });