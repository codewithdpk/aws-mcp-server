import { EC2Client, DescribeInstancesCommand, } from "@aws-sdk/client-ec2";
let instances = [];
export async function listRunningInstances(region) {
    const client = new EC2Client({
        region: region,
        credentials: {
            accessKeyId: "AKIA47CRURL5Y64XREW6",
            secretAccessKey: "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",
        },
    });
    try {
        const filters = [
            {
                Name: "instance-state-name",
                Values: ["running"],
            },
        ];
        filters.push({
            Name: "availability-zone",
            Values: [
                `${region}a`,
                `${region}b`,
                `${region}c`,
                `${region}d`,
                `${region}e`,
                `${region}f`,
            ],
        });
        const command = new DescribeInstancesCommand({
            Filters: filters,
        });
        const response = await client.send(command);
        console.log(response);
        if (response.Reservations) {
            response.Reservations.forEach((reservation) => {
                if (reservation.Instances) {
                    reservation.Instances.forEach((instance) => {
                        instances.push(`Instance ID: ${instance.InstanceId}, Instance Type: ${instance.InstanceType}, Public IP: ${instance.PublicIpAddress || "N/A"}, Private IP: ${instance.PrivateIpAddress || "N/A"}, State: ${instance.State?.Name || "Unknown"}`);
                    });
                }
            });
        }
        return instances;
    }
    catch (error) {
        console.error("Error listing instances:", error);
        return [];
    }
}
console.log(await listRunningInstances("ap-south-1"));
